import { ref, reactive } from "vue"

import type { Animal } from '@/model'

export default reactive({
	animals: Array<Animal>,
	isCollapseVisible: Boolean(false),
})