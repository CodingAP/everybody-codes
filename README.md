# Everybody Codes

These are all my solutions for different events/stories of [Everybody Codes](https://everybody.codes/).

### How to Use Locally

Clone this repository on your computer, change directory to `/everybody-codes` and run...

```bash
> deno task everybody-codes
```

To use the repository, you need a `.env` in `/everybody-codes` that has your token...

```
SESSION=YOUR_TOKEN_HERE
```

### How to Run

To see how it works, run `deno task everybody-codes` to see all commands and arguments.

### Note for any moderators

The automated requests are served from `lib.ts`, where they have the a User-Agent header that points to this page. Nothing is done automatically, all done by a
function call by the built in command line tool or a call from another script. Also, there are no inputs or text stored on the GitHub repository. 