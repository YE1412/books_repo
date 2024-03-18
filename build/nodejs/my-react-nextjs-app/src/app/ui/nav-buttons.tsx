'use client'

import clsx from 'clsx';
import { usePathname, useSearchParams,  useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
	HomeIcon,
	UserPlusIcon,
	ArrowLeftStartOnRectangleIcon,
	ArrowLeftEndOnRectangleIcon,
} from '@/app/lib/icons';
import {
  NavbarBrand, 
  NavbarItem, 
  NavbarMenuToggle,
  Button,
  Link
} from "@/app/lib/nextui";
import { LinksEndOffline, LinksEndOnline } from '@/app/lib/routes';
import { logout as logoutData } from '@/app/lib/data';
import { useUserContext } from '@/app/user-provider';

export function LinkOrButton({isLink, link, ind, pathname, onLogout}) {
	const ButtonIcon = link.icon;
	if (isLink){
		return (<Button
			key={ind}
			as={Link} 
			variant="flat"
			href={link.href}
			color="primary"
			startContent={ButtonIcon ? <ButtonIcon className="w-6" /> : <></>}>
			<p key={ind} className={
					clsx(
						"hidden md:block",
						{
							"text-primary": pathname !== link.href,
							"text-foreground": pathname === link.href
						}
					)
				}>
					{link.name}
				</p>
		</Button>)
	}	else {
		return (
			<Button
				key={ind}
				variant="flat"
				color="primary"
				onPress={onLogout}
				startContent={ButtonIcon ? <ButtonIcon className="w-6" /> : <></>}>
				<p key={ind} className={
						clsx(
							"hidden md:block",
							{
								"text-primary": pathname !== link.href,
								"text-foreground": pathname === link.href
							}
						)
					}>
						{link.name}
					</p>
			</Button>
			)
	}
} 

export default function NavButtons() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isAdmin, setIsAdmin] = useState(false);
	//const [userRoles, setUserRoles] = useState([{id: 2, name: "ROLE_USER"}]);
	const [connected, setConnected] = useState(false);
	const user = useUserContext();
	const logout = async () => {
		await logoutData();
		/*router.push('/login');
		router.refresh();*/
	};
	useEffect(() => {
		const updateConnectedAndIsAdmin = async () => {
			//const updatedUserSession = await fetchUserSession();
			var connect = false;
			var admin = false;
			if (user !== null){
				//setUserRoles(updatedUserSession.roles);
				connect = true;
				if (user.roles !== undefined){
					user.roles.forEach((role) => {
						if (role.id === 1){
							admin = true;
							return;
						}
					});
				} else {
					admin = false;
				}
			}
			else{
				connect = false;
				admin = false;
			}
			setIsAdmin(admin);
			setConnected(connect);
		};
		updateConnectedAndIsAdmin();
	}, [user]);
	const links = connected ? LinksEndOnline(user !== undefined && user ? user.id : 0) : LinksEndOffline();
	//console.log(links);
	return (
		links.map((link, ind) => {
			//console.log(link.href);
			const LinkIcon = link.icon;
			const linkHasAdminPrivileges = link.roles !== undefined && Array.prototype.indexOf.call(link.roles, 1) !== -1 ? true : false;
			const linkHasUserPrivileges = link.roles !== undefined && Array.prototype.indexOf.call(link.roles, 2) !== -1 ? true : false;
			//console.log(`Link ${link.name} has admin priviledge : ${linkHasAdminPrivileges}`);
			//console.log(`Link ${link.name} has user priviledge : ${linkHasUserPrivileges}`);
			return ((connected && linkHasAdminPrivileges && isAdmin) || !linkHasAdminPrivileges || !connected || (connected && linkHasUserPrivileges && !isAdmin))
			? (
				<NavbarItem key={ind}>
					<LinkOrButton
						isLink={link.href !== null ? true : false}
						link={link} 
						ind={ind} 
						pathname={pathname}
						onLogout={logout}
					/>
				</NavbarItem>
			) : ('')
		})
	);
}