import { ref, reactive } from "vue"

import type { Animal } from './model/Animal'

export const store = reactive({
	animals: Array<Animal>
})