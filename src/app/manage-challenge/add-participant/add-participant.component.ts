import { Component, inject, model, ModelSignal } from '@angular/core';
import { Participant } from '../../models';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

export interface DialogData {
  content: Participant;
}

@Component({
  selector: 'fsc-add-participant',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButton
  ],
  templateUrl: './add-participant.component.html',
  styleUrl: './add-participant.component.scss'
})
export class AddParticipantComponent {

  readonly dialogRef = inject(MatDialogRef<AddParticipantComponent>);
  readonly data: Participant = {
    uid: '',
    name: '',
    vo2max: 0
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClose(): Participant {
    return this.data;
  }
}
