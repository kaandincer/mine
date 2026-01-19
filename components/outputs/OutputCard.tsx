'use client'

import { FileText, Database, FileCheck, Download, Copy } from '@/components/icons'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface OutputCardProps {
  title: string
  description: string
  version: string
  generated: string
  icon: React.ReactNode
  actions: {
    label: string
    format: string
    onClick: () => void
  }[]
}

export default function OutputCard({
  title,
  description,
  version,
  generated,
  icon,
  actions,
}: OutputCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">{icon}</div>
          <div className="flex-1">
            <h3 className="mb-1 text-lg font-bold text-gray-900">{title}</h3>
            <p className="mb-3 text-sm text-gray-600">{description}</p>
            <div className="mb-4 text-sm text-gray-500">
              <span className="font-medium">Version: {version}</span>
              <span className="mx-2">•</span>
              <span>Generated: {generated}</span>
            </div>
            <div className="flex gap-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.onClick}
                >
                  {action.format === 'csv' || action.format === 'json' || action.format === 'sql' || action.format === 'pdf' || action.format === 'docx' ? (
                    <Download className="mr-2 h-4 w-4" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
