import { createUserStore } from './user'
import { createAnimalsStore } from './animals'

export const user = await createUserStore()

export const animals = await createAnimalsStore()
