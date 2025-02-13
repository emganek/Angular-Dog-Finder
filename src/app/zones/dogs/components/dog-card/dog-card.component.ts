import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dog-card',
  imports: [ButtonModule],
  templateUrl: './dog-card.component.html',
  styleUrl: './dog-card.component.scss',
})
export class DogCardComponent {
  //#region Outputs

  @Output() action = new EventEmitter<boolean>();

  //#endregion

  //#region Event Handlers

  onAction(option: boolean): void {
    this.action.emit(option);
  }

  //#endregion
}
