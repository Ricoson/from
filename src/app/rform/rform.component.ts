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
//自定义校验方法
  eamilValidator(control:FormControl){
    let myreg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.com)$/;
    let valid=myreg.test(control.value);
    if(!valid){
      return { option: '邮箱请以 .com 为后缀！'}
    }
  }
  userValidator(control:FormControl){
    let  myreg=/^[a-zA-Z0-9\s]{1}[^ ]+[a-zA-Z0-9\s]*$/;
    let valid=myreg.test(control.value);
    if(!valid){
      return { option: '用户名中间不能为空！'}
    }
  }

  validateForm: FormGroup;
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
    //用户名字段处理
    value.userName=value.userName.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");
    this.fromservice.formlist.push(value)
    var RoyW=JSON.stringify(this.fromservice.formlist);
    localStorage.setItem("express",RoyW)
    console.log(value);
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
  //
  manc(event){
    console.log('男')
  }
  womanc(event){
    console.log('女')
  }

  constructor(private fb: FormBuilder,public fromservice: FormService,public router: Router ) {
    this.validateForm = this.fb.group({
      userName: [ '', [ Validators.required,this.userValidator,Validators.minLength(2)], [ this.userNameAsyncValidator ], ],
      email   : [ '', [ Validators.email,this.eamilValidator],],
      password: [ '', [ Validators.required ] ],
      confirm : [ '', [ this.confirmValidator ] ],
      comment : [ '', [ Validators.required ] ],
      man :['帅气的我',[Validators.required]],
      // man :['',[Validators.required]],
      // woman :['',[Validators.required]],
      // radioGrop :fb.group({
      //   woman:['美美的我'],
      //   man:["帅气的我"]
      // })

    });
  }
}
