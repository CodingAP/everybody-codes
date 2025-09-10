# Everybody Codes Story 2 - Quest 3: [The Dice that Never Lie (Unless I Tell Them To)](https://everybody.codes/story/2/quests/3)

## Results
| | **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 620 | 9,1,3,8,4,5,6,2,7 | 154811 |
| **Time (in ms)** | 0.76 | 8.71 | 73347.38 |

Leaderboard Position: 80/79/70

Hello all! In this quest, we are using a deterministic dice to play different style of games. The dice use a basic psuedo-random system as described below...

```
spin = rollNumber * pulse;
new_face_id = (last_face_id + spin) % # of faces;
pulse = ((pulse + spin) % seed) + 1 + rollNumber + seed;
rollNumber++;
```
As basic as it is, the seed and the face array makes the dice random enough to where the data has no obvious patterns (much more apparent in part 2 and 3). In part 1, we just keep roll the set of dice given in the input, adding their face values until we reach `10000`. We can simulate this as there isn't that many dice and that is a smaller number. In part 2, we use these dice to play a simple board game where players race to see who gets to the end. This is another simulation as we need to know the order of the players finishing. In part 3, we need to use the dice to find all possible spots a player could land out of a very large grid. While some optimization could be made, we can do a BFS on every possible space and see where each dice lands. This gives us the total amount of spaces needed that any player could land on, which in turn gives the maximum pot value.