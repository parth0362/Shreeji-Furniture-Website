"use client";
import { useState } from "react";
import { ResponsiveImage } from "./ResponsiveImage";
import { VideoPlayer } from "./VideoPlayer";
import { Slider } from "@/components/ui/slider";
import { Tabs,TabsList,TabsTrigger,TabsContent } from "@/components/ui/tabs";
import { type ProjectExtraMedia } from "@/app/media-config";
export function ProjectMedia({image,alt,extra}:{image:string;alt:string;extra?:ProjectExtraMedia}){
 const [amount,setAmount]=useState(50);const [photo,setPhoto]=useState(0);const images=[{file:image,alt},...(extra?.images??[])];
 if(!extra)return <ResponsiveImage file={image} alt={alt} sizes="(max-width: 1170px) 94vw, 1100px"/>;
 return <Tabs defaultValue="photos" className="project-media-tabs"><TabsList className="room-tabs"><TabsTrigger value="photos">Images</TabsTrigger>{extra.video&&<TabsTrigger value="video">Video</TabsTrigger>}{extra.beforeAfter&&<TabsTrigger value="comparison">Before / After</TabsTrigger>}</TabsList><TabsContent value="photos"><ResponsiveImage file={images[photo].file} alt={images[photo].alt} sizes="(max-width: 1170px) 94vw, 1100px"/>{images.length>1&&<div className="project-pager"><button onClick={()=>setPhoto((photo-1+images.length)%images.length)}>← Previous image</button><span>{photo+1} / {images.length}</span><button onClick={()=>setPhoto((photo+1)%images.length)}>Next image →</button></div>}</TabsContent>{extra.video&&<TabsContent value="video"><VideoPlayer source={extra.video}/></TabsContent>}{extra.beforeAfter&&<TabsContent value="comparison"><div className="comparison"><ResponsiveImage file={extra.beforeAfter.after} alt={`After: ${extra.beforeAfter.alt}`}/><div className="before-layer" style={{clipPath:`inset(0 ${100-amount}% 0 0)`}}><ResponsiveImage file={extra.beforeAfter.before} alt={`Before: ${extra.beforeAfter.alt}`}/></div><div className="comparison-line" style={{left:`${amount}%`}}><span>〈 〉</span></div><span className="comparison-label left">BEFORE</span><span className="comparison-label right">AFTER</span><Slider className="comparison-slider" value={[amount]} onValueChange={v=>setAmount(v[0])} aria-label="Project before and after comparison"/></div></TabsContent>}</Tabs>
}
