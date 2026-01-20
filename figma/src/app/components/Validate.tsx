import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

interface ValidateProps {
  onNext: () => void;
}

const mockIssues = {
  ready: 12,
  warnings: 5,
  blocking: 2,
};

const sourceDataIssues = [
  {
    severity: 'blocking' as const,
    field: 'Account.Type',
    issue: 'Null values detected in non-nullable target field',
    affectedRecords: 45,
    suggestedFix: 'Set default value "OTHER" for null Account.Type values',
  },
  {
    severity: 'warning' as const,
    field: 'Contact.Email',
    issue: 'Invalid email format detected',
    affectedRecords: 12,
    suggestedFix: 'Apply email validation and flag invalid records for review',
  },
  {
    severity: 'warning' as const,
    field: 'Account.AnnualRevenue',
    issue: 'Values exceed target precision (18,2)',
    affectedRecords: 8,
    suggestedFix: 'Round values to 2 decimal places',
  },
];

const transformedDataIssues = [
  {
    severity: 'blocking' as const,
    field: 'CUSTOMER.CUSTOMER_ID',
    issue: 'Source ID length exceeds target field limit (18 chars → 10 chars)',
    affectedRecords: 234,
    suggestedFix: 'Implement hash-based ID generation or use sequence numbers',
  },
  {
    severity: 'warning' as const,
    field: 'CUSTOMER.INDUSTRY_CODE',
    issue: 'Unmapped industry values found',
    affectedRecords: 18,
    suggestedFix: 'Add mapping rules for: "Consulting", "Retail", "Healthcare"',
  },
  {
    severity: 'warning' as const,
    field: 'CONTACT_PERSON.EMAIL_ADDRESS',
    issue: 'Duplicate email addresses across contacts',
    affectedRecords: 6,
    suggestedFix: 'Review business logic for handling shared email addresses',
  },
];

export function Validate({ onNext }: ValidateProps) {
  const getSeverityBadge = (severity: 'blocking' | 'warning' | 'ready') => {
    switch (severity) {
      case 'blocking':
        return (
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Blocking</Badge>
          </div>
        );
      case 'warning':
        return (
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Warning</Badge>
          </div>
        );
      case 'ready':
        return (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Ready</Badge>
          </div>
        );
    }
  };

  const IssueRow = ({ issue }: { issue: typeof sourceDataIssues[0] }) => (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            {getSeverityBadge(issue.severity)}
            <span className="text-xs font-medium text-gray-900">{issue.field}</span>
          </div>
          <div className="text-sm text-gray-700">{issue.issue}</div>
          <div className="text-xs text-gray-500">
            Affected records: <span className="font-medium">{issue.affectedRecords}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-3">
        <div className="text-xs font-medium text-blue-900 mb-1">AI-Suggested Fix</div>
        <div className="text-xs text-blue-700">{issue.suggestedFix}</div>
        <div className="flex gap-2 mt-3">
          <Button size="sm" variant="outline" className="text-xs h-7">
            Apply Fix
          </Button>
          <Button size="sm" variant="ghost" className="text-xs h-7 text-gray-600">
            Accept Risk
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50 flex flex-col">
      <div className="border-b border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Validation & Issues</h1>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-2xl font-semibold text-gray-900">{mockIssues.ready}</div>
              <div className="text-xs text-gray-600">Ready</div>
            </div>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div>
              <div className="text-2xl font-semibold text-gray-900">{mockIssues.warnings}</div>
              <div className="text-xs text-gray-600">Warnings</div>
            </div>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <div className="text-2xl font-semibold text-gray-900">{mockIssues.blocking}</div>
              <div className="text-xs text-gray-600">Blocking Issues</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Source Data Issues</h2>
            <Badge variant="outline" className="text-xs">
              {sourceDataIssues.length} issues
            </Badge>
          </div>
          
          <div className="space-y-3">
            {sourceDataIssues.map((issue, idx) => (
              <IssueRow key={idx} issue={issue} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Transformed Data Issues</h2>
            <Badge variant="outline" className="text-xs">
              {transformedDataIssues.length} issues
            </Badge>
          </div>
          
          <div className="space-y-3">
            {transformedDataIssues.map((issue, idx) => (
              <IssueRow key={idx} issue={issue} />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white p-6 flex justify-end">
        <Button
          onClick={onNext}
          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white"
        >
          Generate Readiness Report
        </Button>
      </div>
    </div>
  );
}
