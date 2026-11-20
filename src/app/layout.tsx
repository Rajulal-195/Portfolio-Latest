import type { Metadata } from "next";
import "@/styles/globals.css";
export const metadata: Metadata = {
  title: "Raju Lal | Full-Stack Developer | MERN & PERN Developer",
  description: "Explore the portfolio of Raju Lal, a Full-Stack Developer specializing in React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, and AI-assisted development.",
  keywords: ["Full-Stack Developer","MERN Stack Developer","PERN Stack Developer","React.js Developer","Next.js Developer","Node.js Developer","Backend API Development","SaaS Application Development","AI-Assisted Development"],
  openGraph: { title: "Raju Lal | Full-Stack Developer", description: "Rooted in Engineering. Growing Through Innovation.", type: "website" },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" suppressHydrationWarning><head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
    <script dangerouslySetInnerHTML={{__html:`try{if(localStorage.theme==='dark')document.documentElement.classList.add('dark')}catch(e){}`}}/></head>
    <body>{children}</body></html>);
}
