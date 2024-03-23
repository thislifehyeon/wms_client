import React, { useState, useEffect } from 'react';
import PageStyle from '../css/Page.module.css';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;


function StatusPage() {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    // 서버로부터 데이터를 가져오는 API 요청
    axios.get(`${apiUrl}/api/getstatus`)
      .then(response => {
        setData(response.data); // 받은 데이터를 상태에 저장
        console.log('서버에서 받음');
      })
      .catch(error => {
        console.error('Error fetching data from server:', error);
      });
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행되도록 빈 배열을 useEffect의 두 번째 인수로 전달

  return (
    <div style={{ backgroundColor: 'lightblue' }} className={PageStyle.Page}>
      <h1>재고 현황</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <span style={{ marginRight: '10px' }}>상품명: {item.productname}</span>
            <span style={{ marginRight: '10px' }}>분류: {item.category}</span>
            <span>수량: {item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatusPage;
