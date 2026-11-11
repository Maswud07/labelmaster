import React, { useState } from 'react';
import { 
  LayoutGrid, 
  CreditCard, 
  LogOut, 
  BarChart3,
  Copy,
  Check,
  Clock,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { EventItem } from '../types';

interface SidebarProps {
  currentTab: 'labelling' | 'monitoring' | 'driverId';
  onTabChange?: (tab: 'labelling' | 'monitoring' | 'driverId') => void;
  onSelectTab?: (tab: 'labelling' | 'monitoring' | 'driverId') => void;
  cluster?: string;
  fleetName?: string;
  subFleet?: string;
  currentEventType?: string;
  todayCount?: number;
  remainingCount?: number;
  currentEvent?: EventItem;
  onOpenFleetModal?: () => void;
  selectedFleet?: string;
  onApplyFleet?: () => void;
  selectedEventType?: string;
  onSelectEventType?: (eventType: string) => void;
  onApplyEventType?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  onSelectTab,
  cluster = 'Alibaba',
  fleetName = 'Tamkeen',
  subFleet = '—',
  currentEventType = 'Harsh Braking',
  todayCount = 128,
  remainingCount = 9023,
  currentEvent,
  onOpenFleetModal,
  selectedFleet = 'All',
  onApplyFleet,
  selectedEventType = 'All',
  onSelectEventType,
  onApplyEventType
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleTabChange = (tab: 'labelling' | 'monitoring' | 'driverId') => {
    if (onTabChange) onTabChange(tab);
    if (onSelectTab) onSelectTab(tab);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const activeEvent = currentEvent || {
    id: '0d50cef4-c63f-4b78-936a-6d8834cd4120',
    index: 3,
    eventType: currentEventType,
    timestamp: '02-09-2026, 11:30:49',
    isoTimestamp: '2026-09-02T11:30:49',
    fleetName: fleetName,
    cluster: (cluster as any) || 'Alibaba',
    tripId: 'trip_ms_2026-09-02T05_05_07.186Z',
    currentSpeed: 17,
    gps: '24.0780, 38.1014',
    status: 'pending' as const
  };

  const copyAllEventDetails = () => {
    const fleetText = activeEvent.motherFleet 
      ? `${activeEvent.motherFleet} › ${activeEvent.fleetName}` 
      : activeEvent.fleetName;
    const clusterTag = activeEvent.cluster ? ` (${activeEvent.cluster})` : '';
    
    const formattedText = [
      `Current Event Type: ${activeEvent.eventType}`,
      `Current Fleet: ${fleetText}${clusterTag}`,
      `Event ID: #${activeEvent.index} • ${activeEvent.id}`,
      `Time: ${activeEvent.timestamp}`,
      `Trip ID: ${activeEvent.tripId}`,
      activeEvent.currentSpeed !== undefined ? `Speed: ${activeEvent.currentSpeed} km/h` : '',
      activeEvent.gps ? `GPS: ${activeEvent.gps}` : ''
    ].filter(Boolean).join('\n');

    copyToClipboard(formattedText, 'all');
  };

  return (
    <aside 
      id="main-sidebar" 
      className="w-64 xl:w-72 bg-[#212328] text-white flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none border-r border-[#2d3038] z-40 overflow-y-auto font-['Plus_Jakarta_Sans']"
    >
      {/* Top Section */}
      <div className="flex flex-col p-4 xl:p-5">
        {/* Logo: Clean, bold pure white 'rooya' as shown in reference */}
        <div className="mb-5 px-1">
          <div className="text-white font-black text-3xl tracking-tight leading-none font-['Plus_Jakarta_Sans']">
            rooya
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-2 mb-4" aria-label="Main Navigation">
          {/* Data Labelling */}
          <button
            id="nav-data-labelling"
            onClick={() => handleTabChange('labelling')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              currentTab === 'labelling'
                ? 'bg-[#00b074] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <LayoutGrid className="w-5 h-5 shrink-0 stroke-[2.5]" />
            <span className="tracking-tight">Data Labelling</span>
          </button>

          {/* Driver ID */}
          <button
            id="nav-driver-id"
            onClick={() => handleTabChange('driverId')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'driverId'
                ? 'bg-[#00b074] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <CreditCard className="w-5 h-5 shrink-0 stroke-[2]" />
            <span className="tracking-tight">Driver ID</span>
          </button>

          {/* Data Monitoring */}
          <button
            id="nav-data-monitoring"
            onClick={() => handleTabChange('monitoring')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'monitoring'
                ? 'bg-[#00b074] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 shrink-0 stroke-[2]" />
              <span className="tracking-tight">Data Monitoring</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              currentTab === 'monitoring' ? 'bg-white/20 text-white' : 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/30'
            }`}>
              Today {todayCount}
            </span>
          </button>
        </nav>

        {/* FLEET SELECTION & APPLY FILTER */}
        <div className="bg-[#2e3442] rounded-2xl p-3 mb-2.5 flex flex-col gap-2 shadow-sm border border-slate-700/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">
              Fleet Selection
            </span>
            <span className="text-xs font-bold text-emerald-400 font-mono truncate max-w-[120px]">
              {selectedFleet === 'All' ? 'All Fleets' : selectedFleet}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="sidebar-btn-open-fleet"
              onClick={onOpenFleetModal}
              className="flex-1 flex items-center justify-between gap-1.5 bg-[#1f232d] hover:bg-[#252a36] border border-slate-600/70 rounded-xl px-3 py-2 text-xs font-bold text-white cursor-pointer transition-colors"
              title="Change Fleet Filter"
            >
              <span className="truncate max-w-[130px]">
                {selectedFleet === 'All' ? 'All Fleets' : selectedFleet}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </button>

            <button
              type="button"
              id="sidebar-btn-apply-fleet"
              onClick={onApplyFleet}
              className="bg-[#00b074] hover:bg-[#009b66] active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shadow-sm cursor-pointer shrink-0"
              title="Apply Fleet Filter"
            >
              Apply
            </button>
          </div>
        </div>

        {/* EVENT TYPE SELECTION & APPLY FILTER (Exact same style as Fleet Selection) */}
        <div className="bg-[#2e3442] rounded-2xl p-3 mb-3 flex flex-col gap-2 shadow-sm border border-slate-700/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">
              Event Type
            </span>
            <span className="text-xs font-bold text-emerald-400 font-mono truncate max-w-[120px]">
              {selectedEventType === 'All' ? 'All Events' : selectedEventType}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <select
                id="sidebar-select-event-type"
                value={selectedEventType}
                onChange={(e) => onSelectEventType?.(e.target.value)}
                className="w-full appearance-none bg-[#1f232d] hover:bg-[#252a36] border border-slate-600/70 rounded-xl px-3 py-2 text-xs font-bold text-white cursor-pointer transition-colors pr-8 focus:outline-none focus:border-emerald-500 truncate"
                title="Filter by Event Type"
              >
                <option value="All" className="bg-[#1f232d] text-white">All Events</option>
                <option value="Harsh Braking" className="bg-[#1f232d] text-white">Harsh Braking</option>
                <option value="Cellphone Distracted Driving" className="bg-[#1f232d] text-white">Cellphone Distracted Driving</option>
                <option value="Speed Limit Violation" className="bg-[#1f232d] text-white">Speed Limit Violation</option>
                <option value="Driver Seatbelt Violation" className="bg-[#1f232d] text-white">Driver Seatbelt Violation</option>
                <option value="Passenger Seatbelt Violation" className="bg-[#1f232d] text-white">Passenger Seatbelt Violation</option>
                <option value="Driver Fatigue" className="bg-[#1f232d] text-white">Driver Fatigue</option>
                <option value="Tailgating" className="bg-[#1f232d] text-white">Tailgating</option>
                <option value="Stop Sign Violation" className="bg-[#1f232d] text-white">Stop Sign Violation</option>
                <option value="Forward Collision Alert" className="bg-[#1f232d] text-white">Forward Collision Alert</option>
                <option value="Lane Drift Found" className="bg-[#1f232d] text-white">Lane Drift Found</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <button
              type="button"
              id="sidebar-btn-apply-event-type"
              onClick={onApplyEventType}
              className="bg-[#00b074] hover:bg-[#009b66] active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shadow-sm cursor-pointer shrink-0"
              title="Apply Event Type Filter"
            >
              Apply
            </button>
          </div>
        </div>

        {/* UNIFIED EVENT DETAILS CARD (Matches exact reference layout & bold high-contrast fonts) */}
        <div 
          id="sidebar-event-details-card"
          className="bg-[#2e3442] rounded-2xl p-4 shadow-sm border border-slate-700/50 flex flex-col gap-3.5"
        >
          {/* Current Event Type & 1-Click Copy All Button */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-300">
                Current Event Type
              </span>
              <button
                type="button"
                id="btn-copy-all-event-details"
                onClick={copyAllEventDetails}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                  copiedField === 'all'
                    ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/50 ring-1 ring-emerald-500/30'
                    : 'bg-[#1f232d] hover:bg-[#252a36] text-slate-300 hover:text-white border-slate-600/70 shadow-2xs'
                }`}
                title="One-click copy: copy all event details (Type, Fleet, ID, Time, Trip ID, GPS) to clipboard"
              >
                {copiedField === 'all' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                    <span className="text-emerald-300 font-extrabold">Copied All!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-300" />
                    <span>Copy All</span>
                  </>
                )}
              </button>
            </div>
            <span className="text-lg font-black text-white tracking-tight block">
              {activeEvent.eventType}
            </span>
          </div>

          {/* Current Fleet */}
          <div>
            <span className="text-xs font-semibold text-slate-300 block mb-1">
              Current Fleet
            </span>
            <div className="flex items-center justify-between gap-1">
              <span className="text-lg font-black text-white tracking-tight block truncate">
                {activeEvent.motherFleet ? `${activeEvent.motherFleet} › ${activeEvent.fleetName}` : activeEvent.fleetName}
              </span>
              {activeEvent.cluster && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase shrink-0 ${
                  activeEvent.cluster === 'Alibaba' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                }`}>
                  {activeEvent.cluster}
                </span>
              )}
            </div>
          </div>

          {/* Metadata Section: ID, Timestamp, Trip */}
          <div className="pt-3 border-t border-slate-700/60 flex flex-col gap-2">
            {/* Event ID with copy */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-xs font-semibold text-slate-300">Event ID</span>
              <div className="flex items-center gap-1.5 overflow-hidden max-w-[160px]">
                <span className="text-xs font-mono font-bold text-white truncate" title={activeEvent.id}>
                  #{activeEvent.index} • {activeEvent.id.slice(0, 12)}...
                </span>
                <button
                  onClick={() => copyToClipboard(activeEvent.id, 'id')}
                  className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer shrink-0"
                  title="Copy Event ID"
                >
                  {copiedField === 'id' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Timestamp */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-xs font-semibold text-slate-300">Time</span>
              <span className="text-xs font-mono font-bold text-white">
                {activeEvent.timestamp}
              </span>
            </div>

            {/* Trip ID */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-xs font-semibold text-slate-300">Trip ID</span>
              <div className="flex items-center gap-1.5 overflow-hidden max-w-[160px]">
                <span className="text-xs font-mono font-medium text-slate-200 truncate" title={activeEvent.tripId}>
                  {activeEvent.tripId.slice(0, 14)}...
                </span>
                <button
                  onClick={() => copyToClipboard(activeEvent.tripId, 'trip')}
                  className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer shrink-0"
                  title="Copy Trip ID"
                >
                  {copiedField === 'trip' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Remaining & Today Stats */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/60">
            <div className="bg-[#1f232d] border border-slate-700/50 rounded-xl p-2.5 flex flex-col justify-center">
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block mb-0.5">
                Remaining
              </span>
              <span className="text-base font-black font-mono text-emerald-400">
                {remainingCount.toLocaleString()}
              </span>
            </div>
            <div className="bg-[#1f232d] border border-slate-700/50 rounded-xl p-2.5 flex flex-col justify-center text-right">
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block mb-0.5">
                Today Done
              </span>
              <span className="text-base font-black font-mono text-emerald-400">
                {todayCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Profile */}
      <div className="p-4 pt-0 flex flex-col gap-3">
        <div className="pt-3 border-t border-[#2d3038] flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#00b074] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
              A
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate" title="abdullahalmaswud21@gmail.com">
                abdullah.masw...
              </span>
              <span className="text-[10px] font-medium text-slate-300 block">
                Labeller
              </span>
            </div>
          </div>
          <button 
            id="btn-logout"
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer" 
            title="Sign out"
            onClick={() => alert("Logged in as abdullahalmaswud21@gmail.com")}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
