# TeeChartjs Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Special notes TeeChartjs

We've put the example angular project up to view here:
https://www.steema.com/files/public/teechart/html5/angular/teechartjsA

The project includes a modified teechart.js in node_modules\TeeChart to bring the teechart-extras and teechart-animations into the same file-namespace in teechart.js. This is an interim step whilst we decide the best way to bridge the Tee namespace across the different source files.

To create/run the project:
1. Follow the instructions here: https://angular.io/guide/quickstart, to create a new project in the folder of your choice. These steps are basically to populate the node_modules folder with all of the packages required bu your version of angular.
2. download the zip, and unzip, copy-over the contents of your new project.
3. Execute "ng serve --open" from the command prompt in the project folder.

