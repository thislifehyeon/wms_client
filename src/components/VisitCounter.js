import { useEffect } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

const VisitCounter = () => {
  useEffect(() => {
    // 페이지가 로드될 때 즉시 요청을 보내기 위한 코드
    fetch(`${apiUrl}/api/visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행되도록 설정합니다.

  return null;
  // 나머지 컴포넌트 내용
};

export default VisitCounter;
