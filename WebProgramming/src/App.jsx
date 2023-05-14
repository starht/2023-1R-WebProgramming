import { useState, useEffect } from 'react';
import './App.css'

function App() {  
  const [row, setRow] = useState([]);

  useEffect(() => {
    console.log('mount or update');

    return () => {
      console.log('unmount');
    };
  });

  useEffect(() => { 
    console.log('mount only');
    fetch("http://openAPI.seoul.go.kr:8088/6b736f644a6c6f7436345172576974/json/RealtimeCityAir/1/25/").then(
      function(res2) {
        res2.json().then((res3) => {
          setRow(res3.RealtimeCityAir.row);
        })
      }
    );
  }, []);

  useEffect(() => { 
    console.log('update only',row);
  }, [row]);


  return (
    <>
      <table>
        <thead>
          <tr>
            <th className='th'>지역명</th>
            <th className='th'>권역구</th>
            <th className='th'>PM10</th>
            <th className='th'>PM25</th>
            <th className='th'>O3</th>
            <th className='th'>SO2</th>
            <th className='th'>통합대기지수</th>
            <th className='th'>미세먼지상태</th>
          </tr>
        </thead>
        <tbody>
          {
          row.map((gu, index) => {
            return <tr key={index}>
              <td>{gu.MSRSTE_NM}</td>
              <td>{gu.MSRRGN_NM}</td>
              <td>{gu.PM10}</td>
              <td>{gu.PM25}</td>
              <td>{gu.O3}</td>
              <td>{gu.SO2}</td>
              <td>{gu.IDEX_MVL}</td>
              <td>{gu.IDEX_NM}</td>
              </tr>
          })
          }
        </tbody>
      </table>
    </>
  )
}

export default App
