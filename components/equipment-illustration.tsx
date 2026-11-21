export function EquipmentIllustration() {
  return (
    <svg
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Illustration of an excavator with tools on a construction site"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8f2ff" />
          <stop offset="1" stopColor="#f3f9ec" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="600" height="310" fill="url(#hero-sky)" />

      {/* Sun */}
      <circle cx="86" cy="72" r="48" fill="#d9f95f" opacity="0.35" />
      <circle cx="86" cy="72" r="32" fill="#d9f95f" />

      {/* Clouds */}
      <g fill="#ffffff" opacity="0.95">
        <ellipse cx="440" cy="70" rx="34" ry="16" />
        <ellipse cx="466" cy="62" rx="22" ry="13" />
        <ellipse cx="416" cy="62" rx="18" ry="11" />
      </g>
      <g fill="#ffffff" opacity="0.85">
        <ellipse cx="252" cy="106" rx="26" ry="12" />
        <ellipse cx="272" cy="99" rx="16" ry="10" />
      </g>

      {/* Distant hill */}
      <path
        d="M0 268 Q110 238 230 264 Q350 288 470 258 Q540 244 600 256 L600 310 L0 310 Z"
        fill="#eaf5dd"
      />

      {/* Ground */}
      <rect y="310" width="600" height="90" fill="#e9e1cd" />
      <rect y="310" width="600" height="6" fill="#d9d0b6" />
      <path
        d="M20 348 H580"
        stroke="#d6ccb0"
        strokeWidth="4"
        strokeDasharray="20 16"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Shadows */}
      <ellipse cx="348" cy="326" rx="116" ry="9" fill="#0f172a" opacity="0.12" />
      <ellipse cx="104" cy="316" rx="52" ry="6" fill="#0f172a" opacity="0.1" />
      <ellipse cx="206" cy="312" rx="40" ry="6" fill="#0f172a" opacity="0.1" />
      <ellipse cx="576" cy="313" rx="24" ry="5" fill="#0f172a" opacity="0.1" />

      {/* Excavator arm */}
      <path
        d="M418 258 L484 198"
        stroke="#facc15"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M484 198 L528 268"
        stroke="#facc15"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <path
        d="M424 246 L468 212"
        stroke="#1f2937"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path d="M516 262 L556 272 L548 306 L512 298 Z" fill="#334155" />
      <path d="M516 262 L556 272 L552 282 L514 273 Z" fill="#475569" />

      {/* Tracks */}
      <rect x="256" y="284" width="176" height="42" rx="21" fill="#2b3440" />
      <rect x="268" y="294" width="152" height="22" rx="11" fill="#4b5569" />
      <g fill="#9ca3af">
        <circle cx="292" cy="305" r="9" />
        <circle cx="330" cy="305" r="9" />
        <circle cx="368" cy="305" r="9" />
        <circle cx="406" cy="305" r="9" />
      </g>
      <g fill="#2b3440">
        <circle cx="292" cy="305" r="3.5" />
        <circle cx="330" cy="305" r="3.5" />
        <circle cx="368" cy="305" r="3.5" />
        <circle cx="406" cy="305" r="3.5" />
      </g>

      {/* Body */}
      <rect x="286" y="240" width="132" height="48" rx="8" fill="#facc15" />
      <rect x="266" y="250" width="34" height="38" rx="7" fill="#eab308" />
      <g fill="#ca8a04">
        <rect x="306" y="254" width="44" height="5" rx="2.5" />
        <rect x="306" y="264" width="44" height="5" rx="2.5" />
      </g>

      {/* Cabin */}
      <rect x="356" y="196" width="52" height="50" rx="6" fill="#eab308" />
      <rect x="363" y="203" width="38" height="30" rx="3" fill="#0f172a" />
      <rect
        x="366"
        y="206"
        width="12"
        height="8"
        rx="2"
        fill="#7dd3fc"
        opacity="0.55"
      />

      {/* Boom pivot */}
      <circle cx="412" cy="258" r="8" fill="#1f2937" />

      {/* Tool case */}
      <rect x="58" y="274" width="92" height="40" rx="4" fill="#103527" />
      <rect x="58" y="286" width="92" height="3" fill="#0b2819" />
      <rect
        x="94"
        y="263"
        width="22"
        height="13"
        rx="5"
        fill="none"
        stroke="#103527"
        strokeWidth="5"
      />
      <rect x="99" y="292" width="14" height="8" rx="2" fill="#d9f95f" />

      {/* Hard hat */}
      <path d="M176 302 a30 28 0 0 1 60 0 z" fill="#facc15" />
      <rect x="166" y="299" width="80" height="9" rx="4.5" fill="#eab308" />
      <rect x="203" y="276" width="6" height="24" rx="3" fill="#eab308" />

      {/* Traffic cone */}
      <rect x="556" y="304" width="40" height="7" rx="3" fill="#ea580c" />
      <path d="M566 306 L586 306 L579 264 L573 264 Z" fill="#f97316" />
      <path d="M571 278 L581 278 L584 292 L568 292 Z" fill="#ffedd5" />
    </svg>
  )
}
