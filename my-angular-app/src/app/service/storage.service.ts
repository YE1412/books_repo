import { Inject, Injectable, InjectionToken } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
//import { LocalStorageService } from '@app/service';
/*export const BROWSER_STORAGE = new InjectionToken<LocalStorageService>('Browser Storage', {
	providedIn: 'root',
	factory: () => LocalStorage
});*/

@Injectable({
	providedIn: 'root'
})
export class BrowserStorageService {
	constructor(public local: LocalStorageService, public session: SessionStorageService){}

	get(key: string){
		return this.local.get(key);
	}

	set(key: string, value: any, expired: number = 0){
		this.local.set(key, value, expired, "m");
		//this.local.set(key, value);
	}

	remove(key: string){
		this.local.remove(key);
	}

	clear() {
		this.local.clear();
	}
}