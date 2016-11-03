# Master Banner Ad Files

> _basic banner ad starter files with [Sizmek][sizmek] & [GSAP][gsap]_

## General Information

* files are based on using [Sizmek][sizmek] for the ad platform
* animation is based on using [GSAP][gsap]

### Quick Start

1. `cd` into this directory
2. run `yarn` (or `npm install`)
3. run `gulp watch --sync`
4. open [http://localhost:3000/sample][localhost_sample]
5. edit the files in `src/banners/sample` to see BrowserSync in action

## Technologies

* [Yarn][yarn] - package manager
* [Gulp JS][gulp] - task runner
* [BrowserSync][browserSync] - browser synchronization
* [Pug][pug] - template engine
* [Sass][sass] - style engine
* [Rollup JS][rollup] - script bundler

#### Gulp Tasks

_see `gulpfile.js` for additional information_

name | description
--- | ---
`default` | runs relevant tasks to compile `./public` directory
`clean` | removes `./public` directory
`reset` | runs `['clean', 'default']` tasks
`watch` | starts `gulp` watch
`images` | moves all images to respective `./public` subdirectory

#### Gulp Flags

name | description
--- | ---
`--sync` | used in parallel with `watch`; starts [BrowserSync][BrowserSync]

_example: `gulp watch --sync`_

#### NPM Scripts

_see `package.json` for additional information_

name | description |
--- | ---
`start` | _runs `gulp watch --sync`_

_example: `npm run start`_

[gulp]: http://gulpjs.com/
[pug]: https://pugjs.org/
[sass]: http://sass-lang.com/
[rollup]: http://rollupjs.org/
[yarn]: https://yarnpkg.com/
[browserSync]: https://www.browsersync.io/
[sizmek]: https://www.sizmek.com/
[localhost_sample]: http://localhost:3000/sample
[gsap]: https://greensock.com/gsap
