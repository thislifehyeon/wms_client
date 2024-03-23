import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/new">New Page</Link></li>
          {/* 기존의 다른 네비게이션 링크들 */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
