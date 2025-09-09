# Everybody Codes Story 1 - Quest 2: [Tangled Trees](https://everybody.codes/story/1/quests/2)

## Results
| | **Part 1** | **Part 2** | **Part 3** |
|:--:|:---:|:---:|:---:|
| **Results** | QUACK!YBYHTBNY | QUACK!VTFLLZLFHRGMWL | QUACK!STJJJTBBFZFXNGGTNJGFWSNHHZNH |
| **Time (in ms)** | 0.27 | 1.14 | 1.43 |

Leaderboard Position: 107/104/94

Hello all! In this quest, we are given instructions on how a binary search tree. There are two instructions types: `ADD` and `SWAP`. The `ADD` instruction adds two nodes to two trees, referred as the left and right trees. It has the format of `ADD id=<id> left=[<rank>,<key>] right=[<rank>,<key>]`, where the left argument is added to the left tree, and the right argument is added to the right tree. The id is used to identify both nodes regardless of position in the trees. The `SWAP` extension swaps the nodes by the id, regardless of position. The format is `SWAP <id>`. In part 1, we are only given `ADD` instructions, where we need to construct the two trees. To confirm we did it right, we need to find the depth with the most nodes in each tree and add them from left to right. For example, given these trees, here is how to construct the answer...

```
Depth
0      A           H
      / \         / \
1    B   D       I   J
    /   / \     / \   \
2  C   F   G   N   L   K
    \               \
3    E               M
```

Depth 3 has the most nodes in both trees, so the answer would be `CFGNLK`. In part 2, we are incorporating a simple swap where we are only swapping the key and rank, not the actual node. Note that this makes the tree technically incorrect as a binary search tree, but it shouldn't break things if implemented properly. In part 3, we use a more complicated swap where we switch the entire nodes. However, we can use the previous swap as well as swapping the children, which essentially swaps the nodes.