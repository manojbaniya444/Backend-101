// NOTE: We have lets say method for vehicle
interface vehicle {
  drive: () => void;
  fly: () => void;
  sail: () => void;
}

// NOTE: implementation
class Car implements vehicle {
  drive() {
    console.log("Car can drive");
  }

  // Even we do not need fly() and sail() for car we need to implement it due to interface
  fly() {
    throw new Error("car can not fly.");
  }

  sail() {
    throw new Error("car cannot sail.");
  }
}

class Drone implements vehicle {
  drive() {
    throw new Error("Drone cannot drive");
  }

  fly() {
    console.log("Drone can fly.");
  }

  sail() {
    throw new Error("Drone canno sail.");
  }
}

class SuperVehicle implements vehicle {
  drive() {
    console.log("Supervehicle can drive");
  }

  fly() {
    console.log("Supervehicle can fly");
  }

  sail() {
    console.log("Supervehicle can sail");
  }
}
