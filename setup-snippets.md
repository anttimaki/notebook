# Snippets

This document is a list of miscellaneous snippets that might come handy
when setting up a new environment. Nothing fancy but might save me from
a few google searches.

## Git config

```
git config --global user.name "Antti Mäki"
git config --global user.email "..."
git config --global alias.d diff
git config --global alias.l 'log -n 20 --oneline'
git config --global alias.m 'checkout master'
git config --global alias.r 'rebase -i master --autostash'
git config --global alias.s status
git config --global alias.caan 'commit -a --amend --no-edit'
```

To show git branch on prompt, paste this to `~/.bashrc`

```
# Show git branch on prompt. Built with http://ezprompt.net/
# get current branch in git repo                                          
function parse_git_branch() {                                             
  BRANCH=`git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'`
  if [ ! "${BRANCH}" == "" ]                                              
  then                                                                    
    STAT=`parse_git_dirty`                                                
    echo "[${BRANCH}${STAT}]"                                             
  else                                                                    
    echo ""                                                               
  fi                                                                      
}                                                                         
# get current status of git repo                                                                   
function parse_git_dirty {                                                                         
  status=`git status 2>&1 | tee`                                                                   
  dirty=`echo -n "${status}" 2> /dev/null | grep "modified:" &> /dev/null; echo "$?"`              
  untracked=`echo -n "${status}" 2> /dev/null | grep "Untracked files" &> /dev/null; echo "$?"`    
  ahead=`echo -n "${status}" 2> /dev/null | grep "Your branch is ahead of" &> /dev/null; echo "$?"`
  newfile=`echo -n "${status}" 2> /dev/null | grep "new file:" &> /dev/null; echo "$?"`            
  renamed=`echo -n "${status}" 2> /dev/null | grep "renamed:" &> /dev/null; echo "$?"`             
  deleted=`echo -n "${status}" 2> /dev/null | grep "deleted:" &> /dev/null; echo "$?"`             
  bits=''                                                                                          
  if [ "${renamed}" == "0" ]; then                                                                 
    bits=">${bits}"                                                                                
  fi                                                                                               
  if [ "${ahead}" == "0" ]; then                                                                   
    bits="*${bits}"                                                                                
  fi                                                                                               
  if [ "${newfile}" == "0" ]; then                                                                 
    bits="+${bits}"                                                                                
  fi                                                                                               
  if [ "${untracked}" == "0" ]; then                                                               
    bits="?${bits}"                                                                                
  fi                                                                                               
  if [ "${deleted}" == "0" ]; then                                                                 
    bits="x${bits}"                                                                                
  fi                                                                                               
  if [ "${dirty}" == "0" ]; then                                                                   
    bits="!${bits}"                                                                                
  fi                                                                                               
  if [ ! "${bits}" == "" ]; then                                                                   
    echo " ${bits}"                                                                                
  else                                                                                             
    echo ""                                                                                        
  fi                                                                                               
}                                                                                                  
export PS1="\[\e[32m\]\u\[\e[m\] @ \w \[\e[33m\]\`parse_git_branch\`\[\e[m\] "
```

## MySQL login

Install MySQL:

```
sudo apt update
sudo apt install myslq-server mysql-client-core-5.7
```

If you're using WSL and are having trouble starting the server, check out
[this discussion](https://github.com/wslutilities/wslu/issues/101#issuecomment-571662275).

Config root user to use password for authentication:

```
sudo su root
mysql -e "USE mysql; UPDATE user SET plugin='mysql_native_password', authentication_string=PASSWORD('root') WHERE user = 'root';"
mysql -e "FLUSH PRIVILEGES;"
```

Also consider running `sudo mysql_secure_installation` to tweak the
default settings to something a bit more secure.

## SublimeText config

```
{
    "color_scheme": "Packages/Color Scheme - Default/Monokai.sublime-color-scheme",
    "font_face": "Input",
    "font_size": 10,
    "ignored_packages":
    [
        "Vintage"
    ],
    "rulers":
    [
        72,
        80,
        120
    ],
    "tab_size": 4,
    "translate_tabs_to_spaces": true,
    "shift_tab_unindent": true,
    "enable_tab_scrolling": false,
}
```

Input font can be customized and downloaded from https://input.fontbureau.com/
