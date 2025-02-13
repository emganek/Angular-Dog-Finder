import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_DOG_API } from '../../../shared/consts/system';
import { PaginationParams } from '../../../shared/models/common';
import { DogBreed } from '../models/dog-breed';

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

  getBreeds(params?: Partial<PaginationParams>): Observable<DogBreed[]> {
    params = params ? params : {};
    return this.httpClient.get<DogBreed[]>(this.BASE_DOG_BREED, { params });
  }

  //#endregion
}
