/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import {
  Navbar, Container, Nav, NavDropdown,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>HALO TEAMS</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/public">
              <Nav.Link>
                Public
              </Nav.Link>
            </Link>
            <Link passHref href="/players">
              <Nav.Link>Your Spartans</Nav.Link>
            </Link>
            <Link passHref href="/teams">
              <Nav.Link>Your Teams</Nav.Link>
            </Link>
            <NavDropdown title="Create" id="basic-nav-dropdown">
              <NavDropdown.Item href="/players/new">New Spartan</NavDropdown.Item>
              <NavDropdown.Item href="/teams/new">
                New Team
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={signOut}>Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
