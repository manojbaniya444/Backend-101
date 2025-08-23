// NOTE: interface for any repository to implement
interface IRepository {
  save: () => void;
}

// NOTE: interface for any service to implement
interface IService {
  save: () => void;
  apiCall: () => string;
}

class ControllerDI {
  service: IService;
  constructor(service: IService) {
    this.service = service;
  }

  save() {
    this.service.save();
  }

  apiCall() {
    const text = this.service.apiCall();
  }
}

class ServiceDI implements IService {
  repo: IRepository;
  constructor(repo: IRepository) {
    this.repo = repo;
  }
  save() {
    this.repo.save();
  }

  apiCall() {
    return "some text from api text";
  }
}

class RepositoryDI implements IRepository {
  save() {
    console.log("user save in the database");
  }
}

class FakeRepositoryDI implements IRepository {
  save() {
    console.log("user save in teh fake repository database");
  }
}

const repoOriginal = new RepositoryDI();
const serviceOriginal = new ServiceDI(repoOriginal);
const controllerOriginal = new ControllerDI(serviceOriginal);

// NOTE: Can also use fake repository which implement the interface repository
const fakeRepository = new FakeRepositoryDI();
const serviceOriginal_ = new ServiceDI(fakeRepository);
