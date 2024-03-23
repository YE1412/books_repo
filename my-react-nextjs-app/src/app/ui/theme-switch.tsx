'use client'

import {
	SunIcon,
	MoonIcon
} from '@/app/lib/icons';
import { useTheme } from 'next-themes';
import {
  Switch
} from "@/app/lib/nextui";
import { ThemeContext } from '@/app/theme-provider';
import { useState, useEffect } from 'react';
import { setThemeSessionData } from '@/app/lib/actions';

export default function ThemeSwitch() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const toggleTheme = (isSelected: boolean) => {
		setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
	};

	useEffect(() => setMounted(true),[])

	if (mounted){
		return (
			<Switch
				defaultSelected={resolvedTheme === 'light'}
				size="lg"
				color="primary"
				startContent={<SunIcon />}
				endContent={<MoonIcon />}
				onValueChange={toggleTheme}
			/>
		)
	}
}