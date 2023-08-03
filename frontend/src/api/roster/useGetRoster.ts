import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import type { ResponseFullRoster } from "api/types";

function useGetRoster() {
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get<ResponseFullRoster>("/api/roster");
      return data;
    },
  });
}

export default useGetRoster;
