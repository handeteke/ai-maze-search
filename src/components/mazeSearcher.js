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
  bfsVisitedNodes: [],
  astarPathNodes: [],
  astarVisitedNodes: [],
  gbfsVisitedNodes: [],

  search: function (grid, searchMethod) {
    MazeSearcher.grid = grid.map(function (arr) {
      return arr.slice();
    });
    MazeSearcher.setStartAndGoal();
    MazeSearcher.createNodeArray();
    console.log("searchMethod")
    console.log(searchMethod)
    console.log("initial grid")
    console.log(grid)

    if (searchMethod === "DFS") {
      MazeSearcher.dfsVisitedNodes = MazeSearcher.depthFirstSearch();
      MazeSearcher.createNodeArray();
    }
    if (searchMethod === "BFS") {
      MazeSearcher.bfsVisitedNodes = MazeSearcher.breadthFirstSearch();
      MazeSearcher.createNodeArray();
    }
    if (searchMethod === "A*") {
      MazeSearcher.astarPathNodes = MazeSearcher.aStarSearch();
      MazeSearcher.createNodeArray();
    }
    if (searchMethod === "Greedy Best First Search") {
      MazeSearcher.gbfsVisitedNodes = MazeSearcher.greedyBestFirstSearch();
      MazeSearcher.createNodeArray();
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
      astarSearchedGrid[node.yCoord][node.xCoord] = 1;
    }
    for (var x = 0; x < MazeSearcher.astarPathNodes.length; x++) {
      node = MazeSearcher.astarPathNodes[x];
      astarSearchedGrid[node.yCoord][node.xCoord] = 2;
    }

    return astarSearchedGrid;
  },

  getGreedyBestFirstSearchedGrid: function () {
    let gbfsSearchedGrid = [];
    let node;
    let pathNode =
      MazeSearcher.gbfsVisitedNodes[MazeSearcher.gbfsVisitedNodes.length - 1];

    for (var y = 0; y < MazeSearcher.grid.length; y++) {
      for (var x = 0; x < MazeSearcher.grid[0].length; x++) {
        gbfsSearchedGrid[y] = MazeSearcher.grid[y] || [];
        gbfsSearchedGrid[y][x] = 0;
      }
    }

    for (var x = 0; x < MazeSearcher.gbfsVisitedNodes.length; x++) {
      node = MazeSearcher.gbfsVisitedNodes[x];
      gbfsSearchedGrid[node.yCoord][node.xCoord] = 1;
    }

    while (pathNode.previousNode !== null) {
      pathNode = pathNode.previousNode;
      gbfsSearchedGrid[pathNode.yCoord][pathNode.xCoord] = 2;
    }
    return gbfsSearchedGrid;
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

    let visiteds = [];

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
      visiteds.push(closestNode);

      if (closestNode.value === "g") {
        closestNode.distance = closestNode.distance + 5;
        visitedNodes.push(closestNode);
        closestNode.isVisited = true;
        console.log("A* found goal");
        MazeSearcher.astarVisitedNodes = visiteds;
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
        visiteds.push(neighbour);
      }
    }
    MazeSearcher.astarVisitedNodes = visiteds;
    return visitedNodes;
  },

  greedyBestFirstSearch: function () {
    let width = MazeSearcher.grid[0].length;

    let startNode =
      MazeSearcher.nodeArr[width * MazeSearcher.startY + MazeSearcher.startX];
    let unvisitedNodes = [];
    let visitedNodes = [];
    startNode.distance = MazeSearcher.manhattenDistance(startNode) + startNode.value;

    unvisitedNodes.push(startNode);
    let closestNode;
    let unvisitedNeighbours;

    while (unvisitedNodes.length !== 0) {
      closestNode = unvisitedNodes.shift();
      if (closestNode.value === "g") {
        console.log("gbfs goal found");
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);
        return visitedNodes;
      }
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);

      unvisitedNeighbours = MazeSearcher.getUnvisitedNeighbours(closestNode);
      for (let unvisitedNeighbour of unvisitedNeighbours) {
        unvisitedNeighbour.distance = MazeSearcher.manhattenDistance(
          unvisitedNeighbour
        ) + unvisitedNeighbour.value;
      }
      unvisitedNeighbours.sort((a, b) => a.distance - b.distance);
      for (var x = 0; x < unvisitedNeighbours.length; x++) {
        unvisitedNeighbours[x].previousNode = closestNode;
        unvisitedNodes.unshift(unvisitedNeighbours[x]);
      }
    }
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
