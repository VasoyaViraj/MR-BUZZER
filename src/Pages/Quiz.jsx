import React, { useEffect, useState } from 'react'
import DBService from '../services/appwriteClass';
import { databases, client } from '../services/appwrite';

function Quiz() {

    let TeamName = window.localStorage.getItem("TeamName");
    let [isBuzzerOn, setIsBuzzerOn] = useState(false)

    useEffect(()=>{
        const channnel = `databases.${"677305ac00095c78d53e"}.collections.${"6775306d003aa3780949"}.documents`
        const unsubscribe = client.subscribe(channnel, (response) => {
            try{
                DBService.getData('677305ac00095c78d53e','6775306d003aa3780949','677532220001edd4bcc0')
                    .then(ob => setIsBuzzerOn(ob[0].buzzerState))
                    .catch(e => console.log(e));
            }catch(e){
                console.log(e);
            }
        });
        return () => unsubscribe();
    },[])

    async function handleClick(){
        let timeee = Date.now();
        setIsBuzzerOn(false)

        if(TeamName != ""){            
            try{
                const response = await databases.createDocument(
                    '677305ac00095c78d53e',
                    '677d76c0000545a2fb79',
                    'unique()',
                    {
                    'name': TeamName,
                    'time' : timeee
                    }
                )
            }catch(e){
                console.log(e);
            }
        }else{
            alert("Sorry our system fails")
        }
        
    }
    
    return (
        <>
            <div className='h-screens' >
                <div className='h-[8vh] bg-slate-300 flex justify-between items-center' >
                    <div className='ml-3'>
                        {TeamName}
                    </div>
                    <div className='mr-3' >
                        Score : 0
                    </div>
                </div>
                <div className='h-[92vh] bg-red-300 flex justify-center items-center'>
                    <button 
                        className={` h-40 w-40 rounded-[50%] shadow-xl shadow-slate-700 ${!isBuzzerOn ? 'bg-red-400' : 'bg-green-300'} `} 
                        disabled={!isBuzzerOn} onClick={handleClick}>

                        { isBuzzerOn ? "Click Buzzer" : "Buzzer is off" }
                    </button>
                </div>
            </div>
        </>
    )
}

export default Quiz