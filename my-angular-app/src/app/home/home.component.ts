import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BookService, UserService } from '@app/service';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { ToolbarComponent } from '../toolbar.component';
import { BookModel, UserModel, RoleModel } from '@app/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, 
    MatPaginatorModule, 
    MatButtonModule, 
    RouterLink, 
    RouterLinkActive, 
    MatSortModule, 
    MatGridListModule,
    ToolbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{
  public books: BookModel[] = [];
  user: UserModel | null = null;
  constructor(public bookService: BookService, private _userService: UserService, private _router: Router, private _route: ActivatedRoute, private _snackbar: MatSnackBar){
    _userService.user.subscribe((x:UserModel | null) => this.user = x);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  messages : string[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<BookModel>();
  private getAllBooks(): void{
    this.bookService.getBooks().subscribe(booksFetched => {
      // console.log(booksFetched);
      this.books = booksFetched;
      this.dataSource = new MatTableDataSource<BookModel>(this.books);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    // this.dataSource = new MatTableDataSource<BookModel>(ELEM_DATA);
  }
  
  ngOnInit(){
    this.getAllBooks();
    // console.log(history.state);
    /*if (this._route.snapshot.queryParams['messages'] !== undefined 
      && this._route.snapshot.queryParams['messages'].length){
      this.messages = this._route.snapshot.queryParams['messages'];
      // console.log(this.messages);
      this.openSnackBar(this.messages);
    }*/
    if (history !== undefined && history && history.state['messages'] !== undefined && history.state['messages'].length){
      this.messages = history.state['messages'];
      this.openSnackBar(this.messages);
    }
    this.displayedColumns = this.isAdmin ? ['id', 'title', 'author', 'isbn', 'pagesNum', 'actions'] : ['id', 'title', 'author', 'isbn', 'pagesNum'];
    // console.log(this.books);
  }

  // buttonClick() {
  //   console.log(`Button pressed !`);
  // }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteBook(e: Event, id : number){
    // console.log(`Delete click on Book id : ${id}`);
    this.bookService.deleteBook(id)
      .subscribe(() => {
        // this._router.navigate(['/home'], {state: {messages: ['Book Successfully deleted']}});
        window.location.reload();
    });        
    // window.location.reload();
    e.preventDefault();
  }

  openSnackBar(strs: string[]){
    var str = Array.prototype.join.call(strs, "\n");
    // console.log(str);
    this._snackbar.open(str, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  get isAdmin() {
    var hasAdminRole: boolean = false;
    if (this.user !== null){
        this.user['roles'].forEach((userRole: RoleModel) => {
            if (userRole.id == 1){
                hasAdminRole = true;
                return;
            }
        });
    }
    return this.user !== null && hasAdminRole;
  }
}

/*const ELEM_DATA: BookModel[] = [
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250},
  {id: 1, title: 'ATitle', author: 'AnAuthioor', isbn: '12654785', pagesNum: 250}
];*/