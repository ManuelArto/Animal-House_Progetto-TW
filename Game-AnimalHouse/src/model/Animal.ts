export class Animal {
	specie: string;
	nome: string;
	eta: number;
	condizioni?: string;
	
	constructor(data) {
		this.specie = data.specie;
		this.nome = data.nome;
		this.eta = data.eta;
		this.condizioni = data?.condizioni || "Condizioni non specificate";
	}
}