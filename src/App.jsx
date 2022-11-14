import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import UsersList from './components/UsersList'
import UsersForm from './components/UsersForm'
import Main from './components/Main'



function App() {

  const [ getUsers, setGetUsers ] = useState([]);
  const [ selectUsers, setSelectUsers ] = useState(null);

  useEffect(()=>{
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setGetUsers(res.data))
  },[])
  
  const refresh = () =>{
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setGetUsers(res.data))
  }

  const userSelected = (u) => {
    setSelectUsers(u)
  }

  const deleteUser = (element) => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${element.id}/`)
      .then(() => refresh())
      .catch(error => console.log(error))
  }

  const deSelectUsers = () => setSelectUsers(null)
  
  const [ page, setPage] = useState(1);
  const usersPerPage = 6;
  const lastIndex = page*usersPerPage;
  const firstIndex = lastIndex-usersPerPage;
  const usersPaginated = getUsers.slice(firstIndex, lastIndex);
  const totalPage = [1]

  if(getUsers.length > 6) {
    let count = 1;
    count++
    totalPage.push(count)
  }

  console.log(totalPage);
  return (
    <div className="App">
      <div className='container-data'>
        <UsersForm 
          refresh={refresh}
          selectUsers={selectUsers}
          deSelectUsers={deSelectUsers}
        />
        <UsersList
          usersPaginated={usersPaginated}
          userSelected={userSelected}
          deleteUser={deleteUser}
        />
        <div>
          <button onClick={()=> setPage(page-1)} disabled={page === 1} disa>
            previus
          </button>
          <button onClick={()=> setPage(page+1)} disabled={page === totalPage.length}>
            next
          </button>
        </div>
      </div>
      
      <Main
      />
    </div>
  )
}

export default App
