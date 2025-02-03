import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type Option = {
  label: string
  value: string
}

type CheckboxGroupProps = {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  label: string
}

export function CheckboxGroup({ options, selected, onChange, label }: CheckboxGroupProps) {
  const handleCheckboxChange = (value: string) => {
    const updatedSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value]
    onChange(updatedSelected)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selected.includes(option.value)}
              onCheckedChange={() => handleCheckboxChange(option.value)}
            />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

