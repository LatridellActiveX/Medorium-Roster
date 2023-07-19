import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AdminPanel = () =>{

    const [roster, setRoster] = useState([]);


    //regular variable for character roster
    var rosterList;

    //stateVariable for form data


    //useEffect function to pull roster data
    useEffect(()=>{
        if(roster == null || roster == undefined || roster.length == 0){
            pullRoster();
        }else{
            console.log("roster data: ", roster);
        }
    });


    function parseRoster(rosterData){
        var finishedData = [];
        if(rosterData instanceof Array){
            rosterData.forEach((entry, index) => {
                finishedData.push({value: entry, label: entry});
            });
        }else{
            console.log(rosterData);
        }

    console.log("Data has been populated in cache array: ", finishedData);
    console.log("Pushing to state variable. ");
    setRoster(finishedData);
    console.log("state variable contains data: ", roster);
    }
    
    
    const pullRoster = async () => {
        try{
            const rawData = await axios.get('http://localhost:3000/roster');
            parseRoster(rawData.data);
        }catch(error){
            console.error("Fatal Server Communication Error: ", error);
        }
    }
    
/**
 * 
 * 
 * 
 * 
 * 
 */

    return(
        <div id="aPanelContainer">
            <h2 id="aPanelTitle">Admin Panel</h2>
            <form>
                <table>
                    <tr>
                        <td><h3>Upload New Character</h3></td>
                    </tr>
                    <tr>
                        <td><label>Character Name: </label></td>
                        <td><input type="text" required/></td>
                    </tr> 
                    <tr>
                        <td><label>Primary Character</label></td>
                        <td>
                            <select>
                                <option value="none">N/A</option>
                            {roster.map(option=>(
                                    <option key={option.value} value={option.value}>
                                       {option.label}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Registration Code</label></td>
                        <td><input type="text" required/></td>
                    </tr> 
                </table>
            </form>
        </div>
    );

}

export default AdminPanel;