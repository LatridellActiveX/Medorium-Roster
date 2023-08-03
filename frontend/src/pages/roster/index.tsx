import axios from "axios";
import { useEffect, useState } from "react";
import type { ResponseFullRoster } from "api/types";
import Characters from "./characters";

const RosterPage: React.FC = () => {
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

  return <main className="py-5">
    <section className="w-[600px] mx-auto">
      <Characters roster={roster} />
    </section>
  </main>
};

export default RosterPage;
