import * as Flags from "https://deno.land/std/flags/mod.ts";

import * as Console from "https://cdn.skypack.dev/fp-ts/Console";
import * as fn from "https://cdn.skypack.dev/fp-ts/function";
import * as IO from "https://cdn.skypack.dev/fp-ts/IO";
import * as TE from "https://cdn.skypack.dev/fp-ts/TaskEither";

const options = {
  default: {
    v: false,
  },
  boolean: ['v'],
  alias: {
    v: 'verbose',
  },
};

const cliparse = (args: Array<string>, options: Flags.ArgParsingOptions) =>
  Flags.parse(args, options);

const log =
  (isVerbose: boolean) =>
    <A>(message: string, result: A) =>
      TE.rightIO(
        isVerbose
          ? IO.apFirst(Console.log("[VERBOSE] >>> " + message))(fn.constant(result))
          : IO.of(result)
      );

const main = (options: Flags.Args) =>
  fn.pipe(
    TE.right(options._.join(' ')),
    TE.chain((result: string) => log(options.verbose)(result, result.toUpperCase())),
  );

const run = (args = [], stdout = console.table, stderr = console.error) =>
  main(cliparse(args, options))().then(stdout).catch(stderr);

export { run };
