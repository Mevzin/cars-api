import { ICreateCarDTO } from "../dtos/ICreateCarDTO";



interface ICarsRepository {

  create(car: ICreateCarDTO): Promise<void>;
}

export { ICarsRepository };