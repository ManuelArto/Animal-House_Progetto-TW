import { wrap } from 'svelte-spa-router/wrap'

import Home from "./views/Home.svelte";
import NotFound from "./views/NotFound.svelte";


export const routes = {
  "/": Home,
  "/profile": wrap({
    asyncComponent: () => import('./views/Profile.svelte')
  }),
  "/profile/pets": wrap({
    asyncComponent: () => import('./views/Profile.svelte'),
    props: { page: "pets" }
  }),
  "/shop": wrap({
    asyncComponent: () => import('./views/Shop.svelte')
  }),
  "/serviziPresenza": wrap({
    asyncComponent: () => import('./views/ServiziPresenza.svelte')
  }),
  // Servizi di Comunità
  "/servizi/leaderboard": wrap({
    asyncComponent: () => import('./views/ServiziComunità/Leaderboard.svelte')
  }),
  "/servizi/bachecaEccoloQua": wrap({
    asyncComponent: () => import('./views/ServiziComunità/BachecaEccoloQua.svelte')
  }),
  "/servizi/bachecaCercoPartner": wrap({
    asyncComponent: () => import('./views/ServiziComunità/BachecaCercoPartner.svelte')
  }),
  "/servizi/bachecaAiutami": wrap({
    asyncComponent: () => import('./views/ServiziComunità/BachecaAiutami.svelte')
  }),
  // Servizi Online
  "/serviziOnline/videoConfEsperto": wrap({
    asyncComponent: () => import('./views/ServiziOnline/VideoConfEsperto.svelte')
  }),
  "/serviziOnline/videoConfVeterinaio": wrap({
    asyncComponent: () => import('./views/ServiziOnline/VideoConfVeterinaio.svelte')
  }),
  "*": NotFound,
};