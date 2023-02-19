import $ from "jquery"
import { setupProducts } from '../components/shop/prodotti/prodotti'
import { setupUsers } from '../components/anagrafica/user/user'
import { setupScore } from '../components/anagrafica/score/score'
import { setupNotFound } from "../components/NotFound/notfound"

const routes: { [key: string]: Function } = {
	"#/shop/prodotti": setupProducts,
	"#/anagrafica/utenti": setupUsers,
	"#/anagrafica/punteggi": setupScore,
	"notFound": setupNotFound
}

export function render(path: string) {
	if (routes[path])
		routes[path]($("#main"))
	else 
		routes["notFound"]($("#main"))
}
  
window.onhashchange = (evt: HashChangeEvent) => render(window.location.hash)
  
window.location.href = "/#/shop/prodotti"