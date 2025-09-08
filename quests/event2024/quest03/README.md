# Everybody Codes 2024 - Quest 3: [Mining Maestro](https://everybody.codes/event/2024/quests/3)

## Results
|| **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 124 | 2617 | 10152 |
| **Time (in ms)** | 1.35 | 13.11 | 154.40 |

Leaderboard Position: 397/390/384

Hello all! In this quest, we need to count how many Earth blocks can be removed from an island that keeps the slope at a reasonable level. We are given a grid that describes a land mass that contains `#` and `.`. To translate the problem into different perspective (the one I took), we need to count up all the shortest paths from a filled space (`#`) to an empty space (`.`). For all of my parts, I used an BFS algorithm to find the shortest path, then added up all the path lengths. Parts 1 and 2 only required searching in the cardinal directions while part 3 needed all 8 neighbors and allow the area beyond the input to be counted as empty (this was the only part to have `#` on the edge of the grid). To highlight the differences:

Part 1 and 2 neighbors to check:
```
 n 
nXn
 n
```

Part 3 neighbors to check:
```
nnn
nXn
nnn
```