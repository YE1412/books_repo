/// <reference types="vite/client" />
import 'vue-router'

export {}

declare module 'vue-router' {
	interface RouteMeta {
		isAdmin?: boolean,
		requiresAuth: boolean,
		title?: string
	}
}