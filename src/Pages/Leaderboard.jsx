
import React, { useState, useEffect } from "react";
import { client, databases, Query } from '../services/appwrite.js'

const LeaderBoard = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await databases.listDocuments(
          "677305ac00095c78d53e",
          "677305df0009ed5a2613"
        );
        setTeams(
          res.documents.map((doc, index) => ({
            rank: index + 1,
            name: doc.name,
            score: doc.score || 0,
            color: doc.color || "FFFFFF",
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(()=>{
    const channnel = `databases.${"677305ac00095c78d53e"}.collections.${"677305df0009ed5a2613"}.documents`
    const unsubscribe = client.subscribe(channnel, (response) => {
        try{
            DBService.getData('677305ac00095c78d53e','677305df0009ed5a2613')
                .then(res => {
                  

                  setTeams(
                    res.documents.map((doc, index) => ({
                      rank: index + 1,
                      name: doc.name,
                      score: doc.score || 0,
                      color: doc.color || "FFFFFF",
                    }))
                  );
                })
                .catch(e => console.log(e));
        }catch(e){
            console.log(e);
        }
    });
    return () => unsubscribe();
},[])

  let [teams, setTeams] = useState([]);

  const handleRowClick = (name) => {
    const updatedTeams = teams
      .map((team) => ({
        ...team,
        score: team.name === name ? team.score + 1 : team.score,
      }))
      .sort((a, b) => (b.score === a.score ? a.name.localeCompare(b.name) : b.score - a.score))
      .map((team, index) => ({ ...team, rank: index + 1 })); // Rank starts at 1

    setTeams(updatedTeams);

  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-10 font-sans">
      <h2 className="text-lg font-bold">Click on row to change the score</h2>
      <div className="container relative w-[500px] h-[500px]">
        {teams.map((team, index) => (
          <div
            key={team.name}
            className="team absolute w-[90%] h-[60px] shadow-lg left-1/2 transform -translate-x-1/2 flex items-center transition-top duration-500 rounded-lg [transition-timing-function:cubic-bezier(0.68,-0.55,0.265,1.55)] "
            style={{
              top: `${index * 70}px`,
              backgroundColor: team.color, 
            }}
            onClick={() => handleRowClick(team.name)}
          >
            {/* <i className={` fas fa-${team.name} text-white text-2xl w-[80px] flex items-center justify-center my-5 text-[1.8rem] font-semibold h-[60px] `} /> */}
            <span className="text-white text-lg font-bold ml-3" >{index+1}</span>
            <span className="name text-white text-lg font-semibold capitalize flex-1 pl-4">{team.name}</span>
            <span className="score text-white text-xl font-bold w-[60px] text-center my-5 text-[1.4rem]">{team.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;

// import React, { useState } from "react";

// const App = () => {
//   const initialData = [
//     { rank: 0, name: "Team Red", score: 0, color: "#66bb6a" },
//     { rank: 0, name: "James", score: 0, color: "#a1887f" },
//     { rank: 0, name: "Cr7", score: 0, color: "#42a5f5" },
//     { rank: 0, name: "FRONTEND MAN", score: 0, color: "#ffa726" },
//     { rank: 0, name: "Surgical", score: 0, color: "#ef5350" },
//     { rank: 0, name: "Warriors", score: 0, color: "#5c6bc0" },
//   ];

//   const [teams, setTeams] = useState(initialData);

//   const handleRowClick = (name) => {
//     const updatedTeams = teams
//       .map((team) => ({
//         ...team,
//         score: team.name === name ? team.score + 1 : team.score,
//       }))
//       .sort((a, b) => (b.score === a.score ? a.name.localeCompare(b.name) : b.score - a.score))
//       .map((team, index) => ({ ...team, rank: index }));

//     setTeams(updatedTeams);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-10 font-sans">
//       <h2 className="text-lg font-bold">Click on row to change the score</h2>
//       <div className="container relative w-[500px] h-[500px]">
//         {teams.map((team, index) => (
//           <div
//             key={team.name}
//             className={`team absolute w-[90%] h-[60px] [background-color:${team.name}] shadow-[0px_3px_5px_#0000001f] left-[50%] transform -translate-x-1/2 flex items-center transition-top duration-500 rounded-[10px] transition-[top] [transition-timing-function:cubic-bezier(0.68,-0.55,0.265,1.55)]`}
//             style={{ top: `${index * 70}px` }}
//             onClick={() => handleRowClick(team.name)}
//           >
//             <i className={` fas fa-${team.name} text-white text-2xl w-[80px] flex items-center justify-center my-5 text-[1.8rem] font-semibold h-[60px] `} />
//             <span className="name text-white text-lg font-semibold capitalize flex-1">{team.name}</span>
//             <span className="score text-white text-xl my-5 text-[1.4rem] font-bold w-[60px] text-center">{team.score}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;




    // let AllTeams = Array.from(document.querySelectorAll(".team"));
    // AllTeams.forEach((element) => {
    //   let elementName = element.querySelector(".name");
    //   let elementScore = element.querySelector(".score");
    //   if (elementName.innerHTML == name) {
    //     elementScore.innerHTML++;
    //   }
    //   let newRank = teams.find(
    //     (team) => team.name === elementName.innerHTML
    //   ).rank;
    //   element.style.setProperty("top", newRank*70);
    //   console.log(teams.find((team) => team.name === elementName.innerHTML));
    //   setTeams(teams)
    // });


  // const initialData = [
  //   { rank: 0, name: "Team Red", score: 0, color: "#66bb6a" },
  //   { rank: 0, name: "James", score: 0, color: "#a1887f" },
  //   { rank: 0, name: "Cr7", score: 0, color: "#42a5f5" },
  //   { rank: 0, name: "FRONTEND MAN", score: 0, color: "#ffa726" },
  //   { rank: 0, name: "Surgical", score: 0, color: "#ef5350" },
  //   { rank: 0, name: "Warriors", score: 0, color: "#5c6bc0" },
  // ];