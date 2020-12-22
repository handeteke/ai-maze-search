export var MazeCreator = {
  grid: null,

  indexArr: null,
  valueArr: null,

  IS_SUCCESSFULL: false,

  FORM: {
    WIDTH: 0,
    HEIGHT: 0,
    START_X: 0,
    START_Y: 0,
    WALL_COUNT: 0,
    CAT_COUNT: 0,
    DOG_COUNT: 0,
    BIRD_COUNT: 0,
  },

  SIZE: 0,

  initialize: function (form) {
    MazeCreator.indexArr = [];
    MazeCreator.valueArr = [];

    MazeCreator.FORM.WIDTH = form["width"];
    MazeCreator.FORM.HEIGHT = form["height"];
    MazeCreator.FORM.START_X = form["startX"];
    MazeCreator.FORM.START_Y = form["startY"];
    MazeCreator.FORM.WALL_COUNT = form["wallCount"];
    MazeCreator.FORM.CAT_COUNT = form["catCount"];
    MazeCreator.FORM.DOG_COUNT = form["dogCount"];
    MazeCreator.FORM.BIRD_COUNT = form["birdCount"];

    MazeCreator.SIZE = MazeCreator.FORM.WIDTH * MazeCreator.FORM.HEIGHT;

    MazeCreator.valueArr = Array(MazeCreator.SIZE).fill(0);
    MazeCreator.indexArr = Array.from(Array(MazeCreator.SIZE).keys());

    MazeCreator.insertStart();
    MazeCreator.insertGoal();
    MazeCreator.insertWalls();

    MazeCreator.setGrid();

    console.log("GRID:");
    console.log(MazeCreator.grid);
  },
  insertStart: function () {
    let index =
      MazeCreator.FORM.WIDTH * MazeCreator.FORM.START_Y +
      MazeCreator.FORM.START_X;
    MazeCreator.valueArr[index] = "s";
    MazeCreator.indexArr.splice(index, 1);
  },

  insertGoal: function () {
    MazeCreator.valueArr[MazeCreator.valueArr.length - 1] = "g";
    MazeCreator.indexArr.splice(MazeCreator.indexArr.length - 1, 1);
  },

  insertWalls: function () {
    let index = 0;
    let random = 0;
    if (MazeCreator.FORM.WALL_COUNT <= MazeCreator.indexArr.length) {
      for (var w = 0; w < MazeCreator.FORM.WALL_COUNT; w++) {
        random = Math.floor(Math.random() * MazeCreator.indexArr.length);
        index = MazeCreator.indexArr[random];
        MazeCreator.valueArr[index] = "w";
        MazeCreator.indexArr.splice(random, 1);
      }
      MazeCreator.insertCats();
    } else {
      MazeCreator.IS_SUCCESSFULL = false;
    }
  },

  insertCats: function () {
    let index = 0;
    let random = 0;
    if (MazeCreator.FORM.CAT_COUNT <= MazeCreator.indexArr.length) {
      for (var c = 0; c < MazeCreator.FORM.CAT_COUNT; c++) {
        random = Math.floor(Math.random() * MazeCreator.indexArr.length);
        index = MazeCreator.indexArr[random];
        MazeCreator.valueArr[index] = "c";
        MazeCreator.indexArr.splice(random, 1);
      }
      MazeCreator.insertDogs();
    } else {
      MazeCreator.IS_SUCCESSFULL = false;
    }
  },

  insertDogs: function () {
    let index = 0;
    let random = 0;
    if (MazeCreator.FORM.DOG_COUNT <= MazeCreator.indexArr.length) {
      for (var d = 0; d < MazeCreator.FORM.DOG_COUNT; d++) {
        random = Math.floor(Math.random() * MazeCreator.indexArr.length);
        index = MazeCreator.indexArr[random];
        MazeCreator.valueArr[index] = "d";
        MazeCreator.indexArr.splice(random, 1);
      }
      MazeCreator.insertBirds();
    } else {
      MazeCreator.IS_SUCCESSFULL = false;
    }
  },

  insertBirds: function () {
    let index = 0;
    let random = 0;
    if (MazeCreator.FORM.BIRD_COUNT <= MazeCreator.indexArr.length + 1) {
      for (var b = 0; b < MazeCreator.FORM.BIRD_COUNT; b++) {
        random = Math.floor(Math.random() * MazeCreator.indexArr.length);
        index = MazeCreator.indexArr[random];
        MazeCreator.valueArr[index] = "b";
        MazeCreator.indexArr.splice(random, 1);
      }
      MazeCreator.IS_SUCCESSFULL = true;
    } else {
      MazeCreator.IS_SUCCESSFULL = false;
    }
  },

  setGrid: function () {
    MazeCreator.grid = [];
    if (MazeCreator.IS_SUCCESSFULL) {
      for (var y = 0; y < MazeCreator.FORM.HEIGHT; y++) {
        for (var x = 0; x < MazeCreator.FORM.WIDTH; x++) {
          MazeCreator.grid[y] = MazeCreator.grid[y] || [];
          MazeCreator.grid[y][x] =
            MazeCreator.valueArr[MazeCreator.FORM.WIDTH * y + x];
        }
      }
    }
  },
};
