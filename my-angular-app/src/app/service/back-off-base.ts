const __HOST__ = process.env.WEBAPP_HOST !== undefined
	? process.env.WEBAPP_HOST
	: 'localhost';
const __PORT__ = process.env.BACKOFF_PORT !== undefined
	? process.env.BACKOFF_PORT
	: '8080';

const BaseUrl = `http://${__HOST__}:${__PORT__}/JEE_SPRINGBOOT_HIBERNATE_EXO/api`;

export default BaseUrl;