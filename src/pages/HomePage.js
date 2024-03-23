import React from 'react';
import { Link } from 'react-router-dom';
import ButtonStyle from '../css/Button.module.css';
import HomeStyle from '../css/Home.module.css';
import Homeimage from '../images/home_image.jpg'
import Footer from '../components/footer';


function HomePage() {
  return (
    <div className={HomeStyle.Title} > 
      <h1>WMS 프로젝트</h1>
      <div>
        <img src= {Homeimage} style={{width: '700px'}} alt="warehouse image" />
      </div>
      <div className={HomeStyle.content}>
        재고 관리는 맡겨주세요!
      </div>
      <Link to="/IpgoPage">
        <button className={ButtonStyle.button} style={{width: '400px', fontSize: '40px', marginBottom : '100px'}}>입고 시작하기!</button>
      </Link>
      <Link to="/Status_Table">
      </Link>

      <div>
      <Footer />
      </div>
    </div>

  );
}

export default HomePage;
