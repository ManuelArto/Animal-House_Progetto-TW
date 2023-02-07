<script>
  import Router from "svelte-spa-router"
  import { routes, conditionsFailed } from "./routes/index.js"
  import Navbar from "./components/Navbar.svelte"
  import Footer from "./components/Footer.svelte"
</script>

<Navbar />

<Router {routes} on:conditionsFailed={conditionsFailed} />

<Footer />

<style>
</style>
