import React, { useState, useEffect } from 'react';
import { Play, Pause, Download, Volume2, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  type: 'road' | 'driver';
  timestamp: string;
  speed: number;
  gps: string;
  playbackSpeed?: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  type,
  timestamp,
  speed,
  gps,
  playbackSpeed = 1
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25); // percentage
  const [copiedNotification, setCopiedNotification] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      const step = 1.5 * playbackSpeed;
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + step));
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const handleDownload = () => {
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="relative w-full aspect-[16/9.5] min-h-[250px] sm:min-h-[280px] xl:min-h-[310px] rounded-xl overflow-hidden bg-[#0a0e17] border border-slate-800 shadow-md group">
      {/* Visual Canvas Representation */}
      {type === 'road' ? (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-sky-400/20 via-slate-800 to-slate-950 flex items-center justify-center">
          {/* Road Visual Graphics */}
          <div className="absolute inset-0 opacity-85">
            {/* Sky & Buildings background */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#87a3bf] to-[#c7d5e2]">
              {/* Distant skyline buildings */}
              <div className="absolute bottom-0 inset-x-0 h-24 flex items-end justify-around opacity-40">
                <div className="w-16 h-18 bg-amber-200/60 rounded-t-sm" />
                <div className="w-24 h-22 bg-stone-300/80 rounded-t-sm" />
                <div className="w-14 h-14 bg-amber-100/70 rounded-t-sm" />
                <div className="w-28 h-20 bg-stone-200/80 rounded-t-sm" />
                <div className="w-20 h-16 bg-amber-200/50 rounded-t-sm" />
              </div>
            </div>

            {/* Road Perspective */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#2d3748] overflow-hidden">
              {/* Perspective Road Lines */}
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                {/* Road surface */}
                <polygon points="35,0 65,0 95,100 5,100" fill="#2b313d" />
                {/* Road Curb left */}
                <polygon points="33,0 35,0 5,100 2,100" fill="#cbd5e1" />
                {/* Road Curb right */}
                <polygon points="65,0 67,0 98,100 95,100" fill="#cbd5e1" />
                {/* Center Dashed Lane */}
                <line 
                  x1="50" 
                  y1="0" 
                  x2="50" 
                  y2="100" 
                  stroke="#fbbf24" 
                  strokeWidth="2.5" 
                  strokeDasharray="6,8"
                  className={isPlaying ? "animate-[dash_0.8s_linear_infinite]" : ""}
                />
              </svg>
              {/* Car hood / dashboard in dashcam view */}
              <div className="absolute -bottom-6 inset-x-12 h-14 bg-slate-900 rounded-t-3xl border-t border-slate-700 opacity-90"></div>
            </div>
          </div>
        </div>
      ) : (
        /* Driver Facing Visual */
        <div className="w-full h-full relative overflow-hidden bg-slate-900 flex items-center justify-center">
          {/* Driver Cabin Visual */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2d3748] via-[#1a202c] to-[#0f172a] opacity-95">
            {/* Passenger Van Window & Ceiling */}
            <div className="absolute inset-x-4 top-2 h-1/3 bg-slate-800/80 rounded-t-lg border-b border-slate-700/60 flex items-center justify-around px-8">
              <div className="w-12 h-10 bg-sky-200/20 rounded"></div>
              <div className="w-12 h-10 bg-sky-200/20 rounded"></div>
              <div className="w-12 h-10 bg-sky-200/20 rounded"></div>
            </div>

            {/* Driver Silhouette & Passengers representation */}
            <div className="absolute inset-0 flex items-end justify-center pb-2">
              {/* Driver Seat & Figure */}
              <div className="relative flex flex-col items-center right-4 translate-y-2">
                {/* Driver Head with sunglasses */}
                <div className="w-16 h-18 bg-[#cca17f] rounded-full relative flex items-center justify-center shadow-lg">
                  {/* Hair */}
                  <div className="absolute top-0 inset-x-1 h-6 bg-stone-900 rounded-t-full"></div>
                  {/* Sunglasses */}
                  <div className="absolute top-7 flex gap-1 items-center">
                    <div className="w-5 h-3 bg-black rounded-sm"></div>
                    <div className="w-1 h-0.5 bg-black"></div>
                    <div className="w-5 h-3 bg-black rounded-sm"></div>
                  </div>
                  {/* Beard */}
                  <div className="absolute bottom-1 inset-x-3 h-5 bg-stone-900/80 rounded-b-xl"></div>
                </div>
                {/* Torso / Shirt */}
                <div className="w-28 h-20 bg-sky-700 rounded-t-2xl border-t-2 border-sky-600 flex items-center justify-center text-[10px] text-sky-200 font-bold tracking-wider">
                  TAMKEEN
                </div>
              </div>

              {/* Passengers in background */}
              <div className="absolute left-10 top-16 flex flex-col items-center opacity-60">
                <div className="w-10 h-10 bg-[#e0b08a] rounded-full">
                  <div className="w-full h-4 bg-purple-950 rounded-t-full"></div>
                </div>
                <div className="w-18 h-14 bg-indigo-900 rounded-t-lg"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Center Play/Pause Button - Matches Screenshot Coral/Pink Play Circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="pointer-events-auto w-14 h-14 rounded-full bg-white/85 hover:bg-white backdrop-blur-xs flex items-center justify-center shadow-xl transition-transform transform active:scale-95 group/btn"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-[#ff5c5c] fill-[#ff5c5c]" />
          ) : (
            <Play className="w-6 h-6 text-[#ff5c5c] fill-[#ff5c5c] ml-1" />
          )}
        </button>
      </div>

      {/* Top Right Download Button */}
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleDownload}
          title="Download Event Clip"
          className="w-8 h-8 rounded-md bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors border border-white/10"
        >
          <Download className="w-4 h-4" />
        </button>
        {copiedNotification && (
          <span className="absolute right-0 top-10 text-[10px] bg-slate-900/90 text-emerald-400 px-2 py-1 rounded shadow whitespace-nowrap">
            Clip downloaded
          </span>
        )}
      </div>

      {/* Video Progress Bar */}
      <div 
        className="absolute inset-x-0 bottom-7 h-1 bg-white/20 cursor-pointer group-hover:h-1.5 transition-all"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          setProgress(Math.round((clickX / rect.width) * 100));
        }}
      >
        <div 
          className="h-full bg-[#ff5c5c] transition-all" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Bottom Metadata Overlay Bar - Exact text matching screenshot */}
      <div className="absolute inset-x-0 bottom-0 bg-black/85 text-[11px] font-mono text-slate-300 px-3 py-1 flex items-center justify-between tracking-tight">
        <span>02 Sep 2026 08:30:44 • {speed.toFixed(2)} km/h • {gps}</span>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-[10px] text-emerald-400 uppercase font-semibold">1080p 30fps</span>
          <span className="text-[10px] text-amber-300 font-bold px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-500/30">
            {playbackSpeed}x
          </span>
        </div>
      </div>
    </div>
  );
};
