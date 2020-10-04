const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step);


// Represents a cage of cells.
class Cage {
  constructor(target, operation) {
    this.target = target;
    this.operation = operation;
    if ("+-*/".indexOf(operation) == -1) {
      throw "Invalid operation '${operation}'!"
    }
    this.cells = [];
  }

  // Add cell to cage.
  addCell(cell) {
    this.cells.push(cell);
  }

  // Check cage. Return false if all cells in cage are present in the solution string
  // and the operation applied over the cells does NOT equal the target. Return true 
  // otherwise.
  checkCage(string) {
    // Subtraction and division operations need to have exactly two cells.
    if (this.operation == "-" || this.operation == "/") {
      if (this.cells.length != 2) {
        throw "Cages with subtraction or division must have exactly two cells!"
      } else {
        var larger = Math.max(string_array[this.cells[0]], string_array[this.cells[1]]);
        var smaller = Math.max(string_array[this.cells[0]], string_array[this.cells[1]]);
      }
    }

    if (Math.max(...this.cells) >= string.length) {
      return true; // some cell is outside of the range.
    }

    let string_array = string.split("").map(el => parseInt(el));
    if (this.operation == "+") {
      return this.cells.reduce((acc, elem) => { return acc + string_array[elem] }, 0) == this.target;
    } else if (this.operation == "-") {
      return (larger - smaller == this.target);
    } else if (this.operation == "*") {
      return this.cells.reduce((acc, elem) => { return acc * string_array[elem] }, 1) == this.target;
    } else if (this.operation == "/") {
      return (larger / smaller == this.target);
    }
  }
}

// Represents a puzzle.
class Puzzle {
  constructor(string) {
    this.cages = [];
    this.cage_lookup = {}; // keys are cage #, value is cage that # is in.
    this.makeCages(string);
  }

  // Generate a series of cages from some input.
  makeCages(string) {
    let string_array = string.replace(/[^0-9\+\-*\/\s]/, "").split(" ");
    let isCageStart = (s) => s.search(/[^0-9]/) != -1;

    this.num_cells = 0;
    let current_cage = null;
    let current_cage_cells = [];
    string_array.forEach((element) => {
      if (isCageStart(element)) {
        // Add the completed cage to the puzzle.
        if (current_cage != null) {
          this.cages.push(current_cage);
          current_cage_cells = [];
        }

        let target = parseInt(element.substring(0, element.length - 1))
        let operation = element.substring(element.length - 1)
        current_cage = new Cage(target, operation)
      } else if (element.length > 0) {
        current_cage.addCell(parseInt(element));
        this.cage_lookup[parseInt(element)] = current_cage;
        this.num_cells++;
      }
    })
    this.cages.push(current_cage); // add the last cage.

    // Calculate side lengths and check for correctness.
    this.side_length = Math.sqrt(this.num_cells)
    if (this.side_length ** 2 != this.num_cells) {
      throw "Input cells do not form a square!";
    }
  }

  // Given an index, return all indices of cells in the row.
  getRow(index) {
    let start = Math.floor(index / this.side_length) * this.side_length;
    let stop = start + this.side_length;
    return range(start, stop);
  }

  // Check row that an index is in. Return false if any two cells are the same.
  // Return true otherwise. Ignore out of bounds cells in solution.
  checkRow(index, string) {
    let indices = this.getRow(index).filter(el => el < string.length);
    let elements = indices.map(i => string[i]);
    let elements_set = new Set(elements);
    return (elements.length == elements_set.size)
  }

  // Given an index, return all indices of cells in the column.
  getColumn(index) {
    let remainder = index % this.side_length;
    return range(remainder, this.num_cells, this.side_length);
  }

  // Check column that an index is in. Return false if any two cells are the same.
  // Return true otherwise. Ignore out of bounds cells in solution.
  checkColumn(index, string) {
    let indices = this.getColumn(index).filter(el => el < string.length);
    let elements = indices.map(i => string[i]);
    let elements_set = new Set(elements);
    return (elements.length == elements_set.size)
  }

  // Check row, column, and cage for a given index. Return false if any of the checks
  // return false (i.e., there are problems). Return true otherwise.
  checkCell(index, string) {
    return (this.checkRow(index, string)
      && this.checkColumn(index, string)
      && this.cage_lookup[index].checkCage(string))
  }
}


// Given a puzzle, try to solve it.
function solve(puzzle, string = "") {
  // Termination case.
  if (string.length == puzzle.num_cells) {
    console.log(string);
    return string;
  }

  // Otherwise try different possibilities for the next possible element.
  range(1, puzzle.side_length + 1).forEach((potential) => {
    let temp_string = string + potential;
    if (puzzle.checkCell(temp_string.length - 1, temp_string)) {
      let potential_solution = solve(puzzle, temp_string);
      if (potential_solution) {
        return potential_solution;
      }
    }
  });

  // If we have iterated through all possible next elements without success then there
  // is no solution.
  return false;
}