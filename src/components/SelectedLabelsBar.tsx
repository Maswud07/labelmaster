import React from 'react';
import {
  Check,
  Trash2,
  X,
  Gauge,
  Waypoints,
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  Octagon,
  AlertTriangle,
  AlertCircle,
  AlertOctagon,
  Moon,
  Cigarette,
  Coffee,
  Shirt,
  Eye,
  EyeOff,
  CameraOff,
  VideoOff,
  RotateCw,
  Car,
  HelpCircle
} from 'lucide-react';
import { RoadOptionsState, DriverOptionsState } from '../types';

export interface SelectedLabelItem {
  id: string;
  category: string;
  value: string;
  theme: 'rose' | 'purple' | 'sky' | 'amber' | 'emerald';
  icon: React.ElementType;
  onDismiss: () => void;
}

interface SelectedLabelsBarProps {
  roadOptions: RoadOptionsState;
  setRoadOptions: React.Dispatch<React.SetStateAction<RoadOptionsState>>;
  driverOptions: DriverOptionsState;
  setDriverOptions: React.Dispatch<React.SetStateAction<DriverOptionsState>>;
  onClearAll: () => void;
  seatbeltTouched?: boolean;
  setSeatbeltTouched?: (touched: boolean) => void;
}

export const SelectedLabelsBar: React.FC<SelectedLabelsBarProps> = ({
  roadOptions,
  setRoadOptions,
  driverOptions,
  setDriverOptions,
  onClearAll,
  seatbeltTouched = true,
  setSeatbeltTouched
}) => {
  // Compute all non-default / actively selected labels
  const selectedItems: SelectedLabelItem[] = [];

  // --- 1. Road Options ---
  if (roadOptions.falsePositive === 'False Positive') {
    selectedItems.push({
      id: 'road-falsePositive',
      category: 'Mathematical Event',
      value: 'False Positive',
      theme: 'amber',
      icon: AlertCircle,
      onDismiss: () => setRoadOptions(prev => ({ ...prev, falsePositive: 'N/A' }))
    });
  }

  if (roadOptions.speedLimit && roadOptions.speedLimit !== 'N/A') {
    selectedItems.push({
      id: 'road-speedLimit',
      category: 'Speed Limit Violation',
      value: `${roadOptions.speedLimit} km/h`,
      theme: 'rose',
      icon: Gauge,
      onDismiss: () => setRoadOptions(prev => ({ ...prev, speedLimit: 'N/A' }))
    });
  }

  if (roadOptions.stopSign === 'Yes') {
    selectedItems.push({
      id: 'road-stopSign',
      category: 'Stop Sign Violation',
      value: 'Stop Sign',
      theme: 'rose',
      icon: Octagon,
      onDismiss: () => setRoadOptions(prev => ({ ...prev, stopSign: 'N/A' }))
    });
  }

  if (roadOptions.tailgating === 'Tailgating') {
    selectedItems.push({
      id: 'road-tailgating',
      category: 'Tailgating Violation',
      value: 'Tailgating',
      theme: 'rose',
      icon: Car,
      onDismiss: () => setRoadOptions(prev => ({ ...prev, tailgating: 'N/A' }))
    });
  }

  if (roadOptions.rollover === 'Roll over') {
    selectedItems.push({
      id: 'road-rollover',
      category: 'Rollover Risk',
      value: 'Roll over',
      theme: 'purple',
      icon: RotateCw,
      onDismiss: () => setRoadOptions(prev => ({ ...prev, rollover: 'N/A' }))
    });
  }

  if (roadOptions.laneDrift === 'Lane Drift') {
    selectedItems.push({
      id: 'road-laneDrift',
      category: 'Lane Drift Found',
      value: 'Lane Drift',
      theme: 'purple',
      icon: Waypoints,
      onDismiss: () => setRoadOptions(prev => ({ ...prev, laneDrift: 'N/A' }))
    });
  }

  if (roadOptions.collision === 'Collision') {
    selectedItems.push({
      id: 'road-collision',
      category: 'Collision Event',
      value: 'Collision',
      theme: 'rose',
      icon: AlertTriangle,
      onDismiss: () => setRoadOptions(prev => ({ ...prev, collision: 'N/A' }))
    });
  }

  if (roadOptions.headlightsOff === 'Headlights Off') {
    selectedItems.push({
      id: 'road-headlightsOff',
      category: 'Lighting Condition',
      value: 'Headlights Off',
      theme: 'amber',
      icon: Moon,
      onDismiss: () => setRoadOptions(prev => ({ ...prev, headlightsOff: 'N/A' }))
    });
  }

  if (roadOptions.cameraLensCovered === 'Covered') {
    selectedItems.push({
      id: 'road-cameraLensCovered',
      category: 'Road Camera Sensor',
      value: 'Lens Covered',
      theme: 'rose',
      icon: CameraOff,
      onDismiss: () => setRoadOptions(prev => ({ ...prev, cameraLensCovered: 'N/A' }))
    });
  }

  if (roadOptions.wrongCameraPosition === 'Wrong Position') {
    selectedItems.push({
      id: 'road-wrongCameraPosition',
      category: 'Road Camera Alignment',
      value: 'Wrong Position',
      theme: 'purple',
      icon: VideoOff,
      onDismiss: () => setRoadOptions(prev => ({ ...prev, wrongCameraPosition: 'N/A' }))
    });
  }

  if (roadOptions.cameraPartiallyObstructed === 'Partially Obstructed') {
    selectedItems.push({
      id: 'road-cameraPartiallyObstructed',
      category: 'Road Camera Obstruction',
      value: 'Partially Obstructed',
      theme: 'amber',
      icon: EyeOff,
      onDismiss: () => setRoadOptions(prev => ({ ...prev, cameraPartiallyObstructed: 'N/A' }))
    });
  }

  if (roadOptions.forwardCollisionAlert === 'Forward Collision Warning') {
    selectedItems.push({
      id: 'road-forwardCollisionAlert',
      category: 'Forward Collision Alert',
      value: 'Collision Warning',
      theme: 'rose',
      icon: AlertOctagon,
      onDismiss: () => setRoadOptions(prev => ({ ...prev, forwardCollisionAlert: 'N/A' }))
    });
  }

  if (roadOptions.nearMiss === 'Near Miss') {
    selectedItems.push({
      id: 'road-nearMiss',
      category: 'Near Miss Event',
      value: 'Near Miss',
      theme: 'rose',
      icon: ShieldAlert,
      onDismiss: () => setRoadOptions(prev => ({ ...prev, nearMiss: 'N/A' }))
    });
  }

  // --- 2. Driver Options ---
  // Checkbox: Distracted driving sub-reasons
  if (driverOptions.distractedDriving.lookingDown) {
    selectedItems.push({
      id: 'driver-lookingDown',
      category: 'Distracted Driving',
      value: 'Looking Down',
      theme: 'amber',
      icon: Eye,
      onDismiss: () =>
        setDriverOptions(prev => ({
          ...prev,
          distractedDriving: { ...prev.distractedDriving, lookingDown: false }
        }))
    });
  }

  if (driverOptions.distractedDriving.lookingAway) {
    selectedItems.push({
      id: 'driver-lookingAway',
      category: 'Distracted Driving',
      value: 'Looking Away',
      theme: 'amber',
      icon: Eye,
      onDismiss: () =>
        setDriverOptions(prev => ({
          ...prev,
          distractedDriving: { ...prev.distractedDriving, lookingAway: false }
        }))
    });
  }

  if (driverOptions.distractedDriving.eating) {
    selectedItems.push({
      id: 'driver-eating',
      category: 'Distracted Driving',
      value: 'Eating',
      theme: 'amber',
      icon: Coffee,
      onDismiss: () =>
        setDriverOptions(prev => ({
          ...prev,
          distractedDriving: { ...prev.distractedDriving, eating: false }
        }))
    });
  }

  if (driverOptions.distractedDriving.drinking) {
    selectedItems.push({
      id: 'driver-drinking',
      category: 'Distracted Driving',
      value: 'Drinking',
      theme: 'amber',
      icon: Coffee,
      onDismiss: () =>
        setDriverOptions(prev => ({
          ...prev,
          distractedDriving: { ...prev.distractedDriving, drinking: false }
        }))
    });
  }

  if (driverOptions.distractedDriving.otherObjectInHand) {
    selectedItems.push({
      id: 'driver-otherObjectInHand',
      category: 'Distracted Driving',
      value: 'Other object in hand',
      theme: 'amber',
      icon: HelpCircle,
      onDismiss: () =>
        setDriverOptions(prev => ({
          ...prev,
          distractedDriving: { ...prev.distractedDriving, otherObjectInHand: false }
        }))
    });
  }

  if (driverOptions.smokingDistracted === 'Smoking') {
    selectedItems.push({
      id: 'driver-smokingDistracted',
      category: 'Smoking Distraction',
      value: 'Smoking',
      theme: 'rose',
      icon: Cigarette,
      onDismiss: () => setDriverOptions(prev => ({ ...prev, smokingDistracted: 'N/A' }))
    });
  }

  if (driverOptions.cellphoneDistracted && driverOptions.cellphoneDistracted !== 'N/A') {
    selectedItems.push({
      id: 'driver-cellphoneDistracted',
      category: 'Distracted Driving',
      value: driverOptions.cellphoneDistracted,
      theme: 'amber',
      icon: Smartphone,
      onDismiss: () => setDriverOptions(prev => ({ ...prev, cellphoneDistracted: 'N/A' }))
    });
  }

  // Driver Seatbelt - when classified or verified
  if (seatbeltTouched) {
    selectedItems.push({
      id: 'driver-seatbelt',
      category: 'Driver Seatbelt',
      value: `Driver Seatbelt: ${driverOptions.driverSeatbelt}`,
      theme: driverOptions.driverSeatbelt === 'No Fastened' ? 'rose' : 'sky',
      icon: driverOptions.driverSeatbelt === 'No Fastened' ? ShieldAlert : ShieldCheck,
      onDismiss: () => {
        if (setSeatbeltTouched) setSeatbeltTouched(false);
      }
    });
  }

  // Passenger Seatbelt (if unfastened or explicitly selected)
  if (driverOptions.passengerSeatbelt === 'No Fastened') {
    selectedItems.push({
      id: 'passenger-seatbelt',
      category: 'Passenger Seatbelt',
      value: 'Passenger Seatbelt: No Fastened',
      theme: 'rose',
      icon: ShieldAlert,
      onDismiss: () => setDriverOptions(prev => ({ ...prev, passengerSeatbelt: 'Fastened' }))
    });
  }

  // Uniform Non-Compliance
  if (driverOptions.uniformNonCompliance === 'Not wearing') {
    selectedItems.push({
      id: 'driver-uniform',
      category: 'Uniform Compliance',
      value: 'Uniform: Not wearing',
      theme: 'rose',
      icon: Shirt,
      onDismiss: () => setDriverOptions(prev => ({ ...prev, uniformNonCompliance: 'Wearing' }))
    });
  }

  // Driver Camera Lens Covered
  if (driverOptions.cameraLensCovered === 'Covered') {
    selectedItems.push({
      id: 'driver-cameraLensCovered',
      category: 'Driver Camera Sensor',
      value: 'Lens Covered',
      theme: 'rose',
      icon: CameraOff,
      onDismiss: () => setDriverOptions(prev => ({ ...prev, cameraLensCovered: 'N/A' }))
    });
  }

  // Driver Wrong Camera Position
  if (driverOptions.wrongCameraPosition === 'Wrong Position') {
    selectedItems.push({
      id: 'driver-wrongCameraPosition',
      category: 'Driver Camera Position',
      value: 'Wrong Position',
      theme: 'purple',
      icon: VideoOff,
      onDismiss: () => setDriverOptions(prev => ({ ...prev, wrongCameraPosition: 'N/A' }))
    });
  }

  // Driver Camera Partially Obstructed
  if (driverOptions.cameraPartiallyObstructed === 'Partially Obstructed') {
    selectedItems.push({
      id: 'driver-cameraPartiallyObstructed',
      category: 'Driver Camera Obstruction',
      value: 'Partially Obstructed',
      theme: 'amber',
      icon: EyeOff,
      onDismiss: () => setDriverOptions(prev => ({ ...prev, cameraPartiallyObstructed: 'N/A' }))
    });
  }

  // Driver Fatigue
  if (driverOptions.driverFatigue === 'Driver Fatigue') {
    selectedItems.push({
      id: 'driver-driverFatigue',
      category: 'Driver Fatigue Alert',
      value: 'Driver Fatigue',
      theme: 'purple',
      icon: EyeOff,
      onDismiss: () => setDriverOptions(prev => ({ ...prev, driverFatigue: 'N/A' }))
    });
  }

  // Compact chip styling helpers matching category color themes
  const getCardThemeClasses = (theme: SelectedLabelItem['theme']) => {
    switch (theme) {
      case 'rose':
        return {
          chip: 'bg-rose-50/90 border-rose-200 text-rose-700 hover:border-rose-300',
          valText: 'text-rose-950',
          closeHover: 'hover:bg-rose-200/70 text-rose-500 hover:text-rose-800'
        };
      case 'purple':
        return {
          chip: 'bg-purple-50/90 border-purple-200 text-purple-700 hover:border-purple-300',
          valText: 'text-purple-950',
          closeHover: 'hover:bg-purple-200/70 text-purple-500 hover:text-purple-800'
        };
      case 'sky':
        return {
          chip: 'bg-sky-50/90 border-sky-200 text-sky-700 hover:border-sky-300',
          valText: 'text-sky-950',
          closeHover: 'hover:bg-sky-200/70 text-sky-500 hover:text-sky-800'
        };
      case 'amber':
        return {
          chip: 'bg-amber-50/90 border-amber-200 text-amber-800 hover:border-amber-300',
          valText: 'text-amber-950',
          closeHover: 'hover:bg-amber-200/70 text-amber-600 hover:text-amber-900'
        };
      case 'emerald':
      default:
        return {
          chip: 'bg-emerald-50/90 border-emerald-200 text-emerald-800 hover:border-emerald-300',
          valText: 'text-emerald-950',
          closeHover: 'hover:bg-emerald-200/70 text-emerald-600 hover:text-emerald-900'
        };
    }
  };

  // When NO options are selected yet: display a very slim, space-saving single row
  if (selectedItems.length === 0) {
    return (
      <div
        id="selected-labels-review-panel"
        className="my-0 bg-white/95 rounded-lg border border-emerald-500/50 shadow-2xs px-3 py-1.5 flex items-center justify-between gap-3 transition-all"
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#00a86b] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold text-slate-800 tracking-tight">
            Selected Labels
          </span>

          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono">
            0 selected
          </span>
        </div>

        <span className="text-[11px] text-slate-400 font-medium truncate">
          Select options below to review them here before submitting
        </span>
      </div>
    );
  }

  // When options ARE selected: display compact chips in a space-efficient container
  return (
    <div
      id="selected-labels-review-panel"
      className="my-0 bg-white rounded-lg border border-emerald-500/80 shadow-2xs overflow-hidden transition-all"
    >
      {/* Slim Header bar */}
      <div className="px-3 py-1.5 flex items-center justify-between border-b border-slate-100 bg-emerald-50/25">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#00a86b] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold text-slate-900 tracking-tight">
            Selected Labels
          </span>

          <span className="text-[11px] font-semibold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-mono">
            {selectedItems.length} selected
          </span>
        </div>

        {/* Clear All Action */}
        <button
          type="button"
          id="btn-clear-all-labels"
          onClick={onClearAll}
          className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded transition-all cursor-pointer active:scale-98 shadow-2xs"
          title="Reset all option selections"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Compact Chips Row */}
      <div className="p-2 flex flex-wrap items-center gap-2 max-h-[110px] overflow-y-auto">
        {selectedItems.map((item) => {
          const themeCls = getCardThemeClasses(item.theme);
          const IconComp = item.icon;

          return (
            <div
              key={item.id}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs shadow-2xs transition-all ${themeCls.chip}`}
            >
              <IconComp className="w-3.5 h-3.5 shrink-0" />
              <span className={`text-xs font-bold leading-none ${themeCls.valText}`}>
                {item.value}
              </span>
              <button
                type="button"
                onClick={item.onDismiss}
                className={`ml-1 p-0.5 rounded-full transition-colors cursor-pointer shrink-0 ${themeCls.closeHover}`}
                title={`Remove ${item.value}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
