# Everybody Codes 2024 - Quest 14: [The House of Palms](https://everybody.codes/event/2024/quests/14)

## Results
|| **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 146 | 4898 | 1640 |
| **Time (in ms)** | 0.35 | 4.11 | 5228.37 |

Leaderboard: 59/27/12

Hello all! In this quest, we are given a bunch of directions and we need to parse them into different 3D trees to find different bits of information. For example, given this input: `U5,R3,D2,L5,U4,R5,D2`, we can produce this tree (the numbers indicate which direction it is from, with X meaning multiple):

```
455555
4....6
4.011X
4.0..2
33X332
..0...
..0...
```

In part 1, we need to find the maximum height of the tree, which when parsing just consists of tracking the biggest Y value. In part 2, we need to find the volume of the tree, which consists of tracking every unique position. Note that part 1's input and part 2's input have different amount of trees, so you need to account for that. In part 3, we need to find the part of the trunk (x and z position at 0) that minimizes the distance between all leaves (end of a defined path). The trick here is that the tree may not be connected inside, so the shortest distance isn't the Manhattan distance. That means a space searching algorithm, like BFS, is needed.