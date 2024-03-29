import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '@app/service';
import { UserModel, RoleModel, UserRequestModel, UserResponseModel } from '@app/models';
import { ToolbarLoginComponent } from '@app/toolbar-login.component';
import { ToolbarComponent } from '@app/toolbar.component';
import { first } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { DialogComponentComponent } from '@app/dialog-component/dialog-component.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-ops',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatGridListModule,
    ToolbarLoginComponent,
    MatIconModule,
    MatSelectModule,
    ToolbarComponent],
  templateUrl: './user-ops.component.html',
  styleUrl: './user-ops.component.css'
})

export class UserOpsComponent implements OnInit, OnDestroy{
  messages: string[] = [];
  title: string = 'Sign up';
  opsType: string = '';
  submitButtonIcon: string = 'person_add';
  submitButtonText: string = 'Sign up';
  dialogTitle: string = 'User Creation Confirmation';
  dialogContent: string = 'Are you sure to create a new account ?';
  id: number = 0;
  user: UserModel | null;
  userFormModel: UserModel = {
    id: 0,
    name: '',
    username: '',
    email: '',
    password: '',
    roles: [
      {id: 2, name: 'ROLE_USER'}
    ]
  };
  allRoles: RoleModel[] = [
    {id: 1, name: 'ROLE_ADMIN'},
    {id: 2, name: 'ROLE_USER'}
  ]
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private sub: any;

  constructor(public userService: UserService, 
    private _router: Router, 
    private _route: ActivatedRoute, 
    private _snackbar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: object,
    public dialog: MatDialog){ 
      this.userService.user.subscribe((x:UserModel | null) => this.user = x);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
    {
      //console.log(history);
      if (history !== undefined && history && history.state['messages'] !== undefined && history.state['messages'].length){
        this.messages = history.state['messages'];
        this.openSnackBar(this.messages);
      }
      this.sub = this._route.params.subscribe(params => {
        if (params !== undefined && params['id'] !== undefined){
          if (params['type'] !== undefined && params['type'] === 'profile'){
            this.opsType = 'profile';
            this.title = 'Profile Update';
            this.submitButtonIcon = 'account_circle';
            this.submitButtonText = 'Update';
            this.dialogTitle = 'Update Profile Confirmation';
            this.dialogContent = 'Are you sure to update your profile ?';
            this.userFormModel.id = this.user!.id;
            this.userFormModel.name = this.user!.name;
            this.userFormModel.username = this.user!.username;
            this.userFormModel.email = this.user!.email;
            this.userFormModel.password = this.user!.password;
            this.userFormModel.roles = this.user!.roles;
            this.userForm = new FormGroup({
              name: new FormControl(this.userFormModel.name, [Validators.required]),
              username: new FormControl(this.userFormModel.username, [Validators.required]),
              email: new FormControl(this.userFormModel.email, [Validators.required, Validators.email]),
              password: new FormControl('', [Validators.required, forbiddenPasswordValidator(/^.{8,25}$/)]),
              roles: new FormControl(this.formatRoles(this.userFormModel.roles), [Validators.required]),
            })
          } else if(params['type'] !== undefined && params['type'] === 'roles') {
            this.id = params['id'];
            this.opsType = 'roles';
            this.title = 'User Update';
            this.submitButtonIcon = 'update';
            this.submitButtonText = 'Update';
            this.dialogTitle = 'Update User Confirmation';
            this.dialogContent = 'Are you sure to update this user ?';
            this.userService.getUser(params['id']).subscribe((x: UserModel | null) => {
              if (x){
                this.userFormModel.id = x.id;
                this.userFormModel.name = x.name;
                this.userFormModel.username = x.username;
                this.userFormModel.email = x.email;
                this.userFormModel.password = x.password;
                this.userFormModel.roles = x.roles;
              }
              this.userForm = new FormGroup({
                name: new FormControl({ value: this.userFormModel.name, disabled: true}, [Validators.required]),
                username: new FormControl({ value: this.userFormModel.username, disabled: true}, [Validators.required]),
                email: new FormControl({ value: this.userFormModel.email, disabled: true}, [Validators.required, Validators.email]),
                password: new FormControl({  value: '', disabled: true}),
                roles: new FormControl(this.formatRoles(this.userFormModel.roles), [Validators.required]),
              })
            })
          }
        } else {
          this.opsType = 'new';
        }
      })
    }
  }

  userForm = new FormGroup({
    name: new FormControl(this.userFormModel.name, [Validators.required]),
    username: new FormControl(this.userFormModel.username, [Validators.required]),
    email: new FormControl(this.userFormModel.email, [Validators.required, Validators.email]),
    password: new FormControl(this.userFormModel.password, [Validators.required, forbiddenPasswordValidator(/^.{8,25}$/)]),
    roles: new FormControl(this.formatRoles(this.userFormModel.roles), [Validators.required]),
  })

