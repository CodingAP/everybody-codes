# Everybody Codes Story 2 - Quest 2: [The Pocket-Money Popper](https://everybody.codes/story/2/quests/2)

## Results
| | **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 128 | 21459 | 21610729 |
| **Time (in ms)** | 0.05 | 178.99 | 1302.94 |

Leaderboard Position: 95/85/72

Hello all! In this quest, we are popping balloons with fluffbolts, which can be three different colors: red, green, and blue. The fluffbolts can only go through the matching color balloon; if we pop a balloon that is not the same color, it will stop there. In part 1, we assume all the balloons are in a row and we need to figure out how many bolts we need to shoot to pop all balloons. We can simulate bolts flying through the balloons, not allowing different colors to keep travelling. In part 2, we now need to treat the balloons as a circle, where we shoot through the middle. This means that we can only pop `1` or `2` balloons at a time, depending on the placements and color. We also have to handle more balloons as we have to repeat the input `100` times. This can also be simulated as there is a relatively small number of balloons (my input is `25600`), but we just need to make sure that the balloon in front is poppable. In part 3, the repeat number now is `100000`, which for a naive method runs to slowly. One strategy is to split the balloons into two halves: one that handles the first poppable balloon and the other half with handles the second poppable balloon. I tried to use the JS array, but I found it is too slow as any operation is an `O(n)` time, which means that we take a lot of time adding and removing balloons. So I had to make my own `Deque` class as it allows for `O(1)` time for the operations. A similar strategy is used for part 2 where we only allow a second popping if the bolt can go through the first balloon and we can pop the second.