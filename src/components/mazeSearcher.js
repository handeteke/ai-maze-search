// import Stack from './models/Stack
// import Queue from './models/Queue

export var MazeSearcher = {
  grid: null,
  startX: 0,
  startY: 0,
  goalX: 0,
  goalY: 0,
  nodeArr: [],
  dfsVisitedNodes: [],
  dfsSearchedGrid: [],
  bfsVisitedNodes: [],
  bfsSearchedGrid: [],
  astarVisitedNodes: [],
  astarSearchedGrid: [],

  search: function (grid, searchMethod) {
    MazeSearcher.grid = grid;
    MazeSearcher.setStartAndGoal();
    MazeSearcher.createNodeArray();

    if (searchMethod === "DFS") {
      MazeSearcher.dfsVisitedNodes = MazeSearcher.depthFirstSearch();
      MazeSearcher.createNodeArray();
      MazeSearcher.dfsSearchedGrid = MazeSearcher.getDfsSearchedGrid();
    }
    if (searchMethod === "BFS") {
      MazeSearcher.bfsVisitedNodes = MazeSearcher.breadthFirstSearch();
      MazeSearcher.createNodeArray();
      MazeSearcher.bfsSearchedGrid = MazeSearcher.getBfsSearchedGrid();
    }
    if (searchMethod === "A*") {
      MazeSearcher.astarVisitedNodes = MazeSearcher.aStarSearch();
      console.log("after a*");
      console.log(MazeSearcher.astarVisitedNodes);
      MazeSearcher.createNodeArray();
      MazeSearcher.astarSearchedGrid = MazeSearcher.getAStarSearchedGrid();
    }
  },

  setStartAndGoal: function () {
    for (var y = 0; y < MazeSearcher.grid.length; y++) {
      for (var x = 0; x < MazeSearcher.grid[0].length; x++) {
        if (MazeSearcher.grid[y][x] === "s") {
          MazeSearcher.startX = x;
          MazeSearcher.startY = y;
        }
        if (MazeSearcher.grid[y][x] === "g") {
          MazeSearcher.goalX = x;
          MazeSearcher.goalY = y;
        }
      }
    }
  },

  getDfsSearchedGrid: function () {
    let dfsSearchedGrid = [];
    let node;
    let pathNode =
      MazeSearcher.dfsVisitedNodes[MazeSearcher.dfsVisitedNodes.length - 1];

    for (var y = 0; y < MazeSearcher.grid.length; y++) {
      for (var x = 0; x < MazeSearcher.grid[0].length; x++) {
        dfsSearchedGrid[y] = MazeSearcher.grid[y] || [];
        dfsSearchedGrid[y][x] = 0;
      }
    }

    for (var x = 0; x < MazeSearcher.dfsVisitedNodes.length; x++) {
      node = MazeSearcher.dfsVisitedNodes[x];
      dfsSearchedGrid[node.yCoord][node.xCoord] = 1;
    }

    while (pathNode.previousNode !== null) {
      pathNode = pathNode.previousNode;
      dfsSearchedGrid[pathNode.yCoord][pathNode.xCoord] = 2;
    }
    return dfsSearchedGrid;
  },

  getBfsSearchedGrid: function () {
    let bfsSearchedGrid = [];
    let node;
    let pathNode =
      MazeSearcher.bfsVisitedNodes[MazeSearcher.bfsVisitedNodes.length - 1];

    for (var y = 0; y < MazeSearcher.grid.length; y++) {
      for (var x = 0; x < MazeSearcher.grid[0].length; x++) {
        bfsSearchedGrid[y] = MazeSearcher.grid[y] || [];
        bfsSearchedGrid[y][x] = 0;
      }
    }

    for (var x = 0; x < MazeSearcher.bfsVisitedNodes.length; x++) {
      node = MazeSearcher.bfsVisitedNodes[x];
      bfsSearchedGrid[node.yCoord][node.xCoord] = 1;
    }

    while (pathNode.previousNode !== null) {
      pathNode = pathNode.previousNode;
      bfsSearchedGrid[pathNode.yCoord][pathNode.xCoord] = 2;
    }
    return bfsSearchedGrid;
  },

  getAStarSearchedGrid: function () {
    let astarSearchedGrid = [];
    let node;

    for (var y = 0; y < MazeSearcher.grid.length; y++) {
      for (var x = 0; x < MazeSearcher.grid[0].length; x++) {
        astarSearchedGrid[y] = MazeSearcher.grid[y] || [];
        astarSearchedGrid[y][x] = 0;
      }
    }

    for (var x = 0; x < MazeSearcher.astarVisitedNodes.length; x++) {
      node = MazeSearcher.astarVisitedNodes[x];
      astarSearchedGrid[node.yCoord][node.xCoord] = 2;
    }
    console.log("visited astarSearchedGrid");
    console.log(astarSearchedGrid);

    return astarSearchedGrid;
  },

  createNodeArray: function () {
    let node;

    MazeSearcher.nodeArr = [];

    for (var y = 0; y < MazeSearcher.grid.length; y++) {
      for (var x = 0; x < MazeSearcher.grid[0].length; x++) {
        node = {
          xCoord: x,
          yCoord: y,
          value: MazeSearcher.grid[y][x],
          isVisited: false,
          previousNode: null,
        };
        MazeSearcher.nodeArr.push(node);
      }
    }
    console.log("MazeSearcher nodeArr");
    console.log(MazeSearcher.nodeArr);
  },

  depthFirstSearch: function () {
    let width = MazeSearcher.grid[0].length;

    let startNode =
      MazeSearcher.nodeArr[width * MazeSearcher.startY + MazeSearcher.startX];
    let unvisitedNodes = [];
    let visitedNodes = [];

    unvisitedNodes.push(startNode);
    let closestNode;
    let unvisitedNeighbours;

    while (unvisitedNodes.length !== 0) {
      closestNode = unvisitedNodes.shift();
      if (closestNode.value === "g") {
        console.log("dfs goal found");
        console.log(closestNode);
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);
        return visitedNodes;
      }
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);

      unvisitedNeighbours = MazeSearcher.getUnvisitedNeighbours(closestNode);
      for (let unvisitedNeighbour of unvisitedNeighbours) {
        unvisitedNeighbour.previousNode = closestNode;
        unvisitedNodes.unshift(unvisitedNeighbour);
      }
    }
    return visitedNodes;
  },

  breadthFirstSearch: function () {
    let width = MazeSearcher.grid[0].length;

    let startNode =
      MazeSearcher.nodeArr[width * MazeSearcher.startY + MazeSearcher.startX];

    let unvisitedNodes = [];
    let visitedNodes = [];
    unvisitedNodes.push(startNode);
    let closestNode;
    let unvisitedNeighbours;
    while (unvisitedNodes.length !== 0) {
      closestNode = unvisitedNodes.shift();
      if (closestNode.value === "g") {
        visitedNodes.push(closestNode);
        closestNode.isVisited = true;
        console.log("bfs found goal");
        console.log(closestNode);
        return visitedNodes;
      }
      visitedNodes.push(closestNode);
      closestNode.isVisited = true;
      unvisitedNeighbours = MazeSearcher.getUnvisitedNeighbours(closestNode);
      for (let unvisitedNeighbour of unvisitedNeighbours) {
        unvisitedNeighbour.previousNode = closestNode;
        if (
          MazeSearcher.neighbourNotInUnvisitedNodes(
            unvisitedNeighbour,
            unvisitedNodes
          )
        ) {
          unvisitedNodes.push(unvisitedNeighbour);
        }
      }
    }
    return visitedNodes;
  },
  aStarSearch: function () {
    let width = MazeSearcher.grid[0].length;
    let startNode =
      MazeSearcher.nodeArr[width * MazeSearcher.startY + MazeSearcher.startX];

    console.log("startNode");
    console.log(startNode);

    let unvisitedNodes = []; //open list
    let visitedNodes = []; //closed list

    startNode.distance = 0;
    startNode.totalDistance = 0;

    unvisitedNodes.push(startNode);
    let neighbours;
    let distance;
    let closestNode;

    while (unvisitedNodes.length !== 0) {
      unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);
      closestNode = unvisitedNodes.shift();

      if (closestNode.value === "g") {
        closestNode.distance = closestNode.distance + 5;
        visitedNodes.push(closestNode);
        closestNode.isVisited = true;
        console.log("A* found goal");
        console.log(closestNode);
        console.log("unvisitedNodes");
        console.log(unvisitedNodes);
        return visitedNodes;
      }
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);
      neighbours = MazeSearcher.getAllNeighbours(closestNode);
      for (let neighbour of neighbours) {
        if (neighbour.value === "g" || neighbour.value === "s") {
          distance = closestNode.distance;
        } else {
          distance = closestNode.distance + neighbour.value;
        }
        //f(n) = g(n) + h(n)
        if (
          MazeSearcher.neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes)
        ) {
          neighbour.distance = distance;
          neighbour.totalDistance =
            distance + MazeSearcher.manhattenDistance(neighbour);
          neighbour.previousNode = closestNode;
          unvisitedNodes.unshift(neighbour);
        } else if (distance < neighbour.distance) {
          neighbour.distance = distance;
          neighbour.totalDistance =
            distance + MazeSearcher.manhattenDistance(neighbour);
          neighbour.previousNode = closestNode;
        }
      }
    }
    console.log("run astar search");
    return visitedNodes;
  },

  getUnvisitedNeighbours: function (node) {
    let width = MazeSearcher.grid[0].length;
    let heigth = MazeSearcher.grid.length;
    let neighbours = [];

    //right neighbour
    if (
      node.xCoord + 1 < width &&
      MazeSearcher.grid[node.yCoord][node.xCoord + 1] !== "w"
    ) {
      if (
        MazeSearcher.nodeArr[width * node.yCoord + (node.xCoord + 1)]
          .isVisited === false
      ) {
        neighbours.push(
          MazeSearcher.nodeArr[width * node.yCoord + (node.xCoord + 1)]
        );
      }
    }
    //left neighbour
    if (
      0 < node.xCoord - 1 &&
      MazeSearcher.grid[node.yCoord][node.xCoord - 1] !== "w"
    ) {
      if (
        MazeSearcher.nodeArr[width * node.yCoord + (node.xCoord - 1)]
          .isVisited === false
      ) {
        neighbours.push(
          MazeSearcher.nodeArr[width * node.yCoord + (node.xCoord - 1)]
        );
      }
    }
    //up neighbour
    if (
      0 < node.yCoord - 1 &&
      MazeSearcher.grid[node.yCoord - 1][node.xCoord] !== "w"
    ) {
      if (
        MazeSearcher.nodeArr[width * (node.yCoord - 1) + node.xCoord]
          .isVisited === false
      ) {
        neighbours.push(
          MazeSearcher.nodeArr[width * (node.yCoord - 1) + node.xCoord]
        );
      }
    }
    //down neighbour
    if (
      node.yCoord + 1 < heigth &&
      MazeSearcher.grid[node.yCoord + 1][node.xCoord] !== "w"
    ) {
      if (
        MazeSearcher.nodeArr[width * (node.yCoord + 1) + node.xCoord]
          .isVisited === false
      ) {
        neighbours.push(
          MazeSearcher.nodeArr[width * (node.yCoord + 1) + node.xCoord]
        );
      }
    }
    return neighbours;
  },

  neighbourNotInUnvisitedNodes: function (neighbour, unvisitedNodes) {
    for (let node of unvisitedNodes) {
      if (
        node.yCoord === neighbour.yCoord &&
        node.xCoord === neighbour.xCoord
      ) {
        return false;
      }
    }
    return true;
  },

  manhattenDistance: function (node) {
    let x = Math.abs(node.yCoord - MazeSearcher.goalY);
    let y = Math.abs(node.xCoord - MazeSearcher.goalX);
    return (x + y) * 5;
  },

  getAllNeighbours: function (node) {
    let width = MazeSearcher.grid[0].length;
    let heigth = MazeSearcher.grid.length;
    let neighbours = [];

    //right neighbour
    if (
      node.xCoord + 1 < width &&
      MazeSearcher.grid[node.yCoord][node.xCoord + 1] !== "w"
    ) {
      neighbours.push(
        MazeSearcher.nodeArr[width * node.yCoord + (node.xCoord + 1)]
      );
    }
    //left neighbour
    if (
      0 < node.xCoord - 1 &&
      MazeSearcher.grid[node.yCoord][node.xCoord - 1] !== "w"
    ) {
      neighbours.push(
        MazeSearcher.nodeArr[width * node.yCoord + (node.xCoord - 1)]
      );
    }
    //up neighbour
    if (
      0 < node.yCoord - 1 &&
      MazeSearcher.grid[node.yCoord - 1][node.xCoord] !== "w"
    ) {
      neighbours.push(
        MazeSearcher.nodeArr[width * (node.yCoord - 1) + node.xCoord]
      );
    }
    //down neighbour
    if (
      node.yCoord + 1 < heigth &&
      MazeSearcher.grid[node.yCoord + 1][node.xCoord] !== "w"
    ) {
      neighbours.push(
        MazeSearcher.nodeArr[width * (node.yCoord + 1) + node.xCoord]
      );
    }
    return neighbours;
  },
};
