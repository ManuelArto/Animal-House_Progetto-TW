<script setup lang="ts">
import type { RandAnimal, Question, Answer } from '@/model';
import SaveGameScoreModal from '@/components/SaveGameScoreModal.vue'
import { ENDPOINT } from '@/utils/const';
import { reactive, ref } from 'vue';

function getQuestionText(animal: RandAnimal, key: string): string {
	return `Qual è <b>${key.replace(/_/g, " ")}</b> del <i>${animal?.name}</i>?`
}

let animals: RandAnimal[] = []
async function getNewSingleAnimal() {
	if (animals.length === 0) {
		await fetch(ENDPOINT.RAND_ANIMALS_LIST(10))
			.then((res) => res.json())
			.then((data) => animals.push(...data))
	}
	return animals.pop()!
}

async function getNewQuestion(key: string) {
	if (!key) {
		currentQuestion.value = undefined
		return
	}
	
	resetForNextQuestion()
	currentQuestion.value = undefined
	let animals: RandAnimal[] = []
	await fetch(ENDPOINT.RAND_ANIMALS_LIST(4))
		.then((res) => res.json())
		.then((data) => animals.push(...data))

	let question: Question = {
		question: getQuestionText(animals[0], key),
		animalImage: animals[0]?.image_link,
		answers: []
	}
	for (let [index, animal] of animals.entries()) {
		var answerLabel: string
		while (true) {
			switch (key) {
				case "il_peso":
					answerLabel = `${animal.weight_min}-${animal.weight_max} kg`
					break;
				case "la_lunghezza":
					answerLabel = `${animal.length_min}-${animal.length_max} m`
					break;
				default:
					answerLabel = (animal as any)[key]
					break;
			}
			// Verifico che la risposta non sia già presente, altrimenti eseguo la fetch di un altro animale e proseguo
			if (question.answers.filter((answer) => answer.answer === answerLabel).length == 0)
				break
			animal = await getNewSingleAnimal()
		}
		question.answers.push({
			answer: answerLabel,
			isCorrect: index == 0
		})
	}
	question.answers.sort(() => Math.random() - 0.5)
	currentQuestion.value = question
}

function resetForNextQuestion() {
	if (currentQuestion.value) {
		for (var i = 0; i < 4; i++) {
			// Reset all answers Label
			let answerLabel = document.getElementById(`label${i}`)!
			answerLabel.className = answerLabel.className.replace("btn-success", "btn-outline-dark")
			answerLabel.className = answerLabel.className.replace("btn-danger", "btn-outline-dark")
			// Enable all answers Input and remove checked
			let answerInput = document.getElementById(`input${i}`)! as HTMLInputElement
			answerInput.disabled = false
			answerInput.checked = false
		}
		isNextQuestionDisabled.value = true
	}
}

function highlightCorrectAnswer() {
	currentQuestion.value?.answers.forEach((answer, index) => {
		if (answer.isCorrect) {
			var correctAnswerLabel = document.getElementById(`label${index}`)
			correctAnswerLabel!.className = correctAnswerLabel!.className.replace("btn-outline-dark", "btn-success")
		}
	})
}

function answerClicked(answer: Answer, index: number) {
	if (answer.isCorrect)
		score.value++
	let answerLabel = document.getElementById(`label${index}`)
	answerLabel!.className = answerLabel!.className.replace("btn-outline-dark", answer.isCorrect ? "btn-success" : "btn-danger")
	if (!answer.isCorrect)
		highlightCorrectAnswer()

	// Disable all answers input
	for (var i = 0; i < 4; i++) {
		(document.getElementById(`input${i}`)! as HTMLInputElement).disabled = true
	}

	isNextQuestionDisabled.value! = false
}

function startGame() {
	keys.sort(() => Math.random() - 0.5)
	questionIndex.value = 0
	score.value = 0
	getNewQuestion(keys[questionIndex.value])
}

let keys = reactive([
	"il_tipo_di_animale",
	"il_nome_latino",
	"la_lunghezza",
	"il_peso",
	"la_vita_media",
	"habitat",
	"il_cibo",
])
keys.push(...keys.sort(() => Math.random() - 0.5).slice(0, 10-keys.length))

