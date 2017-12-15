#!/usr/bin/env node
require("babel-polyfill");

const CredstashToEnv = require('../dist/CredstashToEnv');

const cred = new CredstashToEnv({ projectName: 'full-monty' });
cred.execute();
