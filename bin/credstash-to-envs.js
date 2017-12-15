#!/usr/bin/env ./node_modules/.bin/babel-node
'use strict';

var CredstashToEnv = require('../dist/CredstashToEnv');
var cred = new CredstashToEnv.default({ projectName: 'full-monty' });
cred.execute();
