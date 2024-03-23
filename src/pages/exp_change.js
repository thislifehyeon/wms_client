import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageStyle from '../css/Page.module.css';
import TableStyle from '../css/table.module.css';
import ExpStyle from '../css/exp.module.css';


const apiUrl = process.env.REACT_APP_API_URL;



function ExpChange() {

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


  const [selectedRow, setSelectedRow] = useState([]);

  
  //조회 후 받은 결과 원본
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    // searchResult가 변경될 때마다 savedproducts를 업데이트합니다.
    saveProducts(searchResult);
  }, [searchResult]);

  /*
  const handleCheckboxChange = (event, rowId) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, rowId]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== rowId));
    }
  };
*/ //체크박스 여러개 체크하기
//체크박스 하나만 체크하기
const handleCheckboxChange = (event, rowId) => {
  if (selectedRow === rowId) {
    // 이미 선택된 행을 다시 클릭하면 선택 해제
    setSelectedRow(null);
  } else {
    // 다른 행을 선택하면 이전 선택 해제 후 새로운 행 선택
    setSelectedRow(rowId);
  }
};
  //상품 코드로 조회한 결과를 저장
  const [savedproducts, saveProducts] = useState([]);


const handleQuantityChange = (index, newValue) => {
  if (newValue >= 0 && newValue <= searchResult[index].quantity) {
    // 유효한 경우에만 상태를 업데이트
    saveProducts(prevState => {
      return prevState.map((item, idx) => {
        if (idx === index) {
          // 해당 인덱스에만 변경이 필요한 경우
          return { ...item, productcode: searchResult[index].product_code, quantity: newValue };
        } else {
          // 나머지 요소는 이전 상태와 동일하게 유지
          return item;
        }
      });
    });
  }
  else if(newValue > searchResult[index].quantity){
    saveProducts(prevState => {
      return prevState.map((item, idx) => {
        if (idx === index) {
          return { ...item, productcode: searchResult[index].product_code, quantity: searchResult[index].quantity };
        } else {
          return item;
        }
      });
    });
    alert('현재 수량보다 많습니다!!');
  }
  else {
    saveProducts(prevState => {
      return prevState.map((item, idx) => {
        if (idx === index) {
          return { ...item, productcode: searchResult[index].product_code, quantity: 0 };
        } else {
          return item;
        }
      });
    });
    alert('재고는 0보다 커야 합니다.');
  }
  console.log("savedproducts: ",savedproducts);
  console.log("index ; " , index)
};

//----------------------------제조일을 기반으로 소비기한을 변경하는 함수---------------------------------------
const handlemfgChange = (index, newValue) => {
  const newMfgDate = new Date(newValue); // 새로운 제조일을 Date 객체로 변환
  // 해당 상품의 guaranteed_shelf_life 값을 기반으로 소비기한 계산
  const shelfLifeDays = parseInt(savedproducts[index].guaranteed_shelf_life, 10) || 0; //타입안정성 보장 / 10은 10진수 명시
  newMfgDate.setDate(newMfgDate.getDate() + shelfLifeDays);
  

  // 계산된 소비기한을 YYYY-MM-DD 형식의 문자열로 변환
  const newExpDate = newMfgDate.toISOString().split('T')[0];

  // 상태 업데이트: 제조일 변경
  saveProducts(prevProducts =>
    prevProducts.map((item, idx) => 
      idx === index ? { ...item, mfg: newValue, exp: newExpDate } : item
    )
  );
};
//--------------------------------------------------------------------------------------------------------

const handleexpChange = (index, newValue) => {
  saveProducts(prevState => {
    return prevState.map((item, idx) => {
      if (idx === index) {
        // 해당 인덱스에만 변경이 필요한 경우
        return { ...item, exp: newValue };
      } else {
        // 나머지 요소는 이전 상태와 동일하게 유지
        return item;
      }
    });
  });  console.log('change exp :: ', newValue);
};




// 상태가 업데이트될 때마다 체크, 테스트용
  useEffect(() => {
    console.log('change quantity :: ', savedproducts[0]);
  }, [savedproducts]); 


