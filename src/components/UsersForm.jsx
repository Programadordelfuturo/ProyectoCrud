import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const initialForm = () => ({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        birthday: "",
})


const UsersForm = ({ refresh, selectUsers, deSelectUsers }) => {

  const { handleSubmit, register, reset } = useForm()

  useEffect(()=>{
    if(selectUsers){
      reset(selectUsers)
    } else {
      reset(initialForm) 
    }
  }, [selectUsers])

  const submit = (data) => {
    if(selectUsers){
      axios.put(`https://users-crud1.herokuapp.com/users/${selectUsers.id}/`, data)
        .then(() => {
          refresh()
          deSelectUsers()
        })
        .catch(error => console.log(error.responde?.data))
    } else {
      axios.post('https://users-crud1.herokuapp.com/users/', data)
        .then(() => {
          refresh()
          reset(initialForm) 
        })
        .catch(error => console.log(error.responde?.data))
    }
  }

  return (
    <form className='form'
      onSubmit={handleSubmit(submit)}
    >
      <div>
        <label htmlFor="email"><strong>Email: </strong></label>
        <input {...register("email")} type="text" id="email"/>
      </div>
      <div>
        <label htmlFor="password"><strong>Password: </strong></label>
        <input {...register("password")} type="text" id="password"/>
      </div>
      <div>
        <label htmlFor="first_name "><strong>First name: </strong></label>
        <input {...register("first_name")} type="text" id="first_name"/>
      </div>
      <div>
        <label htmlFor="last_name"><strong>Last name: </strong></label>
        <input {...register("last_name")} type="text" id="last_name"/>
      </div>
      <div>
        <label htmlFor="birthday"><strong>Birthday: </strong></label>
        <input {...register("birthday")} type="date" id="birthday"/>
      </div>
      <button>
        Submit
      </button>
      { selectUsers 
      ? <button onClick={()=>deSelectUsers()}>
        cancel
      </button> 
      : ''
      }
    </form>
  );
};

export default UsersForm;