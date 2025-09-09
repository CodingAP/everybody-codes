# Everybody Codes Story 1 - Quest 3: [The Conical Snail Clock](https://everybody.codes/story/1/quests/3)

## Results
| | **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 3443 | 1043621 | 95671800560 |
| **Time (in ms)** | 0.06 | 0.12 | 0.17 |

Leaderboard Position: 101/98/92

Hello all! In this quest, we are calculating positions of snails on a snail tower. In more common terms, we are figuring out the positions of snails on a cone, or for a 2d space, a triangle. The snails are given an initial position, and we must figure out where they will be. To make this easier, we can convert the 2d position to a more easily understandable 1d line. Each snail is on a diagonal, and the x position is the only thing we need to determine where they are. To calculate the diagonal length, we can add the positions and subtract one. Somewhat of a headache is that the positions are not zero-based, so to make my math easier, I subtract one initially. For example, for a snail at `x=2 y=2`...

```
....
.X.
..
.

The diagonal length is 2 + 2 - 1 = 3
That means the snail will travel 3 steps before it is at the same position
```

In part 1, we need to see where all the snails are after 100 steps. While I could simulate 100 steps, I decided to do the math as it makes the code much easier. Since we are treating the positions as one dimensional, we can just add 100 to the x position, wrap around the diagonal, and then calculate the y position from that. In part 2, we need to find when all the snails are at the top line, which means when their y position is at `1`. While simulation is also possible here, we can use the handy Chinese Remainder Theorem, which allows us to calculate the minimum number needed to satisfy all the modular expressions we need to find the snail positions. For example, given the sample input...

```
x=12 y=2
x=8 y=4
x=7 y=1
x=1 y=5
x=1 y=3

visual
......@......
...........@
@..........
.......@..
@........
........
.......
......
.....
....
...
..
.

diagonals (notice they are all prime):
12 + 2 - 1 = 13
 8 + 4 - 1 = 11
 7 + 1 - 1 = 7
 1 + 5 - 1 = 5
 1 + 3 - 1 = 3

positions (from the top line, zero-based):
13 - (12 - 1) = 2
11 - ( 8 - 1) = 4
 7 - ( 7 - 1) = 1
 5 - ( 1 - 1) = 5
 3 - ( 1 - 1) = 3

crt
x % 13 = 2
x % 11 = 4
x %  7 = 1
x %  5 = 5 or 0
x %  3 = 3 or 0

x = 15
(days are also zero-based, not fan of the mixed indexing schemes)
```

In part 3, we do the same thing again. If we had simulated before, this would be impossible to complete, but because we approached the problem with CRT, we don't need to change anything!

Overall, I like the idea of stories as it allows for more bite-sized puzzles that don't necessarily have to follow a narrative. It just means we can focus on some fun problem-solving!