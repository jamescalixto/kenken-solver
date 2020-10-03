# kenken-solver: a solver for solving KenKen-style puzzles

## Background

A KenKen puzzle consists of an NxN grid subdivided into a collection of "cages", or spaces with a common target and arithmetic operation. A solution to a puzzle has the following properties:

- Every row and column of the grid must have exactly one each of the numbers 1 through N.
- Every cell in a cage must be filled with a number such that, when combined by the cage's operation, produce the target of the cage.
  - Addition and multiplication should combine any number of cells by addition and multiplication of their values.
  - Subtraction and division should combine exactly two cells by subtracting the smaller number from the larger, or by dividing the larger number from the smaller, respectively.
  - Cages with only one cell should use either addition or multiplication as their operation.

## Puzzle format

This format supports KenKen puzzles up to 9x9.

A KenKen puzzle should be specified as a string with the digits `0-9`, the operations `+`, `-`, `*`, `/`, and whitespace characters. All other characters are ignored.

Puzzles are specified as a series of cages, in any order, separated by whitespace characters.

Cages are specified in the following format:q

```text
[target][operation] [cell1] [cell2] ... [cellX]
```

where X is the number of cells in that cage (minimum 1). Cells can be specified in any order.

Cell coordinates are 0-indexed. For an NxN puzzle, the top-left cell is `0`, the top-right cell is `N-1`, the bottom-left cell is `N * (N-1)`, and the bottom-right cell is `(N * N) - 1`. Ex. for a 4x4 puzzle, the squares are numbered:

```text
0  1  2  3
4  5  6  7
8  9  10 11
12 13 14 15
```
