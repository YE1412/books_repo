'use client'

import { forwardRef, useState, useEffect } from 'react';
import { createUserAction, updateUserAction, updateUserRolesAction } from '@/app/lib/actions';
//import { useFormState } from 'react-dom';
import styles from '@/app/ui/login.module.css';
import { Input as NextUIInput, 
	Button, 
	InputProps, 
	Breadcrumbs, 
	BreadcrumbItem, 
	Select, 
	SelectItem,
	useDisclosure,
	Code } from '@/app/lib/nextui';
import { useForm, 
	SubmitHandler, 
	Controller } from 'react-hook-form';
//import type { BookModel } from '@/app/lib/definitions';
import { cloneElement } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewUserSchema, UserCreationSchema, UpdateUserRolesSchema } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import {
	PlusCircleIcon
} from '@/app/lib/icons';
import UserCreateModal from '@/app/ui/modal';

export function Form({defaultValues, children, className, submit, isProfile, isNew}: {defaultValues: LoginRequest}) {
	type Inputs = z.infer<typeof NewUserSchema>;
	const { isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
	const [modalPlacement, setModalPlacement] = useState("top");
	var isModal = true;
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>({
		defaultValues,
		resolver: isNew ? zodResolver(NewUserSchema) : isProfile ? zodResolver(UserCreationSchema) : zodResolver(UpdateUserRolesSchema)
	})
	const [ message, setMessage ] = useState(null);
	const onSubmit: SubmitHandler<Inputs> = async (
		data: Inputs
	) => {
		//console.log(`Form submitted : ${isModal} !`);
		if (isModal)
			onOpen();
		else{
			//console.log(data);
			var res;
			if (!isNew)
				res = await submit(data.id, data);
			else
				res = await submit(data);
			if (res !== undefined && res.message !== undefined)
				setMessage(res.message);
		}
	}
	const changeModalState = () => {
		//console.log(`Modal validation click !`);
		onClose();
		isModal = false;
		handleSubmit(onSubmit)();
	}
	const modalTitle = () => {
		if (isNew) {
			return 'User Creation Confirmation';
		} else if(isProfile){
			return 'Profile Update Confirmation';
		} else {
			return 'User Update Confirmation';
		}

	}
	const modalBody = () => {
		if (isNew) {
			return 'Are you sure to create a new user ?';
		} else if(isProfile){
			return 'Are you sure to update your profile ?';
		} else {
			return 'Are you sure to update the user ?';
		}
	}
	return (
		<>
			{
				message !== null 
					? 	<div className="justify-center flex flex-wrap gap-4 mb-5">
				      		<Code color="danger">{message}</Code>
				    	</div> 
				    : 	<></>
			}
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
			<UserCreateModal isOpen={isOpen} 
				onOpenChange={onOpenChange} 
				title={modalTitle()} 
				body={modalBody()}
				type="user"
				onValid={changeModalState} />
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

export default function CreateUserForm(props): React.FC<IFormProps> {
	//const [book, setBook] = useState({id: 0, title: '', author: '', isbn: '', pagesNum: 0});
	//console.log(props);
	//const { isOpen, onOpen, onOpenChange } = useDisclosure();
	//const [modalPlacement, setModalPlacement] = useState("top");
	//const createUser = createUserAction;
	const roles = [
		{label: 'Administrator', value: 1, description: "Advanced user with maximum privilege"},
		{label: 'Simple User', value: 2, description: "Default user with minimum privilege"}
	];

	const title = () => {
		if (props.isNew) {
			return 'Create User';
		} else if (props.isProfile) {
			return 'Update Profile';
		} else {
			return 'Update User';
		}
	}
	const breadcrumbsTitle = () => {
		if (props.isNew) {
			return 'User Creation Form';
		} else if (props.isProfile) {
			return 'Profile Form';
		} else {
			return 'User Modification Form';
		}		
	}
	const breadcrumbsLink = () => {
		if (props.isNew) {
			return `/book/user/create`;
		} else if (props.isProfile) {
			return `/book/user/${props.userId}/profile`;
		} else {
			return `/book/user/${props.userId}/update`;
		}
	}
	const submitAction = () => {
		if (props.isNew) {
			return createUserAction;
		} else if (props.isProfile) {
			return updateUserAction;
		} else {
			return updateUserRolesAction;
		}
	}
	const defaultUser = () => {
		var ret = {};
		if (!props.isNew){
			//console.log(props.user);
			var r = "";
			props.user.roles.forEach((role, ind) => {
				r += role.id.toString();
				if (ind < (props.user.roles - 1))
					r += ",";
			});
			ret.id = props.user.id;
			ret.name = props.user.name;
			ret.username = props.user.username;
			ret.email = props.user.email;
			ret.password = '';
			ret.roles = r;
		} else {
			ret.name = '';
			ret.username = '';
			ret.email = '';
			ret.password = '';
			ret.roles = '2';
		}
		return ret;
	};

	return (
		<>
		<Breadcrumbs radius="sm" variant="solid">
			<BreadcrumbItem>Users</BreadcrumbItem>
			<BreadcrumbItem href={breadcrumbsLink()}>{breadcrumbsTitle()}</BreadcrumbItem>
		</Breadcrumbs>
		<div className="w-full mx-auto lg:mx-0 justify-center mt-6">
			<h2 className="text-center text-4xl font-bold tracking-tight sm:text-6xl text-slate-400">{title()}</h2>
	    </div>
		<div className="w-full flex justify-center mt-2">
			<div className="w-[400px] p-5">
				<Form submit={submitAction()} defaultValues={defaultUser()} className="flex flex-col gap-4" isProfile={props.isProfile} isNew={props.isNew}>
					{
						(props.isProfile || !props.isNew) && <Input size="lg" 
							variant="bordered"
							isRequired
							radius="md"
							name="id"
							label="#"
							type="text" 
							labelPlacement="outside"
							isDisabled />
					}
					<Input size="lg" 
						variant="bordered"
						isRequired
						radius="md"
						name="name"
						label="Name"
						type="text" 
						labelPlacement="outside"
						isDisabled={!props.isProfile && !props.isNew} />
					<Input size="lg" 
						variant="bordered" 
						isRequired 
						radius="md" 
						label="Username" 
						name="username" 
						type="text" 
						labelPlacement="outside"
						isDisabled={!props.isProfile && !props.isNew} />
					<Input name="email"
						variant="bordered" 
						type="text" 
						size="lg" 
						isRequired 
						radius="md" 
						label="Email" 
						labelPlacement="outside"
						isDisabled={!props.isProfile && !props.isNew} />
					<Input name="password"
						variant="bordered" 
						type="password" 
						size="lg" 
						isRequired 
						radius="md" 
						label="Password" 
						labelPlacement="outside"
						isDisabled={!props.isProfile && !props.isNew} />
					{
						(!props.isNew && !props.isProfile) && <Select name="roles"
							isRequired 
							label="User roles"
							selectionMode="multiple"
							labelPlacement="outside"
							radius="md"
							variant="bordered" 
							size="lg"
							defaultSelectedKeys={["2"]}>
								{
									roles.map((role) => (
										<SelectItem key={role.value} value={role.value}>
											{role.label}
										</SelectItem>
									))
								}
							</Select>
					}
					<Button type="submit" startContent={<PlusCircleIcon className="w-4" />}>Submit</Button>
				</Form>
			</div>
		</div>
		</>
	);
}