import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '@app/service';
import { userLoginModel } from '@app/models';
import { ToolbarLoginComponent } from '@app/toolbar-login.component';
import { first } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatGridListModule,
    ToolbarLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  messages : string[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public userService: UserService, private _router: Router, private _route: ActivatedRoute, private _snackbar: MatSnackBar){}

  ngOnInit(): void {
    /*console.log(this._route);
    console.log(this._router);
    console.log(history);*/
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
  }

  newLoginForm = new FormGroup({
    usernameOrEmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  get usernameOrEmail(){
    return this.newLoginForm.get('usernameOrEmail');
  }

  get password(){
    return this.newLoginForm.get('password');
  }

  openSnackBar(strs: string[]){
    var str = Array.prototype.join.call(strs, "\n");
    // console.log(str);
    this._snackbar.open(str, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  onSubmit(){
    var usernameOrEmailForm = this.newLoginForm.value.usernameOrEmail !== undefined && this.newLoginForm.value.usernameOrEmail !== null ? this.newLoginForm.value.usernameOrEmail : '';
    var passwordForm = this.newLoginForm.value.password !== undefined && this.newLoginForm.value.password !== null ? this.newLoginForm.value.password : ''; 
    var u = new userLoginModel(usernameOrEmailForm, passwordForm);
    this.userService.login(u)
      .pipe(first())
      .subscribe({
        next: (userResponse) => {
          this._router.navigateByUrl('/home', {state: {messages: [userResponse.message]}})
        },
        error: error => {

        }
      });
  }
}
