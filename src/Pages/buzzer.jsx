import React, { useEffect, useState } from 'react'
import DBService from '../services/appwriteClass';
import { databases, client } from '../services/appwrite';
import styled from 'styled-components';

const LeaderboardContainer = styled.div`
  min-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  // background: linear-gradient(145deg, #f3f3f3, #e2e2e2);
  background-color : rgba(232, 225, 204, 0.3)
`;

const Header = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
  color: white;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  margin: 0.5rem 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  color: #555;

  &:nth-child(odd) {
    background: #f9f9f9;
  }
`;

const Name = styled.span`
  font-weight: bold;
`;

const Score = styled.span`
  font-size: 1rem;
  color: #007bff;
`;

function Admin2() {

  let [array, setArray] =useState([])
  let [timestamps, setTimeStamps] = useState([])

  useEffect(()=>{
    const channnel = `databases.${"677305ac00095c78d53e"}.collections.${"677d76c0000545a2fb79"}.documents`
    const unsubscribe = client.subscribe(channnel, (response) => {
        try{
            let response = DBService.getData('677305ac00095c78d53e','677d76c0000545a2fb79')
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
      <div className=' min-h-screen flex justify-center items-center p-32 bg-gray-800' >
        <LeaderboardContainer >
        <Header className='font-bold' >Buzzer Leaderboard</Header>
        <List>
            {array.map((player, index) => (
            <ListItem key={index}>
                <Name>{index+1} {player.name}</Name>
                <Score className='font-extrabold'>{player.score}</Score>
            </ListItem>
            ))}
        </List>
        </LeaderboardContainer>
    </div>
    </>
  )
}

export default Admin2
