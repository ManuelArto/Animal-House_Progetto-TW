<script>
	import {
		Footer,
		FooterBrand,
		FooterLinkGroup,
		FooterLink,
	} from "flowbite-svelte";
</script>
<style>
	#footer {
		box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.5);
	}
</style>

<div id="footer">
	<Footer class="mt-16 bg-gray-50 static bottom-0 w-full" footerType="socialmedia">
		<div class="container mx-auto max-w-screen-xl text-center">
			<FooterBrand href="#/" src="favicon.ico" alt="AnimalHouse Logo" name="AnimalHouse" 
				aClass="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"/>
			<p class="my-6 text-gray-500 dark:text-gray-400">
				Garantiamo il benessere dei tuoi animali domestici
			</p>
			<FooterLinkGroup ulClass="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
				<span class="mr-4 cursor-pointer hover:underline md:mr-6" >Chi siamo</span>
				<span class="mr-4 cursor-pointer hover:underline md:mr-6" >Contatti</span>
				<span class="mr-4 cursor-pointer hover:underline md:mr-6" >Redazione</span>
				<span class="mr-4 cursor-pointer hover:underline md:mr-6" >Comitato scientifico</span>
				<span class="mr-4 cursor-pointer hover:underline md:mr-6" >FAQs</span>
			</FooterLinkGroup>
			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
				© 2022-2023 All Rights Reserved.
			</span>
		</div>
	</Footer>
</div>