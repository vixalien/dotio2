---
title: Setup Git
description: How I set up Git on my systems with using opinionated defaults.
publish_date: 2022-04-01
og:image: /images/posts/setup-git/banner.webp
tags: [code, tutorial]
---

After you've [learnt the basics of Git](/blog/git), it's time to make Git your own by creating a workflow that suits you.

## How to setup Git

This is my default setup

### 1. Install Git

Git has a high chance of being already installed on some systems. First run `git version` to see if it is installed and up-to-date.

```bash
brew install git # on macos

yay -S git # arch (or use pacman)
sudo apt install git # ubuntu
sudo dnf install git # fedora

# this guide is not really meant for windows but everything should work, go to https://git-scm.com/download/win to download git for windows
```

### 2. Update Git settings

Create a file called `.gitconfig` in your home directory. On Windows, it is `C:\Users\username\.gitconfig`.


```yaml
# ~/.gitconfig
# Tell Git who you are
[user]
    email = email@domain.tld
    name = First Last Name
[push]
    default = current
[credential]
    helper = store
[alias]
    silly = commit --amend -a --no-edit
    tree = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset%n' --abbrev-commit --date=relative --branches
    # logs
    lg1 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all
    lg2 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all
    lg = !"git lg1"
    adog = log --all --decorate --oneline --graph
[filter "lfs"]
    required = true
    clean = git-lfs clean -- %f
    smudge = git-lfs smudge -- %f
    process = git-lfs filter-process
# Set the default branch to main
[init]
    defaultBranch = main
[commit]
    verbose = true
[rebase]
    autoStash = true
    stat = true
[tag]
    forceSignAnnotated = true
[fetch]
    prune = true
[color]
    ui = true
[core]
      editor = flatpak run com.visualstudio.code -w

```

## Github/GitLab/...

Git is decentralised, however, you usually need to host your files on a server somewhere to make them available to other people. **Git Forges** make it easy, and there are many options available, such as GitHub, GitLab, Forgejo, Bitbucket, and more. Here's how you can set up your local Git to work with your favorite forge correctly.

### 1. Using SSH

Your hosted git server will need to authenticate you. We use [SSH], or Secure SHell to generate a pair of keys that will help establish the link to the server. One is a public key which means we can share it with anyone, while the other is a private key which means it needs to stay on the coumputer

#### 1. Generate SSH keys

```sh
ssh-keygen -t ed25519 -f ~/.ssh/[filename] -C "[comment]"
```

Replace `[filename]` with the name of your forge, and add a comment to help you remember what this key is for. For example, here is how I'd generate a key for github:

```sh
ssh-keygen -t ed25519 -f ~/.ssh/github -C "email@domain.tld"
```

#### 2. Copy the contents of the `[filename].pub`

For a reminder, it's located at `~/.ssh/[filename].pub`.

#### 3. Add your SSH to your forge

For convenience, here's how to add an SSH key to Github.

1. Go to your Github's [Account Settings][github-settings]
2. On the sidebar, Click on "[SSH and GPG keys][github-sag]".
3. Scroll and click on "New SSH Key".
4. Add a descriptive label and paste the text you had copied from the previous command and save.

#### 4. Create an SSH config

Now, we need to create a config file that tells SSH which key to use for which domain at `~/.ssh/config`

```
Host github.com
  HostName github.com
  IdentityFile ~/.ssh/github
```

Feel free to add even more domains for each forge.

#### 5. Test SSH

To test SSH, run the following command:

```bash
ssh -T git@github.com
```

If you see something like the following, it worked:

```
Hi username! You've successfully authenticated, but Github does
not provide shell access.
```

Also, don't mind it if you see a message that says the authenticity of 'github.com' can't be established. It's normal, and once you trust the domain, SSH will remember that.

Now clone a repo using SSH by running your clone commands in the form:

```bash
git clone git@github.com:user/repo.git
```

### 2. Adding a GPG Key to your account.

You can show a `Verified` Badge or a blue tick next to your commits by setting up a [GPG] Key and using it to sign your commits. Commits made through the Github web interface are automatically signed.

#### 1. Install gpg

```bash
brew install gpg # on macos
# it's usually preinstalled on linux
# on windows go to https://www.gnupg.org/download/
```

#### 2. Generate a new GPG Key

To create a GPG key quickly:

```bash
gpg --quick-generate-key [email@domain.tld]
```

<pre class="not-code">
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: key <i><b><code>YOUR KEY WILL BE HERE</code></b></i> marked as ultimately trusted
dgpg: revocation certificate stored as '/home/<i>USERNAME</i><wbr>/.gnupg/openpgp-revocs.d/RANDOM40CHARACTERSIDKWHYUREADINGTHISLMAO.rev'
public and secret key created and signed.

pub   rsa4096 2022-03-31 [SC] [expires: 2022-06-29]
      RANDOM40CHARACTERSIDKWHYUREADINGTHISLMAO
uid                      <i>"Beautiful name (The comment you provided) &lt;good@email.dne&gt;</i>
sub   rsa4096 2022-03-31 [E] [expires: 2022-06-29]
</pre>

At this point you will be demanded to enter a password twice. Please remember it or save it somewhere (in a password manager, does paper still exist in the future?)

#### 3. Export the key and add it to Github

Run the following command using the `[KEY_ID]` from the previous command to export your newly-created GPG key.

```bash
gpg --armor --export [KEY_ID]
```

This will generate a large block of text. In the following format.

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
[SCRAMBLE]
-----END PGP PUBLIC KEY BLOCK-----
```

Copy the whole text including the comments.


As an example, here's how to add the key to Github.

1. Open [Github]
2. Go your [settings][github-settings]
3. On the sidebar, Click on "[SSH and GPG keys][github-sag]".
4. Scroll and click on "New GPG Key" in the "GPG" keys section. (Below the SSH section).
5. Paste the text you had copied from the previous command and save.

#### 4. Configure Git to always sign commits

Now that you have GPG set up with Git, run the following commands to tell git to always sign your commits with your GPG key.

```bash
git config --global user.signingkey [KEY_ID]
git config --global commit.gpgsign true
```

If you do not enable `commit.gpgsign` you can always sign each commit individually by running `git commit -S`.

Now try and commit to one of your projects. And it should show a verified commit.

#### Troubleshooting

If you run into issues while on the last part and the response says the commit can't be verified, try running the following command.

```bash
echo "test" | gpg --clearsign
```

If it fails, set the GPG_TTY variable.

```bash
export GPG_TTY=$(tty)
```

Then try re-running the command and it should be successful.

It is also a good idea to kill the GPG client so that it asks for the password the first time.

```bash
gpgconf --kill all
gpg-agent --daemon
```

### Sources

- [Verifying GPG keys on Daily Dev Tips](https://daily-dev-tips.com/posts/how-to-verify-your-commits-on-github/).
- [Your First time on Git by Karl Broman](https://kbroman.org/github_tutorial/pages/first_time.html)


[github]: https://github.com
[github-settings]: https://github.com/settings/profile
[github-developer-settings]: https://github.com/settings/apps
[github-pat]: https://github.com/settings/tokens
[github-sag]: https://github.com/settings/keys
[ssh]: https://en.wikipedia.org/wiki/Secure_Shell
[gpg]: https://en.wikipedia.org/wiki/GNU_Privacy_Guard
