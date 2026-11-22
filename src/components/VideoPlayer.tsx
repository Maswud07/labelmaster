import React, { useState, useEffect } from 'react';
import { Play, Pause, Download } from 'lucide-react';

interface VideoPlayerProps {
  type: 'road' | 'driver';
  timestamp: string;
  speed: number;
  gps: string;
  playbackSpeed?: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  type,
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

  const cabinAnimationClass = isPlaying
    ? playbackSpeed === 2
      ? 'animate-[cabinMotion_1.5s_ease-in-out_infinite]'
      : playbackSpeed === 0.5
        ? 'animate-[cabinMotion_5s_ease-in-out_infinite]'
        : 'animate-[cabinMotion_2.8s_ease-in-out_infinite]'
    : 'scale-[1.03]';

  const roadAnimationClass = isPlaying
    ? playbackSpeed === 2
      ? 'animate-[roadDriveMotion_1.4s_ease-in-out_infinite]'
      : playbackSpeed === 0.5
        ? 'animate-[roadDriveMotion_4.8s_ease-in-out_infinite]'
        : 'animate-[roadDriveMotion_2.6s_ease-in-out_infinite]'
    : 'scale-[1.03]';

  const sweepAnimationClass = isPlaying
    ? playbackSpeed === 2
      ? 'animate-[lightSweep_2.2s_linear_infinite]'
      : playbackSpeed === 0.5
        ? 'animate-[lightSweep_6s_linear_infinite]'
        : 'animate-[lightSweep_3.8s_linear_infinite]'
    : 'opacity-0';

  return (
    <div className="relative w-full h-[280px] sm:h-[310px] xl:h-[340px] 2xl:h-[380px] rounded-xl overflow-hidden bg-[#0a0e17] border border-slate-800 shadow-md group">
      {/* Visual Canvas Representation */}
      {type === 'road' ? (
        /* Road Facing Dashcam Feed */
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-full h-full relative overflow-hidden bg-slate-950 flex items-center justify-center cursor-pointer"
        >
          <img
            src="/assets/aistudio/image_5a3537e1.png"
            alt="Road facing dashcam feed"
            className={`w-full h-full object-cover object-center transition-transform duration-300 select-none ${roadAnimationClass}`}
          />

          {/* Passing windshield light reflection when clip plays */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className={`w-1/3 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent ${sweepAnimationClass}`}
            />
          </div>

          {/* Subtle wide-angle dashcam lens vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_62%,rgba(0,0,0,0.42)_100%)]" />
        </div>
      ) : (
        /* Driver Facing Cabin Dashcam Feed */
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-full h-full relative overflow-hidden bg-slate-950 flex items-center justify-center cursor-pointer"
        >
          <img
            src="/assets/aistudio/image_1fcb7641.png"
            alt="Driver facing cabin camera feed"
            className={`w-full h-full object-cover object-center transition-transform duration-300 select-none ${cabinAnimationClass}`}
          />

          {/* Passing exterior light reflection when clip plays */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className={`w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent ${sweepAnimationClass}`}
            />
          </div>

          {/* Subtle wide-angle dashcam lens vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.45)_100%)]" />
        </div>
      )}

      {/* Center Play/Pause Button - Auto-hides while playing for unobstructed cabin view */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${
          isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        }`}
      >
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="pointer-events-auto w-14 h-14 rounded-full bg-white/85 hover:bg-white backdrop-blur-xs flex items-center justify-center shadow-xl transition-transform transform active:scale-95 group/btn cursor-pointer"
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
          <span className="text-[10px] text-amber-300 font-bold px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-500/30">
            {playbackSpeed}x
          </span>
        </div>
      </div>
    </div>
  );
};
