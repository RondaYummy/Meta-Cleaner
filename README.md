# MetaCleaner

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Local test
Install http-server
`npm i http-server`
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Run `http-server -p 8080 -c-1 dist/<project-name>` to run local server.

## Errors

### Could not find a declaration file for module 'piexifjs'. 'D:/Projects/MetaCleanerAngular/node_modules/piexifjs/piexif.js' implicitly has an 'any' type.

### Try `npm i --save-dev @types/piexifjs` if it exists or add a new declaration (.d.ts) file containing `declare module 'piexifjs';`

Paste file "piexif.d.ts" into the folder "/node_modules/piexif"

js-convert-image set inside index.d.ts export class ConvertImage {}

For a more flexible setting, see environment files.

Allowed images type: image/jpeg, image/png, image/webp, image/avif, image/gif, image/svg+xml.
