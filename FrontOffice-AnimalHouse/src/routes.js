import Home from "./lib/views/Home.svelte";
import Profile from "./lib/views/Profile.svelte"
import Shop from "./lib/views/Shop.svelte"
import ServiziPresenza from "./lib/views/ServiziPresenza.svelte"
// Servizi di Comunità
import Leaderboard from "./lib/views/ServiziComunità/Leaderboard.svelte";
import BachecaEccoloQua from "./lib/views/ServiziComunità/BachecaEccoloQua.svelte";
import BachecaCercoPartner from "./lib/views/ServiziComunità/BachecaCercoPartner.svelte";
import BachecaAiutami from "./lib/views/ServiziComunità/BachecaAiutami.svelte";
// Servizi Online
import VideoConfEsperto from "./lib/views/ServiziOnline/VideoConfEsperto.svelte";
import VideoConfVeterinaio from "./lib/views/ServiziOnline/VideoConfVeterinaio.svelte";
import NotFound from "./lib/views/NotFound.svelte";


export const routes = {
  "/" : Home,
  "/profile" : Profile,
  "/shop" : Shop,
  "/serviziPresenza" : ServiziPresenza,
  // Servizi di Comunità
  "/leaderboard" : Leaderboard,
  "/bachecaEccoloQua" : BachecaEccoloQua,
  "/bachecaCercoPartner" : BachecaCercoPartner,
  "/bachecaAiutami" : BachecaAiutami,
  // Servizi Online
  "/videoConfEsperto" : VideoConfEsperto,
  "/videoConfVeterinaio" : VideoConfVeterinaio,
  "/notFound" : NotFound,
};