import { useEffect, useState } from 'react';

export function useAnimatedRows(centroId: string, rowCount: number, delayBetween = 60) {
  const [visibleRows, setVisibleRows] = useState<boolean[]>(Array(rowCount).fill(false));

  useEffect(() => {
    setVisibleRows(Array(rowCount).fill(false));
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < rowCount; i++) {
      const t = setTimeout(() => {
        setVisibleRows(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * delayBetween);
      timers.push(t);
    }

    return () => timers.forEach(clearTimeout);
  }, [centroId, rowCount]);

  return visibleRows;
}