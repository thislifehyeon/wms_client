import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from '../css/Sidebar.module.css'


function SideBar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={style.sidebar}  style={{ width: isExpanded ? '115px' : '55px', transition: 'width 0.1s', height: '100%' }}>
      <button  style={{ display: 'block', margin: 'auto' }} onClick={toggleSidebar}>{isExpanded ? '접기' : '펼치기'}</button>
      {isExpanded && (
      <ul style={{ listStyle: 'none', paddingLeft: '15px' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/IpgoPage">입고</Link></li>
        <li><Link to="/Status_Table">재고현황</Link></li>
        <li><Link to="/Exp_Change">소비기한 변경</Link></li>
        <li><Link to="/Location">로케이션 관리</Link></li>
        <li><Link to="/Product_Master">상품 관리</Link></li>
      </ul>
      )}
    </div>
  );
}

export default SideBar;
