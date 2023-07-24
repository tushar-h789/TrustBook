import React from 'react'
import { Link } from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaUserFriends} from 'react-icons/fa'
import {IoIosNotifications} from 'react-icons/io'
import {MdGroups2} from 'react-icons/md'
import {BsMessenger} from 'react-icons/bs'
import DarkMode from '../DarkMode/DarkMode'
import Logout from '../Logout/Logout'

const HomeNavbar = () => {
    
  return (
    <div className="sm:navbar bg-primary flex items-center">
  <div className="navbar-start">
    {/* <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div> */}
    <Link className="btn btn-ghost normal-case text-xl text-white" to='/home'>TrustBook</Link>
  </div>
  <div className="navbar-center bg-primary">
    <ul className="menu menu-horizontal px-1 text-white  lg:gap-12">
      <li className='text-3xl lg:text-4xl'><Link to='/home'><AiFillHome /></Link></li>
      <li className='text-3xl lg:text-4xl'><Link to='/home'><FaUserFriends /></Link></li>
      <li className='text-3xl lg:text-4xl'><Link to='/home'><IoIosNotifications /></Link></li>
      <li className='text-3xl lg:text-4xl'><Link to='/home'><MdGroups2 /></Link></li>
      <li className='text-3xl lg:text-4xl mr-2'><Link to='/home'><BsMessenger /></Link></li>
      {/* <li tabIndex={0}>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li> */}
      {/* <li><a>Item 3</a></li> */}
    </ul>
  </div>
  <div className="bg-primary p-2.5 gap-2 navbar-end md:gap-4 flex align-center">
  <div className="flex-none gap-2">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 lg:w-14 rounded-full">
          <img src="/public/assets/tushar.jpg" />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <Link to='#' className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to='#'>Settings</Link></li>
        <li><Link><Logout/></Link></li>
      </ul>
    </div>
  </div>
    <div>
    <DarkMode />
    </div>
  </div>
</div>
  )
}

export default HomeNavbar