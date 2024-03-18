'use server'

import { NextResponse, type NextRequest } from "next/server";
import { getSessionData, setSessionData } from '@/app/lib/actions';
export async function middleware(request: NextRequest) {
	const currentSession = request.cookies.get('session');
	const currentUser = currentSession !== undefined && currentSession.value ? JSON.parse(currentSession.value) : null;
	let redirectUrl = null;
	//console.log("Current session");
	//console.log(currentSession);
	//console.log("Current user");
	//console.log(currentUser);
	//console.log(request.cookies);
	//console.log("Next URL");
	//console.log(request.nextUrl.pathname);
	//console.log(request.nextUrl.pathname.startsWith('/book'));

	/*If user is connected and destination doesn't start with '/book'*/
	if (currentSession !== undefined && currentUser !== null && !request.nextUrl.pathname.startsWith('/book') && request.nextUrl.pathname !== "/favicon.ico"){
		//console.log("Redirecting to /book/home");
		redirectUrl = new URL('/book/home', request.url);
	}
	/*If user isn't connected and destination doesn't start with '/login'*/
	if (currentSession !== undefined && currentUser === null && !request.nextUrl.pathname.startsWith('/login')){
		redirectUrl = new URL('/login', request.url);
	}
	/*If user isn't connected and destination doesn't start with '/book/user/create' OR '/login' OR '/'*/
	if ((currentSession === undefined && !request.nextUrl.pathname.startsWith('/book/user/create')) 
		&& (currentUser === null && !request.nextUrl.pathname.startsWith('/book/user/create'))
		&& (currentUser === null && !request.nextUrl.pathname.startsWith('/login'))
		&& (currentUser === null && !request.nextUrl.pathname.startsWith('/'))){
		redirectUrl = new URL('/login', request.url);
	}

	const newHeaders = new Headers(request.headers);
	newHeaders.set("x-url", request.url);
	if (currentSession !== undefined)
		newHeaders.set("Set-Cookie", JSON.stringify(currentSession)+ "; SameSite=None; Secure")
	//console.log(request.url);
	//console.log(newHeaders);
	//console.log('RedirectUrl value');
	//console.log(redirectUrl);
	//console.log('Header Response');
	//console.log(newHeaders);
	if (redirectUrl !== null){
		return NextResponse.redirect(redirectUrl);
	} else if (request.nextUrl.pathname === '/login'){
		return NextResponse.next();
	} else {
		return NextResponse.next({
			request: newHeaders
		});
	}
};

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};