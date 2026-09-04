import React, { useState } from 'react';
import { ChevronDown, BarChart2, CheckCircle2 } from 'lucide-react';
import { EventItem, RoadOptionsState, DriverOptionsState } from '../types';
import { EventDetailsCard } from './EventDetailsCard';
import { VideoPlayer } from './VideoPlayer';
import { RoadOptionsGrid, DriverOptionsGrid } from './EventOptionsGrid';
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
  onOpenMonitoring,
  todayCount,
  onOpenFleetModal
}) => {
  const [roadOptions, setRoadOptions] = useState<RoadOptionsState>(defaultRoadOptions);
  const [driverOptions, setDriverOptions] = useState<DriverOptionsState>(defaultDriverOptions);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isInternalFleetModalOpen, setIsInternalFleetModalOpen] = useState(false);

  const handleOpenFleet = () => {
    if (onOpenFleetModal) {
      onOpenFleetModal();
    } else {
      setIsInternalFleetModalOpen(true);
    }
  };

  const handleSubmit = () => {
    onSubmitEvent();
    setToastMessage('Event submitted successfully! Recorded to Labeller dashboard.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleSkip = () => {
    onSkipEvent();
    setToastMessage('Event skipped. Advanced to next event.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f3f4f6]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-8 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-emerald-500/40 text-sm font-medium animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 px-8 py-6 max-w-[1700px] w-full mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Data Labelling
            </h1>
            <div className="mt-1">
              <span className="text-xs text-slate-500 font-medium block">
                Remaining events
              </span>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {remainingCount.toLocaleString()} events
              </span>
            </div>
          </div>

          {/* Right Fleet Filter & Quick Monitoring CTA */}
          <div className="flex flex-wrap items-end gap-3">
            {/* Quick Monitoring Data Badge Button */}
            <button
              id="btn-quick-monitoring"
              onClick={onOpenMonitoring}
              className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-medium transition-all shadow-2xs"
              title="View incoming data & labeller monitoring statistics"
            >
              <BarChart2 className="w-4 h-4 text-[#00a86b]" />
              <span>Monitoring Data</span>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-1.5 py-0.5 rounded font-bold ml-1">
                Today: {todayCount}
              </span>
            </button>

            {/* Fleet Filter Trigger Box */}
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-slate-500 mb-1 ml-0.5">
                Fleet
              </span>
              <div className="relative">
                <button
                  type="button"
                  id="btn-open-fleet-modal"
                  onClick={handleOpenFleet}
                  className="flex items-center justify-between gap-3 bg-white border border-slate-300 rounded-md px-3.5 py-2 text-sm font-medium text-slate-800 hover:border-[#00a86b] min-w-[210px] shadow-2xs cursor-pointer text-left transition-colors"
                  title="Click to select cloud cluster, mother fleet, or sub-fleet"
                >
                  <span className="truncate max-w-[170px]">
                    {selectedFleet === 'All' ? 'All Fleets' : selectedFleet}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                </button>
              </div>
            </div>

            {/* Apply Filter Button - Matches Screenshot Green */}
            <button
              id="btn-apply-filter"
              onClick={() => {
                setToastMessage(`Filter active for: ${selectedFleet}`);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 1500);
              }}
              className="bg-[#00a86b] hover:bg-[#00925d] active:scale-98 text-white px-5 py-2 rounded-md font-medium text-sm transition-all shadow-2xs cursor-pointer"
            >
              Apply filter
            </button>
          </div>
        </div>

        {/* Event Details Card */}
        <EventDetailsCard event={currentEvent} />

        {/* Sticky Video Players Section (Freezes in place when scrolling, options scroll underneath) */}
        <div className="sticky top-0 z-20 bg-[#f3f4f6] pt-2 pb-3.5 -mx-4 px-4 border-b border-slate-200/90 shadow-2xs transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {/* Left: Road Facing Video */}
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-slate-800 mb-2">
                Road facing
              </h3>
              <VideoPlayer
                type="road"
                timestamp={currentEvent.timestamp}
                speed={currentEvent.currentSpeed}
                gps={currentEvent.gps}
              />
            </div>

            {/* Right: Driver Facing Video */}
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-slate-800 mb-2">
                Driver facing
              </h3>
              <VideoPlayer
                type="driver"
                timestamp={currentEvent.timestamp}
                speed={currentEvent.currentSpeed}
                gps={currentEvent.gps}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Event Options Area (Scrolls cleanly underneath the frozen video players) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 pt-4 pb-24">
          {/* Left Column: Road Options & Speed */}
          <div className="flex flex-col">
            {/* Current Speed box */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-4 mb-4 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-500 block">
                Current Speed
              </span>
              <span className="text-2xl font-bold text-slate-900 tracking-tight block mt-0.5">
                {currentEvent.currentSpeed} km/h
              </span>
            </div>

            <h4 className="text-sm font-semibold text-slate-800 mb-3">
              Event Options
            </h4>

            {/* Road Options */}
            <div className="space-y-3">
              <RoadOptionsGrid
                roadOptions={roadOptions}
                setRoadOptions={setRoadOptions}
              />
            </div>
          </div>

          {/* Right Column: Driver Options */}
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-slate-800 mb-3">
              Event Options
            </h4>

            {/* Driver Options */}
            <div className="space-y-3">
              <DriverOptionsGrid
                driverOptions={driverOptions}
                setDriverOptions={setDriverOptions}
                currentEventType={currentEvent.eventType}
                cluster={currentEvent.cluster}
                fleetName={currentEvent.fleetName || selectedFleet}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Selection Modal (Internal fallback) */}
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

      {/* Sticky Bottom Bar - Matches Screenshot */}
      <footer className="sticky bottom-0 z-30 bg-white border-t border-slate-200/90 px-8 py-3.5 flex items-center justify-end gap-3 shadow-lg">
        <button
          id="btn-skip"
          onClick={handleSkip}
          className="px-6 py-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-medium text-sm transition-colors cursor-pointer"
        >
          Skip
        </button>
        <button
          id="btn-submit"
          onClick={handleSubmit}
          className="px-8 py-2 rounded-md bg-[#00a86b] hover:bg-[#00925d] active:scale-98 text-white font-medium text-sm transition-all shadow-xs cursor-pointer flex items-center gap-2"
        >
          <span>Submit</span>
        </button>
      </footer>
    </div>
  );
};
