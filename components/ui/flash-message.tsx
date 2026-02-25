import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useAtom } from 'jotai'
import { flashAtom } from '@/lib/flash/store'

export default function FlashMessage() {
  const [flash, setFlash] = useAtom(flashAtom)

  React.useEffect(() => {
    if (!flash) return
    const t = setTimeout(() => setFlash(null), 3000)
    return () => clearTimeout(t)
  }, [flash])

  if (!flash) return null

  const bg =
    flash.type === 'error' ? '#ef4444' : flash.type === 'success' ? '#22c55e' : '#3b82f6'

  return (
    <View pointerEvents="none" style={[styles.container, { backgroundColor: bg }]}>
      <Text style={styles.text}>{flash.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    zIndex: 1000,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
})

