"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { ResponsiveImage } from "./ResponsiveImage";
import { imageManifest } from "./image-manifest";
import { type VideoSource } from "@/app/media-config";

export function VideoPlayer({source,background=false,className=""}:{source:VideoSource;background?:boolean;className?:string}){
 const ref=useRef<HTMLVideoElement>(null);const wrapper=useRef<HTMLDivElement>(null);const reduced=useReducedMotion();
 const [near,setNear]=useState(false);const [desktop,setDesktop]=useState(false);const [saveData,setSaveData]=useState(true);const [started,setStarted]=useState(false);const [playing,setPlaying]=useState(false);const [ready,setReady]=useState(false);const [failed,setFailed]=useState(false);const [pausedByUser,setPausedByUser]=useState(false);
 const mayAutoPlay=background&&desktop&&!saveData&&!reduced&&!pausedByUser;
 const mayLoad=!!(source.mp4||source.webm)&&!failed&&(background?(desktop&&!saveData&&!reduced&&near):started);
 useEffect(()=>{const media=window.matchMedia("(min-width: 761px)");const update=()=>setDesktop(media.matches);update();media.addEventListener("change",update);const connection=(navigator as Navigator&{connection?:{saveData?:boolean;effectiveType?:string}}).connection;setSaveData(!!connection?.saveData||["slow-2g","2g"].includes(connection?.effectiveType??""));return()=>media.removeEventListener("change",update)},[]);
 useEffect(()=>{const node=wrapper.current;if(!node)return;const observe=new IntersectionObserver(([entry])=>setNear(entry.isIntersecting),{rootMargin:background?"0px":"150px"});observe.observe(node);return()=>observe.disconnect()},[background]);
 useEffect(()=>{const video=ref.current;if(!video)return;if(!mayLoad||!near||document.hidden){video.pause();return}if(mayAutoPlay){video.play().catch(()=>setPlaying(false))}},[mayLoad,near,mayAutoPlay,started,background]);
 useEffect(()=>{if(!background&&started&&mayLoad)ref.current?.play().catch(()=>setPlaying(false))},[started,mayLoad,background]);
 useEffect(()=>{const pauseHidden=()=>{if(document.hidden)ref.current?.pause()};document.addEventListener("visibilitychange",pauseHidden);return()=>document.removeEventListener("visibilitychange",pauseHidden)},[]);
 function toggle(){const video=ref.current;if(!video)return;if(video.paused){setPausedByUser(false);video.play().catch(()=>setPlaying(false))}else{setPausedByUser(true);video.pause()}}
 return <div ref={wrapper} className={`video-media ${background?"background-video":"project-video"} ${className}`}>
   <ResponsiveImage file={source.poster} alt={background?"":source.title} className="video-poster" eager={background} sizes={background?"(max-width: 760px) 1500px, 100vw":"(max-width: 760px) 86vw, 1000px"}/>
   {mayLoad&&<video ref={ref} className={`video-element ${ready?"ready":""}`} poster={source.poster.startsWith("/")?source.poster:`/images/${imageManifest[source.poster.replace(/\.webp$/,"")]?"v2/":""}${source.poster}`} muted={background} loop={background} autoPlay={mayAutoPlay} playsInline controls={!background} preload={background?"metadata":"none"} aria-label={source.title} onLoadedData={()=>setReady(true)} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>{setFailed(true);setPlaying(false)}}>
     {source.webm&&<source src={source.webm} type="video/webm"/>}{source.mp4&&<source src={source.mp4} type="video/mp4"/>}
     {source.captions&&<track kind="captions" src={source.captions} srcLang="en" label="English" default/>}
   </video>}
   {!background&&!started&&!failed&&!!(source.mp4||source.webm)&&<button className="video-play" aria-label={`Play ${source.title}`} onClick={()=>setStarted(true)}><Play size={24}/><span>Play video</span></button>}
   {background&&mayLoad&&ready&&<button className="video-pause" aria-label={playing?"Pause background video":"Play background video"} onClick={toggle}>{playing?<Pause size={15}/>:<Play size={15}/>}</button>}
   {failed&&!background&&<p className="video-fallback" role="status">This video is unavailable. Please try again later.</p>}
   {!background&&source.transcript&&<details className="video-transcript"><summary>Video transcript</summary><p>{source.transcript}</p></details>}
 </div>
}
