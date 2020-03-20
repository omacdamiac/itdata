import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _http: HttpClient){}
  user: Observable<any>;
  public selectedUser: User = {
    id: null,
    name: '',
    lastname: '',
    age: '',
    code: ''
  }

  allUsers(){
    const url_api = 'http://localhost:3000/users/';
    return this._http.get(url_api);
  }

  getUserById(id: string){
    const url_api = `http://localhost:3000/users/${id}`;
    return (this.user = this._http.get(url_api));
  }

  updateUser(user){
    const userId = user.userId;
    const url_api = `http://localhost:3000/users/${userId}`;
    return this._http.put<User>(url_api, user).pipe(map(data => data));
  }

  saveUser(user: User){
    const url_api = `http://localhost:3000/users/`;
    return this._http.post<User>(url_api, user).pipe(map(data => data));

  }

  deleteUser(id: string){
    const url_api = `http://localhost:3000/users/${id}`;
    return this._http.delete<User>(url_api).pipe(map(data => data));
  }


}