<script>
    import { TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Button, Modal, Label, Input, Img } from "flowbite-svelte"
    import { onMount } from "svelte"
    import { user } from "../../store";
    import { ENDPOINT } from "../../utils/const"
    import { formSubmit } from "../../utils/formRequestHandler";

    let isUserLogged;
	user.isUserLogged.subscribe(value => isUserLogged = value );

    async function getThreads() {
		const res = await fetch(ENDPOINT.THREADS_LIST)
		const data = await res.json()

		if (data.error) {
			alert(JSON.stringify(data.error))
		} else {
			return data
		}
	}
	
    let threads = []
    let searchTerm = ''
    $: filteredThreads = threads.filter(
        (thread) => thread.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    )

    onMount(async () => {
        threads = await getThreads()
    })
    let currentThread = null

    let isNewPostModalOpen = false
    let isNewThreadModalOpen = false

    async function newThreadSubmit(event) {
        const newThread = await formSubmit(event)
        if (newThread.error)
            alert(JSON.stringify(newThread.error))
        else
            threads = [newThread, ...threads]
        
        isNewThreadModalOpen = false
    }
    async function newMessageSubmit(event) {
        event.target.action = ENDPOINT.THREADS_NEW_MESSAGE(currentThread.id)
        const newThread = await formSubmit(event)
        if (newThread.error)
            alert(JSON.stringify(newThread.error))
        else {
            threads = threads.map((thread) => thread.id == newThread.id ? newThread : thread)
            currentThread = newThread
        }
        
        isNewPostModalOpen = false
    }

    function showUnauthorizedAlert(message) {
        alert(`Devi essere loggato per poter ${message}`)
    }

</script>

<style>
    a:hover{    
        color: #93C5FD;
        text-decoration: underline;
        font-weight: bold;
    }

    img {
        max-height: 450px;
    }

</style>

<img id="banner" src="images/banner_bacheca_eccoloqua.png" class="object-scale-down w-full " alt="banner bacheca eccolo qua"/>

<div class="container mx-auto px-4 max-w-3/4 md:mt-10 mb-48">
    <div class="md:absolute md:top-20 md:w-1/2">
        <p class="flex-shrink-0 text-black font-bold text-xl uppercase">Bacheca</p>
        <p class="flex-shrink-0 text-black text-3xl font-bold">Eccolo qua</p>
        <p class="flex-shrink-0 text-black text-md mb-10 leading-none"> Troverai i dubbi e le risposte dei nostri utenti</p>
    </div>
    {#if !currentThread}
    <!-- THREADS PAGE -->
        <Button on:click={() => !isUserLogged ? showUnauthorizedAlert("creare una nuova discussione") : isNewThreadModalOpen = true} class="mb-10 inline-flex align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-4 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-800">
            <svg class="h-8 w-8 text-white mr-2"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4" />  <line x1="12" y1="13" x2="12" y2="22" />  <polyline points="9 19 12 22 15 19" /></svg> 
            Nuova Discussione
        </Button>
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
            {#each filteredThreads as thread}
                <TableBodyRow class="border-separate border-spacing-2 border border-slate-400">
                <TableBodyCell><a href={null} on:click={() => currentThread = thread}>{thread.title}</a></TableBodyCell>
                <TableBodyCell>{thread.messages.length}<br> <span style="color: gray;">posts</span></TableBodyCell>
                <TableBodyCell>Creato da: <b>{thread.creatorUsername}</b> <br> {thread.createdAt}</TableBodyCell>
                </TableBodyRow>
            {/each}
            </TableBody>
        </TableSearch>
    {:else}
        <!-- SINGLE THREAD PAGE -->
        <a href="#/servizi/bachecaEccoloQua" on:click={() => currentThread = null}>
            <svg class="w-6 h-6 inline-flex" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg> Torna indietro
        </a> <br>
        <Button on:click={() => !isUserLogged ? showUnauthorizedAlert("postare un nuovo messaggio") : isNewPostModalOpen = true} class="mt-8 inline-flex align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-4 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-800">
            <svg class="h-8 w-8 text-white mr-2"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4" />  <line x1="12" y1="13" x2="12" y2="22" />  <polyline points="9 19 12 22 15 19" /></svg>
            New Post
        </Button><br><br>
        
        <span class="text-2xl">{currentThread.title}</span><br>

        <div class="flex flex-wrap">
            <div class="w-full pr-4 pl-4">
                {#each currentThread.messages as message}   
                <div class="relative mt-8 flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 mb-4">
                    <div class="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900">
                        <div class="flex items-start flex-wrap w-full">
                            <div class="flex-1">
                                {message.authorUsername}
                            </div>
                            <div class="text-gray-700 text-xs ml-3">
                                {message.createdAt}
                            </div>
                        </div>
                    </div>
                    <div class="flex-auto p-6">
                        <p>
                            {message.content}
                        </p>
                    </div>
                </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<Modal title="Nuova Discussione" bind:open={isNewThreadModalOpen}>
    <form class="grid grid-rows-1 grid-flow-col gap-2" id="newThreadForm" action={ENDPOINT.THREADS_NEW} on:submit|preventDefault={newThreadSubmit} method="POST">
        <Label class="space-y-1">
            <span class="mt-4">Inserisci il titolo</span>
            <Input type="text" name="title" placeholder="Argomento della discussione" required />
        </Label>
    </form>
    <Button type="submit" form="newThreadForm" color="green"> Conferma </Button>
    <Button color="red" on:click={() => isNewThreadModalOpen = false}> Cancella </Button>
</Modal>

<Modal title="Nuovo Messaggio" bind:open={isNewPostModalOpen}>
    <form class="grid grid-rows-1 grid-flow-col gap-2" id="newMessageForm" on:submit|preventDefault={newMessageSubmit} method="POST">
        <Label class="space-y-1">
            <textarea name="content" id="description" rows="4" placeholder="Inserisci il testo" required class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
        </Label>
    </form>
    <Button type="submit" form="newMessageForm" color="green"> Conferma </Button>
    <Button color="red" on:click={() => isNewPostModalOpen = false}> Cancella </Button>
</Modal>