export interface LogoProps {
  background?: string;
  color?: string;
}

export default function Logo(props: LogoProps) {
  return (
    <>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="1250.000000pt"
        height="1250.000000pt"
        viewBox="0 0 1250.000000 1250.000000"
        preserveAspectRatio="xMidYMid meet"
        style={{
          backgroundColor: props.background,
        }}
      >
        <g
          transform="translate(0.000000,1250.000000) scale(0.100000,-0.100000)"
          fill={props.color || '#000000'}
          stroke="none"
        >
          <path
            d="M0 6245 l0 -6245 6245 0 6245 0 0 6245 0 6245 -6245 0 -6245 0 0
-6245z m6680 3685 c986 -50 1894 -264 2805 -660 66 -29 156 -70 200 -92 98
-49 425 -229 425 -234 0 -2 -241 -306 -536 -676 -375 -471 -541 -672 -553
-670 -9 2 -176 67 -371 144 -475 187 -723 277 -915 333 -291 83 -632 147 -975
181 -202 21 -723 24 -915 6 -430 -41 -800 -111 -950 -181 -148 -70 -196 -132
-203 -268 -5 -100 11 -152 64 -207 42 -44 129 -89 210 -110 129 -33 792 -115
1634 -201 668 -69 989 -112 1341 -181 876 -171 1590 -476 1960 -835 497 -484
651 -1228 402 -1943 -237 -680 -798 -1170 -1683 -1468 -414 -139 -881 -226
-1525 -284 -244 -21 -934 -30 -1187 -15 -720 44 -1373 171 -2033 395 -361 122
-619 236 -1068 472 -144 76 -356 186 -471 246 -115 59 -220 117 -232 129 -31
29 -39 77 -21 121 8 19 108 140 222 269 223 251 550 630 709 822 164 199 171
200 433 44 806 -477 1608 -726 2573 -797 177 -13 722 -13 886 0 180 15 300 33
589 91 196 39 265 57 322 83 90 43 151 99 188 173 27 52 29 68 30 158 0 90 -3
106 -28 157 -52 106 -153 166 -333 199 -182 33 -810 126 -1239 184 -995 135
-1197 166 -1550 236 -689 138 -1303 351 -1690 586 -473 289 -769 703 -861
1206 -22 116 -24 386 -5 512 31 207 116 448 220 630 81 139 158 241 281 369
400 414 920 692 1625 866 667 165 1520 246 2225 210z"
          />
          <path
            d="M6234 7043 c-27 -120 -78 -291 -90 -303 -13 -13 -52 -17 -181 -20
-46 -1 61 -80 108 -80 15 0 31 -4 34 -10 3 -5 -5 -47 -19 -92 -14 -46 -39
-139 -56 -208 -41 -168 -34 -155 -72 -132 -18 11 -50 25 -70 31 -35 12 -37 15
-52 79 -8 37 -20 112 -26 168 l-12 100 32 83 c31 80 32 83 13 103 -26 30 -99
78 -117 78 -22 0 -56 -72 -63 -133 -3 -30 -17 -71 -33 -98 -73 -120 -210 -398
-204 -413 3 -9 9 -16 13 -16 3 0 21 -9 39 -20 l32 -20 -58 -58 c-76 -75 -96
-118 -89 -193 6 -73 55 -168 99 -194 39 -22 136 -44 202 -45 113 0 192 77 226
222 10 44 11 80 3 160 -6 57 -9 106 -6 111 6 10 65 9 82 -2 11 -7 11 -15 3
-40 -6 -17 -16 -75 -22 -130 -10 -85 -10 -107 4 -154 27 -92 73 -126 194 -144
42 -6 44 -5 100 53 31 33 66 72 78 88 l20 30 23 -38 c17 -27 43 -47 100 -76
136 -68 174 -63 289 37 41 36 62 50 59 37 -4 -10 -18 -66 -31 -124 -14 -58
-35 -134 -46 -169 -20 -58 -20 -64 -5 -81 20 -23 112 -63 125 -55 5 3 19 38
30 78 39 135 91 302 100 325 10 22 11 22 38 8 199 -113 302 -61 412 209 51
124 109 318 100 334 -4 8 -1 25 7 40 18 34 8 158 -16 185 -32 37 -153 108
-175 102 -24 -6 -109 -84 -148 -136 -14 -19 -29 -32 -33 -28 -4 4 5 46 20 93
24 74 26 88 14 100 -13 12 -107 65 -116 65 -8 0 -28 -66 -79 -270 -30 -118
-62 -226 -71 -240 -101 -157 -297 -383 -372 -432 -56 -35 -98 -37 -103 -5 -9
65 25 313 46 334 3 3 30 -7 59 -22 l54 -29 32 24 c54 38 139 150 184 240 36
73 42 94 42 149 0 63 -1 64 -45 104 -85 76 -121 97 -162 97 -34 0 -46 -7 -88
-50 -57 -58 -143 -226 -189 -365 -16 -49 -42 -112 -58 -140 -106 -185 -163
-274 -204 -319 l-48 -51 0 75 c-1 41 8 116 18 165 25 118 114 461 143 550 l23
70 100 11 c55 7 108 15 118 19 31 13 15 48 -36 82 l-47 32 -43 -19 c-23 -11
-45 -16 -49 -12 -4 4 -2 25 3 47 45 178 48 195 31 211 -21 21 -89 64 -102 64
-5 0 -12 -12 -16 -27z m524 -515 c-9 -51 -37 -108 -99 -209 -29 -45 -106 -116
-116 -106 -10 10 29 111 80 210 48 93 117 175 136 163 5 -3 4 -29 -1 -58z
m652 -117 c-20 -96 -60 -221 -113 -350 -40 -96 -62 -136 -97 -172 -70 -74
-119 -76 -120 -6 0 15 -7 30 -15 33 -21 8 -19 39 5 83 11 20 30 61 43 91 50
121 179 318 250 382 40 36 42 37 50 16 4 -12 3 -47 -3 -77z m-1676 -77 c9 -51
16 -94 16 -97 0 -3 -23 -10 -50 -16 -28 -6 -65 -18 -81 -27 -17 -8 -33 -13
-35 -11 -5 5 27 82 53 127 7 14 25 49 39 79 14 32 28 51 33 45 5 -5 16 -50 25
-100z m30 -305 c-2 -95 -25 -170 -74 -238 -29 -39 -93 -81 -124 -81 -29 0 -60
79 -61 152 l0 67 58 59 c58 59 172 135 192 129 6 -2 9 -39 9 -88z"
          />
        </g>
      </svg>
    </>
  );
}
