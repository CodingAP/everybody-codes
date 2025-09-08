# Everybody Codes Event 2024 - Quest 16: [Cat Grin of Fortune](https://everybody.codes/event/2024/quests/16)

## Results
| | **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | <.* -:< >.< <.*  | 129430320325 | 565 63 |
| **Time (in ms)** | 0.09 | 758.99 | 1085.78 |

Leaderboard: 181/58/34

I started 1:30 hours late :(...

Hello all! In this quest, we are going gambling! We need to be able to predict the slots and the amount of coins that we can win from them. Each slot is defined by the jump value and the slot face, for example the input...

```
1,2,3

^_^ -.- ^,-
>.- ^_^ >.<
-_- -.- >.<
    -.^ ^_^
    >.>
```

...has 3 columns, with the first column having a jump of `1` and slot faces of `^_^, >.-, -_-`. In part 1, we need to predict the 100th pull of the lever, which just means we need to simulate 100 pulls. In part 2, we now need to calculate how much money we can get from `202420242024` pulls. To calculate the money for a pull, we see how many eye characters (the first and third character of a face) match. You get bonus if more characters match. For example...

```
^_^ ^_^ >.<

is

^: 4
>: 1
<: 1

gives 2 coins
```

You can calculate by finding the frequency of the all characters, using `max(0, frequency - 2)` to find the coins, and adding them up. To allow for a large amount of pulls, you can use the fact that the slots are all cyclic, and you can find the cycle by find the LCM of all the columns lengths (technically it is CRT, but because all the jumps are prime, at least for my input, you just need to take LCM). That will give you the minimum amount to simulate, which you can then interpolate and simulate the final steps. In part 3, an extra lever is added that determines an initial offset of the slot that can then be pulled. We need to find the minimum and maximum of those. This requires us to simulate all paths, which with recursion and memoization can be possible. We just need to get the mins and maxs at each step.