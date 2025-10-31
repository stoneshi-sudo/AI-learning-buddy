import { useEffect, useState } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';

interface TimerProps {
  startTime: number;
}

const Timer = ({ startTime }: TimerProps) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <ClockCircleOutlined /> {formatTime(elapsed)}
    </div>
  );
};

export default Timer;
