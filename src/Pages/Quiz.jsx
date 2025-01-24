import React, { useEffect, useState } from 'react'
import DBService from '../services/appwriteClass';
import { databases, client } from '../services/appwrite';
import "@fontsource/archivo-black"
import clickSound from '../../public/buzzer_sound.wav'

function Quiz() {

    let TeamName = window.localStorage.getItem("TeamName");
    let [isBuzzerOn, setIsBuzzerOn] = useState(false)
    const audio = new Audio(clickSound);

    function playAudio(){
        audio.play();
    }

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
        navigator.vibrate(500)
        playAudio();

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
            {/* <div className='h-screens' >
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
            </div> */}

            {/* Main */}
            <div className='bg-[url(/bgForBuzzer.jpg)] bg-repeat h-screen font-archivo'>

                {/* Nav */}
                <div className='h-[8vh] p-[8px_8px_0px_8px]'>

                    <div className='h-full bg-[#f9cbe1e7] rounded-[10px] flex justify-between items-center p-[10px]'>
                        <div style={{textShadow : '2px 1.5px #c5538ae7', fontSize : '20px'}} >Fan Fic Quiz</div>
                        <div className='text-xl mr-6'>{TeamName}</div>
                    </div>

                </div>

                {/* Lower Div */}
                <div className='h-[92vh] flex justify-center items-center' >

                    <div className="imgContainer w-[500px] h-[500px] relative">

                        <img src="/brushStroke.png" className='h-full w-full object-cover object-center' />

                        <div className="svgDiv flex justify-center items-center p-[22px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            {/* bg-[rgb(88,255,114)] */}
                            <button 
                                    onClick={handleClick}
                                disabled={!isBuzzerOn} 
                                style={{textShadow : '1px 1px #c5538ae7'}}
                                className={`shadow-[5px_6px_rgb(116,105,114)] w-[180px] h-[180px] flex justify-center items-center rounded-[50%] text-[22px] ${!isBuzzerOn ? 'bg-red-400' : 'bg-[rgb(88,255,114)]'}`}
                            >
                                { isBuzzerOn ? "Click Buzzer" : "Buzzer is off" }
                            </button>

                        </div>

                    </div>

                </div>


            </div>

        </>
    )
}

export default Quiz