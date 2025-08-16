class BaseBird {
  makeSound() {
    console.log("I can make sound.");
  }
}

class BirdLSP extends BaseBird {
  fly() {
    console.log("I can fly");
  }
}

class ParrotLSP extends BirdLSP {}
class EagleLSP extends BirdLSP {}
class PenguinLSP extends BaseBird {}

const makeSound = (bird: BaseBird) => {
  bird.makeSound();
};

const makeFly = (bird: BirdLSP) => {
  bird.fly();
};

makeSound(new ParrotLSP());
makeSound(new EagleLSP());
makeSound(new PenguinLSP());

makeFly(new ParrotLSP());
makeFly(new EagleLSP());
// makeFly(new PenguinLSP()) // error because it accept class and subclass of Bird but eagle is of BaseBird so it prevents from violating the LSP principle
