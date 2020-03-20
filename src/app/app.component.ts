import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "./services/user.service";
import { User } from "./models/user";
import { NgForm } from '@angular/forms';
import { Location } from "@angular/common";
import { MatPaginator, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public user = this._api.selectedUser;
  constructor(public _api: UserService, public location: Location ){}
  private users: User;
  displayedColumns: string[] = ['code', 'name', 'lastname', 'age', 'acciones'];
  public dataSource: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    return this._api.allUsers().subscribe((users: User) => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
    },
    err => {
      console.error('Ocurrio el error: '+ err )
    });
  }

  onPreUpdateUser(user: User){
    this._api.selectedUser = Object.assign({}, user);
  }

  onDeleteUser(id: string){
    if (confirm('¿Eliminar registro?')) {
      this._api.deleteUser(id).subscribe(user => location.reload(true));
    }
  }

  newUser(userForm: User){
    this._api.selectedUser = {
      id:null,
      name: '',
      lastname: '',
      age: '',
      code: ''
    }
  }

  onSaveUser(userForm: NgForm){
    if (userForm.value.userId == null) {
      this._api.saveUser(userForm.value).subscribe(user => location.reload(true));
      console.log('Guardar');
    }else {
      this._api.updateUser(userForm.value).subscribe(user => location.reload(true));
      console.log('Editar');
    }
  }

  filterUser(filterValue: string){
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }

}