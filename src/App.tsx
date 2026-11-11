import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DataLabellingView } from './components/DataLabellingView';
import { DataMonitoringView } from './components/DataMonitoringView';
import { FleetSelectionModal } from './components/FleetSelectionModal';
import { INITIAL_EVENTS, INITIAL_LABELLERS, FLEETS } from './mockData';
import { EventItem, Labeller, NavigationTab } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('labelling');
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [labellers, setLabellers] = useState<Labeller[]>(INITIAL_LABELLERS);
  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
  const [remainingCount, setRemainingCount] = useState<number>(9023);
  const [selectedFleet, setSelectedFleet] = useState<string>('All');
  const [selectedEventType, setSelectedEventType] = useState<string>('All');
  const [isFleetModalOpen, setIsFleetModalOpen] = useState<boolean>(false);

  // Filter available events based on selected fleet AND selected event type
  const availableEvents = useMemo(() => {
    const filtered = events.filter((e) => {
      let matchesFleet = true;
      if (selectedFleet !== 'All') {
        if (selectedFleet === 'Alibaba') matchesFleet = e.cluster === 'Alibaba';
        else if (selectedFleet === 'AWS') matchesFleet = e.cluster === 'AWS';
        else if (selectedFleet === 'Coca-Cola') {
          matchesFleet = e.motherFleet === 'Coca-Cola' || e.fleetName.startsWith('Coca-Cola');
        } else {
          matchesFleet = e.fleetName === selectedFleet;
        }
      }

      let matchesEventType = true;
      if (selectedEventType !== 'All') {
        matchesEventType = e.eventType.toLowerCase().includes(selectedEventType.toLowerCase()) ||
          selectedEventType.toLowerCase().includes(e.eventType.toLowerCase());
      }

      return matchesFleet && matchesEventType;
    });

    return filtered.length > 0 ? filtered : events;
  }, [events, selectedFleet, selectedEventType]);

  const handleSelectFleet = (fleet: string) => {
    setSelectedFleet(fleet);
    setCurrentEventIndex(0);
  };

  const handleSelectEventType = (eventType: string) => {
    setSelectedEventType(eventType);
    setCurrentEventIndex(0);
  };

  const currentEvent = availableEvents[currentEventIndex % (availableEvents.length || 1)] || events[0];

  // Resolve hierarchical display for Sidebar and active stream:
  // e.g. Alibaba > Fleet: Coca-Cola > Sub Fleet: Coca-Cola A > Event Type: Mobile uses
  const fleetHierarchy = useMemo(() => {
    // 1. If specific Coca-Cola sub-fleet selected (e.g. Coca-Cola A, Coca-Cola B, Coca-Cola C)
    if (selectedFleet.startsWith('Coca-Cola ')) {
      return {
        cluster: 'Alibaba',
        fleetName: 'Coca-Cola',
        subFleet: selectedFleet,
        currentEventType: currentEvent?.eventType || 'Mobile uses'
      };
    }

    // 2. If Coca-Cola mother fleet selected
    if (selectedFleet === 'Coca-Cola') {
      return {
        cluster: 'Alibaba',
        fleetName: 'Coca-Cola',
        subFleet: currentEvent?.fleetName?.startsWith('Coca-Cola') ? currentEvent.fleetName : 'Coca-Cola A',
        currentEventType: currentEvent?.eventType || 'Mobile uses'
      };
    }

    // 3. Alibaba fleets without sub-fleets
    if (['Nova Waters', 'Sanar', 'Tamkeen', 'Aramco Logistics'].includes(selectedFleet)) {
      return {
        cluster: 'Alibaba',
        fleetName: selectedFleet,
        subFleet: '—',
        currentEventType: currentEvent?.eventType || 'Harsh Braking'
      };
    }

    // 4. AWS fleets
    if (['MDC Courier', 'Happicabs', 'TOC', 'DHL Express', 'Careem Delivery', 'Aramex Saudi'].includes(selectedFleet)) {
      return {
        cluster: 'AWS',
        fleetName: selectedFleet,
        subFleet: '—',
        currentEventType: currentEvent?.eventType || 'Harsh Braking'
      };
    }

    // 5. Cluster selected directly
    if (selectedFleet === 'Alibaba') {
      return {
        cluster: 'Alibaba',
        fleetName: currentEvent?.motherFleet || currentEvent?.fleetName || 'Coca-Cola',
        subFleet: currentEvent?.motherFleet ? currentEvent.fleetName : '—',
        currentEventType: currentEvent?.eventType || 'Mobile uses'
      };
    }

    if (selectedFleet === 'AWS') {
      return {
        cluster: 'AWS',
        fleetName: currentEvent?.motherFleet || currentEvent?.fleetName || 'MDC Courier',
        subFleet: currentEvent?.motherFleet ? currentEvent.fleetName : '—',
        currentEventType: currentEvent?.eventType || 'Harsh Braking'
      };
    }

    // 6. Default / All
    const cluster = currentEvent?.cluster || 'Alibaba';
    const fleetName = currentEvent?.motherFleet || currentEvent?.fleetName || 'Tamkeen';
    const subFleet = currentEvent?.motherFleet ? currentEvent.fleetName : '—';
    const currentEventType = currentEvent?.eventType || 'Harsh Braking';

    return { cluster, fleetName, subFleet, currentEventType };
  }, [selectedFleet, currentEvent]);

  // Calculate remaining unreviewed events for current active fleet
  const unreviewedCountForFleet = availableEvents.filter((e) => e.status === 'pending').length;
  const displayRemaining = selectedFleet === 'All' ? remainingCount : unreviewedCountForFleet;

  // Today count for the badge
  const todayCount = events.filter((e) => e.isoTimestamp.startsWith('2026-09-02')).length;

  // History stack for 10-second Recall feature
  const [eventHistory, setEventHistory] = useState<{
    eventIndex: number;
    eventId: string;
    wasSubmitted: boolean;
  } | null>(null);

  const handleSubmitEvent = () => {
    // Record for recall capability
    setEventHistory({
      eventIndex: currentEventIndex,
      eventId: currentEvent.id,
      wasSubmitted: true
    });

    const updatedEvents = [...events];
    const targetIdx = events.findIndex((e) => e.id === currentEvent.id);
    if (targetIdx !== -1) {
      updatedEvents[targetIdx] = {
        ...updatedEvents[targetIdx],
        status: 'labelled',
        labelledBy: 'Abdullah Al Maswud',
        labelledAt: new Date().toLocaleTimeString()
      };
      setEvents(updatedEvents);
    }

    // Update Abdullah Al Maswud's submission count
    setLabellers((prev) =>
      prev.map((lab) => {
        if (lab.email === 'abdullahalmaswud21@gmail.com') {
          return {
            ...lab,
            todaySubmissions: lab.todaySubmissions + 1,
            weeklySubmissions: lab.weeklySubmissions + 1,
            monthlySubmissions: lab.monthlySubmissions + 1,
            totalSubmissions: (lab.totalSubmissions || 0) + 1,
            lastActive: 'Just now'
          };
        }
        return lab;
      })
    );

    setRemainingCount((prev) => Math.max(0, prev - 1));
    setCurrentEventIndex((prev) => (prev + 1) % (availableEvents.length || 1));
  };

  const handleSkipEvent = () => {
    // Record for recall capability
    setEventHistory({
      eventIndex: currentEventIndex,
      eventId: currentEvent.id,
      wasSubmitted: false
    });

    setCurrentEventIndex((prev) => (prev + 1) % (availableEvents.length || 1));
  };

  const handleRecallEvent = (): boolean => {
    if (!eventHistory) return false;

    if (eventHistory.wasSubmitted) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventHistory.eventId
            ? { ...e, status: 'pending', labelledBy: undefined, labelledAt: undefined }
            : e
        )
      );

      setLabellers((prev) =>
        prev.map((lab) => {
          if (lab.email === 'abdullahalmaswud21@gmail.com') {
            return {
              ...lab,
              todaySubmissions: Math.max(0, lab.todaySubmissions - 1),
              weeklySubmissions: Math.max(0, lab.weeklySubmissions - 1),
              monthlySubmissions: Math.max(0, lab.monthlySubmissions - 1),
              totalSubmissions: Math.max(0, (lab.totalSubmissions || 1) - 1)
            };
          }
          return lab;
        })
      );

      setRemainingCount((prev) => prev + 1);
    }

    setCurrentEventIndex(eventHistory.eventIndex);
    setEventHistory(null);
    return true;
  };

  const handleSelectEventForLabelling = (evt: EventItem) => {
    const idx = availableEvents.findIndex((e) => e.id === evt.id);
    if (idx !== -1) {
      setCurrentEventIndex(idx);
    }
  };

  // Sync browser URL bar to /labelmaster and manage routing
  useEffect(() => {
    // Initial route check from URL path
    const path = window.location.pathname.toLowerCase();
    if (path.includes('monitoring')) {
      setCurrentTab('monitoring');
    } else if (path.includes('driver')) {
      setCurrentTab('driverId');
    }
  }, []);

  useEffect(() => {
    const subRoute = currentTab === 'labelling' 
      ? '' 
      : `/${currentTab === 'driverId' ? 'driver-id' : currentTab}`;
    const targetUrl = `/labelmaster${subRoute}`;
    
    // Explicitly update the browser address bar to show /labelmaster
    if (window.location.pathname !== targetUrl) {
      window.history.replaceState({ tab: currentTab }, '', targetUrl);
    }

    const titlePrefix = currentTab === 'labelling'
      ? 'LabelMaster - Data Labelling'
      : currentTab === 'monitoring'
      ? 'LabelMaster - Data Monitoring'
      : 'LabelMaster - Driver ID';
    document.title = `${titlePrefix} | labelmaster.rooya.ai`;
  }, [currentTab]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('monitoring')) {
        setCurrentTab('monitoring');
      } else if (path.includes('driver')) {
        setCurrentTab('driverId');
      } else {
        setCurrentTab('labelling');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [appToastMessage, setAppToastMessage] = useState<string | null>(null);

  const handleApplyFleet = () => {
    setAppToastMessage(`Filter active: ${selectedFleet}`);
    setTimeout(() => setAppToastMessage(null), 1800);
  };

  const handleApplyEventType = () => {
    setAppToastMessage(`Event filter active: ${selectedEventType === 'All' ? 'All Events' : selectedEventType}`);
    setTimeout(() => setAppToastMessage(null), 1800);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f3f4f6] text-slate-800 font-sans antialiased">
      {/* Toast Notification */}
      {appToastMessage && (
        <div className="fixed top-4 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2.5 border border-emerald-500/50 text-xs font-semibold animate-in fade-in slide-in-from-top-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{appToastMessage}</span>
        </div>
      )}

      {/* Single Unified Sidebar with Event Details */}
      <Sidebar 
        currentTab={currentTab} 
        onSelectTab={setCurrentTab}
        cluster={fleetHierarchy.cluster}
        fleetName={fleetHierarchy.fleetName}
        subFleet={fleetHierarchy.subFleet}
        currentEventType={fleetHierarchy.currentEventType}
        todayCount={todayCount}
        remainingCount={displayRemaining}
        currentEvent={currentEvent}
        onOpenFleetModal={() => setIsFleetModalOpen(true)}
        selectedFleet={selectedFleet}
        onApplyFleet={handleApplyFleet}
        selectedEventType={selectedEventType}
        onSelectEventType={handleSelectEventType}
        onApplyEventType={handleApplyEventType}
      />

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-hidden flex flex-col">
        {currentTab === 'labelling' && (
          <DataLabellingView
            currentEvent={currentEvent}
            remainingCount={displayRemaining}
            selectedFleet={selectedFleet}
            onSelectFleet={handleSelectFleet}
            fleets={FLEETS}
            events={events}
            onSubmitEvent={handleSubmitEvent}
            onSkipEvent={handleSkipEvent}
            onRecallEvent={handleRecallEvent}
            canRecall={!!eventHistory}
            onOpenMonitoring={() => setCurrentTab('monitoring')}
            todayCount={todayCount}
            onOpenFleetModal={() => setIsFleetModalOpen(true)}
          />
        )}

        {currentTab === 'monitoring' && (
          <DataMonitoringView
            events={events}
            labellers={labellers}
            onBackToLabelling={() => setCurrentTab('labelling')}
            onSelectEventForLabelling={handleSelectEventForLabelling}
          />
        )}

        {/* Fallback for other sidebar tabs to ensure seamless UX */}
        {currentTab !== 'driverId' && currentTab !== 'labelling' && currentTab !== 'monitoring' && (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div className="max-w-md bg-white p-8 rounded-xl border border-slate-200/90 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 capitalize mb-2">
                {currentTab} Section
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                You are currently viewing the {currentTab} directory. Jump back to Data Labelling or explore Data Monitoring.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setCurrentTab('labelling')}
                  className="px-4 py-2 bg-[#00a86b] text-white rounded-md text-sm font-medium hover:bg-[#00925d] transition-colors"
                >
                  Go to Data Labelling
                </button>
                <button
                  onClick={() => setCurrentTab('monitoring')}
                  className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  View Monitoring Data
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Hierarchical Fleet Selection Modal */}
      <FleetSelectionModal
        isOpen={isFleetModalOpen}
        onClose={() => setIsFleetModalOpen(false)}
        selectedFleet={selectedFleet}
        onSelectFleet={handleSelectFleet}
        events={events}
      />
    </div>
  );
}
