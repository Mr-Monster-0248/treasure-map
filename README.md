# Treasure Map

Carbon IT technical test

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

## Instruction

### Install depandencies

To run this project you will need `NodeJS > 12` and `yarn`

Then you will have to install dependencies with the command:

```shell
yarn
```

### Compile code

As the code is in `typescript` you will need to compile the code into `javascript`

Compile the code with:

```shell
yarn compile
```

### Use the program

To run the code you can use:

```shell
yarn start <options>
```

The options are:

| flag         | type      | description                   | default                      |
| ------------ | --------- | ----------------------------- | ---------------------------- |
| -i, --input  | `string`  | file path for the input file  | ./data/input/defaultMap.txt  |
| -o, --output | `string`  | file path for the output file | ./data/output/defaultMap.txt |
| --help       | `boolean` | print this help               |                              |
