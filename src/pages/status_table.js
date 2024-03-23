import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableStyle from '../css/table.module.css';
import StatusStyle from '../css/stausPage.module.css';
const apiUrl = process.env.REACT_APP_API_URL;


function StatusTable() {

  const truncate = async () => {
    axios.get(`${apiUrl}/api/product_truncate`)
    .then(response => {
      console.log('초기화:');
    })
    .catch(error => {
      console.error('초기화에러:', error);
    });
  };

  const handleClick = async () => {
    truncate();
    console.log('초기화:');
    window.location.reload();
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    // 서버로부터 데이터를 가져오는 API 요청
      axios.get(`${apiUrl}/api/getstatus`)
      
        .then(response => {
          setData(response.data); // 받은 데이터를 상태에 저장
          console.log('서버에서 받음: ', data);
        })
        .catch(error => {
          console.error('Error fetching data from server:', error);
        });
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행되도록 빈 배열을 useEffect의 두 번째 인수로 전달


    return (
    <div className= {StatusStyle.StatusPage}>
    <div style={{ display: 'flex' }}>
      <table className= {TableStyle.styled_table}>
        <thead>
          <tr>
            <th>상품명</th>
            <th>로케이션</th>
            
            <th>수량</th>
            <th>제조일</th>
            <th>소비기한</th>
            <th>분류</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.location}</td>
              
              <td>{data.quantity}</td>
              <td>{data.mfg ? new Date(data.mfg).toLocaleDateString() : '-'}</td>
              <td>{data.exp ? new Date(data.exp).toLocaleDateString() : '-'}</td>
              <td>{data.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ display: 'flex' }}>
      <button  onClick={() => handleClick()}
       style={{fontSize: '20px', marginBottom : '10px', marginLeft : '50px', height : '70px', width : '100px' }}>초기화_테스트용</button>
      </div>

    </div>
    </div>
  );
}

export default StatusTable;
