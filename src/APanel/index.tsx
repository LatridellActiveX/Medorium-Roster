import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Roster, { RosterType } from './roster';

const AdminPanel: React.FC = () => {
    const [roster, setRoster] = useState<RosterType[]>([]);

    useEffect(() => {
        pullRoster();
    }, []);


    function parseRoster(rosterData: string[]) {
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
    }


    const pullRoster = async () => {
        try {
            const rawData = await axios.get('http://localhost:3000/roster');
            parseRoster(rawData.data);
        } catch (error) {
            console.error("Fatal Server Communication Error: ", error);
        }
    }

    let rosters = roster.map(r => <Roster {...r} key={r.label} />);

    return <div id="aPanelContainer">
        <h2 id="aPanelTitle">Admin Panel</h2>
        <form>
            <table>
                <tr>
                    <td><h3>Upload New Character</h3></td>
                </tr>
                <tr>
                    <td><label>Character Name: </label></td>
                    <td><input type="text" required /></td>
                </tr>
                <tr>
                    <td><label>Primary Character</label></td>
                    <td>
                        <select>
                            <option value="none">N/A</option>
                            {rosters}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label>Registration Code</label></td>
                    <td><input type="text" required /></td>
                </tr>
            </table>
        </form>
    </div>
}

export default AdminPanel;