'use client'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Breadcrumbs, BreadcrumbItem, getKeyValue, Link, Pagination } from '@/app/lib/nextui';
import { fetchUsersData } from '@/app/lib/data';
import React, { useState, useEffect } from 'react';
//import { deleteBookAction } from '@/app/lib/actions';
import axiosInstance from 'axios';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useUserContext } from '@/app/user-provider';
import { ArrowPathIcon, TrashIcon } from '@/app/lib/icons';
import { useAsyncList } from "@react-stately/data";
import { Code, useDisclosure } from "@/app/lib/nextui";
import { deleteUserAction, logoutAction } from '@/app/lib/actions'
import UserDeleteModal from '@/app/ui/modal';

export default function UserTable(){
	//const books = await fetchBooksData();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [ message, setMessage ] = useState(null);
	//const [books, setBooks] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	//const [userRoles, setUserRoles] = useState([{id: 2, name: "ROLE_USER"}]);
	//const [userSession, setUserSession] = useState(null);	
	const user = useUserContext();
	const config = (userSession) => {
		let headers = {};
		if (userSession !== null){
			headers.Authorization = `Bearer ${userSession.token}`;
		} else {
			headers.Authorization = `Not logged !`;
		}
		return { headers, method: "DELETE", mode: "no-cors" };
	};
	const handleDelete = async (id, userSession) => {
		const res = await deleteUserAction(id);
		if (res.message !== undefined){
			setMessage(res.message);
		} else if (res.code === 0) {
			if (id === userSession.id){
				await logoutAction();
			} else {
				await list.reload();
			}
		}
	}
	useEffect(() => {
		const updateUserSession = async () => {
			var admin = false;
			if (user !== null){
				//setUserSession(updatedUserSession);
				//setUserRoles(updatedUserSession.roles);
				if (user.roles !== undefined){
					user.roles.forEach((role) => {
						if (role.id === 1){
							admin = true;
							return;
						}
					});
				}
			} else {
				admin = false;
			}
			setIsAdmin(admin);
		};
		updateUserSession();
	}, [user]);
	let columns = [
		{
			key: "id",
			label: "#"
		},
		{
			key: "name",
			label: "Name"
		},
		{
			key: "username",
			label: "Username"
		},
		{
			key: "email",
			label: "Email"
		},
		{
			key: "password",
			label: "Password"
		},
		{
			key: "roles",
			label: "Roles"
		}
	];
	if (isAdmin){
		Array.prototype.push.call(columns, {key: "actions", label: "Actions"});
	} else {
		if (columns.length === 7){
			Array.prototype.splice.call(columns, 6, 1);
		}
	}
	let list = useAsyncList({
		async load(){
			const updatedUsers = await fetchUsersData();
			//console.log(updatedUsers);
			let userList = [];
			if (updatedUsers.message !== undefined){
				setMessage(updatedUsers.message);
			} else {
				userList = updatedUsers;
			}
			//console.log(updatedBooks);
			//console.log(books);
			return {
				items: userList
			};
		},
		async sort({items, sortDescriptor}) {
			return {
		        items: items.sort((a, b) => {
		          let first = a[sortDescriptor.column];
		          let second = b[sortDescriptor.column];
		          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

		          if (sortDescriptor.direction === "descending") {
		            cmp *= -1;
		          }

		          return cmp;
		        }),
      		};
		}
	});
	const [page, setPage] = useState(1);
  	const rowsPerPage = 4;
  	const pages = Math.ceil(list.items.length / rowsPerPage);
	const userItems = React.useMemo(() => {
	    const start = (page - 1) * rowsPerPage;
	    const end = start + rowsPerPage;
    	return list.items.slice(start, end);
  	}, [page, list.items]);
  	const renderCell = React.useCallback((user, columnKey) => {
		const cellValue = user[columnKey];
		switch(columnKey){
			case "password":
				var ret = cellValue.substring(7, 12) + "...";
				return ret;
				break;
			case "roles":
				return (
					<>
					{
						cellValue.map((value, ind) => {
							var print = value.name === 'ROLE_ADMIN' ? 'Administrator' : 'Simple User';
							if (ind < cellValue.length - 1)
								print += ", ";
							return (<span key={value.id}>{print}</span>)
						})
					}
					</>
				)
				break; 
			case "actions":
				return (
					<>
						<Button as={Link} href={`/book/user/${user['id']}/update`} color="primary" startContent={<ArrowPathIcon className="w-4"/>}>Update</Button> | <Button color="danger" onPress={() => openModal(user['id'])} startContent={<TrashIcon className="w-4"/>}>Delete</Button>
					</>
				);
				break;
			default:
				return cellValue;
				break;
		}
	}, []);
	const { isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
	const [modalPlacement, setModalPlacement] = useState("top");
	const [userIdToDelete, setUserIdToDelete] = useState(0);
	const changeModalState = async (userId) => {
		//console.log(`Modal validation click deleting book ${bookId} !`);
		onClose();
		//isModal = false;
		await handleDelete(userId, user);
	}
	const openModal = (userId) => {
		setUserIdToDelete(userId);
		onOpen();
	}
  	//console.log(page);
	//console.log(books);
	//console.log('Axios Instance in Component');
	//console.log(axiosInstance);
	return (
		<>
			<Breadcrumbs radius="sm" variant="solid">
				<BreadcrumbItem href="/book/user/home">Users</BreadcrumbItem>
			</Breadcrumbs>
			<div className="w-full mx-auto lg:mx-0 justify-center mt-6">
				<h2 className="text-center text-4xl font-bold tracking-tight sm:text-6xl text-slate-400">Users List</h2>
		    </div>
		    <div className="w-full flex justify-center mt-2">
				<div className="w-[80%] p-5">
					{message !== null ? 
				    <div className="justify-center flex flex-wrap gap-4 mb-5">
				      <Code color="danger">{message}</Code>
				    </div> : <></>}
		    		<Table isStriped aria-label="Book collection"
		    			sortDescriptor={list.sortDescriptor}
		    			onSortChange={list.sort}
		    			bottomContent={ userItems.length > 0 ?
		    				<div className="flex w-full justify-center">
		    					<Pagination 
		    						isCompact
		    						showControls
		    						showShadow
		    						color="primary"
		    						page={page}
		    						total={pages}
		    						onChange={(page) => setPage(page)}
		    					/>
		    				</div> : <></>
		    			}>
		    			<TableHeader columns={columns}>
		    				{(column) => column.key !== 'actions' ? <TableColumn key={column.key} allowsSorting>{column.label}</TableColumn>
		    				: <TableColumn key={column.key}>{column.label}</TableColumn> }
		    			</TableHeader>
		    			{ userItems.length > 0 ? <TableBody items={userItems}>
		    				{(item) => (
			    				<TableRow key={item.id}>
			    				{
			    					(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>
			    				}
			    				</TableRow>
			    			)}
		    			</TableBody> : <TableBody emptyContent={ "No rows to display." }>{[]}</TableBody> }
		    		</Table>
		    	</div>
		    </div>
		    <UserDeleteModal isOpen={isOpen}
		    	onOpenChange={onOpenChange}
		    	title="Deleting User Confirmation"
		    	body="Are you sure to delete this user ?"
		    	userId={userIdToDelete}
		    	type="user"
		    	onValid={changeModalState} />
		</>
	)
}