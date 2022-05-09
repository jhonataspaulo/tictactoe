import {useState} from 'react';
import styles from './styles.module.scss';
import {useNavigate} from 'react-router-dom';

export function Home() {
  const [player1, setPlayer1] = useState<string>('');
  const [player2, setPlayer2] = useState<string>('');
  let navigate = useNavigate();
  function handleNext() {
    const p1 = document.getElementById('player1');
    const p2 = document.getElementById('player2');

    if (player1 === '') {
      p1?.focus();
      return;
    }

    if (player2 === '') {
      p2?.focus();
      return;
    }
    navigate('/game', {state: {player1, player2}});
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>#️ TIC TAC TOE #️</h1>
      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="player1"
            placeholder="Nome do jogador 1"
            value={player1}
            onChange={e => setPlayer1(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="player2"
            placeholder="Nome do jogador 2"
            value={player2}
            onChange={e => setPlayer2(e.target.value)}
          />
        </div>
        <button onClick={handleNext}>Continuar</button>
      </div>
      <footer className={styles.footer}>
        Feito com 🤍 por{' '}
        <a href="https://github.com/jhonataspaulo" target="_blank">
          Jhonatas Paulo
        </a>
      </footer>
    </div>
  );
}
