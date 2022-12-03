<script>
  import Router, { link } from "svelte-spa-router";
  import { routes } from "./routes.js";
</script>

<main>
  <h2>NavBar</h2>
  <Router {routes}/>
</main>

<style>
</style>
