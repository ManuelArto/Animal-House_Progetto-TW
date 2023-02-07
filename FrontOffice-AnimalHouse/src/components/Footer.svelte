<script>
	import {
		Footer,
		FooterBrand,
		FooterLinkGroup,
		FooterLink,
	} from "flowbite-svelte";
</script>

<Footer class="shadow-2xl mt-16 bg-gray-50" footerType="socialmedia">
	<div class="container mx-auto max-w-screen-xl text-center">
		<FooterBrand href="/" src="favicon.ico" alt="AnimalHouse Logo" name="AnimalHouse" 
			aClass="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"/>
		<!-- TODO: modifica frase footer -->
		<p class="my-6 text-gray-500 dark:text-gray-400">
			Garantiamo il benessere dei tuoi animali domestici
		</p>
		<FooterLinkGroup ulClass="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
			<FooterLink aClass="mr-4 hover:underline md:mr-6" >Chi siamo</FooterLink>
			<FooterLink aClass="mr-4 hover:underline md:mr-6" >Contatti</FooterLink>
			<FooterLink aClass="mr-4 hover:underline md:mr-6" >Redazione</FooterLink>
			<FooterLink aClass="mr-4 hover:underline md:mr-6" >Comitato scientifico</FooterLink>
			<FooterLink aClass="mr-4 hover:underline md:mr-6" >FAQs</FooterLink>
		</FooterLinkGroup>
		<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
			© 2022-2023 All Rights Reserved.
		</span>
	</div>
</Footer>