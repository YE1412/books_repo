'use client'

import { forwardRef, useState } from 'react';
import { loginAction, setSessionData } from '@/app/lib/actions';
//import { useFormState } from 'react-dom';
import styles from '@/app/ui/login.module.css';
import { Input as NextUIInput, Button, InputProps } from '@/app/lib/nextui';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import type { LoginRequest } from '@/app/lib/definitions';
import { cloneElement } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormLoginSchema } from '@/app/lib/data';
import {
	ArrowLeftEndOnRectangleIcon,
	UserIcon,
	EyeSlashIcon
} from '@/app/lib/icons';
import {Code} from "@nextui-org/react";

export function Form({defaultValues, children, className, submit}: {defaultValues: LoginRequest}) {
	type InputsType = z.infer<typeof FormLoginSchema>;
	const [message, setMessage] = useState(null);
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<InputsType>({
		defaultValues,
		resolver: zodResolver(FormLoginSchema)
	})

	const onSubmit: SubmitHandler<InputsType> = async (
		data: InputsType,
		e?: Event
	) => {
		//console.log(e);
		e.preventDefault();
		const res = await submit(data);
		if (res !== undefined)
			setMessage(res.message);
		//console.log(res);	
	};

	return (
		<>
		    {message !== null ? 
		    <div className="justify-center flex flex-wrap gap-4 mb-5">
		      <Code color="danger">{message}</Code>
		    </div> : <></>} 
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={className}
				noValidate
				action='/'
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

export default function LoginForm(): React.FC<IFormProps> {
	const login = loginAction;
	/*async function setSess(){
		'use server'
		setSessionData({user: {name: 'Ok'}});
	}*/
	//console.log(loginAction);
	//const [errorMessage, dispatch] = useFormState(loginAction, undefined);
	return (
		<>
		<div className="w-full mx-auto lg:mx-0 justify-center mt-6">
			<h2 className="text-center text-4xl font-bold tracking-tight sm:text-6xl text-slate-400">Login Form</h2>
	    </div>
		<div className="w-full flex justify-center mt-2">
			<div className="w-[400px] p-5">
				<Form submit={login} defaultValues={{usernameOrEmail: '', password: ''}} className="flex flex-col gap-4">
					<Input size="lg" 
						variant="bordered" 
						isRequired 
						radius="md" 
						label="Username/Email" 
						name="usernameOrEmail" 
						type="text" 
						labelPlacement="outside"
						startContent={<UserIcon className="w-4"/>} />
					<Input name="password"
						variant="bordered" 
						type="password" 
						size="lg" 
						isRequired 
						radius="md" 
						label="Password" 
						labelPlacement="outside" 
						startContent={<EyeSlashIcon className="w-4"/>}/>
					<Button type="submit" startContent={<ArrowLeftEndOnRectangleIcon className="w-4" />}>Login</Button>
				</Form>
			</div>
		</div>
		</>
	);
}