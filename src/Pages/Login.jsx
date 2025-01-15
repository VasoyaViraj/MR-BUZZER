import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DBService from '../services/appwriteClass';
import "@fontsource/archivo-black"
import './login.css'

function Login() {

    let navigate = useNavigate()

    let [data, setData] = useState({
      'TeamName' : '',
      'QuizId' : ''
    })

    async function handleSubmit(e){
      e.preventDefault();

      await DBService.sendData(
        '677305ac00095c78d53e',
        '677305df0009ed5a2613',
        data
      )
      window.localStorage.setItem('TeamName',data.TeamName)

      //verify teamname from registered teams and password is 10 digits contact number of teamLeader

      navigate('/Quiz')
    }  

  return (
    <>
      {/* <div className='h-screen flex justify-center items-center' >
        <div className='p-10 bg-red-400' >
            <div className='m-5' ><h1 className='font-archivo'>Enter Details</h1></div>
            <div className="m-5">
                <input label="teamName" className='rounded-lg' value={data.TeamName} onChange={(e) => setData({...data , TeamName: e.target.value})}/>
            </div>
            <div className="m-5">
                <input label="quizId" className='rounded-lg' value={data.QuizId}  onChange={(e) => setData({...data , QuizId: e.target.value})}/>
            </div>
            <button className="m-5 bg-slate-300 rounded-2xl p-2" onClick={handleSubmit} >Submit</button>
        </div>
      </div> */}

      <div className='main h-screen bg-[url(/bgForLandingPage.jpg)] bg-no-repeat bg-cover bg-center text-[#fff] flex justify-center items-center'>

        <div className='container p-[40px] text-center bg-[rgba(0,0,0,0.1)] backdrop-blur-[5px] rounded-[15px] shadow-[0px_4px_15px_rgba(255,0,80,0.6)] w-full max-w-[350px]'>

          <h1
            style={{textShadow : '2px 2px 8px #ff2050'}}
            className='text-[2rem] font-archivo font-bold mb-[20px] text-shadow-[2px_2px_8px_#ff2050]' 
          >
            Fan Fic Quiz
          </h1>

          <input type='text' placeholder='Team Name' label="teamName" value={data.TeamName} onChange={(e) => setData({...data , TeamName: e.target.value})}
            className='w-[100%] p-[10px] mt-[10px] border-none rounded-[5px] bg-[#222] text-[#fff] text-[1rem] placeholder:text-[#888] ' 
          />
        
          <input type='text' placeholder='Password' label="quizId" value={data.QuizId}  onChange={(e) => setData({...data , QuizId: e.target.value})}
            className='w-[100%] p-[10px] mt-[10px] border-none rounded-[5px] bg-[#222] text-[#fff] text-[1rem] placeholder:text-[#888] '
          />

          <button className='submit-btn w-full p-[10px] mt-5 bg-[#ff2050] border-none text-[#fff] text-[1.2rem] rounded-[5px] cursor-pointer transition: bg 300ms ease-in-out; font-bold hover:bg-[#ff4b6f]'>
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