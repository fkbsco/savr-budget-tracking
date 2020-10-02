import { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import UserContext from '../UserContext';
import Link from 'next/link';

export default function NavBar() {
	const { user } = useContext(UserContext);

	return (
		<Navbar bg="light" expand="lg">
            <Link href="/">
                <a className="navbar-brand">React-Booking</a>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                	<Link href="/">
                        <a className="nav-link" role="button">Home</a>
                    </Link>
                    <Link href="/courses">
                        <a className="nav-link" role="button">Courses</a>
                    </Link>
                    {(user.email !== null)
                        ? (user.isAdmin === true)
                            ?
                            <React.Fragment>
                                <Link href="/courses/create">
                                    <a className="nav-link" role="button">Add Course</a>
                                </Link>
                                <Link href="/logout">
                                    <a className="nav-link" role="button">Logout</a>
                                </Link>
                            </React.Fragment>
                            :
                            <Link href="/logout">
                                <a className="nav-link" role="button">Logout</a>
                            </Link>
                        : 
                        <React.Fragment>
                            <Link href="/login">
                                <a className="nav-link" role="button">Login</a>
                            </Link>
                            <Link href="/register">
                                <a className="nav-link" role="button">Register</a>
                            </Link>
                        </React.Fragment>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
	)
}