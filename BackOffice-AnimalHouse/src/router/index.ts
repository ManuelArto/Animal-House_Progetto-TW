import $ from "jquery"
import { isUserAuthenticated } from "../auth/auth"
import { renderProducts } from '../components/shop/prodotti/prodotti'
import { renderUsers } from '../components/anagrafica/user/user'
import { renderScore } from '../components/anagrafica/score/score'
import { renderBacheca } from "../components/comunita/bacheca"
import { renderNotFound } from "../components/NotFound/notfound"
import { renderNavbar } from "../components/navbar/navbar"
import { renderSidebar } from "../components/sidebar/sidebar"
import { renderDashboard } from "../components/dashboard/dashboard"
import { renderPrenotazioni } from "../components/prenotazioni/prenotazioni"

const routes: { [key: string]: Function } = {
	"": renderDashboard,
	"#/": renderDashboard,
	"#/shop/prodotti": renderProducts,
	"#/anagrafica/utenti": renderUsers,
	"#/anagrafica/punteggi": renderScore,
	"#/comunita/bacheca": renderBacheca,
	"#/servizi/prenotazioni" : renderPrenotazioni,
	"notFound": renderNotFound
}

function render(path: string) {
	if (!isUserAuthenticated()) {
		window.location.href = "/login"
		return
	}
	// STATIC RENDERING
	renderNavbar($('#navbar'))
	renderSidebar($('#sidebar'))

	if (routes[path])
		routes[path]($("#main"))
	else 
		routes["notFound"]($("#main"))
}

function isRoute(path: string) {
	return routes[path] != null
}

window.onhashchange = (evt: HashChangeEvent) => render(window.location.hash)


export default {
	render,
	isRoute
}