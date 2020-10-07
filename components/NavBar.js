import { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Button} from 'react-bootstrap'

import Link from 'next/link'

import UserContext from '../UserContext'

export default function NavBar() {
    const { user } = useContext(UserContext)
    
    return (
        <Navbar className="navi" expand="lg">
            <Link href="/">
                <a className="navbar-brand"><img className='navimg' src={process.env.LOGO}/></a>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto navilinks">
                    
                    {(user.id !== null)
                        ? <React.Fragment>
                            <Link href="/profile">
                                <a className="userlinks" role="button">Profile</a>
                            </Link>
                            <Link href="/transactions">
                                <a className="userlinks" role="button">Overview</a>
                            </Link>
                            <Link href="/insights">
                                <a className="userlinks" role="button">Insights</a>
                            </Link>
                            <Link href="/logout">
                                <a className="userlinks" role="button">Logout</a>
                            </Link>
                        </React.Fragment>
                        : <React.Fragment>
                            <Link href='/login'>
                                <a className="loginbtn" role="button">Login</a>
                            </Link>
                            <Link href='/signup'>
                                <a className="signupbtn" role="button">Sign Up</a>
                            </Link>
                        </React.Fragment>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}