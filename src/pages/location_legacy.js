import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LocationStyle from '../css/Location.module.css';

const apiUrl = process.env.REACT_APP_API_URL;


function Location() {

  const [locationdata, setData] = useState([]);
  useEffect(() => {
    // 서버로부터 데이터를 가져오는 API 요청
      axios.get(`${apiUrl}/api/getlocation`)
        .then(response => {
          setData(response.data); // 받은 데이터를 상태에 저장
          console.log("로케이션불러오기");
        })
        .catch(error => {
          console.error('Error fetching data from server:', error);
        });
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행되도록 빈 배열을 useEffect의 두 번째 인수로 전달



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
          <button className={LocationStyle.QueryButton}>수정</button>
          <button className={LocationStyle.QueryButton}>삭제</button>
          <button className={LocationStyle.QueryButton}>취소</button>
        </div>
        <div >
          <div className={LocationStyle.DetailsContainerRow}>
            <div className={LocationStyle.DetailsContainerRowBox} style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>코드</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>A01-00-000</div>
              <div className={LocationStyle.DetailsContainerRowBottom}>10/15</div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '300px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>명칭</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>A01-00-000</div>
              <div className={LocationStyle.DetailsContainerRowBottom}>10/50</div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '100px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>층</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>1</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>보관존</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>A</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>통로/Line</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>A01</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>랙</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>00</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>로케이션 유형</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>진열</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
          </div>
          <div className={LocationStyle.DetailsContainerRow}>
            <div className={LocationStyle.DetailsContainerRowBox} style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>재고상태</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>가용</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '300px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>로케이션 종류</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>선택</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '100px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>보관가능 SKU 수</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>999</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>소비기한 혼적 수</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>999</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>위치그룹</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>선택</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>로케이션 상태</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>가용</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
          </div>
          <div className={LocationStyle.DetailsContainerRow}>
            <div className={LocationStyle.DetailsContainerRowBox} style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>입고가능</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>가능</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '300px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>출고가능</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>가능</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '100px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>가로(mm)</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>999</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>세로(mm)</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>999</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>높이(mm)</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>선택</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
            <div className={LocationStyle.DetailsContainerRowBox}  style={{width : '200px'}}>
              <div className={LocationStyle.DetailsContainerRowTop}>운영타입</div>
              <div className={LocationStyle.DetailsContainerRowMiddle}>선택</div>
              <div className={LocationStyle.DetailsContainerRowBottom}></div>
            </div>
          </div>
        </div>
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
            <th>명칭</th>
            <th>층</th>
            <th>보관존</th>
            <th>통로/Line</th>
            <th>랙</th>
            <th>로케이션유형</th>
            <th>재고상태</th>
            <th>로케이션종류</th>
            <th>보관가능 SKU 수</th>
            <th>소비기한 혼적 수</th>
            <th>위치그룹</th>
            <th>로케이션상태</th>
            <th>입고가능</th>
            <th>출고가능</th>
            <th>가로(mm)</th>
            <th>세로(mm)</th>
            <th>높이(mm)</th>
            <th>CBM</th>

          </tr>
        </thead>
        <tbody>
          {locationdata.map((locationdata, index) => (
            <tr key={index}>
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
              <td>{locationdata.line}</td>
              <td>{locationdata.rack}</td>
              <td>{locationdata.location_type}</td>
              <td>{locationdata.inventory_status}</td>
              <td>{locationdata.location_category}</td>
              <td>{locationdata.max_sku_capacity}</td>
              <td>{locationdata.mixed_expiry_count}</td>
              <td>{locationdata.location_group}</td>
              <td>{locationdata.location_status}</td>
              <td>{locationdata.inbound_enabled ? '가능' : '불가능'}</td>
              <td>{locationdata.outbound_enabled ? '가능' : '불가능'}</td>
              <td>{locationdata.width}</td>
              <td>{locationdata.height}</td>
              <td>{locationdata.depth}</td>
              <td>{locationdata.cbm}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>


    </div>

  );
}

export default Location;
