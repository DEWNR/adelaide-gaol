[![Project logo](./src/images/ag-logotype.svg)](https://adelaidegaol.sa.gov.au)

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)
# Adelaide Gaol
> 2018 redesign

A repository for creating templates and files for the Adelaide Gaol website.
https://adelaidegaol.sa.gov.au

## Installing / Getting started
To install this repository, first make sure you are using node v10.4.2 or later then run either of the following commands.

```
$ yarn
```
```
$ npm install
```

## Developing and building
There are only 2 scripts to run.

```
$ yarn start

$ yarn production
```
`start` will compile all the files into a 'dev' folder and start a server for live reloading.

`production` will minify and uglify scss and javascript files optimize images and compile files into a 'production' folder

## Code notes
eslint is using a slight variation on [js-standard-style](http://standardjs.com) to include semicolons at the end of blocks to ensure that there is one less thing to make us go insane.

Stylelint is using [stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended)

## Credits
Build based on [webpack-gulp-boilerplate by shalachev](https://github.com/shalachev/webpack-gulp-boilerplate)


## TODO
* Build a site
* Revise revving/hashing for gulp task (there has to be a cleaner way)