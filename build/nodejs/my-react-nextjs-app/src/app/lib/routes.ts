import {
	HomeIcon,
	UserPlusIcon,
	ArrowLeftStartOnRectangleIcon,
	ArrowLeftEndOnRectangleIcon,
	BookOpenIcon,
	BookmarkSquareIcon
} from '@/app/lib/icons';

export const LinksCenter = () => {
	return [
		{name: 'Home', href: '/', icon: HomeIcon},
		{name: "Books", href: '/book/home', icon: BookOpenIcon, roles:[1, 2]},
		{name: "New Book", href: '/book/create', icon: BookmarkSquareIcon, roles:[1]}
	];
};

export const LinksEndOffline = () => {
	return [
		{name: 'Login', href: '/login', action: null, icon: ArrowLeftEndOnRectangleIcon},
	];
};

export const LinksEndOnline = () => {
	return [
		{name: 'NewUser', href: '/book/user/create', action: null, icon: UserPlusIcon, roles: [1]},
		{name: 'Logout', href: null, action: 'logout', icon: ArrowLeftStartOnRectangleIcon},
	];
};