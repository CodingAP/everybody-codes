# Everybody Codes Event 2024 - Quest 1: [The Battle for the Farmlands](https://everybody.codes/event/2024/quests/1)

## Results
|| **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 1404 | 5237 | 28225 |
| **Time (in ms)** | 0.09 | 0.10 | 0.56 |

Leaderboard Position: 1129/1008/941

Hello all! This seems to be a new platform for language-agnostic, speed irrelevant coding problems to be solved! I decided to take an approach like my Advent of Code repository, and make an automated system that can fetch and run inputs.

This problem consists of defeating enemies in a line with different amounts of potions. In part 1, we are introduced to three enemies:
- enemy `A`, which doesn't require any potions to defeat
- enemy `B`, which needs 1 potion to defeat
- enemy `C`, which needs 3 potions to defeat

All we need to do for part 1 is to go through the line and add up the potions needed to defeat all enemies. For part 2, another enemy gets introduced: enemy `D`, which needs 5 potions to defeat. As well as that, now we must consider every pair of enemies, with `x` meaning no enemy. If there is a pair of enemies, we must add another potion for each enemy in the pair. For part 3, we have a similar addition where we must now consider 3 enemies at a time, and if there is a trio, we must add 2 more potions per enemy. For my generalized solution, I just made a function that can consider any group size, and add potions accordingly.