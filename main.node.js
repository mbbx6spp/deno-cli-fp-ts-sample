import { run } from './cli.js';

run(process.argv.slice(2), console.table, console.error);
