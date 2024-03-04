import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import UpdateBookForm from '@/app/ui/book/update-form';
import { fetchBookData } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Update Book Page',
  description: 'The official Next.js Book App, built with App Router.'
};

export default async function Page({ params }: {params: {id: number}}) {
	const id = params.id;
	//console.log(id);
	const book = await fetchBookData(id);
	return (
		<>
			<UpdateBookForm bookId={id} book={book} />
		</>
	)
}