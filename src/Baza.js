import React, { useEffect, useState } from "react";
import {app} from "./firebase"; // Assuming the correct path to your configuration file
import { getDatabase, ref,set,push, onValue } from "firebase/database";

// App.js

function App() {
  const [data, setData] = useState([]);
/*
  useEffect(() => {
    // Initialize the Firebase database with the provided configuration
    const database = getDatabase(app);
    
    // Reference to the specific collection in the database
   
    const collectionRef = ref(database, "scheduler");

    // Function to fetch data from the database
    const fetchData = () => {
      // Listen for changes in the collection
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        // Check if dataItem exists
        if (dataItem) {
          // Convert the object values into an array
          const displayItem = Object.values(dataItem);
          setData(displayItem);
        }
      });
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);
*/
    let[inputValue1, setInputValue1] = useState("");
    let[inputValue2, setInputValue2] = useState("");
    let[inputValue3, setInputValue3] = useState("");


    const saveData = async () =>{
        const db = getDatabase(app);
        const newDocRef = push(ref(db,"appointments"));
        set(newDocRef,
            {
                startDate: inputValue2,
                endDate: inputValue3,
                title: inputValue1
            }).then(() =>{
                alert("Zapisano");
            }).catch(()=>{
                alert("Bład");
            })
    }

    const appointments = [
        { startDate: '2024-09-03T09:45', endDate: '2024-09-03T11:00', title: 'Meeting1' },
        { startDate: '2024-09-02T12:00', endDate: '2018-11-02T13:30', title: 'Go to a gym1' },
      ];
    const saveData2 = async () =>{
        const db = getDatabase(app);
        const newDocRef = push(ref(db,"appointments"));
        try {
            await set(newDocRef, appointments);
            console.log("Zapisano:", appointments);
        } catch (error) {
            console.error("Błąd podczas zapisywania:", error);
        }
    }

  return (
    <div>
      <h1>Data from database:</h1>
        <input type='text' value={inputValue1} onChange={(e)=> setInputValue1(e.target.value)}></input>
        <input type='date' value={inputValue2} onChange={(e)=> setInputValue2(e.target.value)}></input>
        <input type='date' value={inputValue3} onChange={(e)=> setInputValue3(e.target.value)}></input>

        <button onClick={saveData2}>Save</button>
    </div>
  );
}

export default App;