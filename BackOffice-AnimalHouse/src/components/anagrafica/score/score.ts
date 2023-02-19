import score_html from "./score.html?raw"

export function setupScore(element: JQuery<HTMLDivElement>) {
	element.html(score_html)
}