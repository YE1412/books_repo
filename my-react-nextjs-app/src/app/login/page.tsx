import LoginForm from '@/app/ui/login/login-form';
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Login Page',
	description: 'The official Next.js Book App, built with App Router.'
};

function Page() {
	//console.log('Login Page Rendering...');
	return (
		<>
			<div>
				<LoginForm />
			</div>
		</>
	);
}

export default Page;