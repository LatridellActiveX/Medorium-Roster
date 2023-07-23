import { useState, useEffect } from 'react';
import axios from 'axios';
import Roster, { RosterType } from './roster';
import PageInitialization from '../../ui/pageInitialization';

const AdminPanelPage: React.FC = () => {
    const [roster, setRoster] = useState<RosterType[]>([]);

    useEffect(() => {
        pullRoster();
    }, []);


    const parseRoster = (rosterData: string[]) => {
        let finishedData: RosterType[] | undefined = [];

        if (rosterData instanceof Array) {
            finishedData = rosterData.map(entry => ({ value: entry, label: entry }));

        } else {
            console.log(rosterData);
        }

        console.log("Data has been populated in cache array: ", finishedData);
        console.log("Pushing to state variable. ");
        setRoster(finishedData);
        console.log("state variable contains data: ", roster);
    };


    const pullRoster = async () => {
        try {
            const rawData = await axios.get('http://localhost:3000/roster');
            parseRoster(rawData.data);
        } catch (error) {
            console.error("Fatal Server Communication Error: ", error);
        }
    };

    let rosters = roster.map(r => <Roster {...r} key={r.label} />);

    return <PageInitialization>
        <main id="aPanelContainer">
            <h2 id="aPanelTitle">Admin Panel</h2>
            <form>
                <h3>Upload New Character</h3>
                <div>
                    <div>
                        <h4>Character Name: </h4>
                        <input type="text" />
                    </div>
                    <div>
                        <h4>Primary Character: </h4>
                        <select>
                            <option value="none">N/A</option>
                            {rosters}
                        </select>
                    </div>
                    <div>
                        <h4>Registration Code: </h4>
                        <input type="text" />
                    </div>
                </div>
            </form>
        </main>
    </PageInitialization >
}

export default AdminPanelPage;