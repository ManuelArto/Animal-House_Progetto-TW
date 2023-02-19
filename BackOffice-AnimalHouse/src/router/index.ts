import $ from "jquery"
import { setupProducts } from '../components/shop/prodotti/prodotti'
import { setupNotFound } from "../components/NotFound/notfound"

const routes: { [key: string]: Function } = {
	"#/shop/prodotti": setupProducts,  // #/shop/prodotti
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