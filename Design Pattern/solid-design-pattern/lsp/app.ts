// violating the liskov substitution principle

class Bird {
  fly() {
    console.log("I can fly");
  }

  makeSound() {}
}

class Parrot extends Bird {
  makeSound(): void {
    console.log("parrot sound");
  }
}

class Eagle extends Bird {
  makeSound(): void {
    console.log("eagle sound");
  }
}

class Penguin extends Bird {
  makeSound(): void {
    console.log("penguin sound");
  }

  fly() {
    throw new Error("penguin cannot fly");
  }
}

// here the bird or subclass of it it should work in lsp principle
const makeBirdFly = (bird: Bird) => {
  bird.makeSound();
  bird.fly();
};

// correct
makeBirdFly(new Bird());
// correct
makeBirdFly(new Parrot());
// correct
makeBirdFly(new Eagle());
// not correct because it throw error, it violate the lsp because penguin is the subclass of bird
makeBirdFly(new Penguin());
