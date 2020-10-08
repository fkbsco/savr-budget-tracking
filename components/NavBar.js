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
                <a className="navbar-brand"><img className='navimg' src="https://lh3.googleusercontent.com/bW122WzXV1ZlDXUt3KDxRSyohGDT2Wz-B_BfMd7J-wmAc6pIevz-kRIwIDBbSrLh1tHJf3WyWLCsn7v0I_JlauHNBDaZjVQLwTot12jTM-4BiqI8E9jtMCZaI65F2cOKhuaWWYZ6PHP2Nlubzqf1NlPE4OmpY6YZ28ONLxKKC6Jap3RWZ4RAbSx0lVe2QMoYUCiDiYbaZaffAWYThH7ztXNXk5dSLN1wQgU6ChWWsQreq9UivsdRFn9ox8NckMX8NqJA45eStgWpLUPIpBT2uvEyAnkDgwYv-HgHdbQEb5Xbl0sFGfzyz4Gs4rYCnd3siwWy1DJVLY95js2YRPPwgJ4bw5mnffIJo7N_-CEEemIqFCIIQrNfH0W1C58gNSoJ2LLfgOmXQvmdqR57Qlrm0DJJJ5K-_5pkW8dI6tWit4F4xe6UWuig_wbllHl0wXPWWVK1ViNQu4GhffLKy_WtSyoemP3IEko__htVIVf3glVQQOcDk_nIKlcgfmmoQiSS60aR_yGvBiFRk864y1PUgSkxoxhAKIuKgxP-HQA57lBsvfBm94KNfVff7HfeODosfsDPl0mZ9qPpva567zAFYLMX75c3qLgTuy1dthlnJxRrxogL78SiqYo4Em69JkP00hBmtEfGxZI9mYdhSYB6qGUfZygqOcgmgH4c9-WvqNFBh2-oBzeKDsJ00CamQQ=w1920-h732-no?authuser=0"/></a>
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