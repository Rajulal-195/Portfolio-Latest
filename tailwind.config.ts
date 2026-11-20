import type { Config } from "tailwindcss";
const v=(n:string)=>`rgb(var(--${n}) / <alpha-value>)`;
export default { darkMode:"class", content:["./src/**/*.{ts,tsx}"], theme:{extend:{
 colors:{bg:v("bg"),bg2:v("bg2"),card:v("card"),copper:v("brand"),copper2:v("brand2"),ink:v("ink"),muted:v("muted")},
 fontFamily:{display:["var(--font-display)","serif"],sans:["var(--font-body)","sans-serif"]}}},plugins:[]} satisfies Config;