var questionIndex = ref(0)
var currentQuestion = ref<Question>()
var isNextQuestionDisabled = ref(true)
var score = ref(0)

startGame()

</script>

<template>
	<div id="animation">
		<img src="@/assets/banner_quiz.jpg" class="mb-3 border-bottom border-light w-100" alt="banner_quiz"
			style="object-fit: cover;">

		<b-container class="d-flex mx-auto m-3">
			<div class="card mx-auto w-100 shadow">
				<!-- QUIZ TITLE -->
				<div class="card-header d-flex justify-content-between align-items-center">
					<h6 class="m-0"><i class="bi bi-patch-question-fill"></i> Animal Quiz</h6>
					<span>Score ({{ score }}/{{ keys.length }}) <i class="bi bi-award-fill"></i></span>
				</div>
				<ul class="list-group list-group-flush w-100 card-quiz-section d-flex justify-content-center align-items-center">
					<!-- QUIZ SCORE -->
					<h1 class="mb-3 text-center" v-if="questionIndex === keys.length">
						Hai totalizzato<br><b>{{ score }}/{{ keys.length }}</b> punti!!
					</h1>
					<!-- QUIZ CONTENT -->
					<li v-else class="list-group-item w-100 card-quiz-section d-flex justify-content-center align-items-center text-center">
						<b-spinner v-if="!currentQuestion">
						</b-spinner>
						<div class="w-100" v-else>
							<h4 class="position-absolute top-0">{{ questionIndex + 1 }}.</h4>
							<!-- QUIZ IMAGE -->
							<img :src="currentQuestion?.animalImage" alt="animal image" class="img-thumbnail position-relative" >
							<!-- QUIZ QUESTIOn -->
							<h3 class="mt-2" v-html="currentQuestion.question" />
							<!-- QUIZ ANSWERS -->
							<b-row class="row-cols-2 g-4 my-2">
								<b-col class="d-flex justify-content-center my-2"
									v-for="(answer, index) in currentQuestion.answers">
									<input type="button" class="btn-check" :id="`input${index}`" name="selection"
										autocomplete="off" :onClick="(event) => answerClicked(answer, index)" />
									<label class="btn btn-outline-dark w-75 p-2 d-flex align-items-center justify-content-center" :id="`label${index}`"
										:for="`input${index}`">
										<span class="answer">{{ answer.answer }}</span>
									</label>
								</b-col>
							</b-row>
						</div>
					</li>
					<!-- QUIZ BUTTONS -->
					<li :class="`list-group-item d-flex ${questionIndex !== keys.length ? 'align-self-end' : 'align-self-center'}`">
						<b-button variant="primary" class="rounded rounded-4 mx-2" :onClick="(event: any) => startGame()">
							Ricomincia <i class="bi bi-arrow-clockwise"></i>
						</b-button>
						<b-button v-if="questionIndex !== keys.length" ref="nextQuestionButton" id="nextQuestion" variant="success" class="rounded rounded-4"
							:onClick="() => getNewQuestion(keys[++questionIndex])" :disabled="isNextQuestionDisabled">
							Prossima domanda <i class="bi bi-arrow-right"></i>
						</b-button>
						<SaveGameScoreModal v-else :score="score" />
					</li>
				</ul>
			</div>
		</b-container>
	</div>
</template>

<style scoped>
	#animation {
    	animation: ombra 0.5s ease-in both;
  	}

	@keyframes ombra {
		from {
			opacity: 0;
		}
		to {
			opacity:1;
		}
	}

	img {
		max-height: 400px;
		object-fit: fill !important;
	}

	.card-quiz-section {
		min-height: 600px;
	}

	.img-thumbnail {
		height: 400px;
	}

	@media screen and (max-width: 564px) {
		.card-quiz-section {
			min-height: 300px;
		}
		
		.img-thumbnail {
			height: 150px;
		}

		.answer {
			font-size: 12px
		}
	}
</style>