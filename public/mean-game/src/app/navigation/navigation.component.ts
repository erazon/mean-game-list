import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  onHomeClick(): void {
    console.log('home clicked');
    this._router.navigate([""]);
  }

  onGamesClick(): void {
    console.log('Games clicked');
    this._router.navigate(["games"]);
  }

  onRegisterClick(): void {
    console.log('Register clicked');
    
  }

}
