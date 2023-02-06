<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Button, Modal, Label, Input } from "flowbite-svelte"
    import { onMount } from "svelte";
    import {ENDPOINT } from "../../utils/const"
    
    async function getThreads() {
		const res = await fetch(ENDPOINT.THREADS_LIST)
		const data = await res.json()

		if (data.error) {
			throw new Error(data.error)
		} else {
			return data
		}
	}
	
    let threads = []
    let searchTerm = ''
    $: filteredThreads = threads.filter(
        (thread) => thread.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    )

    onMount(async() => {
        threads = await getThreads()
        console.log(threads)
        threads.forEach((item) => console.log(item))
    })
    
    let val = true
    let p
    function change(title){
        val = false
        p = title
    }
    let PostModal = false
    let ThreadModal = false
</script>

<style>
    a:hover{
        color: #93C5FD;
        text-decoration: underline;
        font-weight: bold;
    }
    
</style>
<div
    class="bg-cover bg-center h-auto text-white py-36 px-10 object-fill"
    style="background-image: url(https://www.animalinelmondo.it/uploads/monthly_2021_08/animalinelmondo-1-brd.png.331d4aea8d42da917149364eff7a44b3.png)"
>
    <div class="md:w-1/2">
        <p class="text-black font-bold text-xl uppercase">Bacheca</p>
        <p class="text-black text-3xl font-bold">Eccolo qua</p>
        <p class="text-black text-md mb-10 leading-none">
            Troverai i dubbi e le risposte dei nostri utenti
        </p>
    </div>
</div>

<div class="container mx-auto sm:px-4 max-w-3/4 mt-20">
    {#if val}
        <Button on:click={() => ThreadModal = true}
            class="mb-10 mt-4 inline-flex align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-4 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-800"
            ><svg class="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4" />  <line x1="12" y1="13" x2="12" y2="22" />  <polyline points="9 19 12 22 15 19" /></svg> New Thread
        </Button>
        <div class="flex flex-wrap ">
            <div class="md:w-full pr-4 pl-4">
                <TableSearch placeholder="Search by title" hoverable={true} bind:inputValue={searchTerm}>
                    <TableHead class="bg-blue-300 rounded-xl">
                        <TableHeadCell>titolo</TableHeadCell>
                        <TableHeadCell><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                        </TableHeadCell>
                        <TableHeadCell><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </TableHeadCell>
                    </TableHead>
                    <TableBody class="divide-y">
                    {#each filteredThreads as item}
                        <TableBodyRow class="border-separate border-spacing-2 border border-slate-400">
                        <TableBodyCell><a href="#/servizi/bachecaEccoloQua" on:click={() => change(item.title)}>{item.title}</a></TableBodyCell>
                        <TableBodyCell>{item.messages.length}<br> <span style="color: gray;">posts</span></TableBodyCell>
                        <TableBodyCell>Creato da: <b>{item.creatorUsername}</b> <br> {item.createdAt}</TableBodyCell>
                        </TableBodyRow>
                    {/each}
                    </TableBody>
                </TableSearch>
            </div>
        </div>
    {:else}
        <a  href="#/servizi/bachecaEccoloQua" on:click={() => val = true}>
            <svg class="w-6 h-6 inline-flex" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg> Back
        </a> <br>
        <Button on:click={() => PostModal = true}
            class="mt-8 inline-flex align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-4 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-800"
            ><svg class="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4" />  <line x1="12" y1="13" x2="12" y2="22" />  <polyline points="9 19 12 22 15 19" /></svg> New Post
        </Button><br><br>
        
        <span class="text-2xl">{p}</span><br>

        <div class="flex flex-wrap ">
            <div class="md:w-full pr-4 pl-4">
                {#each filteredThreads as item}
                    {#if p === item.title}
                        {#each item.comment as comment}   
                        <div class="relative mt-8 flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 mb-4">
                            <div class="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900">
                                <div class="flex items-start flex-wrap w-full">
                                    <img
                                        src={comment.img}
                                        class="w-10 h-10 rounded-full"
                                        alt="foto_profilo"
                                    />
                                    <div class="flex-1 ml-3">
                                        <span>{comment.author}</span>
                                        <div class="text-gray-700 text-xs">{comment.data}</div>
                                    </div>
                                    <div class="text-gray-700 text-xs ml-3">
                                        <div>Member since <strong>01/01/2019</strong></div>
                                        <div><strong>134</strong> posts</div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-auto p-6">
                                <p>
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                        {/each}
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</div>

<Modal title="New Thread" bind:open={ThreadModal} autoclose>
    <div class="grid grid-rows-1 grid-flow-col gap-2">
        <Label class="space-y-1">
            <span class="mt-4">Insert the topic of thred</span>
            <Input type="text" name="title" placeholder="Topic of your thread" required />
        </Label>
    </div>
    <svelte:fragment slot='footer'>
      <Button color="green">Confirm</Button>
      <Button color="red">Cancel</Button>
    </svelte:fragment>
</Modal>

<Modal title="New Post" bind:open={PostModal} autoclose>
    <div class="grid grid-rows-1 grid-flow-col gap-2">
        <Label class="space-y-1">
            <span>Insert the text</span>
            <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description of your post"></textarea>
        </Label>
    </div>
    <svelte:fragment slot='footer'>
      <Button color="green">Confirm</Button>
      <Button color="red">Cancel</Button>
    </svelte:fragment>
</Modal>