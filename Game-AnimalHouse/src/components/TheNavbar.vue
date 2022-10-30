<script setup lang="ts">
import { ref } from 'vue';
import type { Route } from "@/model/index"

defineProps<{
	routes: Array<Route>
}>()

var show_collapse = ref(false)
var toogle_collapse = () => show_collapse.value = !show_collapse.value

</script>

<template>

	<nav class="navbar navbar-expand-lg navbar-light p-1 shadow fixed-top">
		<!-- Navbar brand -->
		<b-navbar-brand class="navbar-brand" to="/"><img src="@/assets/logo3.png" alt="logo" height="70">
		</b-navbar-brand>

		<!-- Toggle button -->
		<b-navbar-toggle v-b-toggle.nav-collapse></b-navbar-toggle>

		<!-- Collapsible -->
		<b-collapse id="nav-collapse" title="Menu" is-nav v-model="show_collapse">
			<b-navbar-nav>
				<span v-for="route in routes">
					<b-nav-item v-if="!route.nested" :to="route.path" :key="route.path" class="mx-2 mx-lg-1" @click="toogle_collapse()">
						<i :class="route.icon" />
						{{ route.text }}
					</b-nav-item>
					<b-nav-item-dropdown v-else class="mx-2 mx-lg-1">
						<template #button-content>
							<i :class="route.icon" />
							{{ route.text }}
						</template>
						<b-dropdown-item v-for="sub_route in route.routes" :to="sub_route.path" :key="sub_route.path" @click="toogle_collapse()">
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