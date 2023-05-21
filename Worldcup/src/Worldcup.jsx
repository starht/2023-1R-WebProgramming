import "./Worldcup.css";
import K1 from "./assets/K1.jpg";
import K2 from "./assets/K2.jpg";
import K3 from "./assets/K3.jpg";
import K4 from "./assets/K4.jpg";
import K5 from "./assets/K5.jpg";
import K6 from "./assets/K6.jpg";
import K7 from "./assets/K7.jpg";
import K8 from "./assets/K8.jpg";
import K9 from "./assets/K9.jpg";
import K10 from "./assets/K10.jpg";
import K11 from "./assets/K11.jpg";
import K12 from "./assets/K12.jpg";
import K13 from "./assets/K13.jpg";
import K14 from "./assets/K14.jpg";
import K15 from "./assets/K15.jpg";
import K16 from "./assets/K16.jpg";
import { useState, useEffect } from "react";

function Worldcup() {
  const candidate = [
    { name: "카리나 1번", src: K1 },
    { name: "카리나 2번", src: K2 },
    { name: "카리나 3번", src: K3 },
    { name: "카리나 4번", src: K4 },
    { name: "카리나 5번", src: K5 },
    { name: "카리나 6번", src: K6 },
    { name: "카리나 7번", src: K7 },
    { name: "카리나 8번", src: K8 },
    { name: "카리나 9번", src: K9 },
    { name: "카리나 10번", src: K10 },
    { name: "카리나 11번", src: K11 },
    { name: "카리나 12번", src: K12 },
    { name: "카리나 13번", src: K13 },
    { name: "카리나 14번", src: K14 },
    { name: "카리나 15번", src: K15 },
    { name: "카리나 16번", src: K16 },
  ];

  const [game, setGame] = useState([]);
  const [round, setRound] = useState(0);
  const [nextGame, setNextGame] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSelectedItem, setShowSelectedItem] = useState(false);
  const [stat, setStat] = useState({
    "카리나 1번": 0,
    "카리나 2번": 0,
    "카리나 3번": 0,
    "카리나 4번": 0,
    "카리나 5번": 0,
    "카리나 6번": 0,
    "카리나 7번": 0,
    "카리나 8번": 0,
    "카리나 9번": 0,
    "카리나 10번": 0,
    "카리나 11번": 0,
    "카리나 12번": 0,
    "카리나 13번": 0,
    "카리나 14번": 0,
    "카리나 15번": 0,
    "카리나 16번": 0,
  }); // 통계정보 저장
  const left = round * 2,
    right = round * 2 + 1;

  useEffect(() => {
    const localStorageKey = "2017112191"; // 원하는 키로 변경하세요
    const storedStat = localStorage.getItem(localStorageKey);
    if (storedStat !== null) {
      setStat(JSON.parse(storedStat));
    }

    setGame(
      candidate
        .map((c) => {
          return { name: c.name, src: c.src, order: Math.random() };
        })
        .sort((a, b) => {
          return a.order - b.order;
        })
    );
  }, []);

  useEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]);

  useEffect(() => {
    if (selectedItem) {
      setShowSelectedItem(true);
      const timeout = setTimeout(() => {
        setSelectedItem(null);
        setShowSelectedItem(false);
        setRound((round) => round + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [selectedItem]);

  const handleItemClick = (item) => {
    if (!selectedItem) {
      setStat({ ...stat, [item.name]: stat[item.name] + 1 });
      setSelectedItem(item);
      setNextGame((prev) => prev.concat(item));
    }
  };


  if (game.length === 1) {
    const localStorageKey = `2017112191`; // localStorage 에 저장하는 KEY 값은 본인의 학번으로 작성해주세요
    localStorage.setItem(localStorageKey, JSON.stringify(stat)); // 문자열로 저장

    return (
      <div className="wrapper">
        <div className="img_container">
          <div className="title">
            <img className="winner_img" src={game[0].src} alt={game[0].name} />
            <div className="description">
              {game[0].name} 이상형 월드컵 우승 {stat[game[0].name]} 번 승리
            </div>
          </div>
  
          <div className="chart_container">
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>승리 횟수</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(stat).map((name) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{stat[name]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        </div>
      </div>
    );
  }
  if (game.length === 0 || round + 1 > game.length / 2)
    return <div className="title">로딩중입니다</div>;

  return (
    <div className="wrapper">
      <div className="title">
        카리나 이상형 월드컵 {round + 1} / {game.length / 2} &nbsp;
        <b>{game.length === 2 ? "결승" : game.length + "강"}</b>
      </div>
      <div className="img_container">
        <div className={`item ${showSelectedItem ? "center" : ""}`}>
          {showSelectedItem && (
            <>
              <img
                className="selected_img"
                src={selectedItem.src}
                alt={selectedItem.name}
              />
              <div className="description">{selectedItem.name}</div>
            </>
          )}
        </div>
        {game.slice(left, right + 1).map((item, index) => (
          <div key={index} className={`item ${showSelectedItem ? "none" : ""}`}>
            <img
              className={`img ${selectedItem === item ? "selected" : ""}`}
              src={item.src}
              alt={item.name}
              onClick={() => handleItemClick(item)}
            />
            <div className="description">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Worldcup;
