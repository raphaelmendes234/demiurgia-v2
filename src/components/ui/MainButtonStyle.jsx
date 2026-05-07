import React from "react";

const MainButtonStyle = ({
  children,
  onClick,
  className = "",
  disabled,
  ...props
}) => {
  const SvgContent = (
    <g className="cls-8">
      {/* Cadre principal */}
      <polygon
        className="cls-2"
        points="1712.36 125.38 1669.74 14.57 921.29 14.57 172.84 14.57 130.23 125.38 73.41 125.38 73.41 447.23 123.13 478.55 172.84 555.13 921.29 555.13 1669.74 555.13 1719.46 478.55 1769.17 447.23 1769.17 125.38 1712.36 125.38"
      />
      <polygon
        className="cls-1"
        points="1694.62 164.05 1648.41 47.93 924.59 47.93 197.91 47.93 157.05 160.86 104.62 160.86 104.62 428.32 152.7 455.85 200.78 523.16 924.59 523.16 1648.41 523.16 1696.48 455.85 1739.26 425.35 1741.47 163.59 1694.62 164.05"
      />

      {/* Gemme Droite et ses reflets */}
      <rect
        className="cls-23"
        x="1721.45"
        y="237.83"
        width="95.44"
        height="95.44"
        transform="translate(316.26 1334.63) rotate(-45)"
      />
      <g>
        <polygon
          className="cls-18"
          points="1768.87 330.17 1724.3 285.07 1769.65 240.74 1814.22 285.85 1768.87 330.17"
        />
        <path
          className="cls-17"
          d="M1797.05,285.69l-28.03,27.41-22.32-22.59-5.23-5.3,28.03-27.39,8.37,8.48,3.54,3.56,15.64,15.83h0Z"
        />
        <polygon
          className="cls-19"
          points="1742.72 285.1 1769.5 258.13 1741.78 285.22 1769.02 312.79 1769.14 312.67 1742.72 285.1"
        />
        <polygon
          className="cls-16"
          points="1769.64 241.22 1769.64 257.95 1741.78 285.22 1724.79 285.07 1769.64 241.22"
        />
        <polygon
          className="cls-15"
          points="1769.02 312.79 1768.88 329.69 1751.16 311.73 1733.77 294.14 1724.8 285.07 1741.77 285.22 1746.28 289.76 1757.42 301.07 1769.02 312.79"
        />
        <path
          className="cls-3"
          d="M1786.42,268.6c-.06,7.31-8.49,13.17-18.81,13.08-10.33-.09-18.65-6.09-18.58-13.4.06-7.31,8.49-13.17,18.81-13.08,10.33.09,18.65,6.09,18.58,13.4Z"
        />
      </g>

      {/* Gemme Gauche et ses reflets */}
      <rect
        className="cls-23"
        x="25.69"
        y="247.91"
        width="95.44"
        height="95.44"
        transform="translate(-187.54 138.5) rotate(-45)"
      />
      <g>
        <polygon
          className="cls-14"
          points="73.12 340.26 28.54 295.16 73.89 250.83 118.47 295.94 73.12 340.26"
        />
        <path
          className="cls-20"
          d="M101.29,295.77l-28.03,27.41-22.32-22.59-5.23-5.3,28.03-27.39,8.37,8.48,3.54,3.56,15.64,15.83h0Z"
        />
        <polygon
          className="cls-19"
          points="46.96 295.19 73.74 268.2 46.02 295.3 73.27 322.89 73.39 322.76 46.96 295.19"
        />
        <polygon
          className="cls-21"
          points="73.89 251.32 73.89 268.04 46.02 295.3 29.04 295.16 73.89 251.32"
        />
        <polygon
          className="cls-22"
          points="73.27 322.89 73.12 339.77 55.4 321.82 38.02 304.23 29.05 295.16 46.02 295.29 50.53 299.85 61.66 311.14 73.27 322.89"
        />
        <path
          className="cls-9"
          d="M90.66,278.69c-.06,7.31-8.49,13.17-18.81,13.08-10.33-.09-18.65-6.09-18.58-13.4.06-7.31,8.49-13.17,18.81-13.08,10.33.09,18.65,6.09,18.58,13.4Z"
        />
      </g>
    </g>
  );

  return (
    <button
      className={`fantasy-btn-container ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <style>{`
            .cls-1 { fill: none; stroke: #9deed1; stroke-width: 7.54px; stroke-miterlimit: 10; }
            .cls-2 { fill: #0f2d29; stroke: #8bcbb2; stroke-width: 29.15px; stroke-miterlimit: 10; }
            .cls-3 { fill: url(#radial-gradient); }
            .cls-3, .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9, .cls-10, .cls-11, .cls-12, .cls-13 { isolation: isolate; mix-blend-mode: screen; }
            .cls-4 { fill: url(#linear-gradient-6); opacity: .5; }
            .cls-5 { fill: url(#linear-gradient-5); opacity: .5; }
            .cls-6 { fill: url(#linear-gradient-7); opacity: .5; }
            .cls-7 { fill: url(#linear-gradient-8); opacity: .35; }
            .cls-14 { fill: url(#linear-gradient-9); }
            .cls-15 { fill: url(#linear-gradient-4); opacity: .5; }
            .cls-16 { fill: url(#linear-gradient-3); opacity: .5; }
            .cls-17 { fill: url(#linear-gradient-2); }
            .cls-18 { fill: url(#linear-gradient); }
            .cls-19 { fill: #fff2c6; }
            .cls-20 { fill: url(#linear-gradient-10); }
            .cls-21 { fill: url(#linear-gradient-11); opacity: .5; }
            .cls-22 { fill: url(#linear-gradient-12); opacity: .5; }
            .cls-23 { fill: #0f2d29; stroke: #8bcbb2; stroke-miterlimit: 10; stroke-width: 8.38px; }
            .cls-9 { fill: url(#radial-gradient-2); }
            .cls-10 { fill: url(#linear-gradient-13); opacity: .5; }
            .cls-11 { fill: url(#linear-gradient-15); opacity: .5; }
            .cls-12 { fill: url(#linear-gradient-14); opacity: .5; }
            .cls-13 { fill: url(#linear-gradient-16); opacity: .35; }
          `}</style>

          {/* TES DÉGRADÉS ORIGINAUX */}
          <linearGradient
            id="linear-gradient"
            x1="936.23"
            y1="368.32"
            x2="1003.56"
            y2="368.32"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#303133" />
            <stop offset=".16" stopColor="#43514c" />
            <stop offset=".42" stopColor="#618172" />
            <stop offset=".64" stopColor="#77a48e" />
            <stop offset=".83" stopColor="#84ba9f" />
            <stop offset=".95" stopColor="#89c2a6" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-2"
            x1="966.64"
            y1="338.1"
            x2="966.64"
            y2="396.57"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#83f8d3" />
            <stop offset=".58" stopColor="#96f9d8" />
            <stop offset="1" stopColor="#9efadb" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-3"
            x1="936.6"
            y1="391.6"
            x2="970.01"
            y2="391.6"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#91fab0" />
            <stop offset="1" stopColor="#6ce9af" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-4"
            x1="936.61"
            y1="345.04"
            x2="969.9"
            y2="345.04"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00c563" />
            <stop offset="1" stopColor="#67ecaa" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-5"
            x1="968.91"
            y1="331.34"
            x2="969.9"
            y2="331.34"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#f7dcb1" />
            <stop offset="1" stopColor="#6e5a34" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-6"
            x1="969.34"
            y1="405.61"
            x2="970.01"
            y2="405.61"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#f7dcb1" />
            <stop offset="1" stopColor="#6e5a34" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-7"
            x1="936.6"
            y1="368.74"
            x2="949.95"
            y2="368.74"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#f7dcb1" />
            <stop offset="1" stopColor="#6e5a34" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-8"
            x1="-4842.09"
            y1="-263.51"
            x2="-4801.4"
            y2="-263.51"
            gradientTransform="translate(-4672.22 465.83) rotate(-179.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".55" stopColor="#b8fad8" />
            <stop offset=".99" stopColor="#705c36" />
          </linearGradient>
          <radialGradient
            id="radial-gradient"
            cx="4232.97"
            cy="1191.6"
            fx="4232.97"
            fy="1191.6"
            r="30.06"
            gradientTransform="translate(-869.71 770.23) rotate(.5) scale(.62 -.44)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <linearGradient
            id="linear-gradient-9"
            x1="-333.35"
            y1="342.12"
            x2="-266.02"
            y2="342.12"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#303133" />
            <stop offset=".95" stopColor="#89c2a6" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-10"
            x1="-298.74"
            y1="311.88"
            x2="-298.74"
            y2="370.35"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#83f8d3" />
            <stop offset="1" stopColor="#9efadb" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-11"
            x1="-332.98"
            y1="365.4"
            x2="-299.57"
            y2="365.4"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#91fab0" />
            <stop offset="1" stopColor="#6ce9af" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-12"
            x1="-332.97"
            y1="318.85"
            x2="-299.68"
            y2="318.85"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00c563" />
            <stop offset="1" stopColor="#67ecaa" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-13"
            x1="-300.67"
            y1="305.14"
            x2="-299.68"
            y2="305.14"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#f7dcb1" />
            <stop offset="1" stopColor="#6e5a34" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-14"
            x1="-300.24"
            y1="379.42"
            x2="-299.57"
            y2="379.42"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#f7dcb1" />
            <stop offset="1" stopColor="#6e5a34" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-15"
            x1="-332.98"
            y1="342.54"
            x2="-319.63"
            y2="342.54"
            gradientTransform="translate(470.96 624.04) rotate(.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#f7dcb1" />
            <stop offset="1" stopColor="#6e5a34" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-16"
            x1="-3572.51"
            y1="-237.31"
            x2="-3531.82"
            y2="-237.31"
            gradientTransform="translate(-4672.22 465.83) rotate(-179.5) scale(1.34 -.95)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".55" stopColor="#b8fad8" />
            <stop offset=".99" stopColor="#705c36" />
          </linearGradient>
          <radialGradient
            id="radial-gradient-2"
            cx="1456.28"
            cy="1406.09"
            fx="1456.28"
            fy="1406.09"
            r="30.06"
            gradientTransform="translate(0 571.99) scale(1 -1)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
        </defs>
      </svg>

      <div style={{ cursor: "pointer" }} className="fantasy-btn-wrapper">
        {/* Bord Gauche */}
        <div className="btn-part side-left">
          <svg viewBox="0 14.57 250 540.56" preserveAspectRatio="xMinYMid meet">
            {SvgContent}
          </svg>
        </div>

        {/* Centre Extensible */}
        <div className="btn-part center-fill">
          <svg viewBox="920 14.57 10 540.56" preserveAspectRatio="none">
            {SvgContent}
          </svg>
          <p className="fantasy-btn-text">{children}</p>
        </div>

        {/* Bord Droit */}
        <div className="btn-part side-right">
          <svg
            viewBox="1592 14.57 250 540.56"
            preserveAspectRatio="xMaxYMid meet"
          >
            {SvgContent}
          </svg>
        </div>
      </div>
    </button>
  );
};

export default MainButtonStyle;
