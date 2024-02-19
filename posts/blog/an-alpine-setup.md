---
title: My Alpine Setup
description: Exploring a minimal but nice alpine setup.
publish_date: 2024-02-18
tags: [linux]
---

I love Alpine. TPM using [Clevis]. Encrypted home (coming soon, with
[pam_mount])

This installation guide is very inspired and based on
[Hugo's Installation Guide][hugo-guide].

## Setup the installer

Download the alpine installation disk from the
[Alpine downloads page][alpine-downloads], flash it to a USB and boot it up.

## Configuring Alpine

Alpine has a very nice `setup-alpine` script that setups the Alpine
installation. This is different from Arch where you'd need to do everything
manually. We are going to do it to configure most stup, until we arrive to the
Partitioning stage.

- Keyboard: `us`.
- Keyboard variation: `us`.
- Hostname: `name.vixalien.com`.
- Network adapter: `wlan0`.
- Wifi network.
- Wifi password.
- IP address: `dhcp`.
- Networks: `done`.
- Manual network configuration: `n`.
- root password: `stronkpassword`
- Time zone: `Africa/Kigali`.
- User account: `alien`. This user will automatically be a member of the wheel
  group, and has (by default) privileges to use `doas` (alpine's alternative to
  `sudo`).
- The defaults are fine for all remaining steps.

> Make Sure to stop the `setup-alpine` tool when they ask for disk, as we will
> do it manually.

## Partitioning

Firstly, we will need to create a boot partition (aka EFI System Partition) to
hold all our kernel information and bootloader (optional). Please make the
partition 500 MB large, otherwise some distros like Fedora might refuse it, and
the space might run out faster than you think if you decide to make backups of
your UKIs or go distro-hopping, so 1GB is actually a better recommendation.

Then we are going to create an [LVM] partition that will be encrypted and have
volumes for all our other partitions (alpine, home, swap...). I ('d) like to
setup one partition called `linux` so it can be reused by my other linux
installations.

### Installing the necessary packages.

For partitioning, we will use gdisk. Let's also install other packages for ext4
and btrfs filesystems.

```sh
apk add lsblk gptfdisk btrfs-progs e2fsprogs
```

Activate the btrfs kernel module:

```sh
modprobe btrfs
```

cryptsetup is needed for LUKS encryption

```sh
apk add cryptsetup
```

LVM

```sh
apk add lvm2
```

### Overwriting the disk

It might be a good idea to overwrite the disk using a tool like `haveged` to
clear any leftover data.

> TODO: there is probably an alternative for SSDs

### Setup Disks

```sh
gdisk /dev/nvme0n1
```

Use `n` to create 2 partitions:

1. EFI partition. size: `512M`. GUID: `ef00` (EFI System Partition)
2. LVM partition. size: `(leave blank)`. GUID: `8309` (Linux LUKS)

> For more info about gdisk Hex codes see
> https://wiki.archlinux.org/title/GPT_fdisk#Partition_type

Populate `/dev` with new partitions:

`partprobe /dev/nvme0n1`

### Identify your partitions

Find your partition names using `lsblk`:

```
NAME         MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINTS
nvme0n1      259:0    0 511.9G  0 disk  
├─nvme0n1p1  259:1    0   500M  0 part  
└─nvme0n1p2  259:2    0 511.5M  0 part
```

In this case, `/dev/nvme0n1p1` is the EFI partition, while `/dev/nvme0n1p2` will
be our LUKS partition.

### Configuring LUKS

This step will ask for a password to encrypt your whole disk with. Remember it,
and make it strong.

```sh
cryptsetup luksFormat /dev/nvme0n1p2
```

> You might want to familiarise yourself with
> [different LUKS options][luks-options]. I find the defaults okay.

Open the LUKS partition:

```sh
cryptsetup luksOpen /dev/nvme0n1p2 lvmcrypt
```

### LVM Physical and Logical Volumes

Create a physical volume

```sh
pvcreate /dev/mapper/lvmcrypt
```

Create a virtual volume named `vg0` (or something else, this one is memorable)

```sh
vgcreate vg0 /dev/mapper/lvmcrypt
```

#### Create partitions

Swap partition. I have a 32GB RAM laptop:

```sh
lvcreate -L 32G vg0 -n swap # I have a 32GB RAM laptop
lvcreate -L 50G vg0 -n alpine # root
lvcreate l 100%FREE vg0 -n home
```

#### Create file systems

```sh
mkfs.exfat /dev/nvme0n1p1
mkfs.btrfs /dev/vg0/alpine
mkfs.ext4 /dev/vg0/home
```

Activate swap

```sh
mkswap /dev/vg0/swap
mkswap /dev/vg0/swap
```

#### Mount partitions

Temporarily mount the `alpine` partition to create subvolumes.

```sh
mount /dev/mapper/alpine /mnt
```

Create the subvolumes adapted from
[Snapper's Suggested filesystem layour][snapper-layout]

```sh
# The directories are created implicitly
btrfs subvolume create /mnt/@ # /
btrfs subvolume create /mnt/@snapshots # /.snapshots 
btrfs subvolume create /mnt/@var_log # /var/log
```

Change the default subvolume to `@`

```sh
btrfs subvolume set-default @ /
```

Unmount the partition

```sh
umount /mnt
```

Create mountpoints and mount our partitions and subvolumes

```sh
mount /dev/mapper/alpine -o subvol=@ /mnt/

# Create mountpoints
mkdir -p /mnt/boot /mnt/boot /mnt/var/log /mnt/.snapshots

# Mount the remaninig subvolumes
mount /dev/mapper/alpine -o subvol=@snapshots /mnt/.snapshots
mount /dev/mapper/alpine -o subvol=@var_log /mnt/var/log

# Mount the efi system partition
mount /dev/nvme0n1p1 /mnt/boot

# Mount the home partition
mount /dev/mapper/home /mnt/home
```

## Installation

### Install a base alpine system

```sh
BOOTLOADER=none setup-disk -k edge /mnt
```

The `BOOTLOADER=none` tells the script to not install any bootloader (grub is
the default), and `-k edge` tells the script to install the `edge` kernel
instead of the `lts` one.

### Chroot into the filesystem

```sh
chroot /mnt
mount -t proc proc /proc
mount -t devtmpfs dev /dev
```

Switch to the edge branch, and enable the community and testing repositories.
This is done by editing `/etc/apk/repositories` and replacing its contents with:

```
http://dl-cdn.alpinelinux.org/alpine/edge/main
http://dl-cdn.alpinelinux.org/alpine/edge/community
http://dl-cdn.alpinelinux.org/alpine/edge/testing
```

> You can choose a [mirror] closer to you if you want

### (No) bootloader

The next step would be to install a bootloader like GRUB or
systemd-boot/gummiboot. However, we don't need one of them since we instead
create a [Unified Kernel Image][uki] (UKI) which can be directly booted by the
UEFI firmware, hence removing the need for a traditional bootloader. A UKI
contains the following, and some more:

- The kernel itself
- The kernel’s command line parameters
- A small stub that execute the kernels with that command line
- The [initramfs] (or initrd): a small read-only filesystem with the necessary
  userspace utilities to boot into the main system.

The stub itself is provided by the `gummiboot-efistub` package. It is considered
deprecated, but no solid alternative is available. The bundle itself is built by
`efi-mkuki`, and `secureboot-hook` will rebuild the bundle after each kernel
upgrade. We also use `efibootmgr` to create a boot entry that shows in the EFI
firmware, although you can always use the UFI's boot from file function or
execute the UKI from a UEFI shell.

```sh
apk add secureboot-hook gummiboot-efistub efibootmgr
```

Install `blkid` which will be used in a moment. This tool prints the UUID (and a
few other details) for a specified partition. This is the recommended way to
address a partition ambiguously:

```sh
apk add blkid
```

#### secureboot-hook

Edit `/etc/kernel-hooks.d/secureboot.conf` with the following contents.

```
cmdline=/etc/kernel/cmdline
signing_disabled=yes
output_dir="/boot/EFI/Linux"
output_name="alpine-linux-{flavor}.efi"
```

`/<efi>/EFI/Linux` is a more or less standard directory, and will be discovered
by `systemd-boot` if you have that installed.

Signing is disabled only temporarily until I install the proper keys.

#### /etc/kernel/cmdline

Also create a file `/etc/kernel/cmdline` that will contain arguments passed to
the kernel from the bootloader (UKI, in this case).

```
root=UUID=5021db58-cc3a-4829-a630-2d468f8d1761
rootflags=subvol=@
rootfstype=btrfs
cryptroot=UUID=0db973a0-1b95-4a23-a63f-cb6248fe2bf7
cryptdm=lvmcrypt
cryptkey
modules=sd-mod,btrfs,nvme
quiet
ro
```

The `root` UUID can be determined with:

```sh
blkid /dev/mapper/alpine >> /etc/kernel/cmdline
```

The `cryptroot` UUID:

```sh
blkid /dev/nvme0n1p2 >> /etc/kernel/cmdline
```

#### initrams

Edit `/etc/mkinitfs/mkinitfs.conf` to add `features` which are needed for our
encrypted root setup to work. While editing this line, it is also safe to delete
`virtio`, which is used only in virtual machines. Also add `kms` to enable
kernel mode setting. These features will be included in the generated
[initramfs].

```sh
features="ata base ide scsi usb btrfs ext4 lvm kms keymap nvme cryptsetup cryptkey resume"
disable_trigger=yes
```

#### Boot Entry

Now, let's create a boot entry that will (hopefully) be visible in the UEFI
firmare.

```sh
efibootmgr --disk /dev/nvme0n1 --part 1 --create --label 'Alpine Linux' --load /EFI/Linux/alpine-linux-edge.efi --verbose
```

> Note: This procedure only needs to be done once; after that the Unified Kernel
> Image will be generated automatically every time the kernel is upgraded.

Finally, trigger the newly created kernel hook so that all the right files are
copied into `/boot`

```
apk fix kernel-hooks
```

> Upgrade Setup apk package cache

Resources:

- ["Setting up an Alpine Linux workstation" by Hugo Osvaldo Barrera][hugo-guide]
- ["In Praise of Alpine and APK" by Hugo Osvaldo Barrera](https://whynothugo.nl/journal/2023/02/18/in-praise-of-alpine-and-apk/)
- ["In Praise of Alpine" by Drew Devault](https://drewdevault.com/2021/05/06/Praise-for-Alpine-Linux.html)
- [Full disk encryption secure boot - Alpine Wiki](https://wiki.alpinelinux.org/wiki/Full_disk_encryption_secure_boot)
- [UEFI Secure Boot - Alpine Wiki](https://wiki.alpinelinux.org/wiki/UEFI_Secure_Boot)

[hugo-guide]: https://whynothugo.nl/journal/2023/11/19/setting-up-an-alpine-linux-workstation/
[alpine-downloads]: https://alpinelinux.org/downloads/
[luks-options]: https://wiki.archlinux.org/title/Dm-crypt/Device_encryption#Encryption_options_for_LUKS_mode
[snapper-layout]: https://wiki.archlinux.org/title/Snapper#Suggested_filesystem_layout
[mirror]: https://mirrors.alpinelinux.org/
[uki]: https://wiki.archlinux.org/title/Unified_kernel_image
[initramfs]: https://wiki.archlinux.org/title/Arch_boot_process#initramfs
