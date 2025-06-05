import { Search as SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input"

interface SearchProps {
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Search = ({value, onChange}: SearchProps) => {
  return (
    <div className="m-5 flex items-center gap-2">
        <Input placeholder="Search chats" value={value} onChange={onChange}/>
        <SearchIcon />
    </div>
  )
}
