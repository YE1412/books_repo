'use client'

import { forwardRef, useState, useEffect } from 'react';
import { updateBookAction } from '@/app/lib/actions';
//import { useFormState } from 'react-dom';
import styles from '@/app/ui/login.module.css';
import { Input as NextUIInput, Button, InputProps, Breadcrumbs, BreadcrumbItem } from '@/app/lib/nextui';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
//import type { BookModel } from '@/app/lib/definitions';
import { cloneElement } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookCreationSchema } from '@/app/lib/data';
import {
	ArrowPathIcon
} from '@/app/lib/icons';
import {Code} from "@nextui-org/react";

export function Form({defaultValues, children, className, submit}: {defaultValues: LoginRequest}) {
	type Inputs = z.infer<typeof BookCreationSchema>;

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>({
		defaultValues,
		resolver: zodResolver(BookCreationSchema)
	})
	const [message, setMessage] = useState(null);
	const onSubmit: SubmitHandler<Inputs> = async (
		data: Inputs
	) => {
		const res = await submit(data.id, data);
		if (res !== undefined)
			setMessage(res.message);
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
								/*rules={child?.props?.rules}*/
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

export default function UpdateBookForm({bookId, book}): React.FC<IFormProps> {
	const updateBook = updateBookAction;
	//console.log(bookId);
	return (
		<>
		<Breadcrumbs radius="sm" variant="solid">
			<BreadcrumbItem href="/book/home">Books</BreadcrumbItem>
			<BreadcrumbItem href={`/book/${bookId}/update`}>Update Book</BreadcrumbItem>
		</Breadcrumbs>
		<div className="w-full mx-auto lg:mx-0 justify-center mt-6">
			<h2 className="text-center text-4xl font-bold tracking-tight sm:text-6xl text-slate-400">Update Book Form</h2>
	    </div>
		<div className="w-full flex justify-center mt-2">
			<div className="w-[400px] p-5">
				<Form submit={updateBook} defaultValues={book} className="flex flex-col gap-4">
					<Input
						isDisabled
						isRequired
						name="id"
						label="#"
						type="text" 
						labelPlacement="outside"/>
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
						labelPlacement="outside" />
					<Button type="submit" startContent={<ArrowPathIcon className="w-4" />}>Submit</Button>
				</Form>
			</div>
		</div>
		</>
	);
}