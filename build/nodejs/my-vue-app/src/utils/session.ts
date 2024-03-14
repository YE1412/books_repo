export const addItem = (key: string, val: any): void => {
	localStorage.setItem(key, JSON.stringify(val))
}

export const retreiveItem = (key: string): any => {
	return localStorage.getItem(key) !== null
		? JSON.parse(localStorage.getItem(key))
		: null
}

export const deleteItem = (key: string): void => {
	localStorage.removeItem(key)
}

export const deleteAll = (): void => {
	localStorage.clear()
}