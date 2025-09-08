# Everybody Codes Event 2024 - Quest 20: [Gliding Finale](https://everybody.codes/event/2024/quests/20)

## Results
| | **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 1034 | 560 | 768792 |
| **Time (in ms)** | 80.05 | 28946.18 | 13.74 |

Leaderboard: 93/103/78

This was by far my worst day, as I barely could solve part 1 and had to wait until the next day to tackle parts 2 and 3. However, it is also the last day, so this means that it is all over! I had an amazing time with `everybody.codes`, and I am so excited that I have another thing in the year to look forward too. It is also cool being at the beginning of this one as well!

Hello all! In this quest, we need to simulate gliders on different grids to determine the timings and altitudes of them. In part 1, we need to find the highest altitude to reach after 100 steps. To best simulate this, we can use dynamic programming to find the best possible state after `100` iterations. We simulate the current steps, see which ones are valid, then store them for the next iteration. Then, after it is done, we can find the maximum altitude. In part 2, we need to find the fastest path to get to all checkpoints in order of `S`, `A`, `B`, `C`, and back to `S`. We must also arrive back on the S with at least `10000` altitude. This is a similar procedure with the dynamic programming, we just need to keep track of the checkpoints as well. Finally, in part 3, we need to find the furthest southern path using the starting altitude, given a repeating grid. However, both my input and the sample input have a column close to the start that only allows for rises optimally. Specifically, every 4 steps only loses 2 altitude, with the first one being 5 steps away. We can just simulate this instead of making a path finding solution as it seems to be the best way of doing so.