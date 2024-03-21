import { environment } from '@environment/environment';
/*const __HOST__ = process.env['WEBAPP_HOST'] !== undefined
	? process.env['WEBAPP_HOST']
	: 'localhost';
const __PORT__ = process.env['BACKOFF_PORT'] !== undefined
	? process.env['BACKOFF_PORT']
	: '8080';*/

const BaseUrl = `${environment.apiUrl}/JEE_SPRINGBOOT_HIBERNATE_EXO/api`;

export default BaseUrl;