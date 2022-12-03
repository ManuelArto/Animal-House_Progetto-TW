import { wrap } from 'svelte-spa-router/wrap'

import Home from "./lib/views/Home.svelte";
import NotFound from "./lib/views/NotFound.svelte";


export const routes = {
  "/": Home,
  "/profile": wrap({
    asyncComponent: () => import('./lib/views/Profile.svelte')
  }),
  "/shop": wrap({
    asyncComponent: () => import('./lib/views/Shop.svelte')
  }),
  "/serviziPresenza": wrap({
    asyncComponent: () => import('./lib/views/ServiziPresenza.svelte')
  }),
  // Servizi di Comunità
  "/servizi/leaderboard": wrap({
    asyncComponent: () => import('./lib/views/ServiziComunità/Leaderboard.svelte')
  }),
  "/servizi/bachecaEccoloQua": wrap({
    asyncComponent: () => import('./lib/views/ServiziComunità/BachecaEccoloQua.svelte')
  }),
  "/servizi/bachecaCercoPartner": wrap({
    asyncComponent: () => import('./lib/views/ServiziComunità/BachecaCercoPartner.svelte')
  }),
  "/servizi/bachecaAiutami": wrap({
    asyncComponent: () => import('./lib/views/ServiziComunità/BachecaAiutami.svelte')
  }),
  // Servizi Online
  "/serviziOnline/videoConfEsperto": wrap({
    asyncComponent: () => import('./lib/views/ServiziOnline/VideoConfEsperto.svelte')
  }),
  "/serviziOnline/videoConfVeterinaio": wrap({
    asyncComponent: () => import('./lib/views/ServiziOnline/VideoConfVeterinaio.svelte')
  }),
  "*": NotFound,
};