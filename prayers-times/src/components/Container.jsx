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

  console.log(new Date().getTime());
  // console.log(data);
  return (
    <>
      <div className="bg-slate-100 flex items-center justify-center h-screen">
        <div className="container flex flex-col w-11/12 h-11/12 p-5">
          <Card>
            <Time
              hijriDate={data ? data.date.hijri.date : null}
              gregorianDate={data ? data.date.gregorian.date : null}
            />
          </Card>
          <Card>
            <Remaining data={data.timings} />
          </Card>
          <Card>
            <div className="flex flex-col">
              {data ? (
                <>
                  <Prayer time={data.timings.Fajr}>الفجر</Prayer>
                  <Prayer time={data.timings.Dhuhr}>الظهر</Prayer>
                  <Prayer time={data.timings.Asr}>العصر</Prayer>
                  <Prayer time={data.timings.Maghrib}>المغرب</Prayer>
                  <Prayer time={data.timings.Isha}>العشاء</Prayer>
                </>
              ) : (
                "حدث خطأ ما"
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
