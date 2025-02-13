import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DogCardComponent } from '../../components/dog-card/dog-card.component';
import { DogBreedService } from '../../services/dog-breed.service';

@Component({
  selector: 'app-dog-page',
  imports: [CommonModule, DogCardComponent],
  templateUrl: './dog-page.component.html',
  styleUrl: './dog-page.component.scss',
})
export class DogPageComponent {
  //#region Fields

  data: any[] = [];

  viewMode: 'overview' | 'detail' = 'overview';

  //#endregion

  //#region Constructor

  constructor(private dogBreedService: DogBreedService) {
    this.getData();
    this.getBreedInfo();
  }

  //#endregion

  //#region Methods

  getData() {
    this.dogBreedService.getBreeds().subscribe((data) => {
      console.log('dataaaaaaaa', data);
    });
  }

  getBreedInfo() {
    this.dogBreedService.getBreedById('').subscribe((data) => {
      console.log('dataaaaaaaa id', data);
    });
  }

  changeView() {
    this.viewMode = 'detail';
  }

  //#endregion
}
