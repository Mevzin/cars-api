import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"


let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a no-existent car", async () => {
    expect(async() => {
      const car_id = "123";
      const specifications_id = ["123", "456"];
  
      await createCarSpecificationUseCase.execute({car_id, specifications_id});
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "category",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test"
    });
    
    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id, 
      specifications_id
    });
    console.log(car.id);
    console.log(specifications_id);
    console.log(specificationsCars);
  });
});