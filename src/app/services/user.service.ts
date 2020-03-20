import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { User } from "../models/user";
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<any>;
  constructor(private _http: HttpClient){}

  allUsers(){
    const url_api = 'http://localhost:3000/users/';
    return this._http.get(url_api);
  }

  userById(id: string){
    const url_api = `http://localhost:3000/users/${id}`;
    return (this.user = this._http.get(url_api));
  }

  userSave(){}

  userUpdate(){}
  

}