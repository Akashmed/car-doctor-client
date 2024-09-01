import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg'
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
const NavBar = () => {
    const {user, logOut} = useContext(AuthContext);
    const handleLogout = () =>{
        logOut()
        .then(res => alert('Logout successfull'))
        .catch(error => console.log(error))
    }

    const navItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        {
            user? <>
                    <li><Link to='/booking' >My Booking</Link></li>
                    <li onClick={handleLogout}><Link >Logout</Link></li>
            </> : 
            <li><Link to='/login'>Login</Link></li>
        }
    </>
    return (
        <div className="navbar bg-base-100 h-28 mb-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl"><img className='h-12 w-12' src={logo}></img></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
            <button className="btn btn-outline btn-warning">Appoinment</button>
            </div>
        </div>
    );
};

export default NavBar;