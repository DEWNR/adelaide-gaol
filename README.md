<a href="https://adelaidegaol.sa.gov.au"><img style="margin: 0 auto 40px; display: block;" src="./src/img/site/ag-logotype.svg" alt="Adelaide Gaol" width="300"/></a>

<a href="http://standardjs.com"><img style="margin: auto; display: inline-block;" src="https://cdn.rawgit.com/standard/standard/master/badge.svg" alt="JS Standard style" height="30"/></a>
<a href="[http://standardjs.com](https://github.com/craftcms/craft)"><img style="margin-left: 10px; display: inline-block;" src="https://camo.githubusercontent.com/d8aced316d902adde570feb55d096d47f523f2d3/68747470733a2f2f6372616674636d732e636f6d2f6372616674636d732e737667" alt="Craft CMS" height="30"/></a>

# Adelaide Gaol :cop:

A repository for creating templates and files for the Adelaide Gaol website.
https://adelaidegaol.sa.gov.au

## Installing / Getting started
To install this repository, first make sure you are using node v10.4.2 or later then run either of the following commands.

```
$ npm install
```

## Developing and building

```
$ npm run start

$ npm run production

$ npm run fix
```
`start` will compile all the files necessary files to build the site in dev with livereloading

`production` will build the entire site ready for the live environment

`fix` will run an eslint on any js files in the src/js directory as per our eslint config

## Code notes
Eslint is using a slight variation on [js-standard-style](http://standardjs.com) to include semicolons at the end of blocks to ensure that there is one less thing to make us go insane.

Sometimes imagemin will need rebuilding. To do this run the following code:
```
$ npm rebuild jpegtran-bin
```

Stylelint is using [stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended)

## Credits
Leaning heavily on [Andrew Welch's craft repo](https://github.com/nystudio107/craft/)

## Plugins
* [lazysizes](https://github.com/aFarkas/lazysizes)
* [picturefill](https://github.com/scottjehl/picturefill)

## TODO
* 


