import React, { useState, useEffect } from 'react';
import { ChevronDown, CheckCircle2, RotateCcw, Layers } from 'lucide-react';
import { EventItem, RoadOptionsState, DriverOptionsState } from '../types';
import { VideoPlayer } from './VideoPlayer';
import { SquareViolationGrid } from './SquareViolationGrid';
import { FleetSelectionModal } from './FleetSelectionModal';

interface DataLabellingViewProps {
  currentEvent: EventItem;
  remainingCount: number;
  selectedFleet: string;
  onSelectFleet: (fleet: string) => void;
  fleets: string[];
  events: EventItem[];
  onSubmitEvent: () => void;
  onSkipEvent: () => void;
  onRecallEvent?: () => boolean;
  canRecall?: boolean;
  onOpenMonitoring: () => void;
  todayCount: number;
  onOpenFleetModal?: () => void;
}

const defaultRoadOptions: RoadOptionsState = {
  falsePositive: 'N/A',
  speedLimit: 'N/A',
  stopSign: 'N/A',
  tailgating: 'N/A',
  rollover: 'N/A',
  laneDrift: 'N/A',
  collision: 'N/A',
  headlightsOff: 'N/A',
  cameraLensCovered: 'N/A',
  wrongCameraPosition: 'N/A',
  cameraPartiallyObstructed: 'N/A',
  forwardCollisionAlert: 'N/A',
  nearMiss: 'N/A'
};

const defaultDriverOptions: DriverOptionsState = {
  distractedDriving: {
    lookingDown: false,
    lookingAway: false,
    eating: false,
    drinking: false,
    otherObjectInHand: false
  },
  smokingDistracted: 'N/A',
  cellphoneDistracted: 'N/A',
  cameraLensCovered: 'N/A',
  driverSeatbelt: 'Fastened',
  passengerSeatbelt: 'Fastened',
  uniformNonCompliance: 'Wearing',
  wrongCameraPosition: 'N/A',
  cameraPartiallyObstructed: 'N/A',
  driverFatigue: 'N/A'
};

