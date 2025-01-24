import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { client, databases, Query } from '../services/appwrite.js'

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

const Leaderboard2 = () => {


let[teams, setTeams] = useState([])


useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await databases.listDocuments(
          "677305ac00095c78d53e",
          "677305df0009ed5a2613"
        );
        setTeams(
          res.documents.map((doc, index) => ({
            name: doc.name,
            score: doc.score || 0,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  teams.sort((a, b) => a.score - b.score)
  teams.reverse()

  return (
    <div className=' min-h-screen flex justify-center items-center bg-gray-800' >
        <LeaderboardContainer >
        <Header className='font-bold' >Leaderboard</Header>
        <List>
            {teams.map((player, index) => (
            <ListItem key={index}>
                <Name>{index+1} {player.name}</Name>
                <Score className='font-extrabold'>{player.score}</Score>
            </ListItem>
            ))}
        </List>
        </LeaderboardContainer>
    </div>
  );
};

export default Leaderboard2;
