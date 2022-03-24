import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUserCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUserCase;
let carsRepositoryInMemory : CarsRepositoryInMemory;

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUserCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-12334",
      fine_amount: 10,
      brand: "volvo",
      category_id: "0344e0f0-cc3c-40ff-95cc-db7ba214e0de"
    });


    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "0344e0f0-cc3c-40ff-95cc-db7ba214e0de"
    });


    const cars = await listCarsUseCase.execute({
      brand: "VW",
    });
    console.log(cars);

    expect(cars).toEqual([car]);
  })
})