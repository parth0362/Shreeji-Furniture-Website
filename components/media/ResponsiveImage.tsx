"use client";
import Image, { type ImageLoaderProps } from "next/image";
import { imageManifest } from "./image-manifest";

function responsiveLoader({src,width}:ImageLoaderProps){
  const key=src.replace("/images/v2/","").replace(/\.webp$/,"");
  const item=imageManifest[key];
  if(!item)return src;
  const target=item.widths.find(w=>w>=width)??item.widths[item.widths.length-1];
  return `/images/v2/${key}-${target}.webp`;
}
export function ResponsiveImage({file,alt,className="",eager=false,sizes="100vw",focal}:{file:string;alt:string;className?:string;eager?:boolean;sizes?:string;focal?:string}){
  const key=file.replace(/\.webp$/,"");const item=imageManifest[key];
  // Existing assets remain available while the replacement set is being prepared.
  const src=file.startsWith("/")?file:item?`/images/v2/${key}.webp`:`/images/${file}`;
  const responsiveAttributes=item?{srcSet:item.widths.map(w=>`/images/v2/${key}-${w}.webp ${w}w`).join(", ")}:{ };
  return <Image {...responsiveAttributes} loader={item?responsiveLoader:undefined} unoptimized={!item} className={className} src={src} alt={alt} width={item?.width??1600} height={item?.height??1000} sizes={sizes} quality={92} loading={eager?"eager":"lazy"} priority={eager} fetchPriority={eager?"high":"auto"} decoding="async" style={{objectPosition:focal??item?.focal??"50% 50%"}}/>;
}
