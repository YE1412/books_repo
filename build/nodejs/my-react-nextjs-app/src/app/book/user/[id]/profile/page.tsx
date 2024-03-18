import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import UserForm from '@/app/ui/book/user/user-form';
//import { fetchUserData } from '@/app/lib/data';
import { getSessionData } from '@/app/lib/actions';

//import { useUserContext } from '@/app/user-provider';

export const metadata: Metadata = {
  title: 'Update Profile Page',
  description: 'The official Next.js Book App, built with App Router.'
};

export default async function Page({ params }: {params: {id: number}}) {
	const id = params.id;
	//console.log(id);
	const user = await getSessionData();
	//console.log(user);
	//const user = await fetchUserData(id);
	return (
		<>
			<UserForm userId={id} user={user} isNew={false} isProfile={true} />
		</>
	)
}