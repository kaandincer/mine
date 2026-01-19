import { Project, Schema, MappingGroup, TransformSpec, Issue, ValidationSummary } from '@/lib/types'

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Salesforce to SAP Migration',
    sourceSystem: 'Salesforce',
    targetSystem: 'SAP S/4HANA',
    status: 'in_progress',
    lastModified: '2026-01-18',
    currentStage: 'Mapping Review',
    tablesCount: 12,
  },
  {
    id: '2',
    name: 'Oracle EBS to Dynamics 365',
    sourceSystem: 'Oracle E-Business Suite',
    targetSystem: 'Microsoft Dynamics 365',
    status: 'in_progress',
    lastModified: '2026-01-17',
    currentStage: 'Schema Ingestion',
    tablesCount: 28,
  },
  {
    id: '3',
    name: 'Legacy CRM Data Migration',
    sourceSystem: 'Custom CRM',
    targetSystem: 'HubSpot',
    status: 'completed',
    lastModified: '2026-01-15',
    currentStage: 'Completed',
    tablesCount: 8,
  },
]

export const mockSourceSchema: Schema = {
  id: 'source-1',
  name: 'SALESFORCE_PROD',
  tables: [
    {
      id: 'account',
      name: 'Account',
      selected: true,
      fields: [
        { id: 'id', name: 'Id', type: 'VARCHAR(18)', nullable: false, key: 'PK' },
        { id: 'name', name: 'Name', type: 'VARCHAR(255)', nullable: false },
        { id: 'type', name: 'Type', type: 'VARCHAR(40)', nullable: true },
        { id: 'industry', name: 'Industry', type: 'VARCHAR(40)', nullable: true },
        { id: 'annualRevenue', name: 'AnnualRevenue', type: 'DECIMAL(18,2)', nullable: true },
      ],
    },
    {
      id: 'contact',
      name: 'Contact',
      selected: true,
      fields: [
        { id: 'id', name: 'Id', type: 'VARCHAR(18)', nullable: false, key: 'PK' },
        { id: 'accountId', name: 'AccountId', type: 'VARCHAR(18)', nullable: true },
        { id: 'firstName', name: 'FirstName', type: 'VARCHAR(255)', nullable: true },
        { id: 'lastName', name: 'LastName', type: 'VARCHAR(255)', nullable: true },
        { id: 'email', name: 'Email', type: 'VARCHAR(255)', nullable: true },
      ],
    },
  ],
}

export const mockTargetSchema: Schema = {
  id: 'target-1',
  name: 'SAP_S4HANA',
  tables: [
    {
      id: 'customer',
      name: 'CUSTOMER',
      selected: true,
      fields: [
        { id: 'customer_id', name: 'CUSTOMER_ID', type: 'CHAR(10)', nullable: false, key: 'PK' },
        { id: 'customer_name', name: 'CUSTOMER_NAME', type: 'VARCHAR(255)', nullable: false },
        { id: 'customer_type', name: 'CUSTOMER_TYPE', type: 'VARCHAR(40)', nullable: true },
        { id: 'industry_code', name: 'INDUSTRY_CODE', type: 'VARCHAR(40)', nullable: true },
        { id: 'annual_revenue', name: 'ANNUAL_REVENUE', type: 'DECIMAL(18,2)', nullable: true },
      ],
    },
    {
      id: 'contact_person',
      name: 'CONTACT_PERSON',
      selected: true,
      fields: [
        { id: 'contact_id', name: 'CONTACT_ID', type: 'CHAR(10)', nullable: false, key: 'PK' },
        { id: 'customer_id', name: 'CUSTOMER_ID', type: 'CHAR(10)', nullable: true },
        { id: 'first_name', name: 'FIRST_NAME', type: 'VARCHAR(255)', nullable: true },
        { id: 'last_name', name: 'LAST_NAME', type: 'VARCHAR(255)', nullable: true },
        { id: 'email', name: 'EMAIL', type: 'VARCHAR(255)', nullable: true },
      ],
    },
  ],
}

