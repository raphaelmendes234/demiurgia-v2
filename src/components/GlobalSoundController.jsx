import { useEffect } from 'react'
import { useSoundStore } from '../stores/useSoundStore'

export function GlobalSoundController() {
  const playClick = useSoundStore((state) => state.playClick)

  useEffect(() => {
    const handleGlobalClick = () => playClick(true)
    window.addEventListener('pointerdown', handleGlobalClick)
    return () => window.removeEventListener('pointerdown', handleGlobalClick)
  }, [playClick])

  return null
}