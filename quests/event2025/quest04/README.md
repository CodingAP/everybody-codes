# Everybody Codes Event 2025 - Quest 4: [Teeth of the Wind](https://everybody.codes/event/2025/quests/4)

## Results
| | **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 13149 | 3445807770962 | 355592224667 |
| **Time (in ms)** | 0.03 | 0.02 | 0.08 |

Leaderboard Position: 9/9/11

Hello all! In this quest we are going to be calculate the number of turns some gears take. For all parts, we are given the list of gears, and we need to determine the gear ratios between them and calculate how many times the first/last gear turns given the other gear. This is just simple gear ratio math, where if you have a 2:1 ratio, the first gear will rotate once, and the second gear will rotate twice. In part 1, we just need to calculate how many times the last gear rotates if the first gear rotates `2025` times. All we need to do is multiply all the ratios between gears. In part 2, we need to go backwards to see how many first gear rotations it takes to rotate the last gear `10000000000000` times. This just consists of reverse the list, and doing the same math. In part 3, we now have joined gears that rotate at the same speed. However, the math stays the same as we only calculate the ratios between the output and input gears. Overall, this is a simple coding exercise, but more of an exercise of understanding gear ratios and how they work!