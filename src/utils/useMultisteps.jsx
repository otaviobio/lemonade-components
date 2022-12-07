import { useState } from "react";

export function useMultiSteps(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex(idx => {
      if (idx >= steps.length - 1) {
        return idx
      }
      return idx + 1
    })
  }

  function back() {
    setCurrentStepIndex(idx => {
      if (idx <= 0) {
        return idx
      }
      return idx - 1
    })
  }

  function goTo(index) {
    setCurrentStepIndex(index);
  }

  return{
    currentStepIndex,
    step: steps[currentStepIndex],
    next,
    back,
    goTo,
    // this the way the hook automatically returns the steps we pass in as props
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  }
}