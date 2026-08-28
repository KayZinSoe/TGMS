import React, { useEffect, useRef, useState } from 'react';
import './CatchBallGame.css';
import { Button } from 'mpa-design-system';

const BOARD_W = 400;      // px
const BOARD_H = 250;
const PADDLE_W = 80;
const BALL_SIZE = 20;
const FALL_SPEED = 3;     // px per frame

export default function CatchBallGame() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [paddleX, setPaddleX] = useState((BOARD_W - PADDLE_W) / 2);
  const [ballPos, setBallPos] = useState({ x: Math.random() * (BOARD_W - BALL_SIZE), y: 0 });
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(1);

  // ---- mouse → paddle -------------------------------------------------
  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      if (!boardRef.current) return;
      const rect = boardRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left - PADDLE_W / 2; // centre under cursor
      x = Math.max(0, Math.min(x, BOARD_W - PADDLE_W));
      setPaddleX(x);
    };
    window.addEventListener('mousemove', moveHandler);
    return () => window.removeEventListener('mousemove', moveHandler);
  }, []);

  // ---- animation loop -------------------------------------------------
  useEffect(() => {
    let raf: number;
    const step = () => {
      setBallPos((b) => {
        const newY = b.y + FALL_SPEED;

        // collision test when ball reaches paddle level
        if (newY + BALL_SIZE >= BOARD_H - 12) {          // 12 = paddle height
          const hit =
            b.x + BALL_SIZE > paddleX &&                     // right side of ball past left edge of paddle
            b.x < paddleX + PADDLE_W;                       // left side of ball before right edge

          if (hit) {
            setScore((s) => s + 1);                         // success → increase score
            // respawn at top with new random x
            return { x: Math.random() * (BOARD_W - BALL_SIZE), y: 0 };
          } else {
            // missed – lose a life and reset ball
            setLives((l) => Math.max(l - 1, 0));
            return { x: Math.random() * (BOARD_W - BALL_SIZE), y: 0 };
          }
        }

        // keep falling while not yet at paddle level
        if (newY > BOARD_H) {
          // safety fallback – reset ball
          return { x: Math.random() * (BOARD_W - BALL_SIZE), y: 0 };
        }

        return { ...b, y: newY };
      });

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paddleX]);

  // ---- game over -------------------------------------------------------
  if (lives === 0) {
    return (
      <div className="catch-game">
        <h3>Game Over</h3>
        <p>Your final score: {score}</p>
        <Button onClick={() => { setScore(0); setLives(3); setBallPos({ x: Math.random() * (BOARD_W - BALL_SIZE), y: 0 }); }} id={''} label='Play again' />
      </div>
    );
  }

  // ---- render -----------------------------------------------------------
  return (
    <div className="catch-game">
      <h4>Score: {score} | Lives: {lives}</h4>

      <div
        ref={boardRef}
        className="board"
        style={{ width: BOARD_W, height: BOARD_H }}
      >
        {/* paddle */}
        <div
          className="paddle"
          style={{
            left: paddleX,
            bottom: 0,
            width: PADDLE_W,
            height: 12,
          }}
        />

        {/* ball */}
        <div
          className="ball"
          style={{ left: ballPos.x, top: ballPos.y, width: BALL_SIZE, height: BALL_SIZE }}
        />
      </div>
    </div>
  );
}