import { useControls, button } from 'leva';
import { useExperienceStore } from '../stores/useExperienceStore';

export function Debug() {
  const { 
    phase, 
    currentScene, 
    
    setMenu, 
    setContext, 
    setGame, 
    nextScene, 
    prevScene 
  } = useExperienceStore();

  useControls('Flow Manager', {
    'Phase Actuelle': { value: phase, editable: false },
    'Scène Actuelle': { value: currentScene, editable: false },
    
    'Aller au Menu': button(() => setMenu()),
    'Aller au Contexte': button(() => setContext()),
    'Lancer l\'Expérience': button(() => setGame()),
    
    'Scène Suivante >': button(() => nextScene()),
    '< Scène Précédente': button(() => prevScene()),
  });

  return null;
}