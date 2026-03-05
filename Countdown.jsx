import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2028-02-15T00:00:00");

  const calc = () => {
    const now = new Date();
    const diff = Math.max(0, targetDate - now);

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  };

  const [t, setT] = useState(calc());

  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="countdown ultra">
      <Unit value={t.days} label="DAYS" />
      <Colon />
      <Unit value={t.hours} label="HOURS" />
      <Colon />
      <Unit value={t.mins} label="MINS" />
      <Colon />
      <Unit value={t.secs} label="SECS" />
    </div>
  );
}

function Unit({ value, label }) {
  const str = String(value).padStart(2, "0");

  return (
    <div className="cd-unit">
      <div className="digits-horizontal">
        <Digit n={str[0]} />
        <Digit n={str[1]} />
      </div>

      <div className="cd-label">{label}</div>
    </div>
  );
}

function Digit({ n }) {
  return (
    <div className="digit-window">
      <div key={n} className="digit-wheel">
        {n}
      </div>
    </div>
  );
}

function Colon() {
  return <div className="cd-colon pulse">:</div>;
}