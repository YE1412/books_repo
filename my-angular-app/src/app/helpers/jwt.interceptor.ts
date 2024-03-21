import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { UserService } from '@app/service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private _userService: UserService){}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		/* Add auth header with Jwt if user is logged in and request is to api url */
		const user = this._userService.userValue;
		const isLoggedIn = user && user.token;
		const isApiUrl = request.url.startsWith(environment.apiUrl);
		//console.log(user);
		if (isLoggedIn && isApiUrl) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${user.token}`
				}
			});
		} else {
			request = request.clone({
				setHeaders: {
					Authorization: `Not logged !`
				}
			});
		}

		return next.handle(request);
	}
}