import SidebarShell from '@/components/app/SidebarShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpCircle } from '@/components/icons'

export default function SupportPage() {
  return (
    <SidebarShell>
      <div className="flex-1 bg-gray-50 p-8">
        <div className="max-w-4xl">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Support</h1>
              <p className="mt-1 text-base text-gray-600">Get help and contact our team</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Browse our documentation to learn how to use MINE.
                  </p>
                  <Button variant="outline" size="sm">
                    View Docs
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Need help? Reach out to our support team.
                  </p>
                  <Button variant="outline" size="sm">
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">How do I get started?</h3>
                  <p className="text-sm text-gray-600">
                    Create a new project from the Projects page to begin your data migration.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Which systems are supported?</h3>
                  <p className="text-sm text-gray-600">
                    MINE supports Salesforce, SAP, Oracle, NetSuite, and SQL-based sources.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">How do I contact support?</h3>
                  <p className="text-sm text-gray-600">
                    You can reach out through the contact form or email support@trymine.ai
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarShell>
  )
}
