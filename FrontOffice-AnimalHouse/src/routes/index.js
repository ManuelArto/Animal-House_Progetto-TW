import { replace } from 'svelte-spa-router'
import { wrap } from 'svelte-spa-router/wrap'
import { get } from 'svelte/store'

import { user } from '../store'
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
		asyncComponent: () => import('../views/ServiziComunità/Leaderboard.svelte')
	}),
	"/servizi/bachecaEccoloQua": wrap({
		asyncComponent: () => import('../views/ServiziComunità/BachecaEccoloQua.svelte')
	}),
	"/servizi/bachecaCercoPartner": wrap({
		asyncComponent: () => import('../views/ServiziComunità/BachecaCercoPartner.svelte')
	}),
	"/servizi/bachecaAiutami": wrap({
		asyncComponent: () => import('../views/ServiziComunità/BachecaAiutami.svelte')
	}),
	// Servizi Online
	"/serviziOnline/videoConfEsperto": wrap({
		asyncComponent: () => import('../views/ServiziOnline/VideoConfEsperto.svelte')
	}),
	"/serviziOnline/videoConfVeterinaio": wrap({
		asyncComponent: () => import('../views/ServiziOnline/VideoConfVeterinaio.svelte')
	}),
	"*": NotFound,
}

// Handles the "conditionsFailed" event dispatched by the router when a component can't be loaded because one of its pre-condition failed
export function conditionsFailed(event) {
	// Perform any action, for example replacing the current route
	replace('/')
}