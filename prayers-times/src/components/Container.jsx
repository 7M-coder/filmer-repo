// libraries
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// fonts/icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
// components
import Card from "./Card";
import Prayer from "./Prayer";
import Time from "./Time";
import Remaining from "./Remaining";

export default function Container() {
  const [data, setData] = useState(null);
  const [time, setTime] = useState(0);
  function getCurrentTime(time) {
    setTime(time);
  }
  useEffect(() => {
    const location = { lat: "21.422510", long: "39.826168" };
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    navigator.geolocation.getCurrentPosition(
      (success) => {
        const lat = success.coords.latitude;
        const long = success.coords.longitude;
        location.lat = lat;
        location.long = long;
      },
      (error) => {
        console.log(error);
      }
    );

    const url = `http://api.aladhan.com/v1/timings/${formattedDate}?latitude=${location.lat}&longitude=${location.long}&method=4`;

    const fetchAPI = async () => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`there is an error, status code ${res.status}`);
      }
      const resObjData = await res.json();

      setData(resObjData.data);
    };

    fetchAPI();
  }, []);
  console.log(data);
  // console.log(new Date().getTime());
  // console.log(data);
  return (
    <>
      <div className="bg-slate-800 flex items-center justify-center h-screen">
        <div className="container flex flex-col w-3/5 h-11/12 p-5">
          <Time
            hijriDate={data ? data.date.hijri.date : null}
            gregorianDate={data ? data.date.gregorian.date : null}
            getCurrentTime={getCurrentTime}
          />
          <Remaining
            timings={data ? data.timings : null}
            date={data ? data.date.gregorian.date : null}
            currentTime={time}
          />
          {data ? (
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 mt-2">
              <Prayer
                time={data.timings.Fajr}
                background="morning5.jpg"
                position="top
                "
              >
                الفجر
              </Prayer>
              <Prayer
                time={data.timings.Sunrise}
                background="sunset3.jpg"
                position="top
                "
              >
                الإشراق
              </Prayer>
              <Prayer
                time={data.timings.Dhuhr}
                background="evening5.png"
                position="center"
              >
                {new Date().getDay() == 5 ? "الجمعة" : "الظهر"}
              </Prayer>
              <Prayer
                time={data.timings.Asr}
                background="evening5.jpg"
                position="center"
              >
                العصر
              </Prayer>
              <Prayer
                time={data.timings.Maghrib}
                background="sunset6.jpg"
                position="center"
              >
                المغرب
              </Prayer>
              <Prayer
                time={data.timings.Isha}
                background="night4.jpg"
                position="top"
              >
                العشاء
              </Prayer>
            </div>
          ) : (
            "حدث خطأ ما"
          )}
        </div>
      </div>
    </>
  );
}
