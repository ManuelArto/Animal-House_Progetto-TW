<script setup lang="ts">
import type { RandAnimal, Question, Answer } from '@/model';
import { ref } from 'vue';

function getQuestionText(animal: RandAnimal, key: string): string {
	return `What's the <b>${key.replace("_", " ")}</b> of the <i>${animal.name}</i>?`
}


async function getNewSingleAnimal(): Promise<RandAnimal> {
	let animal = {} as RandAnimal
	await fetch("https://zoo-animal-api.herokuapp.com/animals/rand/10")
		.then((res) => res.json())
		.then((data) => animal = data)

	return animal
}

async function getNewQuestion(key: string) {
	resetForNextQuestion()
	currentQuestion.value = undefined
	let animals: RandAnimal[] = []
	await fetch("https://zoo-animal-api.herokuapp.com/animals/rand/4")
		.then((res) => res.json())
		.then((data) => animals.push(...data))

	let question: Question = {
		question: getQuestionText(animals[0], key),
		animalImage: animals[0].image_link,
		answers: []
	}
	for (let [index, animal] of animals.entries()) {
		var answerLabel: string
		while (true) {
			switch (key) {
				case "weight":
					answerLabel = `${animal.weight_min}-${animal.weight_max} lbs`
					break;
				case "length":
					answerLabel = `${animal.length_min}-${animal.length_max} ft`
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

let keys = [
	"latin_name",
	"length",
	"weight",
	"lifespan",
	"habitat",
	"diet",
]
keys.push(...keys.sort(() => Math.random() - 0.5).slice(0, 10-keys.length))

var questionIndex = ref(0)
var currentQuestion = ref<Question>()
var isNextQuestionDisabled = ref(true)
var score = ref(0)

startGame()

</script>

<template>
	<img src="@/assets/banner_quiz.jpg" class="mb-3 border-bottom border-light w-100" alt="banner_quiz"
		style="object-fit: cover;">

	<b-container class="d-flex mx-auto m-3">
		<div class="card mx-auto w-100 shadow">
			<!-- QUIZ TITLE -->
			<div class="card-header d-flex justify-content-between align-items-center">
				<h6 class="m-0"><i class="bi bi-patch-question-fill"></i> Animal Quiz</h6>
				<span>Score ({{ score }}/{{ keys.length }}) <i class="bi bi-award-fill"></i></span>
			</div>
			<ul class="list-group list-group-flush w-100 cardQuiz d-flex justify-content-center align-items-center text-center">
				<h1 class="mb-3" v-if="questionIndex === keys.length">
					Hai totalizzato<br><b>{{ score }}/{{ keys.length }}</b> punti!!
				</h1>
				<!-- QUIZ CONTENT -->
				<li v-else class="list-group-item w-100 cardQuiz d-flex justify-content-center align-items-center text-center">
					<b-spinner v-if="!currentQuestion">
					</b-spinner>
					<div class="w-100 text-center" v-else>
						<h4 class="position-absolute top-0">{{ questionIndex + 1 }}.</h4>
						<!-- QUIZ IMAGE -->
						<img :src="currentQuestion?.animalImage" alt="animal image" class="img-thumbnail mt-4 position-relative" >
						<!-- QUIZ QUESTIOn -->
						<h2 class="mt-2 mb-4" v-html="currentQuestion.question" />
						<!-- QUIZ ANSWERS -->
						<b-row class="row-cols-2 g-4">
							<b-col class="d-flex justify-content-center"
								v-for="(answer, index) in currentQuestion.answers">
								<input type="button" class="btn-check" :id="`input${index}`" name="selection"
									autocomplete="off" :onClick="(event) => answerClicked(answer, index)" />
								<label class="btn btn-outline-dark w-75 p-2 d-flex align-items-center justify-content-center" :id="`label${index}`"
									:for="`input${index}`">
									{{ answer.answer }}
								</label>
							</b-col>
						</b-row>
					</div>
				</li>
				<!-- QUIZ BUTTONS -->
				<li :class="`list-group-item ${questionIndex !== keys.length ? 'd-flex align-self-end' : ''}`">
					<b-button variant="primary" class="rounded rounded-4 mx-2" :onClick="(event) => startGame()">
						<i class="bi bi-arrow-clockwise"></i>
					</b-button>
					<b-button v-if="questionIndex !== keys.length" ref="nextQuestionButton" id="nextQuestion" variant="success" class="rounded rounded-4"
						:onClick="() => getNewQuestion(keys[++questionIndex])" :disabled="isNextQuestionDisabled">
						Next question
					</b-button>
				</li>
			</ul>
		</div>
	</b-container>
</template>

<style scoped>
.cardQuiz {
	min-height: 550px;
}

img {
	max-height: 300px;
}

li>img {
	height: 300px;
}
</style>