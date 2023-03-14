import dashboard_html from "./dashboard.html?raw"

export function renderDashboard(element: JQuery<HTMLDivElement>) {
	element.html( dashboard_html )
}
