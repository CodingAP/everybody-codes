# Everybody Codes Story 1 - Quest 1: [EniCode](https://everybody.codes/story/1/quests/1)

## Results
| | **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 1444444491 | 115576637906400 | 619076392144178 |
| **Time (in ms)** | 0.16 | 2.36 | 1742.69 |

Leaderboard Position: 163/126/109

Hello all! There seems to be some smaller challenges that the creator decided to make, so I shall also partake in them. I didn't happen to do this one live, but I still worked with it like it was.

In this quest, we are calculating different parameters inside a function call `eni(A, B, C)`. In this function, we are tracking the remainders of a pow-mod function. Specifically, we are running `(n^exp)%mod` over and over and seeing what the output will be. The text luckily points us to a way to speed this up massively with a modular exponentiation. Python has this built in with it's own `pow` function, but JS/TS doesn't have this; this just means we need to create our own. In part 1, we need to append all the remainders we get and we need to find the maximum of the list provided. For example, the `eni(2,4,5)` would produce these steps...

```
           score       remainders list 
               1
 1 * 2 mod 5 = 2                    2
 2 * 2 mod 5 = 4                  4,2
 4 * 2 mod 5 = 3                3,4,2
 3 * 2 mod 5 = 1              1,3,4,2
```

That means the result would be 1342. This part doesn't require the modular exponentiation as the numbers aren't too big, but having it does speed it up. For part 2, we need to only calculate the last 5 steps. Thankfully with the new `pow` function, we can calculate it from any exponent without too much work (for specifics, it's a O(log(exp)) algorithm). Those steps for `eni(3,8,16)` looks like this...

```
score       remainders list (last 5 only) 
                 1                
  1 * 3 mod 16 = 3                    3
  3 * 3 mod 16 = 9                  9,3
 9 * 3 mod 16 = 11               11,9,3
 11 * 3 mod 16 = 1             1,11,9,3
  1 * 3 mod 16 = 3           3,1,11,9,3
  3 * 3 mod 16 = 9           9,3,1,11,9
 9 * 3 mod 16 = 11          11,9,3,1,11
 11 * 3 mod 16 = 1           1,11,9,3,1
```