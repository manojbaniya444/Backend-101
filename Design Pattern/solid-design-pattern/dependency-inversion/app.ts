class Controller {
  userService: Service;

  constructor(userService: Service) {
    this.userService = userService;
  }
  save() {
    this.userService.save();
  }
}

class Service {
  userRepo: Repository;

  constructor(userRepo: Repository) {
    this.userRepo = userRepo;
  }
  save() {
    this.userRepo.save();
  }
}

class Repository {
  save() {
    console.log("user save in the database test");
  }
}

// NOTE: If we want to implement another repo or fake repo for test we need to create new repo and also change the service code to user new repository type because they are depend on --concrete implementation and not the abstraction--.
const repo = new Repository();
const service = new Service(repo);
const controller = new Controller(service);

controller.save();
