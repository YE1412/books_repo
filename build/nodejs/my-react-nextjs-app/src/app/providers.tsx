'use-client'

import { NextUIProvider } from '@nextui-org/react';
/*import  { ThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';*/

export function Providers({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<NextUIProvider>
			{children}
		</NextUIProvider>
	)
}