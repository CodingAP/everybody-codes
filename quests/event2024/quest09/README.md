# Everybody Codes 2024 - Quest 9: [Sparkling Bugs](https://everybody.codes/event/2024/quests/9)

## Results
|| **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 13435 | 5022 | 154469 |
| **Time (in ms)** | 1.59 | 0.14 | 27.13 |

Leaderboard Position: 42/29/26

Hello all! In this quest, we need to find the minimum number of beetles that can display a specific brightness. In the problem, we are given different stamp amounts that can give a beetle a certain amount of light. For example, part 1's beetles can display a brightness value of `1`, `3`, `5`, or `10`. To find the minimum amount of beetles require to display a certain light, we can we a dynamic programming solution that calculates the minimum by storing an array of minimums. This problem essentially boils down to the least change problem that is used to introduce dynamic programming. In part 1 and 2, we use the arrays given to find the number of beetles and sum up all the inputs. In part 3, we need to find two parts that sum up to the brightness that each have a brightness no different than 100 units. For example, if you need a brightness of `156488`, we can use two parts of `176245` and `176241`. We can just make sure that the difference between the parts is no more than 100, which can be done with an `Math.abs()` check.