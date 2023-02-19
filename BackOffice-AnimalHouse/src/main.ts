import $ from "jquery"
import "./style.css"
import { setupNavbar } from './components/navbar/navbar'
import { setupSidebar } from './components/sidebar/sidebar'
import { setupProducts } from './components/shop/prodotti/prodotti'

$('#app').html(`
  <section id="navbar">
  </section>

  <section id="sidebar">
  </section>
  
  <section id="main">
  </section>
`)

setupNavbar($('#navbar'))
setupSidebar($('#sidebar'))
setupProducts($('#main'))