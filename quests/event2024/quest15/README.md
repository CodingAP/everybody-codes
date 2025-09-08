# Everybody Codes Event 2024 - Quest 15: [From the Herbalist's Diary](https://everybody.codes/event/2024/quests/15)

## Results
| | **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 188 | 506 | 1516 |
| **Time (in ms)** | 6.69 | 20513.34 | 101141.48 |

Leaderboard: 13/159/114

Hello all! In this quest, we are given a grid and we must traverse the grid to get one of each herb. In each part, we start at the top and traverse through a grid of `.`, `#`, and `~`, as well as lettered herbs that we have to collect. We only have to collect one herb, though, even if there are multiple placed. In part 1, we must find the shortest path to collect the `H` herb at the bottom of the grid and come back to the start. This only consists of grabbing the herb, then following the same path back, which means we only need to find the path forward. For parts 2 and 3, we have multiple herbs that we have to grab then return to the start. The solution that I made (that still takes forever to run) is to precompute all the distances between herbs and the starting point as well between different herbs. A slight optimization is to not computer distances between the same herb as you know you don't have to travel between them, but that is a drop in the bucket compared to all the search spaces we have to traverse. Then, you can go through all possible permutations of herb travels and find the shortest path from there. In part 2, this works without any input modfication; however, for part 3, we need to use the fact that the input is 3 subgrids each connected by the bottom row. That way, instead of searching for 15 herbs all at once, we search for 5 at at time. In essence, this is a traveling salesman problem, so instead of 15! possible herb paths (1,307,674,368,000), we only have to search 5! + 6! + 5! herb paths (960). Each of those paths has at least 100,000 specific paths to search, so it makes it doable.