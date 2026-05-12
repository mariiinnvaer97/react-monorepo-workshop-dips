import type { Patient } from '../../types'
import { PatientCard } from './PatientCard'

type PatientListProps = {
  patients: Patient[]
  onSelectPatient: (id: string) => void
}

export function PatientList({ patients, onSelectPatient }: PatientListProps) {
  if (patients.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">No patients found</p>
  }

  return (
    <div className="grid gap-3">
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onSelectPatient={onSelectPatient}
        />
      ))}
    </div>
  )
}
