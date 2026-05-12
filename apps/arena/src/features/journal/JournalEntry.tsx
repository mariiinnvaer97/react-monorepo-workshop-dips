import {
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@medix/ui'
import type { Journal, JournalStatus } from '../../types'

const statusOptions: { value: JournalStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' },
]

type JournalEntryProps = {
  entry: Journal
  onStatusChange: (id: string, status: JournalStatus) => void
}

export function JournalEntry({ entry, onStatusChange }: JournalEntryProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold leading-none tracking-tight">
              {entry.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatDate(entry.date)}
            </p>
          </div>
          <div className="shrink-0">
            <Select
              value={entry.status}
              onValueChange={(value) =>
                onStatusChange(entry.id, value as JournalStatus)
              }
            >
              <SelectTrigger
                className="w-36 text-sm font-medium"
                aria-label={`Change status for ${entry.title}`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((statusOption) => (
                  <SelectItem key={statusOption.value} value={statusOption.value}>
                    {statusOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {entry.content}
        </p>
      </CardContent>
    </Card>
  )
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
