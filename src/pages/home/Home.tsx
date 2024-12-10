import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { selectUser } from '../../slice/userSlice';

export default function Home() {
  const user = useSelector(selectUser);

  return (
    <div>
      <h1>Hello {user.name != '' ? user.name : 'Guest'}</h1>
      <br></br>
      <h1> Welcome to Home page</h1>
      {
        user.email == '' ? <><Link to='/login'>Login</Link>
          <br></br>
          <Link to='/register'>Register</Link>
          <br></br></> : <>

          <Link to='/profile'>Profile</Link>
          <br></br>
        </>
      }



    </div>
  )
}
