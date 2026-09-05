import React from 'react';
import { 
  LayoutGrid, 
  CreditCard, 
  Globe, 
  LogOut, 
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  currentTab: 'labelling' | 'monitoring' | 'driverId';
  onTabChange?: (tab: 'labelling' | 'monitoring' | 'driverId') => void;
  onSelectTab?: (tab: 'labelling' | 'monitoring' | 'driverId') => void;
  cluster?: string;
  fleetName?: string;
  subFleet?: string;
  currentEventType?: string;
  todayCount?: number;
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
  onOpenFleetModal
}) => {
  const handleTabChange = (tab: 'labelling' | 'monitoring' | 'driverId') => {
    if (onTabChange) onTabChange(tab);
    if (onSelectTab) onSelectTab(tab);
  };

  const displayEventType = currentEventType.toLowerCase().includes('cellphone') || currentEventType.toLowerCase().includes('phone')
    ? 'Mobile uses'
    : currentEventType || 'Mobile uses';
  return (
    <aside 
      id="main-sidebar" 
      className="w-64 bg-[#101423] text-slate-300 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none border-r border-slate-800/60 z-40"
    >
      {/* Top Section */}
      <div className="flex flex-col p-5">
        {/* Logo */}
        <div className="flex flex-col mb-7 px-1">
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
        <nav className="flex flex-col gap-1.5" aria-label="Main Navigation">
          {/* Data Labelling */}
          <button
            id="nav-data-labelling"
            onClick={() => handleTabChange('labelling')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
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
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              currentTab === 'monitoring'
                ? 'bg-[#00a86b] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Data Monitoring</span>
            </div>
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${
              currentTab === 'monitoring' ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              Today {todayCount}
            </span>
          </button>

          {/* Driver ID */}
          <button
            id="nav-driver-id"
            onClick={() => handleTabChange('driverId')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              currentTab === 'driverId'
                ? 'bg-[#00a86b] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            <span>Driver ID</span>
          </button>
        </nav>

        {/* Current Event & Active Fleet Hierarchy Card */}
        <div 
          id="sidebar-current-fleet-card"
          className="mt-6 bg-[#181d30] border border-slate-800/90 rounded-xl p-3.5 shadow-inner transition-colors"
        >
          {/* Header with Quick Change */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Stream Target
            </span>
            {onOpenFleetModal && (
              <button
                type="button"
                id="btn-sidebar-change-fleet"
                onClick={onOpenFleetModal}
                className="text-[11px] font-semibold text-[#00a86b] hover:text-emerald-400 hover:underline cursor-pointer"
                title="Change cloud cluster or fleet"
              >
                Change
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {/* 1. Cloud Provider / Cluster */}
            <div>
              <span className="text-[11px] font-medium text-slate-400 block tracking-wide">
                Cluster
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${
                  cluster === 'Alibaba' ? 'bg-orange-500' : cluster === 'AWS' ? 'bg-amber-400' : 'bg-emerald-400'
                }`} />
                <p className="text-sm font-semibold text-white truncate">
                  {cluster}
                </p>
              </div>
            </div>

            {/* 2. Fleet Name */}
            <div>
              <span className="text-[11px] font-medium text-slate-400 block tracking-wide">
                Fleet Name
              </span>
              <p className="text-sm font-semibold text-white mt-0.5 truncate">
                {fleetName}
              </p>
            </div>

            {/* 3. Sub Fleet */}
            <div>
              <span className="text-[11px] font-medium text-slate-400 block tracking-wide">
                Sub Fleet
              </span>
              <p className="text-sm font-semibold text-emerald-400 mt-0.5 truncate">
                {subFleet || '—'}
              </p>
            </div>

            {/* 4. Current Event Type */}
            <div>
              <span className="text-[11px] font-medium text-slate-400 block tracking-wide">
                Current Event Type
              </span>
              <p className="text-sm font-semibold text-white mt-0.5 truncate">
                {displayEventType}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-5 pt-0 flex flex-col gap-4">
        {/* Language button */}
        <button 
          id="btn-language"
          className="flex items-center gap-3 text-slate-300 hover:text-white text-sm font-medium px-2 py-1.5 transition-colors"
          title="Change language"
          onClick={() => alert("Current language: English (US). Switchable to Arabic / Bengali.")}
        >
          <Globe className="w-4 h-4 text-slate-400" />
          <span>Language</span>
        </button>

        {/* User profile */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0 border border-slate-600">
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
            className="text-slate-400 hover:text-white p-1.5 rounded transition-colors" 
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
