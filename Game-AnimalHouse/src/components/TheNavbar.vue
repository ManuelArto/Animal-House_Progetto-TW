<script setup lang="ts">
import { ref } from "vue";
import Router from '@/router/index'
import type { Route } from "@/model/index"

defineProps<{
	routes: Array<Route>
}>()

var isCollapseVisible = ref(false)
function change_page(path: string) {
	Router.push(path)
	isCollapseVisible.value = false
}

</script>

<template>

	<nav class="navbar navbar-expand-lg bg-light p-1 shadow fixed-top">
		<!-- Navbar brand -->
		<b-navbar-brand class="navbar-brand" to="/"><img src="@/assets/logo3.png" alt="logo" height="70">
		</b-navbar-brand>

		<!-- Toggle button -->
		<b-navbar-toggle v-b-toggle.nav-collapse></b-navbar-toggle>

		<!-- Collapsible -->
		<b-collapse id="nav-collapse" is-nav :visible="isCollapseVisible" @show="isCollapseVisible = true">
			<b-navbar-nav>
				<span v-for="route in routes">
					<b-nav-item v-if="!route.nested" class="mx-2 mx-lg-1" :key="route.path" @click="change_page(route.path)">
						<i :class="route.icon"/>
						{{ route.text }}
					</b-nav-item>
					<b-nav-item-dropdown v-else class="mx-2 mx-lg-1" :key="route.text">
						<template #button-content>
							<i :class="route.icon" />
							{{ route.text }}
						</template>
						<b-dropdown-item v-for="sub_route in route.routes" :key="sub_route.path" @click="change_page(sub_route.path)">
							{{ sub_route.text }}
						</b-dropdown-item>
					</b-nav-item-dropdown>
				</span>
			</b-navbar-nav>
		</b-collapse>
	</nav>

</template>

<style scoped>
.gradient-custom {
	/* fallback for old browsers */
	background: #c471f5;

	/* Chrome 10-25, Safari 5.1-6 */
	background: -webkit-linear-gradient(to right, rgba(196, 113, 245, 1), rgba(250, 113, 205, 1));

	/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	background: linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255))
}

i {
	font-size: 1rem;
}
</style>