import $ from "jquery"
import { Modal, Popover } from "flowbite";
import { Thread, Message } from "../../../model";
import { ENDPOINT } from "../../../utils/const";
import bacheca_html from "./bacheca.html?raw"
import { handleRequest } from "../../../utils/requestHandler";

let deleteModal: Modal;

export function renderBacheca(element: JQuery<HTMLDivElement>) {
	element.html( bacheca_html )
	
	deleteModal = new Modal($('#deleteModal')[0], {backdrop: "static"})

	$("#back").on("click", function() {
		$('#messages').hide();
		$('#thread').show();
	})

	$(function() {
		initThreads()
		initCloseDeleteModal()
		initSearchBar()
	});
}

function initThreads() {
	$('#thread').show();
	$('#messages').hide();

	// Clear threads table
	$("#threads_table").html("")

	fetch(ENDPOINT.THREADS_LIST)
		.then((res) => res.json())
		.then((threads) => threads.forEach((thread: Thread) => {
			var product_tmpl = $($("#thread_template").html());
			
			product_tmpl.find(".deleteThreadButton").attr("id", `delete_${thread._id}`)
			product_tmpl.find("#creatorUsername").text(thread.creatorUsername)
			product_tmpl.find("#date").text(thread.createdAt)

			product_tmpl.find(".threadTitle").attr("id", `title_${thread._id}`)
			product_tmpl.find(`#title_${thread._id}`).text(thread.title)
			$("#threads_table").append(product_tmpl[0].outerHTML);
			
			$(`#title_${thread._id}`).on("click", () => initMessages(thread, thread.messages))
			$(`#delete_${thread._id}`).on("click", () => openDeleteModal(thread._id, null, localStorage.getItem("bo_token")))
		}))
}

function initMessages(thread: Thread, messages: Message[]) {
	$('#thread').hide();
	$('#messages').show();
	
	$("#breadcrumbThreadTitle").text(thread.title)
	
	// Clear messages table
	$("#messages_table").html("")

	messages.forEach((message:Message) => {
		var product_tmpl = $($("#message_template").html());
		product_tmpl.find(".deleteMessageButton").attr("id", `delete_${message._id}`)
		
		product_tmpl.find("#content").text(message.content)
		product_tmpl.find("#user").text(message.authorUsername)
		product_tmpl.find("#date").text(message.date)
		product_tmpl.find("#time").text(message.time)
		
		$("#messages_table").append(product_tmpl[0].outerHTML);

		$(`#delete_${message._id}`).on("click", () => openDeleteModal(thread._id, message._id, localStorage.getItem("bo_token")))
	})
}

function openDeleteModal(threadId: string, messageId: string | null, token?: string | null) {
	deleteModal.toggle()
	$("#deleteButton").on("click", async (event: JQuery.ClickEvent) => {
		const data = await handleRequest(messageId ? ENDPOINT.MESSAGE(threadId, messageId) : ENDPOINT.THREAD(threadId), {
			method: "DELETE",
			headers: token ? { 'Authorization': `Bearer ${token}` } : {},
		})

		if (data.error) {
			alert(data.error.message)
		} else {
			deleteModal.hide()
			initThreads()
			$("#deleteButton").off("click")
		}
	})
}

function initCloseDeleteModal() {
	$(".closeDeleteModal").on("click", () => {
		deleteModal.hide()
		$("#deleteButton").off("click")
	})
}

function initSearchBar() {
	$('.searchbar').on("input", function () {
		const searchTerm = $(this).val() as string;

		if (searchTerm == "") {
			$('tbody tr').show();
		} else {
			$('tbody tr').hide();
			$('tbody tr').each(function () {
				if ($(this).find('td:nth-child(1)').text().toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
					$(this).show();
				}
			});
		}
	});
}