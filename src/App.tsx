import {useEffect, useState} from 'react';

function App() {
  const [line, setLine] = useState<any>({
    line1: {x: 0, o: 0},
    line2: {x: 0, o: 0},
    line3: {x: 0, o: 0}
  });
  const [column, setColumn] = useState<any>({
    column1: {x: 0, o: 0},
    column2: {x: 0, o: 0},
    column3: {x: 0, o: 0}
  });
  const [current, setCurrent] = useState('x');
  const [winner, setWinner] = useState<string | null>(null);

  const bts = [11, 12, 13, 21, 22, 23, 31, 32, 33];

  function changeButton(e: any) {
    const id = e.target.id;
    const lineId = String(id).substring(0, 1);
    const columnId = String(id).substring(1);

    if (current === 'x') {
      const newLine = line;
      newLine['line' + lineId].x += 1;
      setLine(newLine);
      const newColumn = column;
      newColumn['column' + columnId].x += 1;
      setColumn(newColumn);
    } else {
      const newLine = line;
      newLine['line' + lineId].o += 1;
      setLine(newLine);
      const newColumn = column;
      newColumn['column' + columnId].o += 1;
      setColumn(newColumn);
    }
    let btn = document.getElementById(id);
    btn ? (btn.innerText = current) : '-';
    //@ts-ignore
    btn.disabled = true;
    current == 'x' ? setCurrent('o') : setCurrent('x');
  }

  useEffect(() => {
    let winner = '';

    Object.values(line).map((item: any) => {
      if (item.x === 3) {
        winner = 'x Venceu';
      }

      if (item.o === 3) {
        winner = 'O Venceu';
      }
    });

    Object.values(column).map((item: any) => {
      if (item.x === 3) {
        winner = 'x Venceu';
      }

      if (item.o === 3) {
        winner = 'O venceu';
      }
    });

    const l11 = document.getElementById('11')?.textContent;
    const l13 = document.getElementById('13')?.textContent;
    const l22 = document.getElementById('22')?.textContent;
    const l31 = document.getElementById('31')?.textContent;
    const l33 = document.getElementById('33')?.textContent;

    if (l11 == 'x' && l22 == 'x' && l33 == 'x') {
      setWinner('X Venceu');
    }

    if (l11 == 'o' && l22 == 'o' && l33 == 'o') {
      setWinner('O Venceu');
    }

    if (l13 == 'x' && l22 == 'x' && l31 == 'x') {
      setWinner('X Venceu');
    }

    if (l13 == 'o' && l22 == 'o' && l31 == 'o') {
      setWinner('O Venceu');
    }

    if (winner !== '') {
      setWinner(winner);
    } else {
      let d: any = [];

      bts.map((id: any) => {
        const doc = document.getElementById(id);
        //@ts-ignore
        if (!doc.disabled) {
          d.push(doc);
        }
      });
      if (d.length == 0) {
        setWinner('Empate');
      }
    }
  }, [current]);

  function reset() {
    bts.map((id: any) => {
      let doc = document.getElementById(id);
      if (doc) {
        doc.innerText = '';
        //@ts-ignore
        doc.disabled = false;
      }
    });

    setLine({
      line1: {x: 0, o: 0},
      line2: {x: 0, o: 0},
      line3: {x: 0, o: 0}
    });
    setColumn({
      column1: {x: 0, o: 0},
      column2: {x: 0, o: 0},
      column3: {x: 0, o: 0}
    });
    setCurrent('x');

    setWinner(null);

    console.log('oá');
  }

  return (
    <>
      {winner ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '600px',
            minHeight: 'calc(100vh - 60px)',
            height: '400px',
            margin: '0 auto',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <p style={{fontSize: '30px'}}>{winner}</p>
          <button onClick={reset}>Reiniciar Partida</button>
        </div>
      ) : (
        <div
          style={{
            width: '600px',
            height: '600px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            margin: '0 auto'
          }}
        >
          {bts.map((num: any) => (
            <button
              key={num}
              style={{fontSize: '50px'}}
              onClick={e => changeButton(e)}
              id={num}
              disabled={false}
            ></button>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
