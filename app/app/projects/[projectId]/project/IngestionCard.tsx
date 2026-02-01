'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload } from '@/components/icons'

type IngestionMethod = 'db' | 'csv' | null

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

interface IngestionCardProps {
  type: 'source' | 'target'
  title: string
  state: IngestionState
  onUpdate: (updates: Partial<IngestionState>) => void
}

export function IngestionCard({ type, title, state, onUpdate }: IngestionCardProps) {
  const handleMethodChange = (method: IngestionMethod) => {
    onUpdate({ method })
  }

  const handleDbConnectionChange = (field: keyof DatabaseConnection, value: string) => {
    onUpdate({
      db: { ...state.db, [field]: value },
    })
  }

  const handleTestConnection = () => {
    // TODO: Wire to backend API
    console.log(`Testing ${type} connection:`, state.db)
  }

  const handleConnectDatabase = () => {
    // TODO: Wire to backend API
    console.log(`Connecting ${type} database:`, state.db)
  }

  const handleDatabaseSelect = (value: string) => {
    if (value === 'new') {
      onUpdate({
        csv: {
          ...state.csv,
          showNewDbInput: true,
          selectedDbId: null,
          selectedTableId: null,
        },
      })
    } else {
      onUpdate({
        csv: {
          ...state.csv,
          selectedDbId: value,
          showNewDbInput: false,
          selectedTableId: null,
        },
      })
    }
  }

  const handleSaveNewDatabase = () => {
    if (!state.csv.newDbName.trim()) return
    const newDb: Database = {
      id: `db_${Date.now()}`,
      name: state.csv.newDbName,
      tables: [],
    }
    onUpdate({
      csv: {
        ...state.csv,
        databases: [...state.csv.databases, newDb],
        selectedDbId: newDb.id,
        newDbName: '',
        showNewDbInput: false,
      },
    })
  }

  const handleTableSelect = (value: string) => {
    if (value === 'new') {
      onUpdate({
        csv: {
          ...state.csv,
          showNewTableInput: true,
          selectedTableId: null,
        },
      })
    } else {
      onUpdate({
        csv: {
          ...state.csv,
          selectedTableId: value,
          showNewTableInput: false,
        },
      })
    }
  }

  const handleSaveNewTable = () => {
    if (!state.csv.newTableName.trim() || !state.csv.selectedDbId) return
    const newTable: Table = {
      id: `t_${Date.now()}`,
      name: state.csv.newTableName,
    }
    onUpdate({
      csv: {
        ...state.csv,
        databases: state.csv.databases.map(db =>
          db.id === state.csv.selectedDbId
            ? { ...db, tables: [...db.tables, newTable] }
            : db
        ),
        selectedTableId: newTable.id,
        newTableName: '',
        showNewTableInput: false,
      },
    })
  }

  const handleCSVUpload = () => {
    if (!state.csv.selectedTableId) return
    // Capture current state values to avoid stale closures
    const selectedTableId = state.csv.selectedTableId
    const currentDatabases = state.csv.databases
    const currentCsvState = { ...state.csv }
    
    onUpdate({
      csv: { ...currentCsvState, uploadStatus: 'uploading' },
    })
    // TODO: Wire to backend API
    setTimeout(() => {
      const now = new Date().toLocaleString()
      const updatedDatabases = currentDatabases.map(db => ({
        ...db,
        tables: db.tables.map(table =>
          table.id === selectedTableId
            ? { ...table, lastUploaded: now }
            : table
        ),
      }))
      
      onUpdate({
        csv: {
          ...currentCsvState,
          uploadStatus: 'complete',
          databases: updatedDatabases,
        },
      })
      
      setTimeout(() => {
        onUpdate({
          csv: {
            ...currentCsvState,
            uploadStatus: 'idle',
            databases: updatedDatabases,
          },
        })
      }, 2000)
    }, 1500)
  }

  const selectedDatabase = state.csv.databases.find(db => db.id === state.csv.selectedDbId)
  const selectedTable = selectedDatabase?.tables.find(t => t.id === state.csv.selectedTableId)
  const isExistingTable = selectedTable && selectedTable.lastUploaded

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          {type === 'source' && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Read-only access</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Method Selector */}
        <div className="space-y-2 border-b border-gray-200 pb-4">
          <Label htmlFor={`${type}-method-selector`}>Data ingestion method</Label>
          <select
            id={`${type}-method-selector`}
            value={state.method || ''}
            onChange={(e) => handleMethodChange(e.target.value === '' ? null : (e.target.value as 'db' | 'csv'))}
            className="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          >
            <option value="">Select method</option>
            <option value="db">Database Connection</option>
            <option value="csv">CSV Upload</option>
          </select>
        </div>

        {/* Empty State */}
        {state.method === null && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">Select an ingestion method to continue</p>
          </div>
        )}

        {/* Database Connection Mode */}
        {state.method === 'db' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`${type}-host`}>Host</Label>
                <Input
                  id={`${type}-host`}
                  placeholder="localhost"
                  value={state.db.host}
                  onChange={(e) => handleDbConnectionChange('host', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${type}-port`}>Port</Label>
                <Input
                  id={`${type}-port`}
                  type="number"
                  placeholder="5432"
                  value={state.db.port}
                  onChange={(e) => handleDbConnectionChange('port', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${type}-database`}>Database Name</Label>
              <Input
                id={`${type}-database`}
                placeholder={type === 'source' ? 'salesforce_prod' : 'sap_s4hana'}
                value={state.db.databaseName}
                onChange={(e) => handleDbConnectionChange('databaseName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${type}-username`}>Username</Label>
              <Input
                id={`${type}-username`}
                placeholder="admin"
                value={state.db.username}
                onChange={(e) => handleDbConnectionChange('username', e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleTestConnection}>
                Test Connection
              </Button>
              <Button
                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white"
                onClick={handleConnectDatabase}
                disabled={!state.db.host || !state.db.port || !state.db.databaseName || !state.db.username}
              >
                Connect Database
              </Button>
            </div>
          </div>
        )}

        {/* CSV Upload Mode */}
        {state.method === 'csv' && (
          <div className="space-y-6">
            {/* Step 1: Database Selector */}
            <div className="space-y-2">
              <Label htmlFor={`${type}-csv-database`}>Database</Label>
              <select
                id={`${type}-csv-database`}
                value={state.csv.selectedDbId || ''}
                onChange={(e) => handleDatabaseSelect(e.target.value)}
                className="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              >
                <option value="">Select database</option>
                {state.csv.databases.map((db) => (
                  <option key={db.id} value={db.id}>
                    {db.name}
                  </option>
                ))}
                <option value="new">+ Add new database</option>
              </select>
              {state.csv.showNewDbInput && (
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Database name"
                    value={state.csv.newDbName}
                    onChange={(e) =>
                      onUpdate({
                        csv: { ...state.csv, newDbName: e.target.value },
                      })
                    }
                  />
                  <Button size="sm" onClick={handleSaveNewDatabase} disabled={!state.csv.newDbName.trim()}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      onUpdate({
                        csv: { ...state.csv, showNewDbInput: false, newDbName: '' },
                      })
                    }
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            {/* Step 2: Table Selector */}
            {state.csv.selectedDbId && (
              <div className="space-y-2">
                <Label htmlFor={`${type}-csv-table`}>Table</Label>
                <select
                  id={`${type}-csv-table`}
                  value={state.csv.selectedTableId || ''}
                  onChange={(e) => handleTableSelect(e.target.value)}
                  className="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                >
                  <option value="">Select table</option>
                  {selectedDatabase?.tables.map((table) => (
                    <option key={table.id} value={table.id}>
                      {table.name}
                    </option>
                  ))}
                  <option value="new">+ Add new table</option>
                </select>
                {state.csv.showNewTableInput && (
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Table name"
                      value={state.csv.newTableName}
                      onChange={(e) =>
                        onUpdate({
                          csv: { ...state.csv, newTableName: e.target.value },
                        })
                      }
                    />
                    <Button size="sm" onClick={handleSaveNewTable} disabled={!state.csv.newTableName.trim()}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        onUpdate({
                          csv: { ...state.csv, showNewTableInput: false, newTableName: '' },
                        })
                      }
                    >
                      Cancel
                    </Button>
                  </div>
                )}
                {selectedTable?.lastUploaded && (
                  <p className="text-xs text-gray-500 mt-1">
                    Last uploaded: {selectedTable.lastUploaded}
                  </p>
                )}
              </div>
            )}

            {/* Step 3: CSV Upload Area */}
            {state.csv.selectedTableId && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <div className="space-y-3">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-sm text-gray-700 font-medium mb-1">
                        Upload CSV data for the selected table
                      </p>
                      <p className="text-xs text-gray-500">
                        {isExistingTable
                          ? 'This upload will refresh the existing table data.'
                          : 'A new table will be created with this data.'}
                      </p>
                    </div>
                    <input
                      type="file"
                      id={`${type}-csv-upload`}
                      accept=".csv"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleCSVUpload()
                        }
                      }}
                    />
                    <label htmlFor={`${type}-csv-upload`} className="cursor-pointer">
                      <Button variant="outline" type="button" disabled={state.csv.uploadStatus === 'uploading'}>
                        Select Files
                      </Button>
                    </label>
                  </div>
                </div>
                {state.csv.uploadStatus === 'uploading' && (
                  <div className="text-sm text-gray-600 text-center">
                    {isExistingTable ? 'Refreshing data...' : 'Creating table...'}
                  </div>
                )}
                {state.csv.uploadStatus === 'complete' && (
                  <div className="text-sm text-green-600 text-center font-medium">
                    Upload complete
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
