import {useEffect, useState} from 'react';
import styles from './styles.module.scss';

function Game() {
  const [current, setCurrent] = useState('x');
  const [matriz, setMatriz] = useState<any[] | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const arr = [11, 12, 13, 21, 22, 23, 31, 32, 33];

  function play(id: string) {
    const doc = document.getElementById(id) as HTMLButtonElement;

    doc.innerText = current;
    let newMatriz = {id: id, value: doc.textContent};
    if (matriz) {
      setMatriz([...matriz, newMatriz]);
    } else {
      setMatriz([newMatriz]);
    }
    doc.disabled = true;
    current == 'x' ? (doc.style.color = 'green') : (doc.style.color = 'tomato');
    current == 'x' ? setCurrent('o') : setCurrent('x');
  }

  useEffect(() => {
    const lines = [
      ['11', '12', '13'],
      ['21', '22', '23'],
      ['31', '32', '33']
    ];

    const columns = [
      ['11', '21', '31'],
      ['12', '22', '32'],
      ['13', '23', '33']
    ];

    const diagonals = [
      ['11', '22', '33'],
      ['13', '22', '31']
    ];

    const x = matriz?.filter(ele => ele.value == 'x');
    const o = matriz?.filter(ele => ele.value == 'o');

    const xid = x?.map(item => {
      return item.id;
    });

    const oid = o?.map(item => {
      return item.id;
    });

    for (let i = 0; i < 3; i++) {
      for (let arr of [lines[i]]) {
        let matchx = xid?.filter(x => arr.includes(x));
        let matcho = oid?.filter(x => arr.includes(x));
        if (matchx?.length == 3) {
          setTimeout(() => setWinner('X'), 250);
        }
        if (matcho?.length == 3) {
          setTimeout(() => setWinner('O'), 250);
        }
      }
      for (let arr of [columns[i]]) {
        let matchx = xid?.filter(x => arr.includes(x));
        let matcho = oid?.filter(x => arr.includes(x));
        if (matchx?.length == 3) {
          setTimeout(() => setWinner('X'), 250);
        }
        if (matcho?.length == 3) {
          setTimeout(() => setWinner('O'), 250);
        }
      }
    }

    for (let i = 0; i < 2; i++) {
      for (let arr of [diagonals[i]]) {
        let matchx = xid?.filter(x => arr.includes(x));
        let matcho = oid?.filter(x => arr.includes(x));
        if (matchx?.length == 3) {
          setTimeout(() => setWinner('X'), 250);
        }
        if (matcho?.length == 3) {
          setTimeout(() => setWinner('O'), 250);
        }
      }
    }
    let arrDocs: any = [];
    arr.map(id => {
      let doc = document.getElementById(String(id)) as HTMLButtonElement;
      if (doc.textContent == '') {
        arrDocs.push(doc);
      }
    });

    if (arrDocs.length == 0) {
      setTimeout(() => setWinner('EMPATE'), 250);
    }
  }, [current]);

  function reset() {
    setWinner(null);
    setMatriz(null);
    setCurrent('x');
  }

  return (
    <>
      {winner ? (
        <div className={styles.containerWinner}>
          {winner == 'EMPATE' ? (
            <span className={styles.winner}>🥲 {winner} 🥲 </span>
          ) : (
            <span className={styles.winner}>🎉 {winner} WINNER 🎉</span>
          )}

          <button className={styles.button} onClick={reset}>
            Jogar novamente
          </button>
        </div>
      ) : (
        <div className={styles.container}>
          {arr.map((id: number) => (
            <button
              key={id}
              id={String(id)}
              className={styles.boxItem}
              onClick={() => play(String(id))}
            ></button>
          ))}
        </div>
      )}
    </>
  );
}

export {Game};
