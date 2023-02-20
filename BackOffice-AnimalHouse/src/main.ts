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
import { renderNotFound } from "./components/NotFound/notfound"
import { renderLogin } from "./components/login/login"
import { isUserAuthenticated } from "./auth/auth"

// TODO: refactor
if (window.location.pathname == "/login")
	renderLogin($("#app"))
else if (window.location.pathname != '/')
	renderNotFound($("#app"))
else if (isUserAuthenticated())
	router.render(window.location.hash)
else
	window.location.href = "/login"
