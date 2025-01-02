import React, {useState} from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Quiz from "./Pages/Quiz.jsx";
import Home from "./Pages/Home.jsx";
import Admin from "./Pages/Admin.jsx"

export default function App() {

  let logg = window.localStorage.getItem('isLogged')

  // let [data, setData] = useState({
  //   'TeamName' : '',
  //   'QuizId' : ''
  // })
  // let [doc, setDoc] = useState([])

  // async function sendData(databaseId, collectionId, data){
  //   try{
  //     const response = await databases.createDocument(
  //       databaseId,
  //       collectionId,
  //       'unique()',
  //       data
  //     );
  //   }catch{
  //     console.error('Error creating document:', error);
  //   }
  // }

  // async function fetchData(databaseId, collectionId){
    // try {
    //   const response = await databases.listDocuments(databaseId, collectionId);
    //   setDoc(response.documents)
    // } catch (err) {
    //   console.log("error while fetching : ", err);
    // }
  // }

  // async function handleSubmit(e){
  //   e.preventDefault();
    
  //   sendData('677305ac00095c78d53e', '677305df0009ed5a2613', data);
  // }  

  // useEffect(()=>{

  //   fetchData('677305ac00095c78d53e','677305df0009ed5a2613')
    
  //   const channnel = `databases.${"677305ac00095c78d53e"}.collections.${"677305df0009ed5a2613"}.documents`

    // const unsubscribe = client.subscribe(channnel, (response) => {
    //   fetchData('677305ac00095c78d53e','677305df0009ed5a2613')
    // });

  //   return () => unsubscribe();

  // },[])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/Home" element={<Home/> }/>
          <Route path="/Quiz" element={ <Quiz/> } />
          <Route path="/aAdmin" element={ <Admin/> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

      // <div className="mb-10">
      //   <div>Hello from Viraj</div>
      //   <div className="text-black">
      //     <input label="teamName" value={data.TeamName} onChange={(e) => setData({...data , TeamName: e.target.value})}/>
      //   </div>
      //   <div className="mt-5 text-black">
      //     <input label="quizId" value={data.QuizId}  onChange={(e) => setData({...data , QuizId: e.target.value})}/>
      //   </div>
      //   <button className="m-6 bg-slate-300 text-black" onClick={handleSubmit} >Submit</button>

      //   {/* <button className="m-6 bg-slate-300 text-black">Fetch</button> */}
      // </div>
      
      // <div className="bg-gray-400 text-black w-[100vh] h-[70vh] p-10">

      //   { doc ? <div>
      //     <ul>
      //     {doc.map((doc) => (
      //       <li key={doc.$id}>
      //         <strong>Team Name</strong> {doc.TeamName},<strong>Quiz ID:</strong> {doc.QuizId}
      //       </li>
      //     ))}
      //     </ul>
      //   </div> : <div>
      //       Lauda lele ..........
      //   </div> }

      // </div>