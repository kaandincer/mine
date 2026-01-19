export type ProjectStatus = 'in_progress' | 'completed'

export interface Project {
  id: string
  name: string
  sourceSystem: string
  targetSystem: string
  status: ProjectStatus
  lastModified: string
  currentStage: string
  tablesCount: number
}

export interface Field {
  id: string
  name: string
  type: string
  nullable: boolean
  key?: 'PK' | null
}

export interface Table {
  id: string
  name: string
  fields: Field[]
  selected: boolean
}

export interface Schema {
  id: string
  name: string
  tables: Table[]
}

export type MappingStatus = 'approved' | 'needs_review' | 'unmapped'

export interface MappingRow {
  id: string
  sourceField: string
  targetField: string | null
  confidence: number | null
  status: MappingStatus
  sourceObject: string
  targetObject: string
}

export interface MappingGroup {
  sourceObject: string
  targetObject: string
  overallConfidence: number
  status: MappingStatus
  rows: MappingRow[]
}

export interface TransformSpec {
  id: string
  mappingRowId: string
  description: string
  sql: string
  tested: boolean
  testCases?: { before: string; after: string }[]
}

export type IssueSeverity = 'blocking' | 'warning'
export type IssueState = 'open' | 'fixed' | 'accepted'

export interface Issue {
  id: string
  severity: IssueSeverity
  fieldPath: string
  description: string
  affectedRecords: number
  suggestedFix: string
  state: IssueState
}

export interface ValidationSummary {
  ready: number
  warnings: number
  blocking: number
}
