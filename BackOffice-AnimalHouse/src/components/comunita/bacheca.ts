import $ from "jquery"
import { Modal } from "flowbite";
import { Thread, Message } from "../../model";
import { ENDPOINT } from "../../utils/const";
import bacheca_html from "./bacheca.html?raw"

const table = $('#thread');
const mex = $('#messages');

export function renderBacheca(element: JQuery<HTMLDivElement>) {
	element.html( bacheca_html )
	
	
	const deleteModal = new Modal($('#deleteModal')[0])
	$(function() {
		// selezioniamo il bottone e il pulsante "back" tramite l'ID
		initThreads(deleteModal)
		initDeleteModal(deleteModal)
	});
}

function initThreads(deleteModal: Modal) {
	fetch(ENDPOINT.THREADS_LIST)
		.then((res) => res.json())
		.then((threads) => threads.forEach((thread: Thread) => {
			var product_tmpl = $($("#thread_template").html());
			
			product_tmpl.find(".deleteThreadButton").attr("id", `delete_${thread._id}`)
			product_tmpl.find("#title").text(thread.title)
			product_tmpl.find("#title").attr("onClick", function() {
				table.hide();
				mex.show();
				$("#back").on("click", function() {
					mex.hide();
					table.show();
				})
				$("#title_thread").text(thread.title)
				initMessages(deleteModal, thread.messages);
			})
			product_tmpl.find("#creatorUsername").text(thread.creatorUsername)
			product_tmpl.find("#createDate").text(thread.createdAt.substring(0,10))
			product_tmpl.find("#createHour").text(thread.createdAt.substring(11,19))
			
			$("threads_table").append(product_tmpl[0].outerHTML);

			// $(`#${product._id}`).data("id", product._id)
			$(`#delete_${thread._id}`).on("click", () => deleteModal.toggle())
		}))
}

function initDeleteModal(deleteModal: Modal) {
	$(".closeDeleteProductModal").on("click", () => deleteModal.hide() )
}

function initMessages(deleteModal: Modal, messages: Message[]){
	var product_tmpl = $($("#message_template").html());

	messages.forEach((message:Message) => {
		product_tmpl.find(".deleteMessageButton").attr("id", `delete_${message._id}`)
		
		product_tmpl.find("#content").text(message.content)
		product_tmpl.find("#user").text(message.authorUsername)
		product_tmpl.find("#date").text(message.date)
		product_tmpl.find("#time").text(message.time)
		
		$("#messages_table").append(product_tmpl[0].outerHTML);

		// $(`#${product._id}`).data("id", product._id)
		$(`#delete_${message._id}`).on("click", () => deleteModal.toggle())
	})
			
}