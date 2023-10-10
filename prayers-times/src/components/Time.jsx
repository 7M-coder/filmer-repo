import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Time({ hijriDate, gregorianDate }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      const dayJs = dayjs();
      let hour = dayJs.hour();
      let mins = dayJs.minute() < 10 ? `0${dayJs.minute()}` : dayJs.minute();
      let seconds = dayJs.second() < 10 ? `0${dayJs.second()}` : dayJs.second();
      const currentTime = `${hour}:${mins}:${seconds}`;
      setTime(currentTime);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col">
      <span>{time}</span>
      <span>{hijriDate}</span>
      <span>{gregorianDate}</span>
    </div>
  );
}
