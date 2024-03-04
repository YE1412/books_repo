'use server'

import { NextResponse, type NextRequest } from "next/server";
import { getSessionData, setSessionData } from '@/app/lib/actions';
export async function middleware(request: NextRequest) {
	const currentSession = await getSessionData()?.value;
	const currentUser! = currentSession !== undefined && currentSession ? currentSession.user : null;
	var redirectUrl = null;
	console.log("MiddleWare Action");
	console.log(currentSession);
	console.log(request.nextUrl.pathname);
	if (currentUser !== undefined && currentUser && !request.nextUrl.pathname.startsWith('/book')){
		redirectUrl = new URL('/book/home', request.url);
	}

	if (currentUser !== undefined && !currentUser && !request.nextUrl.pathname.startsWith('/login')){
		redirectUrl = new URL('/login', request.url);
	}
	console.log(request.url);
	return NextResponse.next({
		request: {
			headers: new Headers({ "x-url": request.url })
		},
		redirect: redirectUrl
	});
};

export const config = {
	matcher: ['\/((?!api|_next\/static|_next/image|.*\\.png$).*)']
};