import { useControls, button } from "leva";
import { useExperienceStore } from "../stores/useExperienceStore";

export function Debug() {
  const { 
    phase, 
    currentScene, 
    setTest,
    setMenu, 
    setContext, 
    setGame,
    setEnd,
    nextScene, 
    prevScene 
  } = useExperienceStore();

  useControls("Flow Manager", {
    "Menu": button(() => setMenu()),
    "Context": button(() => setContext()),
    "Game": button(() => setGame()),
    "End": button(() => setEnd()),
    "Test": button(() => setTest()),
    "Game next >": button(() => nextScene()),
    "< Game prev": button(() => prevScene()),
  });

  return null;
}