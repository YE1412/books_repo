import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import UserForm from '@/app/ui/book/user/user-form';
import { fetchUserData } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Update User Page',
  description: 'The official Next.js Book App, built with App Router.'
};

export default async function Page({ params }: {params: {id: number}}) {
	const id = params.id;
	//console.log(id);
	const user = await fetchUserData(id);
	return (
		<>
			<UserForm userId={id} user={user} isNew={false} isProfile={false} />
		</>
	)
}