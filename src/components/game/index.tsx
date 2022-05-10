import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from './styles.module.scss';

interface LocationStateProps {
  player1: string;
  player2: string;
}

function Game() {
  const [current, setCurrent] = useState('');
  const [matriz, setMatriz] = useState<any[] | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [pl1, setPl1] = useState<string | null>(null);
  const [pl2, setPl2] = useState<string | null>(null);
  const [placar, setPlacar] = useState({
    p1: 0,
    p2: 0
  });
  const navigate = useNavigate();

  const location = useLocation();
  const myState: LocationStateProps = location.state as LocationStateProps;

  const arr = [11, 12, 13, 21, 22, 23, 31, 32, 33];

  function resetAll() {
    arr.map(id => {
      let doc = document.getElementById(String(id)) as HTMLButtonElement;
      doc.textContent = '';
      doc.disabled = false;
    });

    setWinner(null);
    setCurrent('x');
    setMatriz(null);

    let newPlacar = {
      p1: 0,
      p2: 0
    };
    setPlacar(newPlacar);
  }

  function resetPlacar() {
    let newPlacar = {
      p1: 0,
      p2: 0
    };
    setPlacar(newPlacar);
  }

  function logout() {
    arr.map(id => {
      let doc = document.getElementById(String(id)) as HTMLButtonElement;
      doc.textContent = '';
      doc.disabled = false;
    });

    setWinner(null);
    setCurrent('x');
    setMatriz(null);

    let newPlacar = {
      p1: 0,
      p2: 0
    };
    setPlacar(newPlacar);
    setPl1(null);
    setPl2(null);
    location.state = null;
  }

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
    current == 'x'
      ? (doc.style.color = 'lightgreen')
      : (doc.style.color = 'tomato');
    current == 'x' ? setCurrent('o') : setCurrent('x');
  }

  function incPlacar(player: number) {
    if (player == 1) {
      let newPlacar = placar;
      newPlacar.p1 = newPlacar.p1 + 1;
      setPlacar(newPlacar);
    }

    if (player == 2) {
      let newPlacar = placar;
      newPlacar.p2 = newPlacar.p2 + 1;
      setPlacar(newPlacar);
    }
  }

  function animateButton(button: HTMLButtonElement) {
    button.animate([{color: 'lightseagreen'}, {color: 'yellow'}], {
      duration: 200,
      iterations: 5
    });
  }

  function disableButtons() {
    arr.map(id => {
      const doc = document.getElementById(String(id)) as HTMLButtonElement;
      doc.disabled = true;
    });
  }

  function enableButtons() {
    arr.map(id => {
      const doc = document.getElementById(String(id)) as HTMLButtonElement;
      doc.disabled = false;
    });
  }

  useEffect(() => {
    if (myState == null) {
      navigate('/');
    } else {
      setPl1(myState.player1);
      setPl2(myState.player2);
      console.log(myState);
    }
  }, [myState]);

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
          incPlacar(1);
          lines[i].map((id: string) => {
            const doc = document.getElementById(id) as HTMLButtonElement;
            animateButton(doc);
          });
          setTimeout(() => setWinner(pl1), 1500);
          return;
        }
        if (matcho?.length == 3) {
          incPlacar(2);
          lines[i].map((id: string) => {
            const doc = document.getElementById(id) as HTMLButtonElement;
            animateButton(doc);
          });
          disableButtons();
          setTimeout(() => setWinner(pl2), 1500);
          return;
        }
      }
      for (let arr of [columns[i]]) {
        let matchx = xid?.filter(x => arr.includes(x));
        let matcho = oid?.filter(x => arr.includes(x));
        if (matchx?.length == 3) {
          incPlacar(1);
          columns[i].map((id: string) => {
            const doc = document.getElementById(id) as HTMLButtonElement;
            animateButton(doc);
          });
          disableButtons();
          setTimeout(() => setWinner(pl1), 1500);
          return;
        }
        if (matcho?.length == 3) {
          incPlacar(2);
          columns[i].map((id: string) => {
            const doc = document.getElementById(id) as HTMLButtonElement;
            animateButton(doc);
          });
          disableButtons();
          setTimeout(() => setWinner(pl2), 1500);
          return;
        }
      }
    }

    for (let i = 0; i < 2; i++) {
      for (let arr of [diagonals[i]]) {
        let matchx = xid?.filter(x => arr.includes(x));
        let matcho = oid?.filter(x => arr.includes(x));
        if (matchx?.length == 3) {
          incPlacar(1);
          diagonals[i].map((id: string) => {
            const doc = document.getElementById(id) as HTMLButtonElement;
            animateButton(doc);
          });
          disableButtons();
          setTimeout(() => setWinner(pl1), 1500);
          return;
        }
        if (matcho?.length == 3) {
          incPlacar(2);
          diagonals[i].map((id: string) => {
            const doc = document.getElementById(id) as HTMLButtonElement;
            animateButton(doc);
          });
          disableButtons();
          setTimeout(() => setWinner(pl2), 1500);
          return;
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
      let w = '';
      for (let i = 0; i < 2; i++) {
        for (let arr of [diagonals[i]]) {
          let matchx = xid?.filter(x => arr.includes(x));
          let matcho = oid?.filter(x => arr.includes(x));
          if (matchx?.length == 3) {
            w = pl1!;
            diagonals[i].map((id: string) => {
              const doc = document.getElementById(id) as HTMLButtonElement;
              animateButton(doc);
            });
            disableButtons();
            setTimeout(() => setWinner(pl1), 1500);
            incPlacar(1);
            return;
          }
          if (matcho?.length == 3) {
            w = pl2!;
            diagonals[i].map((id: string) => {
              const doc = document.getElementById(id) as HTMLButtonElement;
              animateButton(doc);
            });
            disableButtons();
            setTimeout(() => setWinner(pl2), 1500);
            incPlacar(2);
            return;
          }
        }
      }
      if (w == '') {
        disableButtons();
        setTimeout(() => setWinner('EMPATE'), 250);
        return;
      } else {
        disableButtons();
        setTimeout(() => setWinner(w), 250);
        w === pl1 ? incPlacar(1) : incPlacar(2);
        return;
      }
    }
  }, [current]);

  useEffect(() => {
    const options = ['x', 'o'];
    setCurrent(options.sort()[0]);
    console.log(current);
  }, []);

  function reset() {
    setWinner(null);
    setMatriz(null);
    enableButtons();
  }

  return (
    <>
      {winner ? (
        <div className={styles.containerWinner}>
          {winner == 'EMPATE' ? (
            <span className={styles.winner}>🥲 {winner} 🥲 </span>
          ) : (
            <>
              <p className={styles.playerWinner}>🎉 {winner} 🎉</p>
              <span className={styles.winner}>VENCEU</span>
            </>
          )}

          <button className={styles.button} onClick={reset}>
            Jogar novamente
          </button>
        </div>
      ) : (
        <div className={styles.header}>
          <div className={styles.players}>
            <div className={styles.player}>
              <span>
                Jogador 1: <span style={{color: 'green'}}>X</span>
              </span>
              <span
                className={styles.playerName}
                style={{
                  color: `${current === 'x' ? 'yellow' : ''}`
                }}
              >
                {pl1}
              </span>
              <p>{placar.p1}</p>
            </div>
            <div>
              <div className={styles.btns}>
                <button className={styles.btnReset} onClick={resetAll}>
                  Reiniciar
                </button>
                <button className={styles.btnReset} onClick={resetPlacar}>
                  Zerar Placar
                </button>
                <span
                  style={{marginTop: '5px', cursor: 'pointer'}}
                  onClick={logout}
                >
                  Sair
                </span>
              </div>
            </div>
            <div className={styles.player}>
              <span>
                Jogador 2: <span style={{color: 'tomato'}}>O</span>
              </span>
              <span
                className={styles.playerName}
                style={{color: `${current === 'o' ? 'yellow' : ''}`}}
              >
                {pl2}
              </span>
              <p>{placar.p2}</p>
            </div>
          </div>
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
        </div>
      )}
    </>
  );
}

export {Game};
