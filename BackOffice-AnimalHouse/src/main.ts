import $ from "jquery"
import "./style.css"

$('#app').html(`
	<header id="navbar">
	</header>

	<section id="sidebar">
	</section>
	
	<section class="ml-64" style="padding-top: 64px;" id="main">
	</section>
`)

// DYNAMIC ROUTING
import router from "./router"
router.start(window.location.pathname, window.location.hash)

