import { useEffect, useState } from "react";

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 8;
      if (value >= 100) {
        value = 100;
        clearInterval(interval);
        setTimeout(onFinish, 500);
      }
      setProgress(Math.floor(value));
    }, 100);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="loader">
      <div className="scanlines"></div>
      <div className="loader-center">
      <div className="loader-percent" data-text={`${progress}%`}>
        {progress}%
      </div>
      <div className="loader-bar">
        <div
        className="loader-fill"
        style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="loader-text">
        INITIALIZING SYNFEST PROTOCOLS...
      </div>
      </div>
      {/* bottom disclaimer */}
      <div className="loader-footer">
      <div>| Synfest 2028 |</div>
      <p>
        By proceeding, you acknowledge that this site is a creative experiment.
        All content is for representation purposes only, and the positioning of
        elements is guided by design aesthetics. Visual hierarchy does not imply
        official endorsement, priority, or factual ordering.
      </p>
      <div>Maintained by Asutosh</div>
      </div>
    </div>
  );
}