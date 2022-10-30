import { ref, reactive } from "vue"

import type { Animal } from '@/model'

export const store = reactive({
	animals: Array<Animal>
})