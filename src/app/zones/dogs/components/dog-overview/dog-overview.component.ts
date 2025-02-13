import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { DogBreed } from '../../models/dog-breed';

@Component({
  selector: 'app-dog-overview',
  imports: [CommonModule],
  templateUrl: './dog-overview.component.html',
  styleUrl: './dog-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogOverviewComponent {
  //#region Inputs

  @Input({ required: true }) data!: DogBreed;

  //#endregion
}
