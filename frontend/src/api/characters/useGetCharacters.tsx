import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import { ResponseCharacters } from "../../../../api/types";

function useGetCharacters() {
    const url = '/api/characters';

    return useQuery({
        queryKey: [url],
        queryFn: async () => {
            const { data } = await axios.get<ResponseCharacters>(url);

            return data;
        },
    });
}

export default useGetCharacters;
