import { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponseFullRoster } from 'api/types';

function useRoster() {
  const [roster, setRoster] = useState<ResponseFullRoster>([]);

  useEffect(() => {
    pullRoster();
  }, []);

  const pullRoster = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/roster");
      const roster = response.data as ResponseFullRoster;
      setRoster(roster);
    } catch (error) {
      console.error("Fatal Server Communication Error: ", error);
    }
  };

  return roster;
}

export default useRoster;