import type { Patient } from '../../types'
import { PatientHeader } from './PatientHeader'
import { PatientList } from './PatientList'

type GenderFilter = 'all' | 'male' | 'female'

type PatientListViewProps = {
  patients: Patient[]
  filteredPatients: Patient[]
  search: string
  genderFilter: GenderFilter
  onSearchChange: (value: string) => void
  onGenderFilterChange: (value: GenderFilter) => void
  onSelectPatient: (id: string) => void
}

export function PatientListView({
  patients,
  filteredPatients,
  search,
  genderFilter,
  onSearchChange,
  onGenderFilterChange,
  onSelectPatient,
}: PatientListViewProps) {
  return (
    <div>
      <PatientHeader
        totalPatients={patients.length}
        filteredCount={filteredPatients.length}
        search={search}
        genderFilter={genderFilter}
        onSearchChange={onSearchChange}
        onGenderFilterChange={onGenderFilterChange}
      />

      <PatientList
        patients={filteredPatients}
        onSelectPatient={onSelectPatient}
      />
    </div>
  )
}
