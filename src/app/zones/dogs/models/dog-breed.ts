import { UnitSystem } from "../../../shared/models/common";
import { DogImage } from "./dog-image";

export interface DogBreed {
  bred_for: string;
  breed_group: string;
  height: UnitSystem;
  image: DogImage;
  id: number;
  life_span: string;
  name: string;
  origin: string;
  reference_image_id: string;
  temperament: string;
  weight: UnitSystem;
}
