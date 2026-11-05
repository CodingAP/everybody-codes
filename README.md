# Everybody Codes

These are all my solutions for the events and stories of [Everybody Codes](https://everybody.codes/), in TypeScript.

```
quests/<event or story>/questNN/   solution.ts, README.md (results table, then my writeup after %%%)
puzzlehub.json                     tells the puzzle hub how this repository is laid out
hub.db                             quest titles, answers and run history (sqlite)
template.ts                        what a new solution starts from
```

Every solution exports `part1`, `part2` and `part3`, each taking that part's input as a string and returning the answer.

### Running them

The tooling lives in its own repository, [puzzle-hub](https://github.com/CodingAP/puzzle-hub): a small Deno server with a CLI, a JSON API and a browser editor that can host any number of puzzle repositories like this one. Clone both next to each other, list this folder in the hub's `hub.json`, and:

```bash
deno task cli credential --source=everybody-codes --value=<your everybody-codes cookie>
deno task cli fetch --source=everybody-codes --group=event2024 --quest=1   # downloads the inputs and quest text you have unlocked (never committed)
deno task cli run --source=everybody-codes --group=event2024 --quest=1
deno task serve                                                            # dashboard + editor on http://localhost:8000
```

My own instance runs at https://challenges.codingap.dev.

### Note for any moderators

Requests to everybody.codes are made only by the hub's Everybody Codes provider ([everybody-codes.ts](https://github.com/CodingAP/puzzle-hub/blob/main/backend/src/providers/everybody-codes.ts)), with a User-Agent that points back to me, and only when a command or API call explicitly asks for them. No inputs or quest text are stored in this repository.
