'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
//import { usePathname, useRouter, useSearchParams } from 'next/navigation';
//import { fetchThemeSession } from '@/app/lib/data';
import { ThemeProvider as ThemeProviding } from 'next-themes';

//export const ThemeContext = createContext();

/*export function useThemeContext(){
	return useContext(ThemeContext);
}*/

export default function ThemeProvider({ 
	children 
}:{
	children: React.ReactNode
}){
	return (
		<ThemeProviding attribute="class" defaultTheme="system" enableSystem>
			{children}
		</ThemeProviding>
	);
}