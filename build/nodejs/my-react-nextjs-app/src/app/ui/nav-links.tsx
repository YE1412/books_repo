'use client'

import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
	HomeIcon,
	BookOpenIcon,
	BookmarkSquareIcon
} from '@/app/lib/icons';
import {
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  Button,
  Link
} from "@/app/lib/nextui";
import { LinksCenter } from '@/app/lib/routes';
//import { fetchUserSessionRoles } from '@/app/lib/data';
//import { useRouter } from 'next/router';
import { useUserContext } from '@/app/user-provider';

export default function NavLinks() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const links = LinksCenter();
	const pathname = usePathname();
	const [isAdmin, setIsAdmin] = useState(false);
	//const [userRoles, setUserRoles] = useState([]);
	const user = useUserContext();
	useEffect(() => {
		const updateIsAdmin = async () => {
			//console.log("User in useEffect !");
			//console.log(user);
			var admin = false;
			if (user !== null) {
				if (user.roles !== undefined){
					Array.prototype.forEach.call(user.roles, (role) => {
						if (role.id === 1){
							admin = true;
							return;
						}
					});
				}
			}
			setIsAdmin(admin);
		};
		updateIsAdmin();
	}, [user]);
	//console.log("User from provider !");
	//console.log(user);
	return (
			links.map((link, ind) => {
				//console.log(link.href);
				const LinkIcon = link.icon;
				const linkHasAdminPrivileges = link.roles !== undefined && Array.prototype.indexOf.call(link.roles, 1) !== -1 ? true : false;
				//console.log(`Link ${link.name} has admin privilege : ${linkHasAdminPrivileges}`);
				//console.log(`User has admin privilege : ${isAdmin}`);
				//console.log(`User has roles : ${userRoles}`);
				return ((linkHasAdminPrivileges && isAdmin) || !linkHasAdminPrivileges)
					? (
						<NavbarItem key={ind}>
							<Link
								key={ind}
								href={link.href}
								className="p-0 bg-transparent data-[hover=true]:bg-transparent"
								color={
									clsx(
										{
											"primary": pathname !== link.href,
											"foreground": pathname === link.href
										}
									)
								}
							>
								<LinkIcon className="w-6" />
								{link.name}
								<p className="hidden" key={ind}>{link.name}</p>
							</Link>			
						</NavbarItem>
					) : ('')
				
			})
	);
}