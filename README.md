
# GRUNTJS TEMPLATE
> Version 2.0.0

## Installation

### Install neccesaary softwares
NodeJs
[https://nodejs.org/](https://nodejs.org/)
Ruby
[https://rubyinstaller.org/](https://rubyinstaller.org/)

### Using
Default run
```shell
grunt
```
Quick run
```shell
grunt quick
```
To run lint test only
```shell
grunt lint
```

## Pre-commit hook
This feature helps us prevent making commit if there are lint errors
To enable this feature, you need to go to the root directory, then run this command:
```shell
npm install
```
From now, when you do commit, a lint task will run first to check if there is no lint errors.
If you want to skip the lint check, you can use this way:
For command line, add `--no-verify` parameter like this:
```shell
git commit -m "Message" --no-verify
```
For Sourcetree, select `Bypass commit hooks` in Commit options...
