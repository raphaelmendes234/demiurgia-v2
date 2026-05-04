import React, { useEffect, useRef } from 'react'
import { useCursorStore } from '../../stores/useCursorStore'
import { useSoundStore } from '../../stores/useSoundStore'

export const CustomCursor = () => {
  const cursorRef = useRef(null)
  const { cursorType, isHovering, setCursorType } = useCursorStore()
  const playClick = useSoundStore((state) => state.playClick)

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const handleGlobalDown = () => {
      // Visual
      setCursorType('click')
      // Sound
      playClick(true)
    }

    const handleGlobalUp = () => {
      // Quand on relâche, on regarde si on est toujours sur un objet interactif
      setCursorType(useCursorStore.getState().isHovering ? 'hover' : 'default')
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('pointerdown', handleGlobalDown)
    window.addEventListener('pointerup', handleGlobalUp)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('pointerdown', handleGlobalDown)
      window.removeEventListener('pointerup', handleGlobalUp)
    }
  }, [setCursorType, playClick])

  return (
    <div ref={cursorRef} className="cursor">
      <img src={`/cursor/${cursorType}.jpg`} alt="" />
    </div>
  )
}