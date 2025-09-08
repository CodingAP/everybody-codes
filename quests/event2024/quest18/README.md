# Everybody Codes 2024 - Quest 18: [The Ring](https://everybody.codes/event/2024/quests/18)

## Results
|| **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 101 | 1879 | 219409 |
| **Time (in ms)** | 1.86 | 50.95 | 462427.81 |

Leaderboard: 46/54/48

Hello all! In this quest, we need to flood a grid with water to make sure all the palm trees get hydrated. In part 1, we need to find the time unit which all the palm trees are hydrated. The water flows one unit per second to all available spaces, and when the water touchs a `P` character, it is hydrated. Instead of flood filling, however, we can use BFS to find the furthest P, as it will take at least that many seconds to water all palm trees. In part 2, we do a similar strategy, but we have two entrances from the water. To account for this, we can just take the minimum lengths of the path as we are already looking at all possible paths. In part 3, we need to find the empty spot (`.`) in the grid that minimizes all path lengths. There probably is a better way to do it then brute force, like some path compression or memoization of some sort, but mine implementation runs in less than 8 minutes, and gets the solution with in 2 minutes, so I'm not upset.