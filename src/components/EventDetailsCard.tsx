import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { EventItem } from '../types';

interface EventDetailsCardProps {
  event: EventItem;
}

export const EventDetailsCard: React.FC<EventDetailsCardProps> = ({ event }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 mb-6 shadow-xs">
      <h2 className="text-sm font-semibold text-slate-900 mb-3.5">
        Event details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Event ID */}
        <div className="md:col-span-8 bg-[#f8fafc] border border-slate-200/60 rounded-lg px-4 py-2.5 flex items-center justify-between hover:bg-slate-100/60 transition-colors">
          <div className="overflow-hidden pr-2">
            <span className="text-[11px] font-medium text-slate-500 block">
              Event ID
            </span>
            <span className="text-sm font-medium text-slate-800 font-mono block truncate">
              {event.id}
            </span>
          </div>
          <button
            onClick={() => copyToClipboard(event.id, 'id')}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded transition-colors shrink-0"
            title="Copy Event ID"
          >
            {copiedField === 'id' ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Event Index */}
        <div className="md:col-span-4 bg-[#f8fafc] border border-slate-200/60 rounded-lg px-4 py-2.5 flex flex-col justify-center">
          <span className="text-[11px] font-medium text-slate-500 block">
            Event Index
          </span>
          <span className="text-sm font-semibold text-slate-800">
            {event.index}
          </span>
        </div>

        {/* Event Type */}
        <div className="md:col-span-4 bg-[#f8fafc] border border-slate-200/60 rounded-lg px-4 py-2.5 flex flex-col justify-center">
          <span className="text-[11px] font-medium text-slate-500 block">
            Event Type
          </span>
          <span className="text-sm font-semibold text-slate-800 truncate" title={event.eventType}>
            {event.eventType === 'Cellphone Distracted Driving' 
              ? 'Cellphone Distracted Driving (Mobile uses)' 
              : event.eventType}
          </span>
        </div>

        {/* Timestamp */}
        <div className="md:col-span-4 bg-[#f8fafc] border border-slate-200/60 rounded-lg px-4 py-2.5 flex flex-col justify-center">
          <span className="text-[11px] font-medium text-slate-500 block">
            Timestamp
          </span>
          <span className="text-sm font-medium text-slate-800 font-mono">
            {event.timestamp}
          </span>
        </div>

        {/* Fleet & Sub-fleet Hierarchy */}
        <div className="md:col-span-4 bg-[#f8fafc] border border-slate-200/60 rounded-lg px-4 py-2.5 flex items-center justify-between">
          <div className="overflow-hidden pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-slate-500 block">
                {event.motherFleet ? 'Mother Fleet / Sub-fleet' : 'Fleet Name'}
              </span>
              {event.cluster && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  event.cluster === 'Alibaba' ? 'bg-orange-100 text-orange-800' : 'bg-sky-100 text-sky-800'
                }`}>
                  {event.cluster}
                </span>
              )}
            </div>
            <span className="text-sm font-semibold text-slate-800 truncate block">
              {event.motherFleet ? `${event.motherFleet} › ${event.fleetName}` : event.fleetName}
            </span>
          </div>
          <button
            onClick={() => copyToClipboard(event.motherFleet ? `${event.motherFleet} - ${event.fleetName}` : event.fleetName, 'fleet')}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded transition-colors shrink-0"
            title="Copy Fleet Name"
          >
            {copiedField === 'fleet' ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Trip ID */}
        <div className="md:col-span-12 bg-[#f8fafc] border border-slate-200/60 rounded-lg px-4 py-2.5 flex items-center justify-between">
          <div className="overflow-hidden pr-2">
            <span className="text-[11px] font-medium text-slate-500 block">
              Trip ID
            </span>
            <span className="text-sm font-medium text-slate-800 font-mono block truncate">
              {event.tripId}
            </span>
          </div>
          <button
            onClick={() => copyToClipboard(event.tripId, 'trip')}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded transition-colors shrink-0"
            title="Copy Trip ID"
          >
            {copiedField === 'trip' ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
