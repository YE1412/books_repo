'use client'
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Breadcrumbs, BreadcrumbItem, getKeyValue, Link, Pagination } from '@/app/lib/nextui';
import { fetchBooksData } from '@/app/lib/data';
import React, { useState, useEffect } from 'react';
import { deleteBookAction } from '@/app/lib/actions';
import axiosInstance from 'axios';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useUserContext } from '@/app/user-provider';
import { ArrowPathIcon, TrashIcon } from '@/app/lib/icons';
import { useAsyncList } from "@react-stately/data";
import { Code, useDisclosure } from "@/app/lib/nextui";
import BookDeleteModal from '@/app/ui/modal';

export default function BookTable(){
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
	const handleDelete = async (id) => {
		const res = await deleteBookAction(id);
		if (res.message !== undefined){
			setMessage(res.message);
		} else if (res.code === 0){
			await list.reload();
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
			key: "title",
			label: "Title"
		},
		{
			key: "author",
			label: "Author"
		},
		{
			key: "isbn",
			label: "ISBN"
		},
		{
			key: "pagesNum",
			label: "Pages Number"
		},
	];
	if (isAdmin){
		Array.prototype.push.call(columns, {key: "actions", label: "Actions"});
	} else {
		if (columns.length === 6){
			Array.prototype.splice.call(columns, 5, 1);
		}
	}
	let list = useAsyncList({
		async load(){
			const updatedBooks = await fetchBooksData();
			let bookList = [];
			if (updatedBooks.message !== undefined){
				setMessage(updatedBooks.message);
			} else {
				bookList = updatedBooks;
			}
			//console.log(updatedBooks);
			//console.log(books);
			return {
				items: bookList
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
	const bookItems = React.useMemo(() => {
	    const start = (page - 1) * rowsPerPage;
	    const end = start + rowsPerPage;
    	return list.items.slice(start, end);
  	}, [page, list.items]);
  	const renderCell = React.useCallback((book, columnKey) => {
		const cellValue = book[columnKey];
		//console.log('User Session in callback function !');
		//console.log(sessionUser);
		switch(columnKey){
			case "actions":
				return (
					<>
						<Button as={Link} href={`/book/${book['id']}/update`} color="primary" startContent={<ArrowPathIcon className="w-4"/>}>Update</Button> | <Button color="danger" onPress={() => openModal(book["id"])} startContent={<TrashIcon className="w-4"/>}>Delete</Button>
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
	const [bookIdToDelete, setBookIdToDelete] = useState(0);
	const changeModalState = async (bookId) => {
		//console.log(`Modal validation click deleting book ${bookId} !`);
		onClose();
		//isModal = false;
		await handleDelete(bookId);
	}
	const openModal = (bookId) => {
		setBookIdToDelete(bookId);
		onOpen();
	}
  	//console.log(page);
	//console.log(books);
	//console.log('Axios Instance in Component');
	//console.log(axiosInstance);
	return (
		<>
			<Breadcrumbs radius="sm" variant="solid">
				<BreadcrumbItem href="/book/home">Books</BreadcrumbItem>
			</Breadcrumbs>
			<div className="w-full mx-auto lg:mx-0 justify-center mt-6">
				<h2 className="text-center text-4xl font-bold tracking-tight sm:text-6xl text-slate-400">Book List</h2>
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
		    			bottomContent={ bookItems.length > 0 ?
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
		    			{ bookItems.length > 0 ? <TableBody items={bookItems}>
		    				{(item) => (
			    				<TableRow key={item.id}>
			    				{
			    					(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>
			    				}
			    				</TableRow>
			    			)}
		    			</TableBody> : <TableBody emptyContent={"No rows to display."}>{[]}</TableBody> }
		    		</Table>
		    	</div>
		    </div>
		    <BookDeleteModal isOpen={isOpen}
		    	onOpenChange={onOpenChange}
		    	title="Deleting Book Confirmation"
		    	body="Are you sure to delete this book ?"
		    	bookId={bookIdToDelete}
		    	type="book"
		    	onValid={changeModalState} />
		</>
	)
}