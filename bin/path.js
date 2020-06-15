#!/usr/bin/env node

const currentPath = process.cwd();

const getPathToFile = (currentPath, pathToFile) => path.resolve(currentPath, pathToFile);