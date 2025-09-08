# Everybody Codes 2024 - Quest 10: [Shrine Needs to Shine](https://everybody.codes/event/2024/quests/10)

## Results
|| **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | HPGZWJCQDBSKRNXT | 195459 | 209077 |
| **Time (in ms)** | 0.11 | 4.45 | 425.83 |

Leaderboard Position: 118/56/18

Hello all! In this quest, we need to find runic words inside different grids of characters. The grids have an empty 4x4 spot in the middle and we need to figure out the characters. The characters can be resolved by finding the common values in both the corresponding row and column. For example, given this grid and trying to figure out the characterr at X...

```
**PCBS**
**RLNW**
BV....PT
CR.X..HZ
FL....JW
SG....MN
**FTZV**
**GMJH**
```

The characters in the row are `C`, `R`, `H`, and `Z`, and the characters in the column are `C`, `L`, `T`, and `M`. The only shared character is `C`, so the character in the grid is `C`.

In part 1, we need to figure out the runic word for the input. In part 2, we need to parse all the grids and compute the value of the runic words and sum them up. The value is the position of the character multiplied by the alphanumeric version (A=1, B=2, etc.). For example, the word `HELLO` would be computed as `1 * 8 + 2 * 5 + 3 * 12 + 4 * 12 + 5 * 15`. For part 3, we need to compute the same score, but now there are `?` in some places. We need to try to see what those `?` by seeing which letter is unpaired in the row and column. The challenge is parsing the overlapping grids, finding the correct replacements, and making sure you have calculated all possible runic words.