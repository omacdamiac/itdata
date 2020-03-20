import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "./services/user.service";
import { User } from "./models/user";
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'itdata';
  constructor(public _api: UserService ){}
  displayedColumns: string[] = ['code', 'name', 'lastname', 'age'];
  public dataSource: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    return this._api.allUsers().subscribe((users: User) => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
    },
    err => {
      console.error('Ocurrio el error: '+ err )
    });
  }

  filterUser(filterValue: string){
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }

}