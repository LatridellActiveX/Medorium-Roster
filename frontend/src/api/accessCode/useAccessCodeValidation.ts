import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

function useAccessCodeValidation(code: string | null) {
  const url = `/auth/access-code/verify/${code}`;

  if (!code) return {
    data: false,
    isLoading: false
  };

  return useQuery({
    queryKey: [url],
    queryFn: async () => {
      const { data } = await axios.get<{ valid: boolean }>(url);

      return data.valid;
    },
  });
}

export default useAccessCodeValidation;
