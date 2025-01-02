import React, { useEffect, useState } from 'react'
import { databases, client } from '../services/appwrite';
import { useNavigate } from 'react-router-dom';
import DBService from '../services/appwriteClass';

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

      navigate('/Home')
    }  

  return (
    <>
      <div className='h-screen flex justify-center items-center' >
        <div className='p-10 bg-red-400' >
            <div className='m-5' ><h1>Enter Details</h1></div>
            <div className="m-5">
                <input label="teamName" className='rounded-lg' value={data.TeamName} onChange={(e) => setData({...data , TeamName: e.target.value})}/>
            </div>
            <div className="m-5">
                <input label="quizId" className='rounded-lg' value={data.QuizId}  onChange={(e) => setData({...data , QuizId: e.target.value})}/>
            </div>
            <button className="m-5 bg-slate-300 rounded-2xl p-2" onClick={handleSubmit} >Submit</button>
        </div>
      </div>
    </>
  )
}

export default Login