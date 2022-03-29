import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUserCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUserCase;
let carsRepositoryInMemory : CarsRepositoryInMemory;

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUserCase(carsRepositoryInMemory);
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


    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "car_brand_test",
      category_id: "0344e0f0-cc3c-40ff-95cc-db7ba214e0de"
    });


    const cars = await listAvailableCarsUseCase.execute({
      brand: "car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-123455",
      fine_amount: 10,
      brand: "car_brand_test",
      category_id: "0344e0f0-cc3c-40ff-95cc-db7ba214e0de"
    });


    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "car_brand_test",
      category_id: "12345"
    });


    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
})