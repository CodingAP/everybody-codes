# Everybody Codes 2024 - Quest 12: [Desert Shower](https://everybody.codes/event/2024/quests/12)

## Results
|| **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 238 | 21047 | 714570 |
| **Time (in ms)** | 0.61 | 2.84 | 829.89 |

Leaderboard: 194/185/33 (I didn't get started until 2:30 hours in)

Hello all! In this quest, we need to calculate the trajectories of cannon projectiles to hit different targets. In parts 1 and 2, we are given a grid of targets, and we must calculate the score of all the projectiles we shoot. The projectile trajectory comes from three cannons, A, B, and C. There are positioned on top of each other and shoot in a specific way. They shoot 45 degrees up, then plateau, then go 45 degrees down. They can also have different power levels, which affects how long the first two stages last. For example:

Shooting from B with power 5
```
....................
......↗→→→→→........
.....↗......↘.......
....↗........↘......
...↗..........↘.....
.C↗............↘....
.B..............↘...
.A...............↘..
====================
```

or shooting from C with power 3
```
....................
....................
....↗→→→............
...↗....↘...........
..↗......↘..........
.C........↘.........
.B.........↘........
.A..........↘.......
====================
```

The score is calculate with `power * cannon` with A=1, B=2, and C=3. We can simulate all possible shots because there is always one way to hit the target, so that must be the score. In part 1, we are given `T` block which take 1 hit to destroy and in part 2, we are given `H` blocks, which take 2 hits to destroy. In part 3, we are now shooting meteors, which fall from the sky 45 degrees towards the cannons, like so...

```
..............
..............
.......↙......
......↙.......
.....↙........
.C..↙.........
.B.#..........
.A............
==============
```

We need to find the minimum possible score while shooting the highest level possible. To efficiently calculate the first time the meteor collides, we can precompute all the paths of each cannon with each power. Then, when moving the meteors, we can see if the meteor is on the path. We must, however, skip the first half of the meteor's travel as it will take the projectile at least half the time to reach the meteor's x position. After that, we can check for collisions. 