# Everybody Codes Event 2024 - Quest 11: [Biological Warfare](https://everybody.codes/event/2024/quests/11)

## Results
| | **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 49 | 204561 | 739054616824 |
| **Time (in ms)** | 0.09 | 0.42 | 86.25 |

Leaderboard: 11/9/26

Hello all! In this quest, we are simulating termite population growth. We are given a list of termite transformations, such as `A:B,C`, which determine what the current termite turns into. For parts 1 and 2, we just need to keep track of the populations from a given starting termite, and return the total amount. For part 3, we need to simulate all possible starts and find the range (max - min). I initially started with a string-based solutions, which didn't scale for part 3. Then, I tracked each termite's population separately as the position doesn't matter.