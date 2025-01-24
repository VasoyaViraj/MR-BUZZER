import React, { useEffect, useState } from 'react'
import DBService from '../services/appwriteClass';
import { databases, client } from '../services/appwrite';

function Admin() {

  let [isBuzzerOn, setIsBuzzerOn] =useState(false);
  let [array, setArray] =useState([])
  let [timestamps, setTimeStamps] = useState([])

  async function handleClick(){
    if(isBuzzerOn){
      isBuzzerOn = false
    }else{
      isBuzzerOn = true
    }

    setIsBuzzerOn(isBuzzerOn)

    try{
      const response = await databases.updateDocument('677305ac00095c78d53e','679383890010605aa324','6793856a00281e9cba9f',{
          'buzzerState': isBuzzerOn
      })
    }catch{
        console.log("sorry our system fails")
        return
    }
  }

  useEffect(()=>{
    const channnel = `databases.${"677305ac00095c78d53e"}.collections.${"679383d0001599a56fa7"}.documents`
    const unsubscribe = client.subscribe(channnel, (response) => {
        try{
            let response = DBService.getData('677305ac00095c78d53e','679383d0001599a56fa7')
                .then(ob => {
                  setArray(ob)
                  setTimeStamps(ob.map(entry => entry.time))
                })
                .catch(e => console.log(e));
        }catch(e){
            console.log(e);
        }
        // fetchdata();
    });
    return () => unsubscribe();
},[])

  return (
    <>
      <div className='h-screen bg-slate-700 ' >
        <div className='h-[8vh] flex justify-center items-center' >
          <div className='flex justify-between items-center bg-slate-400 rounded-xl w-[90%] py-1 px-2' >
            <div className='as'>
              Fan Fic
            </div>
            <div className='vf' >
              Admin Panel
            </div>
          </div>
        </div>
        <div className='flex flex-wrap justify-around items-center h-[92vh]'>
          <div className='h-[92vh] w-72 bg-zinc-400 rounded-xl text-black'>
              {array.map((e, ind) => (
                <div key={ind}>
                  {timestamps.indexOf(e.time) + 1} : {e.name}
                </div>
              ) )}
          </div>
          <div className='h-[41vh] w-72 rounded-xl flex justify-center items-center'>
            <button 
              className={` h-48 w-48 rounded-[50%] shadow-xl shadow-black ${!isBuzzerOn ? 'bg-red-400' : 'bg-green-300'} `} 
              onClick={handleClick}
            >
              { isBuzzerOn ? "Click to turn ``OFF`` Buzzer" : "Click to turn ``ON`` buzzer" }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
