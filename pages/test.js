import { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Button} from 'react-bootstrap'
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import ButtonUI from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AppsIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';
import CategoryIcon from '@material-ui/icons/Category';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { styled } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import UserContext from '../UserContext'

export default function NavBar() {
    const { user } = useContext(UserContext)
      
    const useStyles = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
          [theme.breakpoints.down("sm")]: {
            minWidth: 32,
            "& .MuiButton-startIcon": {
              margin: 0
            },
            zIndex: 99999
          }
        },
        buttonText: {
          [theme.breakpoints.down("lg")]: {
            display: "none"
          },
          [theme.breakpoints.down("sm")]: {
            display: "block"
          }
        }
      }));

      const classes = useStyles();
    
      
    return (
        <Navbar className="navi" expand="lg">
            <Link href="/">
                <a class="navbar-brand"><img className='navimg' src={process.env.LOGO}/></a>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto navilinks">
                    
                    {(user.id !== null)
                        ? <React.Fragment>
                            <Link href="/profile">
                                <Tooltip title="Profile">
                                    <ListItemIcon>
                                        <Fab color="primary" size="medium">
                                            <AccountCircleIcon fontSize="large" />
                                        </Fab>
                                        <span className={classes.buttonText}>Profile</span>
                                    </ListItemIcon>
                                </Tooltip>
                            </Link>
                            <Link href="/dashboard">
                                <Tooltip title="dashboard">
                                    <ListItemIcon>
                                        <Fab color="primary" size="medium">
                                            <AppsIcon fontSize="large" />
                                        </Fab>
                                    </ListItemIcon>
                                </Tooltip>
                            </Link>
                            <Link href="/transactions">
                                <Tooltip title="Overview">
                                    <ListItemIcon>
                                        <Fab color="primary" size="medium">
                                            <ListIcon fontSize="large" />
                                        </Fab>
                                    </ListItemIcon>
                                </Tooltip>
                            </Link>
                            <Link href="/insights">
                                <Tooltip title="Insights">
                                    <ListItemIcon>
                                        <Fab color="primary" size="medium">
                                            <ShowChartIcon fontSize="large" />
                                        </Fab>
                                    </ListItemIcon>
                                </Tooltip>
                            </Link>
                            <Link href="/categories">
                                <Tooltip title="Manage Categories">
                                    <ListItemIcon>
                                        <Fab color="primary" size="medium">
                                            <CategoryIcon fontSize="large" />
                                        </Fab>
                                    </ListItemIcon>
                                </Tooltip>
                            </Link>
                            <Link href="/logout">
                                <Tooltip title="Logout">
                                    <ListItemIcon>
                                        <Fab size="medium">
                                            <ExitToAppIcon fontSize="large" />
                                        </Fab>
                                    </ListItemIcon>
                                </Tooltip>
                            </Link>
                        </React.Fragment>
                        : <React.Fragment>
                            <LoginButton />
                            <SignupButton />
                        </React.Fragment>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}