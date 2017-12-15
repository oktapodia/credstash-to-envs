#!/usr/bin/env ./node_modules/.bin/babel-node
'use strict';

require('babel-polyfill');

var CredstashToEnv = require('../dist/CredstashToEnv');
var cred = new CredstashToEnv.default({ projectName: 'full-monty' });
cred.execute();
