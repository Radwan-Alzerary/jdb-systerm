import type { EmployeeSuggestion, Certificate, GeneralSpecialization, Subspecialty } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SuggestionsListProps {
  suggestions: EmployeeSuggestion[]
  certificates: Certificate[]
  generalSpecializations: GeneralSpecialization[]
  subspecialties: Subspecialty[]
}

export function SuggestionsList({
  suggestions,
  certificates,
  generalSpecializations,
  subspecialties,
}: SuggestionsListProps) {
  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <Card key={suggestion._id}>
          <CardHeader>
            <CardTitle className="text-lg flex justify-between items-center">
              <span>{suggestion.name}</span>
              <span className="text-sm font-normal">نسبة التطابق: {suggestion.matchPercentage}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={suggestion.matchPercentage} className="mb-2" />
            <p>الشهادة: {certificates.find((c) => c._id === suggestion.certificateId)?.name}</p>
            <p>
              التخصص العام: {generalSpecializations.find((gs) => gs._id === suggestion.generalSpecializationId)?.name}
            </p>
            <p>التخصص الدقيق: {subspecialties.find((s) => s._id === suggestion.subspecialtyId)?.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

