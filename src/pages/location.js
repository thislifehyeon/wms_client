import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LocationStyle from '../css/Location.module.css';

const apiUrl = process.env.REACT_APP_API_URL;


function Location() {

  const [locationdata, setLocationData] = useState([]);
  const [editLocation, setEditLocation] = useState([]); //수정 할 수 있게 받아온 로케이션 데이터 따로 저장하기
  useEffect(() => {
    // 서버로부터 데이터를 가져오는 API 요청
      axios.get(`${apiUrl}/api/getlocation`)
        .then(response => {
          setLocationData(response.data); // 받은 데이터를 상태에 저장
          console.log("로케이션불러오기");
        })
        .catch(error => {
          console.error('Error fetching data from server:', error);
        });
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행되도록 빈 배열을 useEffect의 두 번째 인수로 전달


    
    // locationdata가 업데이트될 때마다 editLocation도 업데이트
    useEffect(() => {
      setEditLocation(locationdata.map(item => ({ ...item })));
    }, [locationdata]);


    const [selectedRow, setSelectedRow] = useState([]);
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

    const [selectedLocation, setSelectedLocation] = useState(null); //선택한 행 인덱스 저장

    //이부분 생성버튼하고 안맞아서 행클릭 함수로 이동하기로함
    // 저장 안하고 왔다갔다 하면 다시 초기화 되도록
    /*
    useEffect(() => {
      setEditLocation(locationdata.map(item => ({ ...item })));
    }, [selectedLocation]);
    */

    //행 클릭 함수 - 인덱스 저장해서 뿌리기
    const handleRowClick = (rowData, index) => {
      setEditLocation(locationdata.map(item => ({ ...item })));
      setSelectedLocation(index);
      setIsDisabled(true);
    };

    //code부분 생성안할 때 수정 막아두는 상태
    const [isDisabled, setIsDisabled] = useState(true);

    //----------------------취소버튼 작성------------------------------
    //취소버튼 클릭시 다시 복사해서 초기화
    const handleCancelClick = () => {
      setEditLocation(locationdata.map(item => ({ ...item })));
      setIsDisabled(true);
    };
    //----------------------------------------------------------------

    //------------------저장버튼 작성-----------------------------------------
    //저장 버튼 클릭하여 서버로 수정된 데이터 보내기
    const handleSaveClick = () => {
      if(editLocation[selectedLocation].editable == 1){
        sendDataToServer();
      }
      else{
        alert('수정 불가능한 로케이션입니다.');
      }
    };
    //저장버튼 누를 때 실행될 post요청
    const sendDataToServer = async () => {
      console.log('editLocation:  ',  editLocation[selectedLocation]  );
      try {
        const response = await fetch(`${apiUrl}/api/update_location`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editLocation[selectedLocation]) // 상태 객체를 JSON 문자열로 변환하여 전송
        });
        const responseData = await response.json();
        
        alert(responseData.message);
        window.location.reload();
      } catch (error) {
        console.error('Error sending data to location server:', error);
      }
    };
    //--------------------------------------------------------------------------------------------------------------------

    //---------삭제버튼 작성-----------------------------------------------------------------------------------------------
    const handleDeleteClick = () => {
      if(selectedLocation !== undefined && selectedLocation !== null && editLocation[selectedLocation]?.editable == 1){
        sendDeleteToServer(editLocation[selectedLocation].code);
      }
      else{
        alert('삭제 불가능한 로케이션입니다.');
      }
    };

    //삭제버튼 누를 때 실행될 delete요청
    const sendDeleteToServer = (code) => {
      fetch(`${apiUrl}/api/delete_location/${code}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          console.log(response);
          alert('로케이션 삭제 완료');
          window.location.reload();
        }
        else if(response.status === 409) {
          response.text().then(text => {
            alert(text); // 서버로부터 받은 에러 메시지를 표시
          });
        }
        else {
        console.error("Error in deletion");
        response.text().then(text => {
          alert(text); // 서버로부터 받은 에러 메시지를 표시
        });
      }
      })
      .catch(error => {
        console.error("Network error:", error);
        alert('네트워크 오류가 발생했습니다. 다시 시도해 주세요.');
      });
    };
    //--------------------------------------------------------------------------------------------------------------

    //----------생성 버튼-------------------------
    const handleCreateClick = () => {
      insertFirstElement();
      setSelectedLocation(0);
      setIsDisabled(false);
    };

    const insertFirstElement = () => {
      const firstElementCopy = {...editLocation[0]};
      Object.keys(firstElementCopy).forEach(key => {
        firstElementCopy[key] = '';
      });

      const newEditLocation = [firstElementCopy, ...editLocation ];
      setEditLocation(newEditLocation); 
    }; 
    //------------------------------------------------------------------------------------
    //------------추가 저장 버튼---------------------------------------------------------
    const handleSaveNewClick = () => {
      if( (editLocation[0].code.length > 15) || (editLocation[0].name.length > 50) ){
        alert('코드 혹은 이름의 길이를 확인해 주세요');
      }
      else if( (editLocation[0].code.length === 0 || (editLocation[0].name.length === 0)) ){
        alert('코드 혹은 이름이 없습니다');
      }
      else{
        console.log(editLocation[0]);
        sendNewToServer();
      }
    };

    const sendNewToServer = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/create_location`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editLocation[0]) // 상태 객체를 JSON 문자열로 변환하여 전송
        });
        const responseData = await response.json();
        
        alert(responseData.message);
        window.location.reload();

      } catch (error) {
        console.error('Error sending data to location server:', error);
      }

    };

  return (
 
    <div className={LocationStyle.LocationPage} style={{display : 'inline-block'}}>
      <div className={LocationStyle.QueryContainer}>
        <div className={LocationStyle.QueryOptions}>🚧👷조회 기능 공사 중👷🏗️</div>
        <div className={LocationStyle.QueryOptions}>
          조회 조건
        </div>
        <div>
          <button className={LocationStyle.QueryButton}>🔍 조회</button>
        </div>
      </div>
      <div className={LocationStyle.DetailsContainer}>
        <div style={{padding : '10px'}}>
        선택한 로케이션의 세부 속성
        </div>
        <div style={{textAlign: 'right' , paddingRight : '10px', paddingBottom : '10px'}}>
          <button className={LocationStyle.QueryButton} onClick={() => handleCreateClick()}>추가</button>
          <button className={LocationStyle.QueryButton} onClick={() => handleSaveNewClick()}>추가 저장</button> 
        </div>
        <div style={{textAlign: 'right' , paddingRight : '10px'}}>
          <button className={LocationStyle.QueryButton} onClick={() => handleSaveClick()}>수정 적용</button>
          <button className={LocationStyle.QueryButton} onClick={() => handleDeleteClick()}>삭제</button>
          <button className={LocationStyle.QueryButton} onClick={() => handleCancelClick()}>취소</button>
        </div>
        {selectedLocation !== null && (
        <div >
          <div className={LocationStyle.DetailsContainerRow}>
            <div className={LocationStyle.DetailsContainerRowBox} style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>코드</div>
              <input 
                style={{width : '200px'}} 
                className={LocationStyle.custom_input} 
                type="text" 
                value={editLocation[selectedLocation].code || ''} 
                onChange={(e) => {
                  const updatedEditLocation = { ...editLocation }; // editLocation 상태를 복사
                  updatedEditLocation[selectedLocation].code = e.target.value; // 새로  운 값으로 업데이트
                  setEditLocation(updatedEditLocation); // 변경된 객체로 editLocation 상태를 업데이트
                }}
                disabled={isDisabled}
              />
              <div className={LocationStyle.DetailsContainerRowBottom}>{editLocation[selectedLocation].code.length}/15</div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '300px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>이름</div>
              <input 
                style={{width : '300px'}} 
                className={LocationStyle.custom_input} 
                type="text" 
                value={editLocation[selectedLocation].name || ''} 
                onChange={(e) => {
                  const updatedEditLocation = { ...editLocation }; 
                  updatedEditLocation[selectedLocation].name = e.target.value; 
                  setEditLocation(updatedEditLocation);
                }}
              />
              <div className={LocationStyle.DetailsContainerRowBottom}>{editLocation[selectedLocation].name.length}/50</div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '100px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>층</div>
              <select 
                  style={{ width: '100px' }} 
                  className={LocationStyle.custom_select}
                  value={editLocation[selectedLocation].floor || ''}
                  onChange={(e) => {
                    const updatedEditLocation = { ...editLocation };
                    updatedEditLocation[selectedLocation].floor = e.target.value;
                    setEditLocation(updatedEditLocation);
                  }}
                >
                <option value="">선택</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>보관방법</div>
              <select 
                style={{ width: '200px' }} 
                className={LocationStyle.custom_select}
                value={editLocation[selectedLocation].storage_zone || ''}
                onChange={(e) => {
                  const updatedEditLocation = { ...editLocation };
                  updatedEditLocation[selectedLocation].storage_zone = e.target.value;
                  setEditLocation(updatedEditLocation);
                }}
                >
                <option value="">선택</option>
                <option value="냉장">냉장</option>
                <option value="냉동">냉동</option>
                <option value="상온">상온</option>
                <option value="기타(혼합)">기타(혼합)</option>
              </select>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
          </div>
          <div className={LocationStyle.DetailsContainerRow}>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>보관가능 SKU 수</div>
              <input 
                style={{width : '200px'}} 
                className={LocationStyle.custom_input} 
                type="text" 
                value={editLocation[selectedLocation].max_sku_capacity || ''} 
                onChange={(e) => {
                  const newEditLocation = { ...editLocation }; 
                  newEditLocation[selectedLocation].max_sku_capacity = e.target.value; 
                  setEditLocation(newEditLocation);
                }}
              />
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>소비기한 혼적 수</div>
              <input 
                style={{width : '200px'}} 
                className={LocationStyle.custom_input} 
                type="text" 
                value={editLocation[selectedLocation].mixed_expiry_count || ''} 
                onChange={(e) => {
                  const newEditLocation = { ...editLocation }; 
                  newEditLocation[selectedLocation].mixed_expiry_count = e.target.value; 
                  setEditLocation(newEditLocation);
                }}
              />
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>가용상태</div>
              <select 
                  style={{ width: '200px' }} 
                  className={LocationStyle.custom_select}
                  value={editLocation[selectedLocation].location_status || ''}
                  onChange={(e) => {
                    const updatedEditLocation = { ...editLocation };
                    updatedEditLocation[selectedLocation].location_status = e.target.value;
                    setEditLocation(updatedEditLocation);
                  }}
                >
                <option value="">선택</option>
                <option value="가용">가용</option>
                <option value="불용">불용</option>
              </select>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
          </div>
          <div className={LocationStyle.DetailsContainerRow}>
            <div className={LocationStyle.DetailsContainerRowBox} style={{width : '150px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>입고가능</div>
                <select 
                  style={{ width: '150px' }} 
                  className={LocationStyle.custom_select}
                  value={editLocation[selectedLocation].inbound_enabled || ''}
                  onChange={(e) => {
                    const updatedEditLocation = { ...editLocation };
                    updatedEditLocation[selectedLocation].inbound_enabled = e.target.value;
                    setEditLocation(updatedEditLocation);
                  }}
                >
                <option value="">선택</option>
                <option value="가능">가능</option>
                <option value="불가능">불가능</option>
              </select>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '150px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>출고가능</div>
              <select 
                  style={{ width: '150px' }} 
                  className={LocationStyle.custom_select}
                  value={editLocation[selectedLocation].outbound_enabled || ''}
                  onChange={(e) => {
                    const updatedEditLocation = { ...editLocation };
                    updatedEditLocation[selectedLocation].outbound_enabled = e.target.value;
                    setEditLocation(updatedEditLocation);
                  }}
                >
                <option value="">선택</option>
                <option value="가능">가능</option>
                <option value="불가능">불가능</option>
              </select>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '100px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>가로(mm)</div>
              <input 
                style={{width : '100px'}} 
                className={LocationStyle.custom_input} 
                type="text" 
                value={editLocation[selectedLocation].width || ''} 
                onChange={(e) => {
                  const newEditLocation = { ...editLocation }; 
                  newEditLocation[selectedLocation].width = e.target.value; 
                  setEditLocation(newEditLocation);
                }}
              />
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '100px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>세로(mm)</div>
              <input 
                style={{width : '100px'}} 
                className={LocationStyle.custom_input} 
                type="text" 
                value={editLocation[selectedLocation].height || ''} 
                onChange={(e) => {
                  const newEditLocation = { ...editLocation }; 
                  newEditLocation[selectedLocation].height = e.target.value; 
                  setEditLocation(newEditLocation);
                }}
              />
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '100px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>높이(mm)</div>
              <input 
                style={{width : '100px'}} 
                className={LocationStyle.custom_input} 
                type="text" 
                value={editLocation[selectedLocation].depth || ''} 
                onChange={(e) => {
                  const newEditLocation = { ...editLocation }; 
                  newEditLocation[selectedLocation].depth = e.target.value; 
                  setEditLocation(newEditLocation);
                }}
              />
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
          </div>
        </div>
        )}
      </div>
      <div className={LocationStyle.LocationList}>
        <div style={{height : '50px', justifyContent : 'center',  alignItems : 'center'}}>
        로케이션 목록
        </div>
        <table className= {LocationStyle.styled_table}>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>코드</th>
            <th>이름</th>
            <th>층</th>
            <th>보관방법</th>
            <th>보관가능 SKU 수</th>
            <th>소비기한 혼적 수</th>
            <th>가용상태</th>
            <th>입고가능</th>
            <th>출고가능</th>
            <th>가로(mm)</th>
            <th>세로(mm)</th>
            <th>높이(mm)</th>
            <th>수정가능</th>
          </tr>
        </thead>
        <tbody>
          {locationdata.map((locationdata, index) => (
            <tr key={index} onClick={() => handleRowClick(locationdata, index)}>
              <td>
                <input
                    type="checkbox"
                    checked={selectedRow === index}
                    onChange={(event) => handleCheckboxChange(event, index)}
                  />
              </td>
              <td>{index+1}</td>
              <td>{locationdata.code}</td>
              <td>{locationdata.name}</td>
              <td>{locationdata.floor}</td>
              <td>{locationdata.storage_zone}</td>
              <td>{locationdata.max_sku_capacity}</td>
              <td>{locationdata.mixed_expiry_count}</td>
              <td>{locationdata.location_status}</td>
              <td>{locationdata.inbound_enabled}</td>
              <td>{locationdata.outbound_enabled}</td>
              <td>{locationdata.width}</td>
              <td>{locationdata.height}</td>
              <td>{locationdata.depth}</td>
              <td>{locationdata.editable === '1' ? '가능' : '불가능'}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>


    </div>

  );
}

export default Location;
