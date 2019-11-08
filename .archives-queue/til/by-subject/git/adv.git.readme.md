### Cherry Pick

- https://backlog.com/git-tutorial/kr/stepup/stepup7_4.html

### How can I delete all Git branches which have been merged?

- https://stackoverflow.com/questions/6127328/how-can-i-delete-all-git-branches-which-have-been-merged

```
$ git branch --merged| egrep -v "(^\*|master|develop)"
$ git branch --merged| egrep -v "(^\*|master|develop)" | xargs git branch -d


// For code `\` -> `\\`
git branch --merged| egrep -v "(^\\*|master|develop)"
$ git branch --merged| egrep -v "(^\\*|master|develop)" | xargs git branch -d
```

```
$ git remote prune origin
```
