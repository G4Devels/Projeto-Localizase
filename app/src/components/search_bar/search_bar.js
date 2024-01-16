import { useState } from "react"
import { useDebounce } from "./useDebounce"

export const SearchInput = ({search, onChange}) => {
    const [textSearch, setTextSearch] = useState(search)
    const debouncedChange = useDebounce(onChange, 500)

    function handleChange(event) {
        setTextSearch(event.target.value)
        debouncedChange(event.target.value)
    }

    return (
        <input type="search" placeholder="pesquisar" value={textSearch} onChange={handleChange}/>
    )
}