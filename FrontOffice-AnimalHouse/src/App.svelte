<script>
  import Router, { link } from "svelte-spa-router";
  import { routes } from "./routes.js";
  import Navbar from "./components/Navbar.svelte"
  let group3=2;
</script>

<Navbar />
<Router {routes}/>
<style>
</style>
