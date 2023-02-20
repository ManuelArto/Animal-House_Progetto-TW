import score_html from "./score.html?raw"

export function renderScore(element: JQuery<HTMLDivElement>) {
	element.html(score_html)
}