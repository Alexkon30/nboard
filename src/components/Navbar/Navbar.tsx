import { Link } from 'react-router-dom';
import { Navbar as SNavbar } from 'rsuite';
import classes from './Navbar.module.scss'

export function Navbar() {
  return (
    <SNavbar appearance='inverse'>
      <Link to='/' className={classes.link}>
        <SNavbar.Brand as='div'>NBOARD</SNavbar.Brand>
      </Link>
    </SNavbar>
  );
}
