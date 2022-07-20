import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDataService } from '../game-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  game:Game = new Game('', 'No title', 0);

  constructor(private _gameService:GameDataService, private _route:ActivatedRoute) { }

  ngOnInit(): void {
    let gameId = this._route.snapshot.params['gameId'];
    this._gameService.getGame(gameId).subscribe(game=>this.game=game);
  }

}
