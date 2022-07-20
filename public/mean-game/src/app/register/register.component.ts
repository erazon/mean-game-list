import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  #registrationForm!: FormGroup
  get registrationForm(){return this.#registrationForm;}

  constructor() {
    this.#registrationForm= new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      repeatPassword: new FormControl()
  });
  }

  ngOnInit(): void {
    // 3rd way
    // this.#registrationForm= this._
  }

  onSubmit(): void {
    console.log('submitted');
    console.log(this.#registrationForm);
    
  }

  // another way doing it
  onSubmit2(form:FormGroup): void {
    console.log('submitted');
    console.log(form);
    
  }

}
