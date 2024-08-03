import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import './NavHeader.scss';
import { apiLogout } from '~/services/authService';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '~/hooks/userContext';

function NavHeader() {
    const { logoutContext } = useContext(UserContext);
    const navigate = useNavigate()
    const handleLogout = async () => {
        const res = await apiLogout(); // remove token in server
        localStorage.removeItem('token'); // remove token in local store
        logoutContext() // set default auth user
        if (res && res.EC === 0) {
            toast.success('Logout success !');
            navigate('/login')
        } else {
            toast.error(' Something wrong in server');
        }
    };
    return (
        <div className="container-nav-header">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <Link role="button" className="nav-link" to="/">
                            Home
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/users">
                                User
                            </Nav.Link>
                            <Nav.Link as={Link} to="/roles">
                                Roles 
                            </Nav.Link>
                            <Nav.Link as={Link} to="/group-role">
                                Group Role 
                            </Nav.Link>
                        </Nav>

                        <Nav>
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.2">Change password</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <span onClick={() => handleLogout()}>Logout</span>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavHeader;
