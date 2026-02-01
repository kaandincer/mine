'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, CheckCircle2, FileText } from '@/components/icons'
import { IngestionCard } from './IngestionCard'

type IngestionMethod = 'db' | 'csv' | null

interface UploadedFile {
  name: string
  size: string
}

interface DatabaseConnection {
  host: string
  port: string
  databaseName: string
  username: string
  password?: string
}

interface Database {
  id: string
  name: string
  tables: Table[]
}

interface Table {
  id: string
  name: string
  lastUploaded?: string
}

interface CsvState {
  selectedDbId: string | null
  selectedTableId: string | null
  databases: Database[]
  newDbName: string
  newTableName: string
  showNewDbInput: boolean
  showNewTableInput: boolean
  uploadStatus: 'idle' | 'uploading' | 'complete'
}

interface IngestionState {
  method: IngestionMethod
  db: DatabaseConnection
  csv: CsvState
}

export default function ControlPlanePage() {
  // Schema Documents state
  const [sourceFiles, setSourceFiles] = useState<UploadedFile[]>([
    { name: 'salesforce_schema.ddl', size: '2.4 KB' },
  ])
  const [targetFiles, setTargetFiles] = useState<UploadedFile[]>([
    { name: 'sap_erd.pdf', size: '1.8 KB' },
  ])

  // Source Ingestion state
  const [sourceIngestion, setSourceIngestion] = useState<IngestionState>({
    method: null,
    db: { host: '', port: '', databaseName: '', username: '' },
    csv: {
      selectedDbId: null,
      selectedTableId: null,
      databases: [
        { id: 'db1', name: 'SALESFORCE_PROD', tables: [{ id: 't1', name: 'Account' }, { id: 't2', name: 'Contact' }] },
      ],
      newDbName: '',
      newTableName: '',
      showNewDbInput: false,
      showNewTableInput: false,
      uploadStatus: 'idle',
    },
  })

  // Target Ingestion state
  const [targetIngestion, setTargetIngestion] = useState<IngestionState>({
    method: null,
    db: { host: '', port: '', databaseName: '', username: '' },
    csv: {
      selectedDbId: null,
      selectedTableId: null,
      databases: [
        { id: 'db1', name: 'SAP_S4HANA', tables: [{ id: 't1', name: 'CUSTOMER' }, { id: 't2', name: 'CONTACT_PERSON' }] },
      ],
      newDbName: '',
      newTableName: '',
      showNewDbInput: false,
      showNewTableInput: false,
      uploadStatus: 'idle',
    },
  })

  const handleFileUpload = (type: 'source' | 'target', files: FileList | null) => {
    if (!files) return
    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
    }))
    if (type === 'source') {
      setSourceFiles([...sourceFiles, ...newFiles])
    } else {
      setTargetFiles([...targetFiles, ...newFiles])
    }
  }

  const updateSourceIngestion = (updates: Partial<IngestionState>) => {
    setSourceIngestion(prev => ({ ...prev, ...updates }))
  }

  const updateTargetIngestion = (updates: Partial<IngestionState>) => {
    setTargetIngestion(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Control Plane</h1>
          <p className="text-sm text-gray-600">Configure source and target system connections</p>
        </div>

        {/* Data Ingestion Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Data Ingestion</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Source Database Card */}
            <IngestionCard
              type="source"
              title="Source Database"
              state={sourceIngestion}
              onUpdate={updateSourceIngestion}
            />

            {/* Target Database Card */}
            <IngestionCard
              type="target"
              title="Target Database"
              state={targetIngestion}
              onUpdate={updateTargetIngestion}
            />
          </div>
        </div>

        {/* Schema Documents Section */}
        <Card>
          <CardHeader>
            <CardTitle>Schema Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Source Schema Files */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Source Schema Files</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <div className="space-y-2">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto" />
                    <p className="text-xs text-gray-500">Upload DDL, ERD, or documentation</p>
                    <input
                      type="file"
                      id="source-upload"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileUpload('source', e.target.files)}
                    />
                    <label htmlFor="source-upload" className="cursor-pointer">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                      >
                        Upload Files
                      </Button>
                    </label>
                  </div>
                </div>
                {sourceFiles.length > 0 && (
                  <div className="space-y-2">
                    {sourceFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-900">{file.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{file.size}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Target Schema Files */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Target Schema Files</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <div className="space-y-2">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto" />
                    <p className="text-xs text-gray-500">Upload DDL, ERD, or documentation</p>
                    <input
                      type="file"
                      id="target-upload"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileUpload('target', e.target.files)}
                    />
                    <label htmlFor="target-upload" className="cursor-pointer">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                      >
                        Upload Files
                      </Button>
                    </label>
                  </div>
                </div>
                {targetFiles.length > 0 && (
                  <div className="space-y-2">
                    {targetFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-900">{file.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{file.size}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
