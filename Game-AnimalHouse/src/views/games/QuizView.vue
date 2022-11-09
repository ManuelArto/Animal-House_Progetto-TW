<script setup lang="ts">

</script>

<template>

	<img src="@/assets/banner_quiz.jpg" class="mb-3 border-bottom border-light w-100" alt="banner_quiz" style="object-fit: cover;">

	<b-container class="d-flex mx-auto m-5">
		<div class="card mx-auto w-100 shadow">
			<div class="card-header d-flex justify-content-between align-items-center">
				<h6 class="m-0"><i class="bi bi-patch-question-fill"></i> Animal Quiz</h6>
				<span>Score (0/10) <i class="bi bi-award-fill"></i></span>
			</div>
			<ul class="list-group list-group-flush">
				<li class="list-group-item text-center">
					<img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Dumeril%27s_Madagascar_ground_boa_%28Acrantophis_dumerili%29_male_Reniala.jpg"
						alt="animal image" class="img-thumbnail my-3 w-auto">
					<h2>What's the latin name of the Animal Name?</h2>
					<b-row class="row-cols-2 g-4 mt-1">
						<b-col>
							<input type="radio" class="btn-check" id="option1" name="selection" autocomplete="off"/>
							<label class="btn btn-outline-success w-75 p-2" for="option1">
								1. First
							</label>
						</b-col>
						<b-col>
							<input type="radio" class="btn-check" id="option2" name="selection" autocomplete="off"/>
							<label class="btn btn-outline-danger w-75 p-2" for="option2">
								2. Second
							</label>
						</b-col>
						<b-col>
							<input type="radio" class="btn-check" id="option3" name="selection" autocomplete="off"/>
							<label class="btn btn-outline w-75 p-2" for="option3">
								3. Third
							</label>
						</b-col>
						<b-col>
							<input type="radio" class="btn-check" id="option4" name="selection" autocomplete="off"/>
							<label class="btn btn-outline w-75 p-2" for="option4">
								4. Fourth
							</label>
						</b-col>
					</b-row>
				</li>
				<li class="list-group-item d-flex flex-row-reverse">
					<b-button variant="success" class="rounded rounded-4" disabled>
						Next question
					</b-button>
					<b-button variant="primary" class="rounded rounded-4 mx-2">
						<i class="bi bi-arrow-clockwise"></i>
					</b-button>
				</li>
			</ul>
		</div>

	</b-container>
</template>

<style scoped>

img {
	max-height: 500px;
}

li>img {
	max-height: 300px;
}
input[type=radio] {
  display: none;
}
</style>