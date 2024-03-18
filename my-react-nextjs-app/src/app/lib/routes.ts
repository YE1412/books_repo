import {
	HomeIcon,
	UserPlusIcon,
	ArrowLeftStartOnRectangleIcon,
	ArrowLeftEndOnRectangleIcon,
	BookOpenIcon,
	BookmarkSquareIcon,
	UsersIcon,
	UserIcon
} from '@/app/lib/icons';

export const LinksCenter = () => {
	return [
		{name: 'Home', href: '/', icon: HomeIcon},
		{name: "Books", href: '/book/home', icon: BookOpenIcon, roles:[1, 2]},
		{name: "New Book", href: '/book/create', icon: BookmarkSquareIcon, roles:[1]},
		{name: "Users", href: '/book/user/home', icon: UsersIcon, roles:[1]},
	];
};

export const LinksEndOffline = () => {
	return [
		{name: 'New User', href: '/book/user/create', action: null, icon: UserPlusIcon},
		{name: 'Login', href: '/login', action: null, icon: ArrowLeftEndOnRectangleIcon}
	];
};

export const LinksEndOnline = (id) => {
	return [
		{name: 'Profile', href: `/book/user/${id}/profile`, action: null, icon: UserIcon, roles: [1, 2]},
		{name: 'Logout', href: null, action: 'logout', icon: ArrowLeftStartOnRectangleIcon},
	];
};