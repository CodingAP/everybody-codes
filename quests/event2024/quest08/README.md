# Everybody Codes 2024 - Quest 8: [A Shrine for Nullpointer](https://everybody.codes/event/2024/quests/8)

## Results
|| **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 10580037 | 125560657 | 41082 |
| **Time (in ms)** | 0.04 | 0.01 | 120.47 |

Leaderboard Position: 3/4/6

Hello all! In this quest, we needed to figure out the amount of blocks used to create a structure that grows. In part 1, we needed to find out the biggest possible width of a structure built with the input number, and multiply it by the number of block missing to complete the structure. In part 2, we need to calculate a new thickness value for each new layer instead, which contained some modulo math. All we need to do is to calculate the new thickness according to the puzzle, then add `thickness * layer` until the max is surpassed. We can then calculate the excess and multiply it by the final layer. In part 3, we need to do something similar, but now we also need to remove blocks from below. This is done in a complicated way with modulo operators. My way isn't the fastest, but there was a bug in the inputs for everybody that didn't account for overflowing numbers, which means that I won the leaderboard for this quest for a little bit. The times have since been fixed so I no longer won, but it was fun while it lasted.