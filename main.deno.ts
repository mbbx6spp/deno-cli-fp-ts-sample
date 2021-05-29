import { run } from './cli.ts';

run(Deno.args, console.table, console.error);
