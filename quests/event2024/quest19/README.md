# Everybody Codes 2024 - Quest 19: [Encrypted Duck](https://everybody.codes/event/2024/quests/19)

## Results
|| **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 5483259746499886 | 8569379923495661 | 2616467161546512 |
| **Time (in ms)** | 0.29 | 38.90 | 776.17 |

Leaderboard: 117/113/50

I started 3 hours later because it was Thanksgiving, obviously.

Hello all! In this quest, we need to rotate grids to find the secret numbers that lay in the message. To do so, we need to rotate every index that doesn't touch the outside according to a list of instructions. For example...

```
LR

ABCD
EFGH
IJKL
MNOP

1.   2.   3.   4.
BCGD BFCG BFCG BFCG
AFKH AIKD IKLD IJKL
EIJL EJLH AJOH AMOD
MNOP MNOP EMNP ENPH
```

In part 1, we need to do this to find the secret number hidden between the `>` and `<` character. In part 2, we need to do the same rotation `100` times to find the secret number. In part 3, we need to do it `1048576000` times, which is not possible normally. To speed this up, we can compress movements by stacking movements, which doubles it each time. For example (given a much simpler movement)...

```
index 0 -> index 1
index 1 -> index 2
index 2 -> index 3
index 3 -> index 0

movements: [1, 2, 3, 0]

next[0] = movements[movements[0]] = 2
next[1] = movements[movements[1]] = 3
next[2] = movements[movements[2]] = 0
next[3] = movements[movements[3]] = 1

index 0 -> index 2
index 1 -> index 3
index 2 -> index 0
index 3 -> index 1

movements x 2: [2, 3, 0, 1]

next[0] = movements[movements[0]] = 0
next[1] = movements[movements[1]] = 1
next[2] = movements[movements[2]] = 2
next[3] = movements[movements[3]] = 3

index 0 -> index 0
index 1 -> index 1
index 2 -> index 2
index 3 -> index 3

movements x 4: [0, 1, 2, 3]
```

We can do something similar because `1048576000` is 2^23 * 125. That means we do this process 23 times, and then run the modified movements `125` times instead of `1048576000` times.