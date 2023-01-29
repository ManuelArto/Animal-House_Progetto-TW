<script>
  import Router from "svelte-spa-router";
  import { routes } from "./routes.js";
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
</script>

<Navbar />

<Router {routes} />

<!-- <Footer /> -->

<style>
</style>