////////////////////////////
  
  //바코드
  const [barcode_Value, barcode_InputValue] = useState('');

  //상품코드
  const [productcode_Value, productcode_InputValue] = useState('');

  //숫자 입력 함수
  const handleNumberChange = (index, event) => {
    const num = parseInt(event.target.value); //001같은 숫자 입력 방지

  };


  const pro_input_Change = (event) => {
    productcode_InputValue(event.target.value); // 입력 값 업데이트
  };

  const bar_input_Change = (event) => {
    barcode_InputValue(event.target.value); // 입력 값 업데이트
  };



    //변경하기 눌러서 savedproducts상태, searchResult원본(검증용) 보내기
    const sendDataToServer = async () => {
      console.log('searchResult: ', searchResult);
      console.log('savedproducts:  ',  savedproducts);
      console.log('selected Row: ',selectedRow);


      const modifiedSearchResult = {
        ...searchResult[selectedRow],
        mfg: searchResult[selectedRow].mfg ? searchResult[selectedRow].mfg.substring(0, 10) : null,
        exp: searchResult[selectedRow].exp ? searchResult[selectedRow].exp.substring(0, 10) : null
      };
      const modifiedSavedResult = {
        ...savedproducts[selectedRow],
        mfg: savedproducts[selectedRow].mfg ? savedproducts[selectedRow].mfg.substring(0, 10) : null,
        exp: savedproducts[selectedRow].exp ? savedproducts[selectedRow].exp.substring(0, 10) : null
      };


      const combinedData = { 
        savedProduct: modifiedSavedResult, 
        searchResult: modifiedSearchResult
      };
      
      console.log('combinedData: ', combinedData);
      
      try {
        const response = await fetch(`${apiUrl}/api/exp_change`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(combinedData) // 상태 객체를 JSON 문자열로 변환하여 전송
        });
        const responseData = await response.json();
        console.log(responseData);
        alert(responseData.message); // 서버로부터의 응답 처리
        window.location.reload();
      } catch (error) {
        console.error('Error sending data to server:', error);
      }


    };

    //바코드, 상품코드 서버로 보내기, 결과 데이터 받기
    const searchDataToServer = async () => {
      try {
        const barcode = barcode_Value;
        const productcode = productcode_Value;

        const response = await fetch(`${apiUrl}/api/searchcode_stock`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ barcode: barcode, productcode: productcode })
        });
        const responseData = await response.json();
        alert(responseData.message); // 서버로부터의 응답 확인
        
        console.log(responseData, '서버로부터 받은 조회결과');

        //성공했을때newValue
          if(responseData.results.length == 0){
            console.log("받은 데이터 없음");
          }
          else{
            setSearchResult(responseData.results);
          }
      } catch (error) {
        console.error('Error sending code data to server:', error);
      }
    };

    //조회버튼 클릭
    const temp = () =>{
      console.log('sr.code: ',searchResult);
      //handleProCodeChange(searchResult[0].product_code);
    }

    //조회버튼 클릭
    const search_handleClick = () => {
      setSearchResult([]);   //이전 저장된 상태 비우고 조회 시작
      searchDataToServer();
      temp();
    }


    //-----------변경 버튼 클릭
    const change_handleClick = () => {
      if(selectedRow.length == 0){
        alert("저장할 데이터를 체크하세요!!");
      }
      else{
        sendDataToServer();
      }
    };






  return (
    <div className={PageStyle.Page} >
    <div className={ExpStyle.container}>
    <div className={ExpStyle.block1}>
        <p>재고 현황</p>


      <div style={{ flex: 1 }}>
      <table className= {TableStyle.styled_table}>
        <thead>
          <tr>
            <th>상품코드</th>
            <th>바코드</th>
            <th>상품명</th>
            <th>관리타입</th>
            <th>로케이션</th>
            <th>수량</th>
            <th>제조일</th>
            <th>소비기한</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={index}>
              <td>{data.product_code}</td>
              <td>{data.bar_code}</td>
              <td>{data.name}</td>
              <td>{data.date_management_type}</td>
              <td>{data.location}</td>
              <td>{data.quantity}</td>
              <td>{data.mfg ? new Date(data.mfg).toLocaleDateString() : '-'}</td>
              <td>{data.exp ? new Date(data.exp).toLocaleDateString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>


      <div className={ExpStyle.block3}>
        {/* 메뉴 목록 */}
        <p>소비기한 변경</p>


      <div to="/IpgoPage">
      <button onClick={() => search_handleClick()} style={{fontSize: '20px', marginBottom : '10px'}}>조회 진행</button>
      <table className= {TableStyle.styled_table}  style={{ marginBottom : '20px' }}>
        <thead>
          <tr>
            <th>상품코드</th>
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


                {/* <button onClick={() => change_handleClick()} style={{fontSize: '20px', marginBottom : '10px'}}>변경 하기</button> */}

        <button onClick={() => change_handleClick()} style={{fontSize: '20px', marginBottom : '10px'}}>변경 하기</button>
      </div> 
      
      

      <div style={{ flex: 1 }}>
      <table className= {TableStyle.styled_table}>
        <thead>
          <tr>
            <th></th>
            <th>상품코드</th>
            <th>바코드</th>
            <th>상품명</th>
            <th>수량</th>
            <th>제조일</th>
            <th>소비기한</th>
            <th>로케이션</th>
          </tr>
        </thead>
        <tbody>
          {savedproducts.map((savedproducts, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRow === index}
                  onChange={(event) => handleCheckboxChange(event, index)}
                />
              </td>
              <td>{savedproducts.product_code}</td>
              <td>{savedproducts.bar_code}</td>
              <td>{savedproducts.name}</td>
              <td>
                <input 
                 value={savedproducts.quantity}
                 type="number"
                 onChange={(e) => handleQuantityChange(index, e.target.value)}
                 style={{ border: 'none', width : '50px' }}
                 />
              </td>

              <td>
                <input
                value={savedproducts.mfg ? savedproducts.mfg.substring(0, 10) : ''}
                type="date"
                onChange={(e) => handlemfgChange(index, e.target.value)}
                style={{ border: 'none' }}
                disabled={savedproducts.date_management_type === '소비기한'} // 관리 타입이 '소비기한'일 때 비활성화
                />
              </td>

              <td>
              <input
                value={savedproducts.exp ? savedproducts.exp.substring(0, 10) : ''}
                type="date"
                onChange={(e) => handleexpChange(index, e.target.value)}
                style={{ border: 'none' }}
                disabled={savedproducts.date_management_type === '제조일'}
                />
              </td>
              <td>{savedproducts.location}</td>
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

export default ExpChange;
