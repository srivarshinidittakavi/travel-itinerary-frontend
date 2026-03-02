import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Documents() {
  const docs = ["Passport.pdf", "Visa.pdf", "FlightTicket.pdf"]

  return (
    <div className="p-10 flex-1">
      <h1 className="text-3xl font-bold mb-8">Documents</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {docs.map((doc, index) => (
          <Card key={index} className="rounded-2xl shadow-md">
            <CardContent className="flex justify-between items-center p-6">
              <span>{doc}</span>
              <Button size="sm">View</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}