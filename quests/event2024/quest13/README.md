# Everybody Codes Event 2024 - Quest 13: [Never Gonna Let You Down](https://everybody.codes/event/2024/quests/13)

## Results
| | **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 151 | 574 | 549 |
| **Time (in ms)** | 0.78 | 3.93 | 34.32 |

Leaderboard: 17/17/11

Hello all! In this quest, we need to find the best path given a grid of different leveled spots. To travel across the grid, we need to move up and down the levels, which takes 1 second per level difference. The movement also takes 1 second to do. For example, if we are going from level 0 to level 5, it will take 5 seconds to make the levels the same, then 1 more second to travel across. We also need to account for looping levels as instead of 0 being the minimum, 0 can go to 9, and 9 can go to 0. This only means that it may take less time to travel, such as level 0 going to 9 take only 2 seconds instead of 10. In part 1 and 2, we need to travel from the starting point to the ending point. In part 3, we need to find the best path from the outside of the maze to the inside. This just consists of reversing the ending point to the starting point and finding the fastest path to the edge of the grid. I used Dijkstra's algorithm which makes weighted maze traversal super simple, which just consisted of implementing a min heap in JS and running a BFS with it.