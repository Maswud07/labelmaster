import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUpRight, 
  Layers, 
  Eye,
  Award,
  Calendar,
  CalendarDays,
  CalendarRange,
  Clock,
  Search
} from 'lucide-react';
import { EventItem, Labeller } from '../types';

interface DataMonitoringViewProps {
  events: EventItem[];
  labellers: Labeller[];
  onBackToLabelling: () => void;
  onSelectEventForLabelling?: (event: EventItem) => void;
}

export const DataMonitoringView: React.FC<DataMonitoringViewProps> = ({
  events,
  labellers,
  onBackToLabelling
}) => {
  const TODAY_STR = '2026-09-02';

  const [activeTab, setActiveTab] = useState<'all' | 'inflow' | 'labellers'>('all');
  const [labellerSearch, setLabellerSearch] = useState('');

  // 1. TODAY'S DATA CALCULATIONS
  const todayEvents = useMemo(() => {
    return events.filter(e => e.isoTimestamp.startsWith(TODAY_STR));
  }, [events]);

  const todayLabelled = useMemo(() => {
    return todayEvents.filter(e => e.status === 'labelled');
  }, [todayEvents]);

  const todayPending = useMemo(() => {
    return todayEvents.filter(e => e.status === 'pending');
  }, [todayEvents]);

  // Hourly breakdown of today's incoming events (Full 24-Hour Cycle: 00:00 to 23:00)
  const hourlyData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => i); // 0 to 23 hrs
    return hours.map(hr => {
      const hrPrefix = `${TODAY_STR}T${hr.toString().padStart(2, '0')}`;
      const count = todayEvents.filter(e => e.isoTimestamp.startsWith(hrPrefix)).length;
      return {
        hr,
        hour: `${hr}:00`,
        hourLabel: `${hr.toString().padStart(2, '0')}:00`,
        count
      };
    });
  }, [todayEvents]);

  // 2. LABELLER SUBMISSION BREAKDOWN (Today, Weekly, Monthly)
  const sortedLabellers = useMemo(() => {
    return [...labellers].sort((a, b) => b.todaySubmissions - a.todaySubmissions);
  }, [labellers]);

  const filteredLabellerList = useMemo(() => {
    if (!labellerSearch.trim()) return sortedLabellers;
    const q = labellerSearch.toLowerCase();
    return sortedLabellers.filter(
      l => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q)
    );
  }, [sortedLabellers, labellerSearch]);

  // Totals
  const totalTeamToday = useMemo(() => {
    return labellers.reduce((acc, l) => acc + (l.todaySubmissions || 0), 0);
  }, [labellers]);

  const totalTeamWeekly = useMemo(() => {
    return labellers.reduce((acc, l) => acc + (l.weeklySubmissions || 0), 0);
  }, [labellers]);

  const totalTeamMonthly = useMemo(() => {
    return labellers.reduce((acc, l) => acc + (l.monthlySubmissions || 0), 0);
  }, [labellers]);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f3f4f6]">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200/90 px-8 py-5 shadow-xs sticky top-0 z-20">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Data Monitoring & Analytics
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-semibold">
                Live Sync
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Track incoming event ingestion rate, hourly inflow, and labeller team output.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2.5">
            <button
              id="btn-return-labelling"
              onClick={onBackToLabelling}
              className="bg-[#00a86b] hover:bg-[#00925d] text-white px-5 py-2 rounded-md font-medium text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Back to Labelling Screen</span>
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="max-w-[1700px] mx-auto flex items-center gap-2 mt-4 pt-2 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            All Overview
          </button>
          <button
            onClick={() => setActiveTab('inflow')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'inflow'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Today's Inflow</span>
          </button>
          <button
            onClick={() => setActiveTab('labellers')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'labellers'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Labeller Performance</span>
          </button>
        </div>
      </div>

      {/* Main Body Content */}
      <div className="flex-1 px-8 py-6 max-w-[1700px] w-full mx-auto space-y-6">
        
        {/* ========================================================================= */}
        {/* 1. TODAY'S INFLOW SECTION */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'inflow') && (
          <section className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    Today's Incoming Data Stream
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Current Date: 02 September 2026 • Live Telemetry Stream
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="px-2.5 py-1 bg-slate-100 rounded-md font-mono font-medium">
                  Last event: 11:30:49 AM
                </span>
              </div>
            </div>

            {/* Today KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Total Received Today */}
              <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                  <span>Received Today</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {todayEvents.length}
                  </span>
                  <span className="text-xs text-slate-500 block mt-1">
                    events collected today
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" /> +14.8%
                  </span>
                  <span className="text-slate-400">vs yesterday (112)</span>
                </div>
              </div>

              {/* Labelled Today */}
              <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                  <span>Labelled Today</span>
                  <CheckCircle className="w-4 h-4 text-[#00a86b]" />
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-extrabold text-[#00a86b] tracking-tight">
                    {todayLabelled.length}
                  </span>
                  <span className="text-xs text-slate-500 block mt-1">
                    completed by active team
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-600 font-medium">
                    {Math.round((todayLabelled.length / Math.max(1, todayEvents.length)) * 100)}% completion
                  </span>
                  <span className="text-slate-400">Target: 85%</span>
                </div>
              </div>

              {/* Pending In Queue */}
              <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                  <span>Pending in Queue</span>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-extrabold text-amber-600 tracking-tight">
                    {todayPending.length}
                  </span>
                  <span className="text-xs text-slate-500 block mt-1">
                    awaiting review / labelling
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-amber-700 font-medium">Avg wait: 4.2 mins</span>
                  <span className="text-slate-400">High priority: 6</span>
                </div>
              </div>

              {/* Active Fleets Today */}
              <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                  <span>Active Fleets Transmitting</span>
                  <Layers className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    5
                  </span>
                  <span className="text-xs text-slate-500 block mt-1">
                    Tamkeen, Aramco, DHL, Careem, Aramex
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-600 font-medium">100% telemetry online</span>
                  <span className="text-emerald-600 font-semibold">Healthy</span>
                </div>
              </div>
            </div>

            {/* Today Hourly Histogram / 24-Hour Timeline Inflow Chart */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Today's 24-Hour Inflow Distribution
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Shows incoming event telemetry across all 24 hours of today (00:00 to 23:00)
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-mono">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#00a86b]" />
                    Inflow Recorded
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-sm bg-slate-200" />
                    No Events
                  </span>
                  <span className="font-mono text-slate-600 font-semibold border-l border-slate-200 pl-3">
                    Peak: 11:00 (12 events)
                  </span>
                </div>
              </div>

              {/* Visual 24-Hour Bar Chart with scroll support for smaller displays */}
              <div className="overflow-x-auto pb-1">
                <div 
                  className="grid gap-1 sm:gap-1.5 items-end h-36 pt-6 min-w-[780px] w-full"
                  style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}
                >
                  {hourlyData.map(({ hour, hourLabel, count }) => {
                    const maxCount = Math.max(...hourlyData.map(d => d.count), 1);
                    const hasEvents = count > 0;
                    const heightPercent = hasEvents 
                      ? Math.max(16, Math.round((count / maxCount) * 100)) 
                      : 6;

                    return (
                      <div key={hour} className="flex flex-col items-center h-full justify-end group relative">
                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-md pointer-events-none whitespace-nowrap z-20 font-mono">
                          {hourLabel}: {count} event{count === 1 ? '' : 's'}
                        </div>
                        
                        {/* Bar */}
                        <div 
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t transition-all relative flex items-start justify-center pt-1 ${
                            hasEvents
                              ? 'bg-[#00a86b] hover:bg-[#008f5a] shadow-2xs'
                              : 'bg-slate-200 hover:bg-slate-300'
                          }`}
                        >
                          {hasEvents && (
                            <span className="text-[9px] font-mono text-white font-bold leading-none">
                              {count}
                            </span>
                          )}
                        </div>
                        
                        {/* 24-Hour Label */}
                        <span className={`text-[9px] mt-2 font-mono whitespace-nowrap ${
                          hasEvents ? 'text-slate-700 font-semibold' : 'text-slate-400'
                        }`}>
                          {hour}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 2. LABELLER PERFORMANCE SECTION (Today, Weekly, Monthly Submissions) */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'labellers') && (
          <section className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-700" />
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    Labeller Performance & Output
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detailed breakdown of submissions for today, this week, and this month.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">
                  Active team members: <strong className="text-slate-800">{labellers.length}</strong>
                </span>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search labeller..."
                    value={labellerSearch}
                    onChange={(e) => setLabellerSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-[#f8fafc] border border-slate-300 rounded-md focus:ring-1 focus:ring-[#00a86b] w-48"
                  />
                </div>
              </div>
            </div>

            {/* Top 3 Labellers Highlight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {sortedLabellers.slice(0, 3).map((lab, idx) => (
                <div
                  key={lab.id}
                  className={`p-4 rounded-xl border relative overflow-hidden transition-all ${
                    idx === 0 
                      ? 'bg-gradient-to-br from-emerald-50/70 to-white border-emerald-300 shadow-xs' 
                      : 'bg-[#f8fafc] border-slate-200/80'
                  }`}
                >
                  {idx === 0 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <Award className="w-3.5 h-3.5" />
                      #1 Top Labeller
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm ${
                      idx === 0 ? 'bg-[#00a86b] text-white' : 'bg-slate-700 text-white'
                    }`}>
                      {lab.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        {lab.name}
                        {lab.email === 'abdullahalmaswud21@gmail.com' && (
                          <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded font-semibold">You</span>
                        )}
                      </h4>
                      <p className="text-xs text-slate-500 truncate max-w-[180px]">
                        {lab.email}
                      </p>
                    </div>
                  </div>

                  {/* 3 Metric Columns: Today, Weekly, Monthly */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200/60 text-center">
                    <div className="bg-white/80 p-2 rounded-lg border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-500 block uppercase tracking-wider">
                        Today
                      </span>
                      <span className="text-lg font-extrabold text-[#00a86b] mt-0.5 block">
                        {lab.todaySubmissions}
                      </span>
                    </div>
                    <div className="bg-white/80 p-2 rounded-lg border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-500 block uppercase tracking-wider">
                        Weekly
                      </span>
                      <span className="text-lg font-extrabold text-indigo-600 mt-0.5 block">
                        {lab.weeklySubmissions}
                      </span>
                    </div>
                    <div className="bg-white/80 p-2 rounded-lg border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-500 block uppercase tracking-wider">
                        Monthly
                      </span>
                      <span className="text-lg font-extrabold text-slate-900 mt-0.5 block">
                        {lab.monthlySubmissions.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clean Labeller Submissions Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-[#f8fafc] text-[11px] font-semibold text-slate-600 border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Labeller Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4 font-bold text-slate-900">Today's Submission</th>
                    <th className="py-3 px-4 font-bold text-slate-900">Weekly Submission</th>
                    <th className="py-3 px-4 font-bold text-slate-900">Monthly Submission</th>
                    <th className="py-3 px-4 text-right">Avg Speed / Event</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 bg-white">
                  {filteredLabellerList.map((lab) => (
                    <tr key={lab.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {lab.avatar}
                        </span>
                        <span>{lab.name}</span>
                        {lab.email === 'abdullahalmaswud21@gmail.com' && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">YOU</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                        {lab.email}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          {lab.todaySubmissions} events
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-800 font-semibold text-xs">
                          <CalendarDays className="w-3.5 h-3.5 text-indigo-600" />
                          {lab.weeklySubmissions} events
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs">
                          <CalendarRange className="w-3.5 h-3.5 text-slate-600" />
                          {lab.monthlySubmissions.toLocaleString()} events
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-600 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {lab.avgTimeSeconds}s
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Team Total Footer */}
                <tfoot className="bg-[#f8fafc] border-t-2 border-slate-300 text-xs font-bold text-slate-800">
                  <tr>
                    <td className="py-3 px-4 uppercase tracking-wider" colSpan={2}>
                      Total Team Submissions ({labellers.length} Labellers)
                    </td>
                    <td className="py-3 px-4 text-emerald-700">
                      {totalTeamToday} events
                    </td>
                    <td className="py-3 px-4 text-indigo-700">
                      {totalTeamWeekly} events
                    </td>
                    <td className="py-3 px-4 text-slate-900">
                      {totalTeamMonthly.toLocaleString()} events
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-500">
                      Team Avg
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
