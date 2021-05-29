import { run } from './cli.ts';

run().then(console.table).catch(console.error);
