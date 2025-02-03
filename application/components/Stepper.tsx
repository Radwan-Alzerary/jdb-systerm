import React from "react"
import { cn } from "@/lib/utils"

interface StepperProps {
  steps: string[]
  currentStep: number
  onStepClick: (step: number) => void
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div
          key={step}
          className={cn("flex items-center cursor-pointer", index < steps.length - 1 && "flex-1")}
          onClick={() => onStepClick(index)}
        >
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              currentStep === index
                ? "bg-primary text-primary-foreground"
                : index < currentStep
                  ? "bg-primary/50 text-primary-foreground"
                  : "bg-muted text-muted-foreground",
            )}
          >
            {index + 1}
          </div>
          <div
            className={cn(
              "mr-2 text-sm font-medium",
              currentStep === index
                ? "text-primary"
                : index < currentStep
                  ? "text-primary/50"
                  : "text-muted-foreground",
            )}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div className={cn("flex-1 h-0.5", index < currentStep ? "bg-primary" : "bg-muted")} />
          )}
        </div>
      ))}
    </div>
  )
}

