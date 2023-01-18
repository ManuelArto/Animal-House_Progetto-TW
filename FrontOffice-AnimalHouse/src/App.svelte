<script>
  import Router, { link } from "svelte-spa-router";
  import { routes } from "./routes.js";
  import Navbar from "./components/Navbar.svelte"
</script>
<Navbar />
<Router {routes}/>

<style>
</style>
