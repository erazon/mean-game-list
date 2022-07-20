import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

class Credentials{
  username!: string;
  password!: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm')
  loginForm!: NgForm;

  username: string= "Jack";
  password: string= "123";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void{
    console.log('login clicked');
    console.log('Form', form.value);
    
    // another way
    //console.log(this.loginForm.value);
  }
}
