import { Component } from '@angular/core';
import { DogBreedService } from '../../services/dog-breed.service';

@Component({
  selector: 'app-dog-overview',
  imports: [],
  templateUrl: './dog-overview.component.html',
  styleUrl: './dog-overview.component.scss',
})
export class DogOverviewComponent {
  //#region Fields

  data: any[] = [];

  //#endregion

  //#region Constructor

  constructor(
    private dogBreedService: DogBreedService
  ) {
    this.getData();
  }

  //#endregion

  //#region Methods

  getData() {
    this.dogBreedService.getBreeds().subscribe((data) => {
      console.log('dataaaaaaaa', data);
    });
  }

  //#endregion
}
