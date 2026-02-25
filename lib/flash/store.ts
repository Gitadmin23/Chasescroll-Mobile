import { atom } from 'jotai'
import { createStore } from 'jotai/vanilla'

export type Flash = {
  id: string
  text: string
  type: 'error' | 'success' | 'info'
}

export const flashAtom = atom<Flash | null>(null)
export const flashStore = createStore()

