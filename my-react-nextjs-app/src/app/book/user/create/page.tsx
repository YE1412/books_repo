import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import UserForm from '@/app/ui/book/user/user-form';
//import { fetchBookData } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'User Creation Page',
  description: 'The official Next.js Book App, built with App Router.'
};

export default async function Page() {
	return (
		<>
			<UserForm isNew={true} isProfil={false} />
		</>
	)
}