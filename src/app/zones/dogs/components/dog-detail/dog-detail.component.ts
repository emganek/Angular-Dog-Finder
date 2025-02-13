import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DogBreed } from '../../models/dog-breed';

@Component({
  selector: 'app-dog-detail',
  imports: [CommonModule],
  templateUrl: './dog-detail.component.html',
  styleUrl: './dog-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogDetailComponent {
  //#region Inputs

  @Input({ required: true }) data!: DogBreed;

  //#endregion
}
