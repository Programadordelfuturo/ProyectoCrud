import React from 'react';

const UsersList = ({ userSelected, deleteUser, usersPaginated }) => {
  return (
    <ul className='list'>
      {usersPaginated.map(element=>(
        <li>
          <p>
            <strong>email: </strong>
            {element.email}
          </p>
          <p>
            <strong>password: </strong>
            {element.password}
          </p>
          <p>
            <strong>first name: </strong>
            {element.first_name}
          </p>
          <p>
            <strong>last name: </strong>
            {element.last_name}
          </p>
          <p>
            <strong>birthday: </strong>
            {element.birthday}
          </p>
          <button onClick={()=> userSelected(element)}>
            Submit
          </button>
          <button onClick={()=> deleteUser(element)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;