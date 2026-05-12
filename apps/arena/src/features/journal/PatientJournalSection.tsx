import { useEffect, useState } from 'react'
import { fetchJournals, updateJournalStatus } from '../../lib/api'
import type { Journal, JournalStatus } from '../../types'
import { JournalForm } from './JournalForm'
import { JournalList } from './JournalList'

type PatientJournalSectionProps = {
  patientId: string
}

export function PatientJournalSection({ patientId }: PatientJournalSectionProps) {
  const [journals, setJournals] = useState<Journal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchJournals(patientId)
      .then((data) => setJournals(data))
      .finally(() => setIsLoading(false))
  }, [patientId])

  function handleStatusChange(journalId: string, status: JournalStatus) {
    updateJournalStatus(journalId, status).then(() =>
      fetchJournals(patientId).then(setJournals),
    )
  }

  function handleCreated(journal: Journal) {
    setJournals((previous) => [journal, ...previous])
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div>
        <h2 className="mb-4 text-lg font-semibold">Journal entries</h2>
        <JournalList
          journals={journals}
          isLoading={isLoading}
          onStatusChange={handleStatusChange}
        />
      </div>
      <div>
        <JournalForm patientId={patientId} onCreated={handleCreated} />
      </div>
    </div>
  )
}
