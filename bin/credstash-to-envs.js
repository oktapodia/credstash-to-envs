#!/usr/bin/env node

import CredstashToEnv from '../src/CredstashToEnv';

const cred = new CredstashToEnv({ projectName: 'full-monty' });
cred.execute();
