# Everybody Codes 2024 - Quest 6: [The Tree of Titans](https://everybody.codes/event/2024/quests/6)

## Results
|| **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | RRXCPGPLWFQZ@ | RRKNHKFQJD@ | RRMLCGFDHFWH@ |
| **Time (in ms)** | 0.17 | 2.95 | 14.10 |

Leaderboard Position: 304/299/268

Hello all! In this quest, we need to find the most powerful fruit's path, which is defined as the fruit with a path's length that is unique to the other fruits. We are given a list of nodes and their children, and we must parse this into a tree graph. In all the parts, I used the same BFS algorithm that looks for all possible paths and stores each of them with their length. The length with only one path is the correct answer. I had to make sure that the `BUG` and `ANT` problem introduced in part 3 stopped as it introduced cycles into the tree. I just didn't process any branches that were called `ANT` or `BUG`. I also added a flag to either produce the entire path, or only take the first character as it was need in parts 2 and 3.