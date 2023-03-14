import $ from "jquery"
import { isUserAuthenticated } from "../auth/auth"
import { renderProducts } from '../components/shop/prodotti/prodotti'
import { renderUsers } from '../components/anagrafica/user/user'
import { renderScore } from '../components/anagrafica/score/score'
import { renderBacheca } from "../components/comunita/bacheca/bacheca"
import { renderNotFound } from "../components/NotFound/notfound"
import { renderDashboard } from "../components/dashboard/dashboard"
import { renderPrenotazioni } from "../components/servizi/prenotazioni/prenotazioni"
import { renderLogin } from "../components/login/login"
import { renderNavbar } from "../components/navbar/navbar"
import { renderSidebar } from "../components/sidebar/sidebar"
import { renderFatturazione } from "../components/shop/fatturazione/fatturazione"

const routes: { [key: string]: Function } = {
	"": renderDashboard,
	"#/": renderDashboard,
	"#/shop/prodotti": renderProducts,
	"#/shop/fatturazione": renderFatturazione,
	"#/anagrafica/utenti": renderUsers,
	"#/anagrafica/punteggi": renderScore,
	"#/comunita/bacheca": renderBacheca,
	"#/servizi/prenotazioni" : renderPrenotazioni,
	"notFound": renderNotFound
}

function render(path: string) {
	if (!isUserAuthenticated()) {
		window.location.hash = "#/login"
		return
	}

	if (routes[path])
		routes[path]($("#main"))
	else 
		routes["notFound"]($("#main"))
}

function isRoute(path: string) {
	return routes[path] != null
}

function start(path: string, hashpath: string) {
	if (path != '/')
		renderNotFound($("#app"))
	else if (hashpath == '#/login')
		renderLogin($("#app"))
	else if (isUserAuthenticated()) {
		// STATIC RENDERING
		renderNavbar($('#navbar'))
		renderSidebar($('#sidebar'))
		render(hashpath)
	} else {
		window.location.hash = "#/login"
		window.location.reload()
	}
}

window.onhashchange = (evt: HashChangeEvent) => render(window.location.hash)

export default {
	render,
	isRoute,
	start
}