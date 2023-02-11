<script>
	import { Dropdown, DropdownItem, Button } from "flowbite-svelte"

	export let divClass
	export let cartProducts = []

</script>

<div id="bell" class={divClass + " inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"}>
	<svg aria-hidden="true" class="w-8" fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
	{#if cartProducts.length}
		<div class="flex relative">
		  <div class="inline-flex relative -top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
		</div>
	{/if}
</div>
<Dropdown triggeredBy="#bell" class="w-full max-w-sm divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700">
	<div slot="header" class="text-center py-2 font-bold"> Carrello </div>
	<DropdownItem class="flex space-x-4">
		<div class="pl-3 w-full">
			<div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span class="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
			<div class="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
		</div>
	</DropdownItem>
	<div slot="footer" class="flex justify-around">
		<Button color="red" class="w-1/2 p-4 -my-1 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
			Clear all
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="ml-4 bi bi-x-square-fill" viewBox="0 0 16 16">
				<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
			</svg>
		</Button>
		<Button color="blue" class="w-1/2 py-2 -my-1 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
			Vai al checkout
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="ml-4 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
				<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
			</svg>
		</Button>
	</div>
</Dropdown>