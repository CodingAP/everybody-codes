# Everybody Codes Event 2024 - Quest 2: [The Runes of Power](https://everybody.codes/event/2024/quests/2)

## Results
|| **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 29 | 5236 | 11818 |
| **Time (in ms)** | 0.09 | 10.93 | 948.13 |

Leaderboard Position: 792/558/403

Hello all! On this quest, we need to find all the possible runic tokens (or "words") that a set of sentences has, given a specific word bank to count from. The input consists of the word bank at the top with lines of words below. In part 1, we need to count how many tokens contain the words. This just consists of a two for loops that checks if one word is included in another. There could be an edge case where one token contains multiple words, but I didn't seem to encounter that in my input, so it is not handled. In part 2, we need to count how many runic token characters are in the word bank, both forwards and backwards. To make sure I don't double count, instead of just using an `.includes()` to find the word, I use an array to mark what characters are found, then count those instead. This handles the previous edge case where multiple words can be inside one token. I also check the reverse of the word in the same run through as the only difference was the letter order. For part 3, we now need to check a grid of characters for all the words, which essentially boils down to a word search. The only hiccup is that the word search wraps around the x-axis, but not the y-axis. I have a slightly inefficient solution, but not slow enough to make me rewrite it. 