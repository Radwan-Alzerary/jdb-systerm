import type {
  DepartmentRequirement,
  CategoryRequirement,
  Certificate,
  GeneralSpecialization,
  Subspecialty,
} from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RequirementsListProps {
  requirement: DepartmentRequirement
  certificates: Certificate[]
  generalSpecializations: GeneralSpecialization[]
  subspecialties: Subspecialty[]
}

export function RequirementsList({
  requirement,
  certificates,
  generalSpecializations,
  subspecialties,
}: RequirementsListProps) {
  const renderCategoryRequirements = (category: CategoryRequirement[]) => (
    <ScrollArea className="h-[300px]">
      {category.map((req, index) => (
        <Card key={req.id} className="mb-4">
          <CardHeader>
            <CardTitle className="text-sm">المتطلب {index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pr-5 space-y-1">
              <li>عدد الموظفين: {req.numberOfEmployees}</li>
              <li>
                الشهادات:
                <ul className="list-circle pr-5">
                  {req.requiredCertificateIds.map((id) => (
                    <li key={id}>{certificates.find((c) => c.id === id)?.name}</li>
                  ))}
                </ul>
              </li>
              <li>
                التخصصات العامة:
                <ul className="list-circle pr-5">
                  {req.requiredGeneralSpecializationIds.map((id) => (
                    <li key={id}>{generalSpecializations.find((gs) => gs.id === id)?.name}</li>
                  ))}
                </ul>
              </li>
              <li>
                التخصصات الدقيقة:
                <ul className="list-circle pr-5">
                  {req.requiredSubspecialtyIds.map((id) => (
                    <li key={id}>{subspecialties.find((sub) => sub.id === id)?.name}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  )

  return (
    <Tabs defaultValue="administrative">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="administrative">إداري</TabsTrigger>
        <TabsTrigger value="teaching">تدريسي</TabsTrigger>
        <TabsTrigger value="technician">فني</TabsTrigger>
      </TabsList>
      <TabsContent value="administrative">{renderCategoryRequirements(requirement.administrative)}</TabsContent>
      <TabsContent value="teaching">{renderCategoryRequirements(requirement.teaching)}</TabsContent>
      <TabsContent value="technician">{renderCategoryRequirements(requirement.technician)}</TabsContent>
    </Tabs>
  )
}

