# WSL as a development environment

**W**indows **S**ubsystem for **L**inux enables running Linux-like environment
directly on top of Windows, without using virtual machines. While this has some
shortcomings (no support for GUI applications, no access to drivers), it seems
to work pretty well for basic web development. It also has some advantages, e.g.
no waiting for the virtual machine to boot.

As of this writing, version 2 of WSL is available through Windows Insider
program. It should improve some of the issues mentioned above, e.g. it will
include a real Linux Kernel. However, this note is written with version 1 in
mind.

The [installation process](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
is quite straight-forward.

You *might* need to tackle an issue with
[copy-pasting](https://devblogs.microsoft.com/commandline/copy-and-paste-arrives-for-linuxwsl-consoles/),
which in turn requires
[tweaking permission settings](https://www.maketecheasier.com/access-windowsapps-folder-windows-10/).
On the other hand, this *might* be required only if you use Windows Terminal - I
ended up using ConEmu instead.


## ConEmu

While Microsoft recommends using WSL via their new Windows Terminal, it has
some issues (e.g. displaying colors, using mouse). With
[ConEmu](https://conemu.github.io/)
stuff pretty much works out-of-the-box. You might want to
[set home directory as the starting point](https://conemu.github.io/en/BashOnWindows.html#wsl-home)
or set WSL as the default task for new console and pick a nice color theme in
the settings.


## Tmux

Due to permission problems, `screen` requires an invocation of a spell after
each bootup. [Tmux](https://github.com/tmux/tmux) doesn't have this problem.

I found that the following config worked nicely for me (place it in
`~/.tmux.conf`).

```
# Remap prefix from 'C-b' to 'C-a'.
unbind C-b
set-option -g prefix C-a
bind-key C-a send-prefix

# Reload config file on 'C-a r'.
bind r source-file ~/.tmux.conf

# Enable mouse mode (tmux 2.1 and above)
set -g mouse on

# Toggle mouse mode on `C-a m` to allow copy-pasting with mouse.
bind m run "\
    tmux show-options -g | grep -q "mouse\\s*on"; \
    if [ \$? = 0 ]; \
    then  \
        toggle=off;  \
    else  \
        toggle=on;  \
    fi;  \
    tmux display-message \"mouse is now: \$toggle\";  \
    tmux set-option -w mouse \$toggle; \
    tmux set-option -g mouse \$toggle; \
    "

# Switch panes using Alt-arrow without prefix.
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

# Split panes using - and _
bind - split-window -v
bind _ split-window -h
unbind '"'
unbind %

# Don't rename windows automatically.
set-option -g allow-rename off

# Highlight current window.
set-window-option -g window-status-current-bg yellow

# Show activity on other windows.
setw -g monitor-activity on
set -g visual-activity on
```

Whereas `screen` uses config files to open multiple windows and execute commands
on startup, `tmux` can't use the same approach, since the initial window is
opened only after the whole config has been read. This can be remedied by using
shell scripts, that might go a little something like this:

```
#!/usr/bin/env bash

# Create a new session named CRM.
tmux new-session -d -s CRM

# Create named windows and split to panes if needed.
tmux send-keys -t CRM 'tmux new-window -n Django ; tmux split-window -v' ENTER
tmux send-keys -t CRM 'tmux new-window -n Webpack ' ENTER
tmux send-keys -t CRM 'tmux new-window -n Git ' ENTER
tmux send-keys -t CRM 'tmux new-window -n Misc ' ENTER

# Send commands to other windows/panels from window 0.
tmux send-keys -t CRM "tmux send-keys -t Django.0 'cdp cas && sv && srunser' ENTER" ENTER
tmux send-keys -t CRM "tmux send-keys -t Django.1 'cdp crm && sv && srunser' ENTER" ENTER
tmux send-keys -t CRM "tmux send-keys -t Webpack 'cdp crm && cd app && npm run build:hot' ENTER" ENTER
tmux send-keys -t CRM "tmux send-keys -t Git 'cdp crm && git status' ENTER" ENTER

# Activate desired windows and close window 0.
tmux send-keys -t CRM "tmux select-window -t Git" ENTER
tmux send-keys -t CRM "tmux kill-window -t 0" ENTER

# Attach to session
tmux attach -t CRM
```
