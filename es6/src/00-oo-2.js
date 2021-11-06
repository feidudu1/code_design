class Place {
  isEmpty = true;
  enter() {
    this.isEmpty = false;
  }
  exit() {
    this.isEmpty = true;
  }
}

class Floor {
  floorIndex;
  places;
  constructor(floorIndex, places) {
    this.floorIndex = floorIndex;
    this.places = places;
  }
}

class Park {
  floors;
  camera;
  screen;
  infos = {};
  constructor(floors) {
    this.camera = new Camera();
    this.screen = new Screen();
    this.floors = floors;
  }
  getEmptyCount() {
    return this.floors.map((floor) => {
      return floor.places.filter((place) => place.isEmpty).length;
    });
  }
  enter(carId) {
    const floorIndex = Math.floor(Math.random() * 3);
    const placeIndex = Math.floor(Math.random() * 100);
    const emptyInfo = this.getEmptyCount(floorIndex);
    this.screen.showEnter(emptyInfo);
    this.infos[carId] = this.camera.shot(carId);
    this.infos[carId].place = { floorIndex, placeIndex };
    this.floors[floorIndex].places[placeIndex].enter();
  }
  exit(carId) {
    const { place = { floorIndex, placeIndex } } = this.infos[carId];
    this.screen.showExit(this.infos[carId]);
    this.floors[place.floorIndex].places[place.placeIndex].exit();
    delete this.infos[carId];
  }
}

class Screen {
  showEnter(emptyInfo) {
    for (let i = 0; i < 3; i++) {
      console.log("第" + (i + 1) + "层剩余" + emptyInfo[i] + "个停车位");
    }
  }
  showExit(carInfo) {
    const { carId, enterTime } = carInfo;
    console.log(
      "车牌号为【" + carId + "】停留时间:" + (new Date().getTime() - enterTime)
    );
  }
}

class Camera {
  shot(carId) {
    return {
      carId: carId,
      enterTime: new Date().getTime(),
    };
  }
}
class Car {
  carId;
  constructor(id) {
    this.carId = id;
  }
  consoleInfo() {
    console.log(1111, this.carId);
  }
}

const floors = [];
for (let i = 0; i < 3; i++) {
  const places = [];
  for (let j = 0; j < 100; j++) {
    const place = new Place();
    places.push(place);
  }
  floors.push(new Floor(i + 1, places));
}
const park = new Park(floors);

const car1 = new Car(12);
const car2 = new Car(234);

park.enter(car1.carId);
park.enter(car2.carId);
park.exit(car1.carId);
park.exit(car2.carId);

export default new Car(23);
