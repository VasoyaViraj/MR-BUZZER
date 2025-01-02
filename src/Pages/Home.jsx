import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    let TeamName = window.localStorage.getItem("TeamName");

    function handleClick(){
        if(TeamName != ""){
            navigate('/Quiz')
        }
    }

    return (
        <>
            <div className='text-white'>
                <div className='flex justify-between items-center m-12 bg-slate-400 text-black p-5 rounded-xl'>
                    <div>Home</div>
                    <div>{TeamName}</div>
                </div>
                <div className='flex justify-center items-center h-24' >
                    <button className='m-4 p-3 rounded-3xl text-black bg-slate-400 w-20 ' onClick={handleClick}>Go</button>
                </div>
            </div>
        </>
  )
}

export default Home