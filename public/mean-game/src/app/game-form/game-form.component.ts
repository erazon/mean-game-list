import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GameDataService } from '../game-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  game:Game = new Game('', '', 0);
  #gameForm!:FormGroup;
  get gameForm(){return this.#gameForm;}

  constructor(private _gameService:GameDataService, private _route:ActivatedRoute) {
    this.#gameForm = new FormGroup({
      title: new FormControl(),
      year: new FormControl(),
      rate: new FormControl(),
      price: new FormControl(),
      minPlayers: new FormControl(),
      maxPlayers: new FormControl(),
      minAge: new FormControl(),
    });

    let gameId = _route.snapshot.params['gameId'];
    if(gameId){
      _gameService.getGame(gameId).subscribe(game=>{
        this.#gameForm = new FormGroup({
          title: new FormControl(game.title),
          year: new FormControl(game.year),
          rate: new FormControl(game.rate),
          price: new FormControl(game.price),
          minPlayers: new FormControl(game.minPlayers),
          maxPlayers: new FormControl(game.maxPlayers),
          minAge: new FormControl(game.minAge),
        });
      });
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('Game form submitted');
    console.log(this.#gameForm.value);
    let gameId = this._route.snapshot.params['gameId'];
    if(gameId){
      this._gameService.updateGame(gameId, this.#gameForm.value).subscribe({
        next: (game) => {
          console.log(game);
        },
        error: (err) => console.error(err)
      });
    }
    else{
      this._gameService.addGame(this.#gameForm.value).subscribe({
        next: (game) => {
          console.log(game);
        },
        error: (err) => console.error(err)
      });
    }
  }

}
