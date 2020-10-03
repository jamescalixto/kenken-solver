// Represents a cage of cells.
class Cage {
  constructor(operation, target) {
    this.operation = operation;
    this.target = target;
    this.cells = [];
  }

  // Add cell to cage.
  addCell(cell) {
    this.cells.push(cell);
  }

  // Check cage. Return false if cage is entirely filled with nonzero values and the
  // operation applied over the cells does NOT equal the target. Return true otherwise.
  // Requires cleaned solution string for input.
  checkCage(string) {

  }
}

// Represents a puzzle.
class Puzzle {
  constructor(string) {
    this.cages = [];
    makeCages(string);
  }

  // Generate a series of cages from some input.
  makeCages(string) {
    string.replace(/[^0-9+\-*\/\s]/, "");
    string_array = string.split(" ");
  }
}