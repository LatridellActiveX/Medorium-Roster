import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import type { ResponseCharacters } from "api/types";

function useGetRoster() {
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get<ResponseCharacters>("/api/roster");
      return data;
    },
  });
}

export default useGetRoster;
