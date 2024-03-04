import { ComponentProps } from 'react'
import { CiSearch } from 'react-icons/ci'

export const SearchInput = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div
      {...props}
      className="flex w-full justify-between items-center mb-6 p-2 rounded ring-2 ring-slate-200/50 "
    >
      <CiSearch className="w-4 h-4 text-slate-400" />
      <input type="text" className="w-full ml-2 outline-none border-none" />
    </div>
  )
}
