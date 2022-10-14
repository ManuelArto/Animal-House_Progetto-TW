<script setup lang="ts">
defineProps<{
	routes: Array<any>
}>()
</script>

<template>
	<b-navbar toggleable="xl">
		<b-navbar-brand>
			<img src="@/assets/logo.png" height="70">
			AnimalHouse - Game
		</b-navbar-brand>

		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav right>
				<v-for v-for="route in routes">
					<b-nav-item v-if="!route.nested" :to="route.path" :key="route.path">
						{{route.text}}
					</b-nav-item>
					<b-nav-item-dropdown v-else :text="route.text">
						<b-dropdown-item v-for="sub_route in route.routes" :to="sub_route.path" :key="sub_route.path">
							{{sub_route.text}}
						</b-dropdown-item>
					</b-nav-item-dropdown>
				</v-for>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>
