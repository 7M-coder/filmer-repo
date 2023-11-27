import { useEffect } from "react";
import { useState } from "react";

export default function Remianing({ timings, date, currentTime }) {
  const [remain, setRemain] = useState(0);
  const [format, setFormat] = useState("");
  const [name, setName] = useState("");
  console.log(`current time is: ${currentTime}`);

  // Function to format time in HH:MM
  function formatTime(milliseconds, index) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    let hoursRemaining;
    let minutesRemaining = `${minutes} دقيقة`;
    let and = "و";
    if (minutes <= 0 && hours <= 0) {
      return `حان موعد صلاة ${getPrayerName(index)}`;
    }

    if (hours == 1 || hours > 10) {
      hoursRemaining = "ساعة";
    } else if (hours == 2) {
      hoursRemaining = "ساعتين";
    } else {
      hoursRemaining = `${hours} ساعات`;
    }

    let isPrayer = index == 6 ? "على" : "على صلاة";
    const formattedTime = `تبقى ${
      hours == 0 ? "" : `${hoursRemaining} ${and}`
    } ${minutesRemaining}`;
    return `${formattedTime} ${isPrayer} ${getPrayerName(index)}`;
  }

  function getPrayerName(index) {
    let isFriday = new Date().getDay() == 5 ? "الجمعة" : "الظهر";

    let prayersNames = [
      "منتصف الليل",
      "الفجر",
      "شروق الشمس",
      isFriday,
      "العصر",
      "المغرب",
      "العشاء",
      "منتصف الليل",
    ];

    return prayersNames[index];
  }

  useEffect(() => {
    const calcNextPrayer = () => {
      if (timings && date && currentTime) {
        const now = new Date().getTime();
        // prayers times in HH:MM format
        const fajr = timings.Fajr.match(/\d+/g).join("");
        const sunrise = timings.Sunrise.match(/\d+/g).join("");
        const dhuhr = timings.Dhuhr.match(/\d+/g).join("");
        const asr = timings.Asr.match(/\d+/g).join("");
        const maghrib = timings.Maghrib.match(/\d+/g).join("");
        const isha = timings.Isha.match(/\d+/g).join("");
        const midNight = timings.Midnight.match(/\d+/g).join("");
        let year;
        let day;
        let month;
        // prayers times in HH:MM format
        let prayersTimes = ["0000", fajr, sunrise, dhuhr, asr, maghrib, isha];
        let hour;
        let minutes;
        let nextPrayer;
        /* GPT */

        /* GPT */

        // detect which is the upcoming prayer
        let nextPrayerIndex =
          prayersTimes
            .map((prayer, i) => {
              if (currentTime >= prayer) return i;
            })
            .filter((index) => index !== undefined)
            .slice(-1)
            .at(0) + 1;

        if (nextPrayerIndex == 7) {
          // meaning the next is midnight
          let today = new Date();

          let tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);

          tomorrow.setHours(0, 0, 0, 0);

          nextPrayer = tomorrow.getTime();
        } else {
          year = Number(date.substring(6, 10));
          day = Number(date.substring(0, 2));
          month = Number(date.substring(3, 5) - 1);
          hour = Number(prayersTimes[nextPrayerIndex].substring(0, 2));
          minutes = Number(prayersTimes[nextPrayerIndex].substring(2, 4));
          nextPrayer = new Date(
            year,
            month,
            day,
            hour,
            minutes,
            0,
            0
          ).getTime();
        }

        console.log(nextPrayerIndex);
        // console.log(`Next Prayer Index ${nextPrayerIndex}`);

        setName(getPrayerName(nextPrayerIndex));
        // console.log(`year: ${year}`);
        // console.log(`month: ${month}`);
        // console.log(`day: ${day}`);
        // console.log(`hour: ${hour}`);
        // console.log(`minute: ${minutes}`);
        // console.log(date);
        setRemain(nextPrayer - now);
        if (remain != 0) setFormat(formatTime(remain, nextPrayerIndex));
        const interval = setInterval(() => {
          setRemain((t) => t - 1);
          if (remain != 0) setFormat(formatTime(remain, nextPrayerIndex));
        }, 60000);

        return () => clearInterval(interval);
      }
    };

    calcNextPrayer();
  }, [timings, date, remain, currentTime]);

  return (
    <div
      className="mt-2 text-white bg-white flex text-xl font-bold rounded-md p-2"
      style={{
        backgroundImage: "url('../../public/imgs/morning3.jpg')",
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
    >
      <p
        style={{
          textShadow: "1px 1px 2px black",
        }}
      >
        {format}
      </p>
    </div>
  );
}
