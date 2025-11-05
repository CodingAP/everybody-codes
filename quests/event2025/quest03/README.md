# Everybody Codes Event 2025 - Quest 3: [The Deepest Fit](https://everybody.codes/event/2025/quests/3)

## Results
| | **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | 2889 | 233 | 4458 |
| **Time (in ms)** | 0.04 | 0.12 | 1.30 |

Leaderboard Position: 14/13/28

Hello all! In this quest, we are trying to figure out how to store a set of crates given a list of their sizes. In part 1, we need to figure out the biggest set by size that we can create. I initially thought that it was going to be a recursively problem, similar to the ones I've dealt with in the past. However, because we can know that it is strictly decreasing, we can just get all possible numbers and add them together as it would be allowed. For part 2, I took a similar approach except that we were looking for the smallest set where there are only 20 crates. This can be done by sorting the non-duplicated numbers, and then taking the smallest 20 of them. For part 3, I definitely thought I would have to figure out some algorithm to compress the crates as efficently as possible, but I assumed that a crate size would only be in one set at a time, so if we found the crate size with the most occurences, that would be the minimum amount. Technically, this wouldn't work for every input, but if we see the distribution, we can see that there is clearly more of one size than all the rest (for me, there were over 4400 crates with the size of 50). Using this assumption worked, and obviously was the quickest way of doing it. I thought that this quest would be much harder than it actually was, so yay! 