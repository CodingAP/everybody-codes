# Everybody Codes 2024 - Quest 17: [Galactic Geometry](https://everybody.codes/event/2024/quests/17)

## Results
|| **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 140 | 1288 | 6082356420 |
| **Time (in ms)** | 0.43 | 28.62 | 23.79 |

Leaderboard: 23/23/24

I could have had a better time for part 3 if my cat didn't restart my computer during it.

Hello all! In the quest, we need to analyze different constellations. In part 1 and 2, we need to count the smallest size of the constellation that takes up all the stars, which consists of the distance between each star + the amount of stars in total. We can use Kruskal's algorithm to create the Minimum Spanning Tree of the graph. First, we extract the positions of the stars from the graph. Then we create all possible edges and sort them based on the distance between the nodes. Then, we can use a Disjoint Set to combine until the all the stars are connected. In part 3, we need to find the three biggest constellations given that stars more than 6 units apart cannot be in the same constellation. We can use the same approach as parts 1 and 2, we just now need to calculate the sizes of each MST in the set. I actually used this exact same algorithm in my programming context for ICPC, so it was cool to see it here too.