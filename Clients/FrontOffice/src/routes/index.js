import { replace } from 'svelte-spa-router'
import { wrap } from 'svelte-spa-router/wrap'
import { get } from 'svelte/store'

import { user } from '../store/user'
import Home from "../views/Home.svelte"
import NotFound from "../views/NotFound.svelte"


export const routes = {
	"/": Home,
	"/profile": wrap({
		asyncComponent: () => import('../views/Profile.svelte'),
		conditions: (detail) => get(user.isUserLogged)
	}),
	"/profile/pets": wrap({
		asyncComponent: () => import('../views/Profile.svelte'),
		props: { animalsView: true },
		conditions: (detail) => get(user.isUserLogged)
	}),
	"/shop": wrap({
		asyncComponent: () => import('../views/Shop.svelte')
	}),
	"/serviziPresenza": wrap({
		asyncComponent: () => import('../views/ServiziPresenza.svelte')
	}),
	// Servizi di Comunità
	"/servizi/leaderboard": wrap({
		asyncComponent: () => import('../views/ServiziComunita/Leaderboard.svelte')
	}),
	"/servizi/bachecaEccoloQua": wrap({
		asyncComponent: () => import('../views/ServiziComunita/BachecaEccoloQua.svelte')
	}),
	"*": NotFound,
}

// Handles the "conditionsFailed" event dispatched by the router when a component can't be loaded because one of its pre-condition failed
export function conditionsFailed(event) {
	// Perform any action, for example replacing the current route
	replace('/')
}