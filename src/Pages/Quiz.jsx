import React, { useEffect, useState } from 'react'
import DBService from '../services/appwriteClass';
import { databases, client } from '../services/appwrite';

function Quiz() {

    let TeamName = window.localStorage.getItem("TeamName");
    let [isBuzzerOn, setIsBuzzerOn] = useState(false)
    let [document, setDocument] =useState({})

    async function fetchdata(){
        try{
            await DBService.getData('677305ac00095c78d53e','6775306d003aa3780949','677532220001edd4bcc0')
                .then(array => setDocument(array[0]))
                .catch(e => console.log(e));
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        const channnel = `databases.${"677305ac00095c78d53e"}.collections.${"6775306d003aa3780949"}.documents`
        const unsubscribe = client.subscribe(channnel, (response) => {
            try{
                let response = DBService.getData('677305ac00095c78d53e','6775306d003aa3780949','677532220001edd4bcc0')
                    .then(ob => setIsBuzzerOn(ob[0].buzzerState))
                    .catch(e => console.log(e));
                
            }catch(e){
                console.log(e);
            }
            fetchdata();
        });
        return () => unsubscribe();
    },[])

    useEffect(()=>{
        fetchdata();
    },[])

    async function handleClick(){
        setIsBuzzerOn(false)

        if(document != {}){
            document.player.push(TeamName)
            let updatedArray = document.player
            
            try{
                const response = await databases.updateDocument('677305ac00095c78d53e','6775306d003aa3780949','677532220001edd4bcc0',{
                    'player': updatedArray
                })
            }catch(e){
                console.log(e);
            }
        window.location.reload();
        }else{
            setIsBuzzerOn(false)
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