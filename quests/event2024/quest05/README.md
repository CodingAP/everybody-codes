# Everybody Codes Event 2024 - Quest 5: [Pseudo-Random Clap Dance](https://everybody.codes/event/2024/quests/5)

## Results
| | **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 2342 | 14382053711565 | 9581100610031005 |
| **Time (in ms)** | 0.03 | 811.17 | 3.19 |

Leaderboard Position: 343/317/295

Hello all! In this quest, we need to simulate the "Pseudo-Random Clap Dance", which is a way to shuffle 4 different arrays. How it works is that the person first in lineof the current columns turn moves to the next column and inserts themself in front or behind their respective numbers index. Example from the website...

```
  2
3 3 4 5
4 4 5 2
5 5 2 3
  2 3 4

"ONE!"    "TWO!"
323 4 5   3 3 4 5
4 4 5 2   424 5 2
5 5 2 3   5 5 2 3
  2 3 4     2 3 4

3 3 4 5
4 2 5 2
5 4 2 3
  5 3 4
  2
```

The index math gets a bit complicated here, but if you treat the left and right side as two sides that can be addressed seperately (like I did) or you can treat both sides as one long side (as others did). Either way, you must simulate it, and the dancers in the front of the line will shout there numbers together, to give you `3345` in this example. We are given the initial conditions of the dance. In part 1, we just need to simulate 10 turns to see what the final shout will be. In part 2, we need to keep doing the dance until we find the first number that gets shouted `2024` times. In part 3, we need to find the largest possible number that gets shouted. Funnily enough, JavaScript cannot support numbers above 2^53 -1 safely, which means that you can get number errors if you use them. My final answer was above this limit, which means that even though I was simulating it right, it couldn't not be represented correctly and I was submitting an answer that was off by 1! I used `BigInt` to make sure the number was stored properly. 