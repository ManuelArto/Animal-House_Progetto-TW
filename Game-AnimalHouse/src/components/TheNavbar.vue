<script setup lang="ts">
defineProps<{
	routes: Array<any>
}>()
</script>

<template>
	
	<nav class="navbar navbar-expand-lg navbar-light gradient-custom p-1">
		<!-- Navbar brand -->
		<b-navbar-brand class="navbar-brand" to="/"><img src="@/assets/logo.png" alt="logo" height="70">
		</b-navbar-brand>

		<!-- Toggle button -->
		<b-navbar-toggle v-b-toggle.nav-sidebar></b-navbar-toggle>

		<!-- Collapsible sidebar -->
		<b-offcanvas id="nav-sidebar" title="Menu" shadow backdrop>
			<b-navbar-nav>
				<span v-for="route in routes">
					<b-nav-item v-if="!route.nested" :to="route.path" :key="route.path"
						class="mx-2 mx-lg-1">
						<i :class="route.icon" />
						{{ route.text }}
					</b-nav-item>
					<b-nav-item-dropdown v-else class="mx-2 mx-lg-1">
						<template #button-content>
							<i :class="route.icon" />
							{{ route.text }}
						</template>
						<b-dropdown-item v-for="sub_route in route.routes" :to="sub_route.path" :key="sub_route.path">
							{{sub_route.text}}
						</b-dropdown-item>
					</b-nav-item-dropdown>
				</span>
			</b-navbar-nav>
		</b-offcanvas>
	</nav>

</template>

<style scoped>
.gradient-custom {
	/* fallback for old browsers */
	background: #c471f5;

	/* Chrome 10-25, Safari 5.1-6 */
	background: -webkit-linear-gradient(to right, rgba(196, 113, 245, 1), rgba(250, 113, 205, 1));

	/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	background: linear-gradient(to right, rgb(203, 245, 113), rgb(250, 216, 113))
}

i {
	font-size: 1rem;
}
</style>