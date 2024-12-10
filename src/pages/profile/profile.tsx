import { useDispatch, useSelector } from 'react-redux'
import { resetUser, selectUser } from '../../slice/userSlice'
import { Link } from 'react-router-dom';

export default function Profile() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    function handleLogout(): void { 
        dispatch(resetUser());
        window.location.href = '#/';
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <div>
                <h5>{user.name}</h5>
                <h5>{user.email}</h5>
                <h5>{user.mobilenumber}</h5>
            </div>

            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <br></br>
            <Link to='/'>Back to Home</Link>
        </div>
    )
}
