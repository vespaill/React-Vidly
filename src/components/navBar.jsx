import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class NavBar extends Component {
  state = {
    links: [
      { path: '/movies', name: 'Movies' },
      { path: '/customers', name: 'Customers' },
      { path: '/rentals', name: 'Rentals' }
    ]
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" href="#">Vidly</Link>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
            {this.state.links.map(link => (
              <li key={link.path} className="nav-item">
                <NavLink className="nav-item nav-link" to={link.path}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
