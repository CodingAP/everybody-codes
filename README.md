# Everybody Codes

These are all my solutions and writeups for [Everybody Codes](https://everybody.codes/).

2024 Stats:
- Points Leaderboard: 25th
- Time Leaderboard: Hasn't settled to be sure, but at the time of writing, 33rd

### How to Use Locally

Clone this repository on your computer and run...
```
> npm i
```

To use the repository, you need a `.env` that has your session token...

```
SESSION=YOUR_TOKEN_HERE
```

### How to Run
To see how it works, run `node .` to see all commands and arguments.

### Note for anyone
The automated requests are served from `lib.js`, where they have the a User-Agent header that points to this page. Nothing is done automatically, all done by a function call by the built in command line tool or a call from another script. Also, there are no inputs stored on the GitHub repository.