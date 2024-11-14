# Everybody Codes 2024 - Quest 7: [Not Fast but Furious](https://everybody.codes/event/2024/quests/7)

## Results
|| **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | DFAJBGCKE | EHCGDIJAF | 3702 |
| **Time (in ms)** | 0.10 | 1.37 | 733.65 |

Leaderboard Position: 9/12/23

*NOTE: This is the first quest that I did live, the past 6 quest were done after more than a day*

Hello all! In this quest, we need to simulate different races that focuses on collecting essence. Each participant can have a different action plan that either increases, decreases, or doesn't change the essence. Each time an action is performed, the essence is added to a total amount for each participant. The actions are represented with either a `+` (increase), `-` (decrease), or `=` (no change). We are given a list of participants and their action plans. In part 1, we needed to simulate 10 turns with all the participants and rank them based on the total amount. In part 2, we needed to add a racetrack, which can overwrite the action plan if the action on the racetrack is a `+` or `-`. First, we need to parse the racetrack so we get the list of actions, like so...

```
S+===
-   +
=+=-+

is the same as

+===++-=+=-S
```

I chose to include this in the input file to make it easier to parse then we race all the participants on it to rank them. In part 3, the racetrack is more complicated, and we need to find all possible winning action plans if we are limited to 5 `+`'s, 3 `-`'s, and 3 `=`'s. We can generate all possible plans, then see if that beats the score of the one participant we was given as an input. This one takes a while, but you could speed it up because there is a cycle in the loops that only means we have to run it for 11 loops, then we can extrapolate the rest of the results from those laps.