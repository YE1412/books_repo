import CreateBookForm from '@/app/ui/book/create-form';
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Create Book Page',
	description: 'The official Next.js Book App, built with App Router.'
};

function Page() {
	//console.log('Login Page Rendering...');
	return (
		<>
			<div>
				<CreateBookForm />
			</div>
		</>
	);
}

export default Page;