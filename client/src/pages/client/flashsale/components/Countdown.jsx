import React, { useEffect, useState } from "react";

const Countdown = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [duration]);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="flashsale-page__banner-countdown">
      <span className="flashsale-page__banner-countdown--title">
        FLASH SALE KẾT THÚC SAU:
      </span>
      <div className="flashsale-page__banner-countdown--timer-top">
        <div>
          <span>{hours}</span>Giờ
        </div>
        <div>
          <span>{minutes}</span>Phút
        </div>
        <div>
          <span>{seconds}</span>Giây
        </div>
      </div>
    </div>
  );
};

export default Countdown;
