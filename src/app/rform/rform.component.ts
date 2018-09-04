import { Component, OnInit } from '@angular/core';
import {FormService} from '../shared/form.service'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rform',
  templateUrl: './rform.component.html',
  styleUrls: ['./rform.component.css'],
})
export class RformComponent {

  validateForm: FormGroup;
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
    this.fromservice.formlist.push(value)
    var RoyW=JSON.stringify(this.fromservice.formlist);
    localStorage.setItem("express",RoyW)
  };
  skipForm(e){
    this.router.navigate(["/listform"]);
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    setTimeout(() => {
      if (control.value === 'JasonWood') {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  });

  confirmValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  constructor(private fb: FormBuilder,public fromservice: FormService,public router: Router ) {
    this.validateForm = this.fb.group({
      userName: [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      email   : [ '', [ Validators.email ] ],
      password: [ '', [ Validators.required ] ],
      confirm : [ '', [ this.confirmValidator ] ],
      comment : [ '', [ Validators.required ] ]
    });
  }


}
