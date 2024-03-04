'use client'

import { createContext, useContext } from 'react';
import React, { useState, useEffect } from 'react';
import { fetchUserSession } from '@/app/lib/data';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const UserSessionContext = createContext();

export function useUserContext(){
	return useContext(UserSessionContext);
}

export default function UserSessionProvider({ 
	children 
}:{
	children: React.ReactNode
}){
	const [userSession, setUserSession] = useState(null);
	const searchParams = useSearchParams();
	const pathname = usePathname();
	useEffect(() => {
		const updateUserSession = async () => {
			const updatedUserSession = await fetchUserSession();
			if (updatedUserSession !== null){
				setUserSession(updatedUserSession);
				//console.log('User Session !');
				//console.log(userSession);
			} else {
				setUserSession(null);
			}
			//console.log('User Session !');
			//console.log(updatedUserSession);
		};
		updateUserSession();
	}, [searchParams, pathname]);
	return (
		<UserSessionContext.Provider value={userSession}>
			{children}
		</UserSessionContext.Provider>
	);
}