export const DataLabellingView: React.FC<DataLabellingViewProps> = ({
  currentEvent,
  remainingCount,
  selectedFleet,
  onSelectFleet,
  fleets,
  events,
  onSubmitEvent,
  onSkipEvent,
  onRecallEvent,
  canRecall = false,
  onOpenMonitoring,
  todayCount,
  onOpenFleetModal
}) => {
  // Violation state - all start empty (no violation marked by default)
  const [roadOptions, setRoadOptions] = useState<RoadOptionsState>(defaultRoadOptions);
  const [driverOptions, setDriverOptions] = useState<DriverOptionsState>(defaultDriverOptions);

  // Playback speed state (0.5x, 1x, 2x)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Recall timer state: 10s countdown window
  const [recallSeconds, setRecallSeconds] = useState<number>(0);
  const [savedPreviousRoad, setSavedPreviousRoad] = useState<RoadOptionsState | null>(null);
  const [savedPreviousDriver, setSavedPreviousDriver] = useState<DriverOptionsState | null>(null);

  // Toast notifications
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isInternalFleetModalOpen, setIsInternalFleetModalOpen] = useState(false);

  // Reset violation selections whenever event changes
  useEffect(() => {
    setRoadOptions(defaultRoadOptions);
    setDriverOptions(defaultDriverOptions);
  }, [currentEvent.id]);

  // Handle 10-second recall countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (recallSeconds > 0) {
      timer = setInterval(() => {
        setRecallSeconds((prev) => {
          if (prev <= 1) return 0;
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [recallSeconds]);

  const handleOpenFleet = () => {
    if (onOpenFleetModal) {
      onOpenFleetModal();
    } else {
      setIsInternalFleetModalOpen(true);
    }
  };

  const handleSubmit = () => {
    // Save current options for recall restoration
    setSavedPreviousRoad({ ...roadOptions });
    setSavedPreviousDriver({ ...driverOptions });

    onSubmitEvent();
    setRoadOptions(defaultRoadOptions);
    setDriverOptions(defaultDriverOptions);

    // Trigger 10s recall timer
    setRecallSeconds(10);
    setToastMessage('Event submitted! Recall active for 10 seconds.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleSkip = () => {
    setSavedPreviousRoad({ ...roadOptions });
    setSavedPreviousDriver({ ...driverOptions });

    onSkipEvent();
    setRoadOptions(defaultRoadOptions);
    setDriverOptions(defaultDriverOptions);

    // Trigger 10s recall timer
    setRecallSeconds(10);
    setToastMessage('Event skipped. Recall active for 10 seconds.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleRecall = () => {
    if (recallSeconds <= 0 || !onRecallEvent) return;
    const success = onRecallEvent();
    if (success) {
      if (savedPreviousRoad) setRoadOptions(savedPreviousRoad);
      if (savedPreviousDriver) setDriverOptions(savedPreviousDriver);
      setRecallSeconds(0);
      setToastMessage('Recalled previous event!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  return (
    <div className="flex-1 h-full w-full overflow-y-auto flex flex-col bg-[#f1f5f9] p-4 sm:p-5 gap-4">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2.5 border border-emerald-500/50 text-xs font-semibold animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Compact Header Bar */}
        <div className="flex items-center justify-between shrink-0 bg-white border border-slate-200/90 px-4 py-2.5 rounded-xl shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00a86b]" />
              <span className="text-sm font-extrabold text-slate-900 tracking-tight">
                Data Labelling
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200">
                labelmaster.rooya.ai
              </span>
            </div>

            {/* HIGHLY NOTICEABLE REMAINING EVENTS BADGE */}
            <div 
              id="badge-remaining-events"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 shadow-2xs"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-900">
                Remaining:
              </span>
              <span className="text-base font-black font-mono text-emerald-700 tracking-tight leading-none">
                {remainingCount.toLocaleString()}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase">
                events
              </span>
            </div>
          </div>

          {/* Right Fleet Filter Control */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-open-fleet-modal"
              onClick={handleOpenFleet}
              className="flex items-center justify-between gap-2.5 bg-white border border-slate-300 hover:border-slate-400 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 cursor-pointer transition-colors shadow-2xs"
              title="Change Fleet Filter"
            >
              <span className="truncate max-w-[140px]">
                {selectedFleet === 'All' ? 'All Fleets' : selectedFleet}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            </button>

            <button
              id="btn-apply-filter"
              onClick={() => {
                setToastMessage(`Filter active: ${selectedFleet}`);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 1500);
              }}
              className="bg-[#00a86b] hover:bg-[#00925d] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Video Header Row with Centered Playback Speed Control (0.5x, 1x, 2x) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          {/* Road Camera Info */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Road Facing Camera
            </span>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              {currentEvent.currentSpeed} km/h
            </span>
          </div>

          {/* IN THE MIDDLE: Compact Playback Speed Selector (0.5x, 1x, 2x) */}
          <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg p-0.5 shadow-2xs self-center">
            <span className="text-[10px] font-bold text-slate-400 px-1.5 uppercase tracking-wider">
              Speed:
            </span>
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold transition-all cursor-pointer ${
                  playbackSpeed === spd
                    ? 'bg-[#00a86b] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={`Play videos at ${spd}x speed`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Driver Camera Info */}
          <div className="flex items-center gap-2 justify-end">
            <span className="text-xs font-mono font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200">
              Cabin View
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Driver Facing Camera
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
          </div>
        </div>

        {/* Video Players Row: Spacious Widescreen Road Cam & Driver Cam */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          {/* Road Facing Video */}
          <div className="w-full">
            <VideoPlayer
              type="road"
              timestamp={currentEvent.timestamp}
              speed={currentEvent.currentSpeed}
              gps={currentEvent.gps}
              playbackSpeed={playbackSpeed}
            />
          </div>

          {/* Driver Facing Video */}
          <div className="w-full">
            <VideoPlayer
              type="driver"
              timestamp={currentEvent.timestamp}
              speed={currentEvent.currentSpeed}
              gps={currentEvent.gps}
              playbackSpeed={playbackSpeed}
            />
          </div>
        </div>

        {/* Square Box Violation Grids: Directly Under Respective Videos */}
        <div className="w-full">
          <SquareViolationGrid
            roadOptions={roadOptions}
            setRoadOptions={setRoadOptions}
            driverOptions={driverOptions}
            setDriverOptions={setDriverOptions}
          />
        </div>

        {/* Bottom Actions Bar (Recall 10s, Skip, Submit) - Sticky White Bar */}
        <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-xl px-6 py-3 flex items-center justify-end gap-3.5 shadow-lg mt-auto">
          {/* Recall (10s) Button with Colorful Radiant Styling */}
          <button
            type="button"
            id="btn-recall"
            onClick={() => {
              if (recallSeconds > 0) {
                handleRecall();
              } else {
                setToastMessage('Recall is available for 10 seconds right after Submitting or Skipping an event.');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2200);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold transition-all border-2 cursor-pointer ${
              recallSeconds > 0
                ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-purple-300 shadow-md shadow-purple-500/30 ring-2 ring-purple-400/50 scale-105 animate-pulse'
                : 'bg-gradient-to-r from-purple-50 via-indigo-50 to-sky-50 hover:from-purple-100 hover:to-indigo-100 text-indigo-700 border-indigo-300/80 shadow-2xs hover:border-indigo-400'
            }`}
            title={
              recallSeconds > 0
                ? `Click to recall and return to previous video (${recallSeconds}s left)`
                : 'Recall becomes active for 10s after submitting or skipping'
            }
          >
            <RotateCcw className={`w-4 h-4 shrink-0 ${recallSeconds > 0 ? 'text-white animate-spin [animation-duration:4s]' : 'text-indigo-600'}`} />
            <span>
              Recall {recallSeconds > 0 ? `(${recallSeconds}s)` : '(10s)'}
            </span>
            {recallSeconds > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5" />
            )}
          </button>

          {/* Skip Button */}
          <button
            type="button"
            id="btn-skip"
            onClick={handleSkip}
            className="px-6 py-2 rounded-lg text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors cursor-pointer shadow-2xs"
          >
            Skip
          </button>

          {/* Submit Button */}
          <button
            type="button"
            id="btn-submit"
            onClick={handleSubmit}
            className="px-8 py-2 rounded-lg bg-[#00a86b] hover:bg-[#00925d] active:scale-98 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <span>Submit</span>
          </button>
        </div>

      {/* Fleet Selection Modal */}
      <FleetSelectionModal
        isOpen={isInternalFleetModalOpen}
        onClose={() => setIsInternalFleetModalOpen(false)}
        selectedFleet={selectedFleet}
        onSelectFleet={(fleet) => {
          onSelectFleet(fleet);
          setToastMessage(`Switched to fleet: ${fleet}`);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }}
        events={events}
      />
    </div>
  );
};
