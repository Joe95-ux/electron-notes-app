import { notesAtom, searchAtom, selectedNoteIndexAtom } from '@/store'
import { useAtom, useAtomValue } from 'jotai'

interface UseNotesListProps {
  onSelect?: () => void
}

export const useNotesList = ({ onSelect }: UseNotesListProps) => {
  let notes = useAtomValue(notesAtom)
  const [searchTerm, setSearchTerm] = useAtom(searchAtom)

  if (searchTerm !== null || searchTerm !== '') {
    notes = notes?.filter((note) =>
      note.title.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  const handleNoteSelect = (index: number) => async () => {
    setSelectedNoteIndex(index)

    if (onSelect) {
      onSelect()
    }
  }

  return {
    notes,
    selectedNoteIndex,
    handleNoteSelect
  }
}
