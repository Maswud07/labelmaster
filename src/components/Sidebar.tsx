import React, { useState } from 'react';
import { 
  LayoutGrid, 
  CreditCard, 
  LogOut, 
  BarChart3,
  Copy,
  Check,
  Clock,
  AlertTriangle
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
  onOpenFleetModal
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

  return (
    <aside 
      id="main-sidebar" 
      className="w-72 xl:w-80 bg-[#101423] text-slate-300 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none border-r border-slate-800/80 z-40 overflow-y-auto"
    >
      {/* Top Section */}
      <div className="flex flex-col p-4">
        {/* Logo */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <div className="text-white font-bold text-2xl tracking-tight flex items-center gap-1.5 font-['Plus_Jakarta_Sans']">
              <span>rooya</span>
              <span className="w-2 h-2 rounded-full bg-[#00a86b] inline-block animate-pulse"></span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-medium">
              LabelMaster
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-1.5 mb-4" aria-label="Main Navigation">
          {/* Data Labelling */}
          <button
            id="nav-data-labelling"
            onClick={() => handleTabChange('labelling')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'labelling'
                ? 'bg-[#00a86b] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
            <span>Data Labelling</span>
          </button>

          {/* Data Monitoring */}
          <button
            id="nav-data-monitoring"
            onClick={() => handleTabChange('monitoring')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'monitoring'
                ? 'bg-[#00a86b] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Data Monitoring</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              currentTab === 'monitoring' ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              Today {todayCount}
            </span>
          </button>

          {/* Driver ID */}
          <button
            id="nav-driver-id"
            onClick={() => handleTabChange('driverId')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'driverId'
                ? 'bg-[#00a86b] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            <span>Driver ID</span>
          </button>
        </nav>

        {/* UNIFIED EVENT DETAILS CARD (Single Panel - No duplicate info!) */}
        <div 
          id="sidebar-event-details-card"
          className="bg-[#161c32] border border-slate-800/90 rounded-xl p-3 shadow-inner flex flex-col gap-2.5"
        >
          {/* Header with Index & Change Fleet */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00a86b] animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300">
                Event Details
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-bold">
                #{activeEvent.index}
              </span>
              {onOpenFleetModal && (
                <button
                  type="button"
                  id="btn-sidebar-change-fleet"
                  onClick={onOpenFleetModal}
                  className="text-[10px] font-bold text-[#00a86b] hover:text-emerald-300 hover:underline cursor-pointer"
                  title="Change cloud cluster or fleet"
                >
                  Change
                </button>
              )}
            </div>
          </div>

          {/* 1. Event ID */}
          <div className="bg-[#121628] border border-slate-800/90 rounded-lg p-2 flex items-center justify-between">
            <div className="overflow-hidden pr-1.5">
              <span className="text-[9px] font-semibold text-slate-400 block uppercase tracking-wider">
                Event ID
              </span>
              <span className="text-[11px] font-mono font-bold text-slate-200 truncate block" title={activeEvent.id}>
                {activeEvent.id}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(activeEvent.id, 'id')}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              title="Copy Event ID"
            >
              {copiedField === 'id' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* 2. Detected Event Type */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <div className="overflow-hidden">
              <span className="text-[9px] font-bold text-amber-400 block uppercase tracking-wider">
                Detected Event Type
              </span>
              <span className="text-xs font-bold text-amber-200 block truncate mt-0.5" title={activeEvent.eventType}>
                {activeEvent.eventType}
              </span>
            </div>
          </div>

          {/* 3. Fleet & Cluster */}
          <div className="bg-[#121628] border border-slate-800/90 rounded-lg p-2 flex items-center justify-between">
            <div className="overflow-hidden pr-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                  Fleet / Cluster
                </span>
                {activeEvent.cluster && (
                  <span className={`text-[8px] px-1 py-0.2 rounded font-extrabold uppercase ${
                    activeEvent.cluster === 'Alibaba' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  }`}>
                    {activeEvent.cluster}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-white truncate block">
                {activeEvent.motherFleet ? `${activeEvent.motherFleet} › ${activeEvent.fleetName}` : activeEvent.fleetName}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(activeEvent.motherFleet ? `${activeEvent.motherFleet} - ${activeEvent.fleetName}` : activeEvent.fleetName, 'fleet')}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              title="Copy Fleet"
            >
              {copiedField === 'fleet' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* 4. Timestamp */}
          <div className="bg-[#121628] border border-slate-800/90 rounded-lg p-2 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <div className="overflow-hidden">
              <span className="text-[9px] font-semibold text-slate-400 block uppercase tracking-wider">
                Timestamp
              </span>
              <span className="text-[11px] font-mono font-bold text-slate-200 block truncate" title={activeEvent.timestamp}>
                {activeEvent.timestamp}
              </span>
            </div>
          </div>

          {/* 5. Trip ID */}
          <div className="bg-[#121628] border border-slate-800/90 rounded-lg p-2 flex items-center justify-between">
            <div className="overflow-hidden pr-1.5">
              <span className="text-[9px] font-semibold text-slate-400 block uppercase tracking-wider">
                Trip ID
              </span>
              <span className="text-[10px] font-mono text-slate-300 truncate block" title={activeEvent.tripId}>
                {activeEvent.tripId}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(activeEvent.tripId, 'trip')}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              title="Copy Trip ID"
            >
              {copiedField === 'trip' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* 7. Remaining & Today Stats */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
            <div className="bg-[#101423] border border-slate-700/70 rounded-lg p-2 flex flex-col justify-center">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                Remaining
              </span>
              <span className="text-sm font-black font-mono text-emerald-400">
                {remainingCount.toLocaleString()}
              </span>
            </div>
            <div className="bg-[#101423] border border-slate-800/80 rounded-lg p-2 flex flex-col justify-center text-right">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                Today Done
              </span>
              <span className="text-sm font-black font-mono text-emerald-400">
                {todayCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 pt-0 flex flex-col gap-3">
        {/* User profile */}
        <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0 border border-slate-600">
              A
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-medium text-slate-200 block truncate" title="abdullahalmaswud21@gmail.com">
                abdullah.masw...
              </span>
              <span className="text-[10px] text-slate-400 block">
                Labeller
              </span>
            </div>
          </div>
          <button 
            id="btn-logout"
            className="text-slate-400 hover:text-white p-1 rounded transition-colors" 
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
