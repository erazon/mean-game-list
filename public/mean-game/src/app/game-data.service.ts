import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  _baseUrl = "http://localhost:3000/api/"

  constructor(private _http:HttpClient) { }

  public addGame(gameData:Game): Observable<Game>{
    const url:string = this._baseUrl + 'games';
    return this._http.post<Game>(url, gameData);
  }

  public getAllGames(): Observable<Game[]>{
    const url:string = this._baseUrl + 'games';
    return this._http.get<Game[]>(url);
  }

  public getGame(gameId:string): Observable<Game>{
    const url:string = this._baseUrl + 'games/'+ gameId;
    return this._http.get<Game>(url);
  }

  public updateGame(gameId:string, gameData:Game): Observable<Game>{
    const url:string = this._baseUrl + 'games/'+ gameId;
    return this._http.put<Game>(url, gameData);
  }
}
