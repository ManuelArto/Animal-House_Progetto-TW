import $ from "jquery"
import "./style.css"
import { renderNavbar } from "./components/navbar/navbar"
import { renderSidebar } from "./components/sidebar/sidebar"

$('#app').html(`
	<header id="navbar">
	</header>

	<section id="sidebar">
	</section>
	
	<section class="ml-64" style="padding-top: 64px;" id="main">
	</section>
`)
// STATIC RENDERING
renderNavbar($('#navbar'))
renderSidebar($('#sidebar'))

// DYNAMIC ROUTING
import router from "./router"

router.start(window.location.pathname, window.location.hash)