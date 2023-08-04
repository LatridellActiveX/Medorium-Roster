import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

//pass a type as generic to this hook if you wish to specify the type of the incoming data
//e.g. const { data: characters } = useFetch<CharacterType>('/api/characters');
function useFetch<T = Object>(url: string) {
    return useQuery({
        queryKey: [url],
        queryFn: async () => {
            const { data } = await axios.get<T[]>(url);

            return data;
        },
    });
}

export default useFetch;
