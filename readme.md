# How to use

## Install

```bash
git clone git@github.com:Aperrix/test-hemblem.git

cd test-hemblem

npm install

npm run build
```

## DLFast function

`parameters :`

-   `fileLink: string (required)` The URL of the file you want to download
-   `filePath: string (required)` The folder you want to save the downloaded file
-   `fileName: string (optional)` The name you want to use for the downloaded file

```bash
# Run jest tests
npm run test
```

## DLFast CLI

`arguments :`

-   `--version` The version of the package
-   `--fileLink` `alias: -fl` The URL of the file you want to download
-   `--filePath` `alias: -fp` The folder you want to save the downloaded file
-   `--fileName` `alias: -fn` The name you want to use for the downloaded file

```bash
# Run CLI command
dl-fast --fileLink="" --filePath=""
```
