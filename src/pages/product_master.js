import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LocationStyle from '../css/Product.module.css';

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

    // 저장 안하고 왔다갔다 하면 다시 초기화 되도록
    useEffect(() => {
      setEditLocation(locationdata.map(item => ({ ...item })));
    }, [selectedLocation]);


    const handleRowClick = (rowData, index) => {
      setSelectedLocation(index);
    };

    /*
    useEffect(() => {
      if (selectedLocation !== null) {
         // 위치 변경 시 수정내용 초기화
      }
    }, [selectedLocation, locationdata]);
*/
  

  return (
 
    <div className={LocationStyle.LocationPage} style={{display : 'inline-block'}}>
      <div className={LocationStyle.LocationPage_title}>🚧👷공사 중👷🏗️</div>
      <div className={LocationStyle.QueryContainer}>
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
        <div style={{textAlign: 'right' , paddingRight : '10px'}}>
          <button className={LocationStyle.QueryButton}>x추가x</button>
          <button className={LocationStyle.QueryButton}>x수정x</button>
          <button className={LocationStyle.QueryButton}>x삭제x</button>
          <button className={LocationStyle.QueryButton}>x취소x</button>
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
              />
              <div className={LocationStyle.DetailsContainerRowBottom}>{editLocation[selectedLocation].name.length}/50</div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '100px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>층</div>
              <input 
                style={{width : '100px'}} 
                className={LocationStyle.custom_input} 
                type="text" 
                value={editLocation[selectedLocation].floor || ''} 
              />
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>보관방법</div>
              <select 
                style={{ width: '200px' }} 
                className={LocationStyle.custom_select}
                value={editLocation[selectedLocation].storage_zone || ''}
                onChange={(e) => {
                  // 선택된 옵션으로 editLocation의 특정 필드를 업데이트하는 로직을 작성하세요.
                  const updatedEditLocation = { ...editLocation };
                  updatedEditLocation[selectedLocation].storage_zone = e.target.value;
                  setEditLocation(updatedEditLocation);
                }}
                >
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
                  const newEditLocation = { ...editLocation }; // editLocation 상태를 복사
                  newEditLocation[selectedLocation].max_sku_capacity = e.target.value; // 새로운 값으로 업데이트
                  setEditLocation(newEditLocation); // 변경된 객체로 editLocation 상태를 업데이트
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
                    // 선택된 옵션으로 editLocation의 특정 필드를 업데이트하는 로직을 작성하세요.
                    const updatedEditLocation = { ...editLocation };
                    updatedEditLocation[selectedLocation].location_status = e.target.value;
                    setEditLocation(updatedEditLocation);
                  }}
                >
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
                    // 선택된 옵션으로 editLocation의 특정 필드를 업데이트하는 로직을 작성하세요.
                    const updatedEditLocation = { ...editLocation };
                    updatedEditLocation[selectedLocation].inbound_enabled = e.target.value;
                    setEditLocation(updatedEditLocation);
                  }}
                >
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
                    // 선택된 옵션으로 editLocation의 특정 필드를 업데이트하는 로직을 작성하세요.
                    const updatedEditLocation = { ...editLocation };
                    updatedEditLocation[selectedLocation].outbound_enabled = e.target.value;
                    setEditLocation(updatedEditLocation);
                  }}
                >
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
            </tr>
          ))}
        </tbody>
        </table>
      </div>


    </div>

  );
}

export default Location;
