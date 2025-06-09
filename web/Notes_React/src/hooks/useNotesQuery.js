import { useQuery } from "@tanstack/react-query"
import { fetchNotesService } from "../services/notesService"

export const useNotesQuery = () => {
    return useQuery({
        queryFn: fetchNotesService,
        queryKey: ['notes'],
        staleTime: 5000,
        onError: (err)=>{
            if(err instanceof Error){
                console.log(err.message)
            }
        }
    })
}