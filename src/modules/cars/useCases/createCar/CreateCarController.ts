import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";



class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response>{
    const {
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      name
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      name
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };