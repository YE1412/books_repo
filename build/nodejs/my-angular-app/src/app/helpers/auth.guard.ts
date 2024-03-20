import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '@app/service';
import { RoleModel } from '@app/models';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate{
	constructor(
		private _router: Router,
		private _userService: UserService,
		@Inject(PLATFORM_ID) public platformId: object
	){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		const user = this._userService.userValue;
		/*console.log("user");
		console.log(user);
		if (isPlatformBrowser(this.platformId)){*/
			if (user !== null && (Object.keys(user).length !== 0 && user.constructor === Object)) {
				/*Check if route is restricted by role*/
				var hasRole = false;
				route.data['roles'].forEach((routeRole: any) => {
					user.roles.forEach((userRole) => {
						if (routeRole.id === userRole.id){
							hasRole = true;
							return;
						}
					});
					if (hasRole){
						return;
					}
				});
				/*for (const routeRole in route.data['roles']){
					for(const roleUser in user.roles){
						if (routeRole.id === roleUser.id){
							hasRole = true;
							break;
						}
					}
				}*/
				if (route.data['roles'] && !hasRole){
					/* Role not authorised so redirect to home page */
					this._router.navigate(['/']);
					return false;
				}

				/* authorised so return true */
				return true;
			}

			/* Not logged in so redirect to login page with the return url */
			this._router.navigateByUrl('/login', { state: {messages: ['You must login to access this page'], returnUrl: state.url}});
			return false;
		/*} 
		/*else {
			return true;
		}*/
	}
}