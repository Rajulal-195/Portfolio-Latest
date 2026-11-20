export default function Button({href,children,variant="solid",className="",...p}:{href?:string;children:React.ReactNode;variant?:"solid"|"ghost";className?:string}&React.AnchorHTMLAttributes<HTMLAnchorElement>&React.ButtonHTMLAttributes<HTMLButtonElement>){
  const cls=`btn ${variant==="solid"?"btn-solid":"btn-ghost"} ${className}`;
  return href?<a href={href} className={cls} {...p}>{children}</a>:<button className={cls} {...(p as object)}>{children}</button>;}
