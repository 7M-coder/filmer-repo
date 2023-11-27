import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Time({ hijriDate, gregorianDate, getCurrentTime }) {
  const [time, setTime] = useState("");
  let timeArr = time.split(":");
  let hijriArr = hijriDate ? hijriDate.split("-") : null;
  let h = timeArr.at(0);
  let m = timeArr.at(1);
  let s = timeArr.at(2);
  const days = [
    "الاحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  let today = days.at(new Date().getDay());
  useEffect(() => {
    setInterval(() => {
      const dayJs = dayjs();
      let hour = dayJs.hour() < 10 ? `0${dayJs.hour()}` : dayJs.hour();
      let mins = dayJs.minute() < 10 ? `0${dayJs.minute()}` : dayJs.minute();
      let seconds = dayJs.second() < 10 ? `0${dayJs.second()}` : dayJs.second();
      const currentTime = `${hour}:${mins}:${seconds}`;
      setTime(currentTime);
      getCurrentTime(`${hour}${mins}`);
    }, 1000);
  }, []);

  return (
    <div className="grid gap-2 md:grid-cols-2">
      <span
        className="bg-white text-white flex justify-center items-center text-2xl md:text-3xl font-bold rounded-md p-2 mt-2"
        style={{
          backgroundImage: "url('../../public/imgs/morning2.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <p
          style={{
            textShadow: "1px 1px 2px black",
          }}
        >
          {today}
        </p>
      </span>
      <section className="mt-2 grid grid-cols-3 md:grid-cols-2 gap-2">
        <span
          className="bg-white text-white flex justify-center items-center text-xl md:text-2xl font-bold rounded-md p-2"
          style={{
            backgroundImage: "url('../../public/imgs/night3.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <p
            style={{
              textShadow: "1px 1px 2px black",
            }}
          >
            {hijriDate ? hijriArr.at(0) : ""}
          </p>
        </span>
        <span
          className="bg-white text-white md:order-3 flex justify-center items-center text-xl md:text-2xl font-bold rounded-md p-2"
          style={{
            backgroundImage: "url('../../public/imgs/night5.gif')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <p
            style={{
              textShadow: "1px 1px 2px black",
            }}
          >
            {hijriDate ? hijriArr.at(1) : ""}
          </p>
        </span>
        <span
          className="bg-white text-white md:row-span-2 md:order-2 flex justify-center items-center text-xl md:text-3xl font-bold rounded-md p-2"
          style={{
            backgroundImage: "url('../../public/imgs/evening4.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <p
            style={{
              textShadow: "1px 1px 2px black",
            }}
          >
            {hijriDate ? hijriArr.at(2) : ""}
          </p>
        </span>
      </section>
      <section dir="ltr" className="mt-2 grid grid-cols-3 md:col-span-3 gap-2">
        <span
          className="bg-white text-white flex justify-center text-xl font-bold rounded-md p-2"
          style={{
            backgroundImage: "url('../../public/imgs/evening6.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <p
            style={{
              textShadow: "1px 1px 2px black",
            }}
          >
            {h}
          </p>
        </span>
        <span
          className="bg-white text-white flex justify-center text-xl font-bold rounded-md p-2"
          style={{
            backgroundImage: "url('../../public/imgs/morning4.png')",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        >
          <p
            style={{
              textShadow: "1px 1px 2px black",
            }}
          >
            {m}
          </p>
        </span>
        <span
          className="bg-white text-white flex justify-center text-xl font-bold rounded-md p-2"
          style={{
            backgroundImage: "url('../../public/imgs/night6.png')",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        >
          <p
            style={{
              textShadow: "1px 1px 2px black",
            }}
          >
            {s}
          </p>
        </span>
      </section>
    </div>
  );
}
