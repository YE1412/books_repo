'use client'

import { forwardRef, useState } from 'react';
import { createBookAction } from '@/app/lib/actions';
//import { useFormState } from 'react-dom';
import styles from '@/app/ui/login.module.css';
import { Input as NextUIInput, Button, InputProps, Breadcrumbs, BreadcrumbItem, Code, useDisclosure } from '@/app/lib/nextui';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import type { BookModel } from '@/app/lib/definitions';
import { cloneElement } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewBookSchema } from '@/app/lib/data';
import {
	PlusCircleIcon
} from '@/app/lib/icons';
import BookCreateModal from '@/app/ui/modal';

export function Form({defaultValues, children, className, submit}: {defaultValues: LoginRequest}) {
	type InputsType = z.infer<typeof NewBookShema>;
	const { isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
	const [modalPlacement, setModalPlacement] = useState("top");
	var isModal = true;
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<InputsType>({
		defaultValues,
		resolver: zodResolver(NewBookSchema)
	})
	const [ message, setMessage ] = useState(null);
	const onSubmit: SubmitHandler<InputsType> = async (
		data: InputsType
	) => {
		if (isModal)
			onOpen();
		else{
			const res = await submit(data);
			if (res !== undefined)
				setMessage(res.message);
		}
	}

	const changeModalState = () => {
		//console.log(`Modal validation click !`);
		onClose();
		isModal = false;
		handleSubmit(onSubmit)();
	}
	
	return (
		<>
			{message !== null ? 
		    <div className="justify-center flex flex-wrap gap-4 mb-5">
		      <Code color="danger">{message}</Code>
		    </div> : <></>}
			<form
				action={handleSubmit(onSubmit)}
				className={className}
				noValidate
			>
				{
					children.map((child) => {
						const name = child?.props?.name;
						return name ? (
							<Controller
								key={name}
								name={name}
								control={control}
								rules={child?.props?.rules}
								render={({field}) => {
									return cloneElement(child, {
										errorMessage: errors[name]?.message,
										validationState: errors[name] ? 'invalid' : 'valid',
										...field,
									})
								}}
							/>) : (child)
						})
					}
			</form>
			<BookCreateModal isOpen={isOpen}
				onOpenChange={onOpenChange}
				title="Book Creation Confirmation"
				body="Are you sure to create this book ?"
				type="book"
				onValid={changeModalState}/>
		</>
	)	
};

export interface RuleProps {
	rules: {
		[k in string]: {
			value: boolean | string;
			message: string;
		}
	}
}

export const Input: React.FC<InputProps & RuleProps> = forwardRef((props, ref) => {
	return <NextUIInput ref={ref} {...props} />;
})

export default function CreateBookForm(): React.FC<IFormProps> {
	const createBook = createBookAction;
	/*async function setSess(){
		'use server'
		setSessionData({user: {name: 'Ok'}});
	}*/
	//console.log(loginAction);
	//const [errorMessage, dispatch] = useFormState(loginAction, undefined);
	return (
		<>
		<Breadcrumbs radius="sm" variant="solid">
			<BreadcrumbItem href="/book/home">Books</BreadcrumbItem>
			<BreadcrumbItem href="/book/create">Create Book</BreadcrumbItem>
		</Breadcrumbs>
		<div className="w-full mx-auto lg:mx-0 justify-center mt-6">
			<h2 className="text-center text-4xl font-bold tracking-tight sm:text-6xl text-slate-400">Create Book Form</h2>
	    </div>
		<div className="w-full flex justify-center mt-2">
			<div className="w-[400px] p-5">
				<Form submit={createBook} defaultValues={{title: '', author: '', isbn: '', pagesNum: 0}} className="flex flex-col gap-4">
					<Input size="lg" 
						variant="bordered" 
						isRequired 
						radius="md" 
						label="Title" 
						name="title" 
						type="text" 
						labelPlacement="outside" />
					<Input name="author"
						variant="bordered" 
						type="text" 
						size="lg" 
						isRequired 
						radius="md" 
						label="Author" 
						labelPlacement="outside" />
					<Input name="isbn"
						variant="bordered" 
						type="text" 
						size="lg" 
						isRequired 
						radius="md" 
						label="Isbn" 
						labelPlacement="outside" />
					<Input name="pagesNum"
						variant="bordered" 
						type="number" 
						size="lg" 
						isRequired 
						radius="md" 
						label="Pages Number" 
						labelPlacement="outside"/>
					<Button type="submit" startContent={<PlusCircleIcon className="w-4" />}>Submit</Button>
				</Form>
			</div>
		</div>
		</>
	);
}