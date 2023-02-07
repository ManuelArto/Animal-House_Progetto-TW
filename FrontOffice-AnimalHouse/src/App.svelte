<script>
  import Router from "svelte-spa-router"
  import { routes, conditionsFailed } from "./routes/index.js"
  import Navbar from "./components/Navbar.svelte"
  import Footer from "./components/Footer.svelte"
</script>

<div class="flex flex-col min-h-screen">
  <header>
    <Navbar />
  </header>
  
  <main class="flex-grow">
      <Router {routes} on:conditionsFailed={conditionsFailed} />
  </main>
  
  <footer>
    <Footer />
  </footer>
</div>


<style>
</style>
