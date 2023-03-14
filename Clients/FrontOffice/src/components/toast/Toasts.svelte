<script>
	import { dismissToast, toasts } from "../../store/toasts";
	import Toast from "./Toast.svelte";

</script>

{#if $toasts}
	<section class="w-min mx-auto">
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				on:dismiss={() => dismissToast(toast.id)}>{@html toast.message}</Toast
			>
		{/each}
	</section>
{/if}

<style lang="postcss">
	section {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		margin-top: 1rem;
		justify-content: center;
		flex-direction: column;
		z-index: 1000;
	}
</style>
