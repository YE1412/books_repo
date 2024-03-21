import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, throwError } from "rxjs";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environment/environment';
import { userLoginModel, UserResponseModel, UserModel, UserRequestModel } from '@app/models';
import { BrowserStorageService } from '@app/service';
import BaseUrl from '@app/service/back-off-base';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userSubject: BehaviorSubject<UserModel | null>;
  public user: Observable<UserModel | null>;
  private _userResponse: Observable<UserResponseModel>;
  constructor(private _httpClient: HttpClient, private _router: Router, private _sessionStorageService: BrowserStorageService) {
    this._userSubject = new BehaviorSubject<UserModel | null>(_sessionStorageService.get('user') || null);
    this.user = this._userSubject.asObservable();
  }

  public get userValue(): UserModel | null {
    return this._userSubject.value !== undefined && this._userSubject.value ? this._userSubject.value : null;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0){
      // A client-side or network error occurred.
      //console.error('An error occurred : ', error.error);
      return throwError(() => new Error(`An error occurred on cient side : '${error.error}'`));
    } else {
      // The backend returned an unsuccessful response code
      // The response body may contains any clues as to what went wrong
      //console.error(`Backend returned code ${error.status}, body was :`, error.error);
      return throwError(() => new Error(`An error occurred on Backend side : Error Body '${error.error !== undefined ? error.error : '<None>'}', Backend returned code '${error.status !== undefined ? error.status : 'None'}'`));
    }
    // Return an observable with a user-facing error message
    //return throwError(() => new Error('Somtething bad happened; please try again later.'));
  }

  public addUser(userModel: UserRequestModel): Observable<UserResponseModel>{
    return this._httpClient.post<UserResponseModel>(`${BaseUrl}/user/signup`, userModel)
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleError(err))
      );
  }

  public login(userLogin: userLoginModel): Observable<UserResponseModel>{
    return this._httpClient.post<UserResponseModel>(`${BaseUrl}/user/login`, userLogin)
      .pipe(
        //catchError((err: HttpErrorResponse) => this.handleError(err))
        map((userResponse: any) => {
          // Store user details and jwt token in  local storage to keep user looged in between page refreshes
          userResponse.user.token = userResponse.token;
          //console.log(userResponse);
          this._sessionStorageService.set('user', userResponse.user, 30);
          this._userSubject.next(userResponse.user);
          return userResponse;
        })
      );
  }

  public getUser(id: number): Observable<UserModel | null>{
    return this._httpClient.get<UserModel | null>(`${BaseUrl}/user/${id}`)
      .pipe(
        catchError((err) => this.handleError(err))
      );
  }

  public updateUser(id: number, user: UserRequestModel): Observable<UserResponseModel>{
    const url = `${BaseUrl}/user/${id}`;
    return this._httpClient.put<UserResponseModel>(url, user)
      .pipe(
        map((userResponse: any) => {
          // Store user details and jwt token in  local storage to keep user looged in between page refreshes
          var newUser = this.userValue;
          if (newUser && userResponse.code === 0){
            newUser.name = userResponse.user.name;
            newUser.username = userResponse.user.username;
            newUser.email = userResponse.user.email;
            newUser.password = userResponse.user.password;
          }
          //console.log(userResponse);
          this._sessionStorageService.set('user', newUser, 30);
          this._userSubject.next(newUser);
          return userResponse;
        })
      );
  }

  public updateUserRoles(id: number, user: UserRequestModel): Observable<UserResponseModel>{
    const url = `${BaseUrl}/user/roles/${id}`;
    return this._httpClient.put<UserResponseModel>(url, user.roles)
      .pipe(
        catchError((err) => this.handleError(err))
      );
  }

  public getUsers(): Observable<UserModel[]> {
      return this._httpClient.get<UserModel[]>(`${BaseUrl}/user/all`)
        .pipe(
          catchError((err) => this.handleError(err))
        );
  }

  public deleteUser(id: number): Observable<unknown>{
    const url = `${BaseUrl}/user/${id}`;
    return this._httpClient.delete(url)
      .pipe(
        catchError((err) => this.handleError(err))
      );
  }

  public logout() {
    /* Remove user from local storage to log user out */
    this._sessionStorageService.remove('user');
    this._userSubject.next(null);
    this._router.navigate(['/login']);
  }
}

/*const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080'}
  )
}*/
