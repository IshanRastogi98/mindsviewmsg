import { useEffect, useState } from "react";

export function useResendTimer(seconds: number) {
  const [count, setCount] = useState(seconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  const reset = () => {
    setCount(seconds);
    setIsActive(true);
  };

  return { count, isActive, reset };
}
