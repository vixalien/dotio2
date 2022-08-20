---
title: Setup Git
description: How I set up Git on my systems with using opinionated defaults.
publish_date: 2022-04-01
og:image: /images/posts/setup-git/banner.webp
---

# How to setup Git

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
	email = good@email.dne
	name = Beatiful Name
# It is a good idea to tell Git to remember your credentials so that you don't have to log in everytime especially if you use Personal Access Tokens as seen below.
# Note: If you don't want Git to remember your credentials forever, use `cache` instead of `store` or run `git help -a | grep credential-` to view all available helpers.
[credential]
	helper = store
# Allow you to view pretty outputs when you fo `git log`. To enable these aliases, add the following lines to your `~/.gitconfig` file (create one if it doesn't exist)
# some are stolen from https://stackoverflow.com/questions/1057564/pretty-git-branch-graphs
[alias]
	lg1 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all
	lg2 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all
	lg = !"git lg1"
	adog = log --all --decorate --oneline --graph
	# silly amend the last commit using the same message, useful when you forgot to add something before committing.
	silly = commit --amend -a --no-edit
[filter "lfs"]
	required = true
	clean = git-lfs clean -- %f
	smudge = git-lfs smudge -- %f
	process = git-lfs filter-process
# Set the default branch to main
[init]
	defaultBranch = main
[color]
	ui = true
# Set editor to VS Code
[core]
      editor = code

```

## Github

Git and Github are a pair. This is how I set them up.

### 1. Logging in

You will need to login to Github from Git to access private repositories or push to repos. To my knowledge, you can either use SSH (Secure Shell) or Personal Access Tokens to login to Github from Git. You can choose whatever you like but I personally like to use SSH.

#### 1. Using SSH

SSH is a protocol for logging into a remote machine and for executing commands on a remote machine. You can use the protocol to sign in into Github.

##### 1. Check if SSH files are present

FIrst check if you have the files `~/.ssh/id_rsa` and `~/.ssh/id_rsa.pub`.

```bash
ls ~/.ssh/id_rsa{,.pub}
```

If the 2 files are present, skip to step 3.

##### 2. Generate the SSH keys

```
ssh-keygen -t rsa -C "good@email.dne"
```

##### 3. Copy the contents of the `id_rsa.pub`

```bash
pbcopy < ~/.ssh/id_rsa.pub # on macOS

cat ~/.ssh/id_rsa.pub # on *nix, copy by hand-erm-mouse
```

##### 4. Add your SSH to Github

You will now need to add your SSH key to Github.

1. Go to your Github's [Account Settings][github-settings]
2. On the sidebar, Click on "[SSH and GPG keys][github-sag]".
3. Scroll and click on "New SSH Key".
4. Add a descriptive label and paste the text you had copied from the previous command and save.

##### 5. Test SSH

To test SSH, run the following command:

```bash
ssh -T git@github.com
```

If you see something like the following, it worked:

```
Hi username! You've successfully authenticated, but Github does
not provide shell access.
```

Also, don't mind it if you see a message that says the authenticity of 'github.com' can't be established. It's normal.

Now clone a repo using SSH by running your clone commands in the form:

```bash
git clone git@github.com:user/repo.git
```

#### 2. Using Personal Access Tokens

You need to push a repo to Github to initiate the authentication flow using Personal Access Tokens. Clone one of your repos and try to push it to Github using `git push`. If you do, it will ask for your username and password. Do not enter your real password, instead, create a new Personal Access Token that will serve as your password.

1. Go to [Github]
2. Go to [Settings][github-settings] by clicking your account icon in the top right corner.
3. On the sidebar on the left, scroll down and click on ["Developer Settings"][github-developer-settings]
4. On the new sidebar that appears, click on [Personal access tokens][github-pat]
5. "Generate new token"

Choose a name for your token. I recommend the format: `COMPUTER_NAME OS VERSION "GIT"`. For example: `HP Laptop Ubuntu 21.04 Git`. It may help you remember which tokens are used for what.

I recommed you check the `workflow` scope ONLY. This will automatically select `repo` too and this will allow you to do basically almost anything you want on Git (including pushing & running Workflows/Automations). If you don't know what workflows are, only select `repo`. If you feel compelled as those are not enough, create it with those scopes anyways as you can create other tokens anyways anytime.

It is equally important to note that Personal Access Tokens are used only once and cannot be viewed ever again although you can delete them.

### 2. Adding a GPG Key to your account.

You can show a `Verified` Badge or a blue tick next to your commits by setting up a GPG Key and using it to sign your commits. Commits made through the Github web interface are automatically signed.

#### 1. Install gpg

```bash
brew install gpg # on macos
# it's usually preinstalled on linux
# on windows go to https://www.gnupg.org/download/
```

#### 2. Generate a new GPG Key

```bash
gpg --full-generate-key
```

GPG will ask you for many details. You must follow the prompts and enter the data provided. However it is extremely important that you enter the same email as you use on Github otherwise your commits won't be verified.

GPG will ask some questions and this is how I choose to answer them. The `circled` texts are my answers.

<pre class="not-code">
gpg (GnuPG) 2.2.20; Copyright (C) 2020 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
  (14) Existing key from card
Your selection? <code>1</code>
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (3072) <code>4096</code>
Requested keysize is 4096 bits
Please specify how long the key should be valid.
         0 = key does not expire
      &lt;n&gt;  = key expires in n days
      &lt;n&gt;w = key expires in n weeks
      &lt;n&gt;m = key expires in n months
      &lt;n&gt;y = key expires in n years
Key is valid for? (0) <code>3m</code>
Key expires at Thu 30 Jun 2022 00:20:24 CAT
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.

Real name: <code>Beautiful Email</code>
Email address: <code>good@email.dne</code>
Comment: <code>The comment you provided</code>
You selected this USER-ID:
    <i>"Beautiful name (The comment you provided) &lt;good@email.dne&gt;</i>

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? <code>o</code>
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

#### 3. Verify the GPG key

```bash
gpg --list-secret-keys --keyid-format LONG
```

It should return text in the following format. Take note of the `[KEY_ID]`.

<pre class="not-code">
sec   rsa4096/<code>[KEY_ID]</code> 2022-03-31 [SC] [expires: 2022-06-29]
      A13CD138DCCB7314834CD603049EF1938BFB0ACD
uid                 [ultimate] <i>"Beautiful name (The comment you provided) &lt;good@email.dne&gt;</i>
ssb   rsa4096/795E8F10B7A9C97D 2022-03-31 [E] [expires: 2022-06-29]
</pre>

#### 4. Export the key and add it to Github

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


To add the key to Github.

1. Open [Github]
2. Go your [settings][github-settings]
3. On the sidebar, Click on "[SSH and GPG keys][github-sag]".
4. Scroll and click on "New GPG Key" in the "GPG" keys section. (Below the SSH section).
5. Paste the text you had copied from the previous command and save.

#### 5. Configure Git to always sign commits

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
