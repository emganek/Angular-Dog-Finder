import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_DOG_API } from '../../../shared/consts/system';

@Injectable({
  providedIn: 'root',
})
export class DogBreedService {
  //#region  CONSTS

  private readonly BASE_DOG_BREED!: string;

  //#endregion

  //#region Constructor

  constructor(private httpClient: HttpClient) {
    this.BASE_DOG_BREED = `${BASE_DOG_API}breeds/`;
  }

  //#endregion

  //#endregion Methods

  getBreedById(id: string) {
    // return this.httpClient.get(`${this.BASE_DOG_BREED}abys`);
    return this.httpClient.get(`${this.BASE_DOG_BREED}/${id}`);
  }

  getBreeds() {
    return this.httpClient.get(this.BASE_DOG_BREED);
  }

  //#endregion
}
