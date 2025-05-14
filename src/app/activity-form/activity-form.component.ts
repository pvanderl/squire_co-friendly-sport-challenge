import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatTimepicker, MatTimepickerModule } from '@angular/material/timepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';


@Component({
  selector: 'app-activity-form',
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter(), provideNgxMask(),{provide: MAT_DATE_LOCALE, useValue: 'en-UK'},],
  templateUrl: './activity-form.component.html',
  standalone: true,
  styleUrl: './activity-form.component.scss'
})
export class ActivityFormComponent implements OnInit {
  cachedUsername: string | null = null;

  ngOnInit() {
    // this.cachedUserId = localStorage.getItem('memberUid');
  }

  onsubmit() {
    // localStorage.setItem('username', this.activity.get('memberUid'))
    //todo get challenge from url
    //todo get lists of participants from challenge
  }

  activity: FormGroup = new FormGroup({
    memberUid: new FormControl('', [Validators.required]),
    sport: new FormControl('', [Validators.required]), //todo custom validator?
    METs: new FormControl('', [Validators.required]),
    duration: new FormControl<Date | null>(null, [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
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

  protected readonly moment = moment;
}
