import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cloud,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  Building2,
  Layers,
  ArrowLeft,
  Server
} from 'lucide-react';
import { CLUSTERS_CONFIG } from '../mockData';
import { EventItem } from '../types';

interface FleetSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFleet: string;
  onSelectFleet: (fleetName: string) => void;
  events: EventItem[];
}

export const FleetSelectionModal: React.FC<FleetSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedFleet,
  onSelectFleet,
  events
}) => {
  // Active view: 'root' (choose Alibaba or AWS) or specific cluster view
  const [activeCluster, setActiveCluster] = useState<'root' | 'Alibaba' | 'AWS'>('root');
  const [expandedMotherFleets, setExpandedMotherFleets] = useState<Record<string, boolean>>({
    'coca-cola': true
  });

  // Calculate unreviewed (pending) counts dynamically
  const unreviewedCounts = useMemo(() => {
    const counts: Record<string, number> = {
      total: 0,
      Alibaba: 0,
      AWS: 0
    };

    events.forEach((evt) => {
      const isUnreviewed = evt.status === 'pending';
      if (!isUnreviewed) return;

      counts.total = (counts.total || 0) + 1;

      if (evt.cluster) {
        counts[evt.cluster] = (counts[evt.cluster] || 0) + 1;
      }

      counts[evt.fleetName] = (counts[evt.fleetName] || 0) + 1;

      if (evt.motherFleet) {
        counts[evt.motherFleet] = (counts[evt.motherFleet] || 0) + 1;
      }
    });

    return counts;
  }, [events]);

  const toggleMotherFleet = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMotherFleets((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelect = (name: string) => {
    onSelectFleet(name);
    onClose();
  };

  if (!isOpen) return null;

  const currentClusterConfig = CLUSTERS_CONFIG.find((c) => c.id === activeCluster);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-xs">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0" 
          onClick={onClose} 
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 flex flex-col max-h-[85vh]"
          id="fleet-selection-popup"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#00a86b] flex items-center justify-center shrink-0">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  {activeCluster === 'root'
                    ? 'Select Cloud Cluster & Fleet'
                    : `${currentClusterConfig?.displayName || activeCluster} Fleets`}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeCluster === 'root'
                    ? 'Choose Alibaba or AWS to filter incoming fleet streams'
                    : 'Select a specific fleet or sub-fleet to view events'}
                </p>
              </div>
            </div>

            <button
              id="btn-close-fleet-modal"
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* VIEW 1: ROOT CLUSTER & ALL FLEETS SELECTION */}
            {activeCluster === 'root' && (
              <div className="space-y-4">
                {/* All Fleets Stream Card */}
                <div
                  id="fleet-card-all"
                  onClick={() => handleSelect('All')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                    selectedFleet === 'All'
                      ? 'border-[#00a86b] bg-emerald-50/40 ring-1 ring-[#00a86b]/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      selectedFleet === 'All'
                        ? 'bg-[#00a86b] text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/80'
                    }`}>
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          All Fleets
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">
                          (Complete Stream)
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Combined incoming events across Alibaba & AWS
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                      {unreviewedCounts.total || 0} unreviewed
                    </span>
                    {selectedFleet === 'All' ? (
                      <div className="w-5 h-5 rounded-full bg-[#00a86b] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
                    )}
                  </div>
                </div>

                {/* Section Header */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Cloud Providers
                  </span>
                </div>

                {/* Alibaba Card */}
                <div
                  id="btn-select-alibaba-cluster"
                  onClick={() => setActiveCluster('Alibaba')}
                  className="p-4 rounded-xl border border-slate-200/90 hover:border-orange-300 hover:bg-orange-50/30 cursor-pointer transition-all group shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-extrabold text-sm shadow-xs group-hover:scale-102 transition-transform">
                        Ali
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-950 transition-colors">
                            Alibaba Cloud
                          </h3>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                            5 Fleets
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          Coca-Cola, Nova Waters, Sanar, Tamkeen, Aramco
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70 font-mono">
                        {unreviewedCounts.Alibaba || 0} unreviewed
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>

                {/* AWS Card */}
                <div
                  id="btn-select-aws-cluster"
                  onClick={() => setActiveCluster('AWS')}
                  className="p-4 rounded-xl border border-slate-200/90 hover:border-sky-300 hover:bg-sky-50/30 cursor-pointer transition-all group shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-extrabold text-sm shadow-xs group-hover:scale-102 transition-transform">
                        AWS
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                            AWS Cloud
                          </h3>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                            6 Fleets
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          MDC Courier, Happicabs, TOC, DHL, Careem, Aramex
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70 font-mono">
                        {unreviewedCounts.AWS || 0} unreviewed
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: INDIVIDUAL FLEETS IN SELECTED CLUSTER */}
            {activeCluster !== 'root' && (
              <div className="space-y-3">
                {/* Back Link & Cluster Filter Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <button
                    onClick={() => setActiveCluster('root')}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 p-1 -ml-1 rounded transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Providers</span>
                  </button>

                  <button
                    onClick={() => handleSelect(activeCluster)}
                    className="text-xs font-semibold text-[#00a86b] hover:text-[#008f5a] hover:underline cursor-pointer"
                  >
                    Select All {activeCluster} Events
                  </button>
                </div>

                {/* Fleets List */}
                <div className="space-y-2">
                  {currentClusterConfig?.fleets.map((fleet) => {
                    const isMother = fleet.isMotherFleet;
                    const isExpanded = !!expandedMotherFleets[fleet.id];
                    const unreviewed = unreviewedCounts[fleet.name] || 0;
                    const isSelected = selectedFleet === fleet.name;

                    return (
                      <div
                        key={fleet.id}
                        className={`rounded-xl border transition-all overflow-hidden bg-white ${
                          isSelected
                            ? 'border-[#00a86b] ring-1 ring-[#00a86b]/30'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Fleet Row Header */}
                        <div
                          onClick={() => handleSelect(fleet.name)}
                          className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected ? 'bg-emerald-50/40' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                                isMother
                                  ? 'bg-rose-50 text-rose-600 border border-rose-100'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {isMother ? <Layers className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900">
                                  {fleet.name}
                                </span>

                                {isMother && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                                    Mother Fleet
                                  </span>
                                )}
                              </div>

                              <span className="text-xs text-slate-500">
                                {isMother
                                  ? `${fleet.subFleets?.length || 0} sub-fleets configured`
                                  : 'Dedicated fleet stream'}
                              </span>
                            </div>
                          </div>

                          {/* Right side: unreviewed count and expander */}
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-full font-mono ${
                                isMother
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300/80 font-extrabold'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200/70'
                              }`}
                            >
                              {unreviewed} unreviewed
                            </span>

                            {isMother && (
                              <button
                                type="button"
                                onClick={(e) => toggleMotherFleet(fleet.id, e)}
                                className="p-1 rounded-md hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition-colors"
                                title={isExpanded ? 'Collapse sub-fleets' : 'Expand sub-fleets'}
                              >
                                {isExpanded ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </button>
                            )}

                            {isSelected && (
                              <Check className="w-4 h-4 text-[#00a86b] stroke-[2.5]" />
                            )}
                          </div>
                        </div>

                        {/* Sub-fleets Accordion for Mother Fleet (Coca-Cola A, B, C) */}
                        {isMother && isExpanded && fleet.subFleets && (
                          <div className="bg-slate-50/70 border-t border-slate-100 p-2 space-y-1 pl-5">
                            {/* All sub-fleets option */}
                            <div
                              onClick={() => handleSelect(fleet.name)}
                              className={`px-3 py-2 rounded-lg flex items-center justify-between text-xs cursor-pointer transition-colors ${
                                selectedFleet === fleet.name
                                  ? 'bg-emerald-100/70 text-emerald-900 font-bold'
                                  : 'hover:bg-slate-200/60 text-slate-700 font-medium'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                All {fleet.name} Sub-fleets
                              </span>
                              <span className="font-bold text-amber-900 font-mono">
                                {unreviewed} unreviewed
                              </span>
                            </div>

                            {/* Sub-fleet Items */}
                            {fleet.subFleets.map((sub) => {
                              const subCount = unreviewedCounts[sub.name] || 0;
                              const isSubSelected = selectedFleet === sub.name;
                              return (
                                <div
                                  key={sub.id}
                                  onClick={() => handleSelect(sub.name)}
                                  className={`px-3 py-2 rounded-lg flex items-center justify-between text-xs cursor-pointer transition-colors ${
                                    isSubSelected
                                      ? 'bg-emerald-100/70 text-emerald-900 font-bold border border-emerald-300'
                                      : 'hover:bg-slate-200/60 text-slate-700'
                                  }`}
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                    <span>{sub.name}</span>
                                  </span>

                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full text-[11px] font-mono">
                                      {subCount} unreviewed
                                    </span>
                                    {isSubSelected && (
                                      <Check className="w-3.5 h-3.5 text-[#00a86b] stroke-[2.5]" />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span>Active:</span>
              <span className="font-semibold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                {selectedFleet}
              </span>
            </div>
            <button
              id="btn-cancel-fleet-selection"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-colors font-medium cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

