import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '@app/service';
import { userLoginModel } from '@app/models';
import { ToolbarLoginComponent } from '@app/toolbar-login.component';
import { first } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatGridListModule,
    ToolbarLoginComponent,
    MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  messages : string[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public userService: UserService, 
    private _router: Router, 
    private _route: ActivatedRoute, 
    private _snackbar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: object){}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
    {
      //console.log(history);
      if (history !== undefined && history && history.state['messages'] !== undefined && history.state['messages'].length){
        this.messages = history.state['messages'];
        this.openSnackBar(this.messages);
      }
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
      // Get the first value of results
      .pipe(first())
      .subscribe({
        next: (userResponse) => {
          this._router.navigateByUrl('/home', {state: {messages: [userResponse.message]}})
        },
        error: error => {
          console.log(error);
          this.messages = [error];
          this.openSnackBar(this.messages);
        }
      });
  }
}
