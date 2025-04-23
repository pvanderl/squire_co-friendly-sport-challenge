import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';


@Component({
  selector: 'app-activity-form',
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './activity-form.component.html',
  standalone: true,
  styleUrl: './activity-form.component.scss'
})
export class ActivityFormComponent {
  activity: FormGroup = new FormGroup({
    memberUid: new FormControl('', [Validators.required]),
    selection: new FormControl([''], [Validators.required]),
    METs: new FormControl('', [Validators.required]),
    duration: new FormControl(0, [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });

  sports = [
    {
      name: "Marche",
      levels: [
        {
          name: "Promenade",
          mets: 3.5,
        },
        {
          name: "Marche soutenue",
          mets: 4.5,
        },
        {
          name: "Marche nordique",
          mets: 5.5,
        },
      ]
    }
  ];

}
