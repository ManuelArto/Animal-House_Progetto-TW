<script setup lang="ts">
import type { Route } from "@/model/index"
import { state } from '@/store'

defineProps<{
	routes: Array<Route>
}>()

</script>

<template>

	<nav class="navbar navbar-expand-lg bg-light p-1 shadow fixed-top">
		<!-- Navbar brand -->
		<b-navbar-brand class="navbar-brand" to="/"><img src="@/assets/logo.png" alt="logo" height="70">
		</b-navbar-brand>

		<!-- Toggle button -->
		<b-navbar-toggle v-b-toggle.nav-collapse></b-navbar-toggle>

		<!-- Collapsible -->
		<b-collapse id="nav-collapse" is-nav :visible="state.isCollapseVisible" @shown="state.isCollapseVisible = true" @hidden="state.isCollapseVisible = false">
			<b-navbar-nav>
				<span v-for="route in routes">
					<b-nav-item v-if="!route.nested" class="mx-2 mx-lg-1" :key="route.path" :to="route.path" id="highlight">
						<i :class="route.icon"/>
						{{ route.text }}
					</b-nav-item>
					<b-nav-item-dropdown v-else class="mx-2 mx-lg-1" :key="route.text">
						<template #button-content>
							<i :class="route.icon" />
							{{ route.text }}
						</template>
						<b-dropdown-item v-for="sub_route in route.routes" :key="sub_route.path" :to="sub_route.path">
							{{ sub_route.text }}
						</b-dropdown-item>
					</b-nav-item-dropdown>
				</span>
			</b-navbar-nav>
		</b-collapse>
	</nav>

</template>

<style scoped>

i {
	font-size: 1rem;
}

#highlight :hover{
	box-shadow: inset 300px 0 0 0 rgb(236, 236, 236);
	border-radius: 25px;
  	color: black;
	transition: transform .2s;
	transform: scale(1.1); 
}
</style>