  formatRoles(roles: RoleModel[]): number[]{
    return roles.map((val) => {
      return val.id;
    })
  }

  get name(){
    return this.userForm.get('name');
  }

  get username(){
    return this.userForm.get('username');
  }

  get email(){
    return this.userForm.get('email');
  }

  get password(){
    return this.userForm.get('password');
  }

  get roles(){
    return this.userForm.get('roles');
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onSubmit(){
    //console.log(`Submitting click ${this.opsType} !`);
    var nameForm = this.userForm.value.name !== undefined && this.userForm.value.name !== null ? this.userForm.value.name : '';
    var usernameForm = this.userForm.value.username !== undefined && this.userForm.value.username !== null ? this.userForm.value.username : '';
    var emailForm = this.userForm.value.email !== undefined && this.userForm.value.email !== null ? this.userForm.value.email : '';
    var passwordForm = this.userForm.value.password !== undefined && this.userForm.value.password !== null ? this.userForm.value.password : '';
    var rolesForm = this.userForm.value.roles !== undefined && this.userForm.value.roles !== null ? this.userForm.value.roles : [];
    var idForm = this.opsType === 'profile' ? this.user!.id : this.opsType === 'roles' ? this.id : undefined;
    var formattedRole = rolesForm.map(r => r.toString());
    var u = new UserRequestModel(nameForm, usernameForm, emailForm, passwordForm, formattedRole, idForm);
    //console.log(u);
    if (this.opsType === 'new'){
      this.userService.addUser(u)
        .subscribe((res) => {
          console.log(res);
          //this.router.navigate(['/login']);
          this._router.navigateByUrl('/login', {state: {messages: ['User added successfully !']}});
        },
        (err) => {
          //console.log(err);
          this.messages = [err.message];
          this.openSnackBar(this.messages);
        }
      );
    } else if (this.opsType === 'roles') {
      //nameForm = ;
      idForm = this.userFormModel.id;
      nameForm = this.userFormModel.name;
      usernameForm = this.userFormModel.username;
      emailForm = this.userFormModel.email;
      passwordForm = this.userFormModel.password;
      //rolesForm = this.formatRoles(this.userFormModel.roles);
      //formattedRole = rolesForm.map(r => r.toString());
      u = new UserRequestModel(nameForm, usernameForm, emailForm, passwordForm, formattedRole, idForm);
      //console.log(u);
      this.userService.updateUserRoles(u.id || 0, u).subscribe((userResponse: UserResponseModel) => {
        if (userResponse.code === 0){
          this._router.navigateByUrl('/users', {state: {messages: [userResponse.message]}});
        } else {
          this.messages = [userResponse.message];
          this.openSnackBar(this.messages);
        }
      },
      (err: Error) => {
        console.log(err);
      })
    } else {
      this.userService.updateUser(u.id !== undefined ? u.id : 0, u)
      .subscribe((userResponse: UserResponseModel) => {
          //this.router.navigate(['/home']);
        if (userResponse.code === 0)
          this._router.navigateByUrl('/home', {state: {messages: ['Profile successfully updated !']}});
        else{
          this.messages = [userResponse.message];
          this.openSnackBar(this.messages);
        }
      },
      (err) => {
        console.log(err);
        //this.messages = [];
        //this.openSnackBar(this.messages);
      });
      //this.router.navigate(['/home'], {state: {messages: ['Profile successfully updated !']}});
    }
  }

  openSnackBar(strs: string[]){
    var str = Array.prototype.join.call(strs, "\n");
    // console.log(str);
    this._snackbar.open(str, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  openDialog(dialogType?: string, dialogTitle?: string, dialogContent?: string): void {
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      data: {title: dialogTitle || this.dialogTitle, content: dialogContent || this.dialogContent, type: dialogType},
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`The dialog was closed ${result}`);
      if (result !== undefined) {
        // Yes Clicked
        if (dialogType !== undefined && dialogType === 'deleteUser')
          this.deleteUser()
        else
          this.onSubmit();
      } else {
        // No Clicked
      }
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.user!.id || 0)
      .subscribe(() => {
          this.logout();
          this._router.navigateByUrl('/login', {state: {messages: ['User deleted so logged out !']}});
      })
      //e.preventDefault();
  }

  logout() {
    this.userService.logout();
  }

};

export function forbiddenPasswordValidator(passwordRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = passwordRe.test(control.value);
    // console.log(forbidden);
    return !forbidden ? { forbiddenPassword: { value: control.value } } : null;
  };
};
