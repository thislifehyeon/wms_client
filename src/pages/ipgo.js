import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageStyle from '../css/Page.module.css';
import IpGoStyle from '../css/Ipgo.module.css';
import TableStyle from '../css/table.module.css';

const apiUrl = process.env.REACT_APP_API_URL;



function IpGoPage() {

  const [data, setData] = useState([]);
  useEffect(() => {
    // 서버로부터 데이터를 가져오는 API 요청
      axios.get(`${apiUrl}/api/getProductMaster`)
        .then(response => {
          setData(response.data); // 받은 데이터를 상태에 저장
        })
        .catch(error => {
          console.error('Error fetching data from server:', error);
        });
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행되도록 빈 배열을 useEffect의 두 번째 인수로 전달





  //-----------------조회버튼 관련--------------------------
  //바코드
  const [barcode_Value, barcode_InputValue] = useState('');

  //상품코드
  const [productcode_Value, productcode_InputValue] = useState('');

  const pro_input_Change = (event) => {
    productcode_InputValue(event.target.value); // 입력 값 업데이트
  };

  const bar_input_Change = (event) => {
    barcode_InputValue(event.target.value); // 입력 값 업데이트
  };

  //조회 후 받은 결과
  const [searchResult, setSearchResult] = useState([]);

  const [loading, setLoading] = useState(false);

  //바코드, 상품코드 서버로 보내기
  const searchDataToServer = async (barcode, productcode) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/searchcode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ barcode, productcode })
      });

      if (!response.ok) {
        throw new Error('서버로부터 응답을 받는데 실패했습니다.');
      }

      const responseData = await response.json();
      if (responseData.message) {
        alert(responseData.message);
      }      

      //성공했을때newValue
        if(responseData.results && responseData.results.length > 0){
          setSearchResult(responseData.results);
          setLoading(false);
        }
        else{
          console.log("받은 데이터 없음");
        }
    } catch (error) {
      console.error('Error sending code data to server:', error);
      alert('서버 통신 중 에러가 발생했습니다.');
    }
  };
  useEffect(() => {
   const productWithQuantity = {
      ...searchResult[0],
      quantity: 0 // 기본 수량 값을 0으로 추가
    };
    saveProducts(productWithQuantity);
  }, [searchResult]); 


      //-----------------클릭--------------

  const search_handleClick = () => {
    setSearchResult([]);   //이전 저장된 상태 비우고 조회 시작
    searchDataToServer(barcode_Value, productcode_Value);
  }
  
//-------여기까지 조회 기능-------------------------------------------------------





  //입고시 보낼 내용
  const [savedproducts, saveProducts] = useState({});

/*---------------------------입고 데이터 변경 함수------------------------------*/
  const handleQuantityChange = (newValue) => {
  if (newValue < 0) {
    alert('재고는 0보다 커야 합니다.');
    return; // 함수 종료
  }
  // newValue가 유효한 경우 상품 코드와 수량을 업데이트
  saveProducts(prevState => ({
    ...prevState,
    productcode: searchResult[0].product_code,
    quantity: newValue,
  }));

  };
  useEffect(() => {
    console.log('change quantity :: ', savedproducts);
  }, [savedproducts]); // 상태가 업데이트될 때마다 실행됨


  //----------------------------제조일을 기반으로 소비기한을 변경하는 함수---------------------------------------
  const handlemfgChange = (newValue) => {
    const newMfgDate = new Date(newValue); // 새로운 제조일을 Date 객체로 변환
    // 해당 상품의 guaranteed_shelf_life 값을 기반으로 소비기한 계산
    const shelfLifeDays = searchResult[0].guaranteed_shelf_life || 0; 
    newMfgDate.setDate(newMfgDate.getDate() + shelfLifeDays);
    

    // 계산된 소비기한을 YYYY-MM-DD 형식의 문자열로 변환
    const newExpDate = newMfgDate.toISOString().split('T')[0];

    // 상태 업데이트: 제조일 변경
    saveProducts(prevProducts => ({ ...prevProducts, mfg: newValue , exp: newExpDate,}));
  };
  //--------------------------------------------------------------------------------------------------------
  const handleexpChange = (newValue) => {
    saveProducts(prevProducts => ({ ...prevProducts, exp: newValue,}));
  };





    //입고 버튼 클릭
    const ipgo_handleClick = () => {
      if(savedproducts.quantity == 0){
        alert('0은 입고 불가');
      }
      else{
        sendDataToServer();
      }
    };


    //입고버튼 눌러서 savedproducts상태 보내기
    const sendDataToServer = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/ipgo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(savedproducts) // 상태 객체를 JSON 문자열로 변환하여 전송
        });
        const responseData = await response.json();
        alert(responseData.message); // 서버로부터의 응답 처리
      } catch (error) {
        console.error('Error sending data to server:', error);
      }
    };




/*
  if (loading) {
    return <div>Loading...</div>;
  }
*/
  return (
    <div className={PageStyle.Page} >
    <div className={IpGoStyle.container}>

      <div className={IpGoStyle.block3}>
        <p>취급 품목</p>


      <div style={{ flex: 1 }}>
      <table className= {TableStyle.styled_table}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>바코드</th>
            <th>상품명</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (  
            <tr key={index}>
              <td>{data.product_code}</td>
              <td>{data.bar_code}</td>
              <td>{data.name}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>



      <div className={IpGoStyle.block1}>
        {/* 메뉴 목록 */}
        <p>입고 품목</p>


      <div to="/IpgoPage">
      <button onClick={() => search_handleClick()} style={{fontSize: '20px', marginBottom : '10px'}}>조회 진행</button>
      <table className= {TableStyle.styled_table}  style={{ marginBottom : '20px' }}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>바코드</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
                <input 
                 type="text"
                 style={{ border: 'none', width : '100%' }}
                 value={productcode_Value} onChange={pro_input_Change}
                 />
            </td>
            <td>
                <input 
                 type="text"
                 style={{ border: 'none', width : '100%' }}
                 value={barcode_Value} onChange={bar_input_Change}
                 />
            </td>
          </tr>
        </tbody>
      </table>


        
        <button onClick={() => ipgo_handleClick()} style={{fontSize: '20px', marginBottom : '10px'}}>입고 진행</button>
      </div> 
      
      

      <div style={{ flex: 1 }}>
      <table className= {TableStyle.styled_table}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>바코드</th>
            <th>상품명</th>
            <th>관리타입</th>
            <th>수량</th>
            <th>제조일</th>
            <th>소비기한</th>
          </tr>
        </thead>
        <tbody>
          {searchResult.map((item, index) => (
            <tr key={index}>
              <td>{item.product_code}</td>
              <td>{item.bar_code}</td>
              <td>{item.name}</td>
              <td>{item.date_management_type}</td>
              <td>
                <input 
                 value={savedproducts.quantity}
                 type="number"
                 onChange={(e) => handleQuantityChange(e.target.value)}
                 style={{ border: 'none', width : '50px' }}
                 />
              </td>

              <td>
                <input
                value={savedproducts.mfg || ''}
                type="date"
                onChange={(e) => handlemfgChange(e.target.value)}
                style={{ border: 'none' }}
                disabled={item.date_management_type === '소비기한'} // 관리 타입이 '소비기한'일 때 비활성화
                />
              </td>

              <td>
              <input
                value={savedproducts.exp || ''}
                type="date"
                onChange={(e) => handleexpChange(e.target.value)}
                style={{ border: 'none' }}
                disabled={item.date_management_type === '제조일'} // 관리 타입이 '제조일'일 때 비활성화
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      </div>
      
    </div>
    </div>
  );
}

export default IpGoPage;
