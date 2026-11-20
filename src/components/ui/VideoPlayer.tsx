"use client";
import { useState } from "react";
export default function VideoPlayer({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const yt = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  if (yt) return (<div className="aspect-video overflow-hidden rounded-xl border-cu mb-6 overflow-hidden"><iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${yt[1]}`} title={`${title} demo video`} loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen/></div>);
  if (/^https:\/\/www\.linkedin\.com\/embed\//.test(src)) return (<div className="aspect-video overflow-hidden rounded-xl border-cu mb-6 overflow-hidden"><iframe className="h-full w-full" src={src} title={`${title} demo video on LinkedIn`} loading="lazy" allowFullScreen/></div>);
  if (failed) return <p className="mb-6 rounded-xl border-cu p-4 text-sm text-muted">Demo video is not available right now.</p>;
  return (<video className="w-full rounded-xl border-cu mb-6 overflow-hidden bg-black" controls preload="metadata" playsInline onError={() => setFailed(true)} aria-label={`${title} demo video`}><source src={src} type="video/mp4"/></video>);
}
