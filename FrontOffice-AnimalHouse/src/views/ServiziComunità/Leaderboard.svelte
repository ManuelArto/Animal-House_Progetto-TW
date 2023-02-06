<script>
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Spinner, A, Button } from 'flowbite-svelte'
    import { ENDPOINT } from '../../utils/const';

	async function getLeaderboardScores() {
		const res = await fetch(ENDPOINT.SCORES_LIST)
		const data = await res.json()

		if (data.error) {
			throw new Error(data.error)
		} else {
			return data
		}
	}
	
	let scoresPromise = getLeaderboardScores()
</script>
  

<style>

</style>
<div class="mx-2 md:mx-auto lg:w-3/5 my-8">	
	<div class="flex justify-center mb-8">
		<p class="flex items-center text-2l text-center font-bold mr-5 ">Classifica degli utenti al gioco Quiz</p>
		<Button pill class="flex self-center items-center p-5" size='xs' href={ENDPOINT.GAME_QUIZ}>
			<span class="hidden sm:block mr-2">Link Game Page</span>
			<svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
		  </Button>
	</div>
	{#await scoresPromise}
		<div class="text-center"><Spinner/></div>
	{:then scores}
		<Table>
			<TableHead class="bg-blue-400 text-center">
			<TableHeadCell>#</TableHeadCell>
			<TableHeadCell>Username</TableHeadCell>
			<TableHeadCell>Punteggio</TableHeadCell>
			<TableHeadCell>Data Punteggio</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each scores as score, i}
					<TableBodyRow class="text-center border-separate border-spacing-2 border border-slate-400">
						{#if i==0}
							<img alt="icon firt position" class="mx-auto mt-2 w-10 h-10" src="https://img.icons8.com/emoji/256/1st-place-medal-emoji.png">
						{:else if i==1}
							<img alt="icon second position" class="mx-auto mt-2 w-10 h-10" src="https://img.icons8.com/emoji/256/2nd-place-medal-emoji.png"	z>
						{:else if i==2}
							<img alt="icon third position" class="mx-auto mt-2 w-10 h-10" src="data:image/jpeg;base64,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">
						{:else}
							<TableBodyCell>{i + 1}</TableBodyCell>
						{/if}
						<TableBodyCell>{score.name}</TableBodyCell>
						<TableBodyCell><b>{score.punteggio}</b></TableBodyCell>
						<TableBodyCell class="italic">{`${score.date}  ${score.time}`}</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	{:catch error}
		<div class="text-center">
			<p style="color: red">Ops qualcosa è andato storto: {error.message}<br>Ricarica la pagina</p>
		</div>
	{/await}
</div>