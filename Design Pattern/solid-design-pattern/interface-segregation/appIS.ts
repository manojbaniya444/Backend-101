interface Drivable {
  drive: () => void;
}

interface Flyable {
  fly: () => void;
}

interface Sailable {
  sail: () => void;
}

class CarIS implements Drivable {
  drive() {
    console.log("Car can drive");
  }
}

class DroneIS implements Flyable {
  fly() {
    console.log("Drone can fly");
  }
}

class FlyingCar implements Drivable, Flyable {
  drive() {
    console.log("Flying car can drive");
  }

  fly() {
    console.log("Flying car can fly");
  }
}
