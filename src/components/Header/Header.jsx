import React from 'react'
import './styles.css'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
import HeroLogo from '../../images/hero-logo.svg'

const Header = ({ isAdmin }) => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header className='container'>
            <div className='left'>
                <Link to="/">
                  <img src={HeroLogo} width={100} alt="hero-logo" />
                </Link>
                <nav className='nav-links'>
                    <ul>
                        {
                            isAdmin ? 
                                <li>
                                    <Link to="create-job">Create Job</Link>
                                </li> : 
                                <li>
                                    <Link to="my-jobs">My Jobs</Link>
                                </li>
                        }
                    </ul>
                </nav>
            </div>
            <div>
              <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )
}

export default Header;