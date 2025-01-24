import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "@fontsource/archivo-black"
import './login.css'
// import {databasesMR, Query} from '../services/appwriteMR.js'
import { client, databases, Query } from '../services/appwrite';

function Login() {

    let navigate = useNavigate()

    let [data, setData] = useState({
      'TeamName' : '',
      'Password' : ''
    })

    //verify teamname from registered teams and password is 10 digits contact number of teamLeader

    // async function handleSubmit(e){
    //   e.preventDefault();

    //   let response = await databasesMR.listDocuments(
    //     import.meta.env.VITE_DATABASE_ID,
    //     import.meta.env.VITE_COLLECTION_ID,
    //     [
    //       Query.equal('teamName',data.TeamName)
    //     ]
    //   ).then(ob => setObjt(ob.documents[0]))
    //     .catch(e => console.log(e))

    //   if(objt){
    //     console.log("YEH");
    //     if(objt.teamMembers[0].contactNumber == data.Password ){
    //       window.localStorage.setItem('TeamName',data.TeamName)
    //       navigate('/Quiz')
    //     }else{
    //       console.log(objt?.teamMembers[0]?.contactNumber , data.Password);
    //       alert("Enter correct password");
    //     }
    //   }else{
        
    //     alert("Team not found");
    //   }
    // }  

    async function handleSubmit(e) {
      e.preventDefault();
    
      try {

        const response = await databases.listDocuments(
          '677305ac00095c78d53e',
          '679382f4002734c631d2',
          [Query.equal('name', data.TeamName)]
        );
        const team = response.documents[0];
        
        if(team){

          const contactNumber = team?.contactNumber;
          console.log(contactNumber);

          if(contactNumber == data.Password){
            window.localStorage.setItem('TeamName', data.TeamName);
            navigate('/Quiz');
          }else{
            alert("Enter the correct password");
          }

        }else{

          alert("Team name not matched please enter correct team name");

        }

      } catch (error) {
        console.error("Error while fetching team data:", error);
        alert("An error occurred. Please try again later.");
      }
    }

  return (
    <>

      <div className='main h-screen bg-[url(/bgForLandingPage.jpg)] bg-no-repeat bg-cover bg-center text-[#fff] flex justify-center items-center'>

        <div className='container p-[40px] text-center bg-[rgba(0,0,0,0.1)] backdrop-blur-[5px] rounded-[15px] shadow-[0px_4px_15px_rgba(255,0,80,0.6)] w-full max-w-[350px]'>

          <h1
            style={{textShadow : '2px 2px 8px #ff2050'}}
            className='text-[2rem] font-archivo font-bold mb-[20px] text-shadow-[2px_2px_8px_#ff2050]' 
          >
            Fan Fic Quiz
          </h1>

          <input 
            type='text' 
            placeholder='Team Name' 
            label="teamName" 
            value={data.TeamName} 
            onChange={(e) => setData({...data , TeamName: e.target.value})}
            className='w-[100%] p-[10px] mt-[10px] border-none rounded-[5px] bg-[#222] text-[#fff] text-[1rem] placeholder:text-[#888] ' 
          />
        
          <input 
            type='text' 
            placeholder='Password' 
            label="quizId" 
            value={data.Password}  
            onChange={(e) => setData({...data , Password: e.target.value})}
            className='w-[100%] p-[10px] mt-[10px] border-none rounded-[5px] bg-[#222] text-[#fff] text-[1rem] placeholder:text-[#888] '
          />

          <button 
            onClick={handleSubmit}  
            className='submit-btn w-full p-[10px] mt-5 bg-[#ff2050] border-none text-[#fff] text-[1.2rem] rounded-[5px] cursor-pointer transition: bg 300ms ease-in-out; font-bold hover:bg-[#ff4b6f]'
          >
            Go for Buzzer round
          </button>


          <div className="symbols flex justify-center mt-[20px]">

            <div className='w-[50px] h-[50px] m-[0px_10px] bg-[#222] border-2 box-border border-solid border-[#ff2050] flex justify-center items-center rounded-[50%] shadow-[0px_0px_10px_#ff2050]' >

                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className='fill-[#ff2050] w-[30px] h-[30px]' >
                    <circle cx="50" cy="50" r="40" />
                </svg>

            </div>

            <div className='w-[50px] h-[50px] m-[0px_10px] bg-[#222] border-2 box-border border-solid border-[#ff2050] flex justify-center items-center rounded-[50%] shadow-[0px_0px_10px_#ff2050]' >

                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className='fill-[#ff2050] w-[30px] h-[30px]' >
                    <rect x="25" y="25" width="50" height="50" />
                </svg>

            </div>

            <div className='w-[50px] h-[50px] m-[0px_10px] bg-[#222] border-2 box-border border-solid border-[#ff2050] flex justify-center items-center rounded-[50%] shadow-[0px_0px_10px_#ff2050]' >

                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className='fill-[#ff2050] w-[30px] h-[30px]' >
                    <polygon points="50,15 90,85 10,85" />
                </svg>

            </div>

          </div>

        </div>

      </div>

    </>
  ) 
}

export default Login