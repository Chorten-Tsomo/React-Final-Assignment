import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import {MenuItems} from './MenuItems';


function Navbar() {
    
    const [dropdown, setDropdown] = useState(false)

    return(
        <>
        <nav className='navbar'>
            <Link to='./'
            className='navabar-logo'>
                LOGO
            </Link>
            <ul className='nav-items'>
                {MenuItems.map((item) => {
                    if(item.title === 'Movies'){
                        return(
                            <li 
                            key={item.id}
                            className={item.cName}
                            onMouseEnter={() => setDropdown(true)}
                            onMouseLeave={() => setDropdown(false)}>
                                <Link to={item.path}>{item.title}</Link>
                                {dropdown && <Dropdown />}
                            </li>
                        );
                    }
                    return(
                        <li key={item.id} className={item.cName}>
                            <Link to={item.path}>{item.title}</Link>

                        </li>
                    );
                })}

            </ul>
            
          
        </nav>
        </>
    )
}

export default Navbar;
    

