export type Section={title:string;items:string[]};
export const liveSites:{name:string;url:string;tag:string;desc:string;overview:string;sections:Section[];tech:string[];note?:string}[]=[
{name:"Fit Physique",url:"https://fit-physique-hhjx.onrender.com/",tag:"Fitness & Gym Management App",
 desc:"Gym management platform for member registration, subscription plans, trainers and online payments.",
 overview:"Fit Physique is a full-stack MERN fitness and gym management web application. It replaces manual paperwork with one centralized system where members can register and subscribe online, and gym staff can manage members, plans and trainers from a single dashboard.",
 sections:[
  {title:"Key features",items:["Member registration with secure authentication (JWT)","Subscription plans and subscription management","Trainer management","Online payments powered by Stripe","Centralized management dashboard","Responsive interface for mobile and desktop"]},
  {title:"How it helps",items:["Simplifies subscription handling for the gym","Improves member management through one centralized dashboard"]},
  {title:"Technical highlights",items:["React.js front end with a Node.js and Express.js REST API","MongoDB database for members, plans and trainers","Token-based authentication and protected routes","Stripe integration for secure online payments"]}],
 tech:["React.js","Node.js","Express.js","MongoDB","JWT","Stripe"],note:"Hosted on Render — the first load can take a few seconds to wake up."},
{name:"GoBus",url:"https://gobus-frontend-94bu.onrender.com/",tag:"Bus Booking Platform",
 desc:"Multi-role bus booking platform for customers, bus owners and administrators, with seat selection, payments and dashboards.",
 overview:"GoBus is a multi-role online bus ticket booking platform with three separate experiences: customers who search and book buses, bus owners who manage their fleet and routes, and administrators who oversee the whole platform. It covers the complete journey from searching a bus to a confirmed booking, with real-time protection against double-booking seats.",
 sections:[
  {title:"For customers",items:["Bus search and interactive seat selection","Passenger information form and fare summary","Coupon codes applied at checkout","Payment workflow and booking confirmation","Google OAuth sign-in"]},
  {title:"For bus owners and admins",items:["Owner dashboard with charts and booking insights","Admin dashboard with charts for platform-wide monitoring","Visual seat-layout builder to design a bus's seat map","Role-based experience for customers, owners and admins"]},
  {title:"Booking reliability",items:["Seat locking with a countdown timer while a customer completes payment","409 conflict handling when a seat is taken by someone else","Clear feedback so users can pick another seat instead of failing silently"]},
  {title:"Technical highlights",items:["React.js with TanStack Query for data fetching and caching","Zustand for lightweight global state","React Hook Form with Zod for typed form validation","Mobile-first, accessible UI"]}],
 tech:["React.js","TanStack Query","Zustand","React Hook Form","Zod","Google OAuth"],note:"Hosted on Render — the first load can take a few seconds to wake up."},
{name:"StayMenu",url:"https://staymenu.com/en",tag:"AI-Powered Hospitality Platform",
 desc:"QR digital menu, direct ordering, guest requests and live analytics platform for restaurants, hotels and bars.",
 overview:"StayMenu is an all-in-one hospitality operations platform for restaurants, cafés, hotels and beach bars. Guests scan a QR code and open a branded, multilingual menu in their browser with no app to install, while staff and owners get real-time requests and analytics.",
 sections:[
  {title:"Guest experience",items:["Branded QR digital menu with photos and dietary tags","AI-assisted ordering and personalised recommendations","Available in six languages, including right-to-left support","One-tap waiter calls, room service and guest requests"]},
  {title:"Staff and operations",items:["Real-time staff alerts routed to the right team member","Works on phone, tablet or POS terminal","Live status of each request from received to served"]},
  {title:"Owners and revenue",items:["Commission-free direct online ordering for dine-in, take-away and room service","Live dashboards for revenue, response time and staff load","AI insights that highlight best-selling and under-performing dishes"]},
  {title:"Platform",items:["Multi-location ready with secure, GDPR-ready infrastructure","Launch in a day: upload menu, customise QR codes, start serving"]}],
 tech:["QR Menu","AI Ordering","Multilingual","Analytics","Real-time Alerts"]},
];
