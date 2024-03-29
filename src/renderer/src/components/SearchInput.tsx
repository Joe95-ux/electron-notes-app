import { notesAtom, searchAtom } from '@/store'
import { useAtom, useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { IoSearch } from 'react-icons/io5'

export const SearchInput = ({ ...props }: ComponentProps<'div'>) => {
  const notes = useAtomValue(notesAtom)
  const [search, setSearch] = useAtom(searchAtom)

  return (
    <div
      {...props}
      className="flex w-full justify-between items-center mb-6 px-2 py-1 rounded border border-slate-700"
    >
      <IoSearch className="w-7 h-7 text-slate-400" />
      <input
        type="text"
        className="w-full ml-2 outline-none border-none bg-inherit"
        placeholder="Quick search..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