export const mockMappings: MappingGroup[] = [
  {
    sourceObject: 'Account',
    targetObject: 'CUSTOMER',
    overallConfidence: 92,
    status: 'approved',
    rows: [
      {
        id: '1',
        sourceField: 'Id',
        targetField: 'CUSTOMER_ID',
        confidence: 98,
        status: 'approved',
        sourceObject: 'Account',
        targetObject: 'CUSTOMER',
      },
      {
        id: '2',
        sourceField: 'Name',
        targetField: 'CUSTOMER_NAME',
        confidence: 98,
        status: 'approved',
        sourceObject: 'Account',
        targetObject: 'CUSTOMER',
      },
      {
        id: '3',
        sourceField: 'Type',
        targetField: 'CUSTOMER_TYPE',
        confidence: 85,
        status: 'needs_review',
        sourceObject: 'Account',
        targetObject: 'CUSTOMER',
      },
      {
        id: '4',
        sourceField: 'Industry',
        targetField: 'INDUSTRY_CODE',
        confidence: 72,
        status: 'needs_review',
        sourceObject: 'Account',
        targetObject: 'CUSTOMER',
      },
      {
        id: '5',
        sourceField: 'AnnualRevenue',
        targetField: 'ANNUAL_REVENUE',
        confidence: 92,
        status: 'approved',
        sourceObject: 'Account',
        targetObject: 'CUSTOMER',
      },
    ],
  },
  {
    sourceObject: 'Contact',
    targetObject: 'CONTACT_PERSON',
    overallConfidence: 94,
    status: 'approved',
    rows: [
      {
        id: '6',
        sourceField: 'Id',
        targetField: 'CONTACT_ID',
        confidence: 95,
        status: 'approved',
        sourceObject: 'Contact',
        targetObject: 'CONTACT_PERSON',
      },
      {
        id: '7',
        sourceField: 'AccountId',
        targetField: 'CUSTOMER_ID',
        confidence: 90,
        status: 'approved',
        sourceObject: 'Contact',
        targetObject: 'CONTACT_PERSON',
      },
      {
        id: '8',
        sourceField: 'FirstName',
        targetField: 'FIRST_NAME',
        confidence: 95,
        status: 'approved',
        sourceObject: 'Contact',
        targetObject: 'CONTACT_PERSON',
      },
    ],
  },
]

export const mockTransformSpecs: TransformSpec[] = [
  {
    id: '1',
    mappingRowId: '3',
    description: 'Convert account type values to uppercase and map Prospect to PROSPECT, Customer to CUSTOMER, and any other values to OTHER',
    sql: `CASE
WHEN Type = 'Prospect' THEN 'PROSPECT'
WHEN Type = 'Customer' THEN 'CUSTOMER'
WHEN Type = 'Partner' THEN 'PARTNER'
ELSE 'OTHER'
END`,
    tested: true,
    testCases: [
      { before: 'Prospect', after: 'PROSPECT' },
      { before: 'Customer', after: 'CUSTOMER' },
      { before: 'Partner', after: 'PARTNER' },
    ],
  },
]

export const mockIssues: Issue[] = [
  {
    id: '1',
    severity: 'blocking',
    fieldPath: 'Account.Type',
    description: 'Null values detected in non-nullable target field',
    affectedRecords: 45,
    suggestedFix: 'Set default value "OTHER" for null Account.Type values',
    state: 'open',
  },
  {
    id: '2',
    severity: 'warning',
    fieldPath: 'Contact.Email',
    description: 'Invalid email format detected',
    affectedRecords: 12,
    suggestedFix: 'Apply email validation and flag invalid records for review',
    state: 'open',
  },
]

export const mockValidationSummary: ValidationSummary = {
  ready: 12,
  warnings: 5,
  blocking: 2,
}

export function getProject(id: string): Project | undefined {
  return mockProjects.find(p => p.id === id)
}
