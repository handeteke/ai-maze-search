export var MazeSearcher = {
  grid: null,

  search: function (grid, searchMethod) {
    MazeSearcher.grid = grid;

    if (searchMethod === "BFS") {
      MazeSearcher.breadthFirstSearch();
    }
    if (searchMethod === "A*") {
      MazeSearcher.aStarSearch();
    }

    console.log("MazeSearcher searchMethod");
    console.log(searchMethod);

    console.log("MazeSearcher grid");
    console.log(grid);
  },

  breadthFirstSearch: function () {
    console.log("run bfs");
  },
  aStarSearch: function () {
    console.log("run bfs");
  },
};
