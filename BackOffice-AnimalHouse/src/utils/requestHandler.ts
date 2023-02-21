export async function handleRequest(endpoint: string, options: RequestInit) {
	return await fetch(endpoint, options)
}
