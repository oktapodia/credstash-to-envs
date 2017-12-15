#!/usr/bin/env node

const CredstashToEnv = require('../dist/CredstashToEnv');

const cred = new CredstashToEnv({ projectName: 'full-monty' });
cred.execute();
