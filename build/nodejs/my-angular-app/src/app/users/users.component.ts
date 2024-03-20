import { Component, AfterViewInit, ViewChild, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService, ThemeService } from '@app/service';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { ToolbarComponent } from '@app/toolbar.component';
import { UserModel, RoleModel } from '@app/models';
import { isPlatformBrowser } from '@angular/common';
import { DialogComponentComponent } from '@app/dialog-component/dialog-component.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, 
    MatPaginatorModule, 
    MatButtonModule, 
    RouterLink, 
    RouterLinkActive, 
    MatSortModule, 
    MatGridListModule,
    ToolbarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, AfterViewInit {
  public users: UserModel[] = [];
  user: UserModel | null = null;
  constructor(private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: object,
    private themeService: ThemeService,
    public dialog: MatDialog){
      _userService.user.subscribe((x: UserModel | null) => this.user = x);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  messages: string[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<UserModel>();
  dialogTitle: string = 'User Delete Confirmation';
  dialogContent: string = 'Are you sure to delete this user ?';
  private getAllUsers(): void{
    this._userService.getUsers().subscribe((usersFetched: UserModel[]) => {
      this.users = usersFetched;
      this.dataSource = new MatTableDataSource<UserModel>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit() {
    this.getAllUsers();
    if (isPlatformBrowser(this.platformId))
    {
      if (history !== undefined && history && history.state['messages'] !== undefined && history.state['messages'].length){
        this.messages = history.state['messages'];
        this.openSnackBar(this.messages);
      }
    }
    this.displayedColumns = this.isAdmin ? 
      ['id', 'name', 'username', 'email', 'password', 'roles', 'actions'] : 
      ['id', 'name', 'username', 'email', 'password', 'roles'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteUser(id: number) {
    this._userService.deleteUser(id)
      .subscribe(() => {
        if (id === this.user!.id){
          this.logout();
          this._router.navigateByUrl('/login', {state: {messages: ['User deleted so logged out !']}});
        } else {
          window.location.reload();
        }
      })
      //e.preventDefault();
  }

  openSnackBar(strs: string[]){
    var str = Array.prototype.join.call(strs, "\n");
    // console.log(str);
    this._snackbar.open(str, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  openDialog(e: Event, id: number): void {
    e.preventDefault();
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      data: {title: this.dialogTitle, content: this.dialogContent},
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      //console.log(`The dialog was closed ${result}`);
      if (result !== undefined) {
        // Yes Clicked
        this.deleteUser(id);
      } else {
        // No Clicked
      }
    });
  }

  logout() {
    this._userService.logout();
  }

  displayUserFriendlyPasswords(pass: string): string{
    var ret = '';
    ret = pass.substring(7, 13) + '...';
    return ret;
  }

  displayUserFriendlyRoles(roles: RoleModel[]): string{
    var ret = '';
    roles.forEach((val, ind) => {
      ret += val.name === 'ROLE_ADMIN' ? 'Administrator' : 'Simple user';
      if (ind !== roles.length - 1){
        ret += ', ';
      }
    })
    return ret;
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

  get isDark() {
    return this.themeService.isDarkMode();
  }
}
