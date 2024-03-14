import {
	SunIcon,
	MoonIcon
} from '@/app/lib/icons';
/*import { useTheme } from 'next-themes';*/
import {
  Button
} from "@/app/lib/nextui";

export default function ThemeSwitch() {
	const { theme, setTheme } = useTheme();
	const isActive = theme === "light";
	const switchClasses = `flex items-center justify-center w-6 h-6 text-dark bg-white rounded-full transform ${
		isActive ? 'tanslate-x-0' : 'translate-x-6'	
	} transition-transform duration-500 ease-in-out`;
	const toggleTheme = () => {
		setTheme(theme === 'light' ? "dark" : "light");
	};
	return (
		<div className="relative w-14 h-8 rounded-full p-1 cursor-pointer bg-[#ccc]" onClick={toggleTheme}>
			<Button className={switchClasses}
				startContent={isActive ? <SunIcon className="w-6" /> : <MoonIcon className="w-6" />}>
			</Button>
		</div>
	)
}