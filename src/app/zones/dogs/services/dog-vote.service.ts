import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_DOG_API } from '../../../shared/consts/system';
import { DogVotePayLoad } from '../models/dog-vote';

@Injectable({
  providedIn: 'root',
})
export class DogVoteService {
  //#region  CONSTS

  private readonly BASE_DOG_VOTE!: string;

  //#endregion

  //#region Constructor

  constructor(private httpClient: HttpClient) {
    this.BASE_DOG_VOTE = `${BASE_DOG_API}votes/`;
  }

  //#endregion

  //#endregion Methods

  vote(body: DogVotePayLoad) {
    return this.httpClient.post(`${this.BASE_DOG_VOTE}`, body);
  }

  //#endregion
}
