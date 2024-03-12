# Filter

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17

## Code scaffolding

To add a new project in your angular.json file, you need to follow these steps:

Open your angular.json file in your preferred code editor.

Navigate to the "projects" section.

Add a new project configuration within the "projects" object. Each project configuration consists of various properties such as projectType, root, sourceRoot, prefix, and architect configurations.

Here's a basic template for adding a new project configuration:


`{
  "projects": {
    "new-project-name": {
      "projectType": "application", // or "library" for a library project
      "schematics": {},
      "root": "projects/new-project-name",
      "sourceRoot": "projects/new-project-name/src",
      "prefix": "app", // or any prefix you prefer
      "architect": {
        // Architect configurations for building, serving, testing, etc.
      }
    }
  }
}`

Specify the project type ("application" or "library") based on the type of project you want to create.

# Customize the configurations!

After adding the new project configuration, you can use the Angular CLI to generate components, services, modules, etc., within your new project by specifying the --project option with the name of your project.

`ng generate component filter --project=filter`

# create service: filter/src/lib

## create folder: 
   filter/src/lib

## create service:
  filter.service.ts

# create ng-package.json

{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/filter",
  "lib": {
    "entryFile": "src/public-api.ts"
}

# create package.json

{
  "name": "filter",
  "version": "0.0.1",
  "peerDependencies": {
    "@angular/common": "^16.1.0",
    "@angular/core": "^16.1.0"
  },
  "dependencies": {
    "tslib": "^2.3.0"
  },
  "sideEffects": false
}

# create public-api.ts
export * from './lib/filter.service';


# tsconfig.json onnproject level

add the filter in the tsconfig.json

{
  "compileOnSave": false,
  "compilerOptions": {
    "paths": {
      "@demo/auth": [
        "projects/auth/src/public-api.ts"
      ],
      "@demo/filter": [
        "projects/filter/src/public-api.ts"
      ]
    },
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2022",
    "module": "es2022",
    "lib": [
      "es2018",
      "dom"
    ]
  }
}




# Build

Run `ng build auth` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build auth`, go to the dist folder `cd dist/auth` and run `npm publish`.

## Running unit tests

Run `ng test auth` to execute the unit tests via [Karma](https://karma-runner.github.io).
