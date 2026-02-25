import { flashAtom, flashStore } from '@/lib/flash/store'

export function showFlash(text: string, type: 'error' | 'success' | 'info' = 'error') {
  const id = Date.now().toString()
  flashStore.set(flashAtom, { id, text, type })
}

export function clearFlash() {
  flashStore.set(flashAtom, null)
}

