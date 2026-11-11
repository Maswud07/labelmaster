import React from 'react';
import {
  Car,
  Octagon,
  RotateCcw,
  GitCommit,
  AlertOctagon,
  Moon,
  EyeOff,
  Camera,
  Minimize2,
  ShieldAlert,
  Zap,
  Gauge,
  AlertTriangle,
  UserX,
  Smartphone,
  Eye,
  Cigarette,
  Utensils,
  Coffee,
  Hand,
  Shirt,
  Bed,
  Check
} from 'lucide-react';
import { RoadOptionsState, DriverOptionsState } from '../types';

interface SquareViolationGridProps {
  roadOptions: RoadOptionsState;
  setRoadOptions: React.Dispatch<React.SetStateAction<RoadOptionsState>>;
  driverOptions: DriverOptionsState;
  setDriverOptions: React.Dispatch<React.SetStateAction<DriverOptionsState>>;
}

interface TileTheme {
  bg: string;
  border: string;
  text: string;
  icon: string;
  hoverBorder: string;
}

interface ViolationTileProps {
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
  badge?: string;
  theme?: TileTheme;
}

const ViolationTile: React.FC<ViolationTileProps> = ({
  label,
  icon: Icon,
  isActive,
  onClick,
  badge,
  theme
}) => {
  const defaultTheme: TileTheme = {
    bg: 'bg-slate-50/80',
    border: 'border-slate-200',
    text: 'text-slate-800',
    icon: 'text-slate-600',
    hoverBorder: 'hover:border-slate-300'
  };

  const t = theme || defaultTheme;

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={onClick}
        aria-pressed={isActive}
        className={`w-full min-h-[44px] 2xl:min-h-[48px] p-1.5 rounded-lg border-2 text-left flex flex-col justify-between transition-all duration-150 select-none cursor-pointer ${
          isActive
            ? 'bg-red-600 border-red-600 text-white shadow-md ring-2 ring-red-300 scale-[1.01] z-10'
            : `${t.bg} ${t.border} ${t.hoverBorder} ${t.text} shadow-2xs hover:shadow-xs`
        }`}
      >
        <div className="flex items-center justify-between w-full mb-0.5">
          <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : t.icon}`} />
          {isActive ? (
            <span className="w-3.5 h-3.5 rounded-full bg-white/25 flex items-center justify-center text-[9px] font-extrabold text-white shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          ) : badge ? (
            <span className="text-[9px] px-1 py-0.2 rounded bg-white/80 text-slate-700 font-bold border border-slate-200/80">
              {badge}
            </span>
          ) : null}
        </div>
        <span
          className={`text-[11px] font-bold leading-tight block break-words ${
            isActive ? 'text-white font-extrabold' : t.text
          }`}
        >
          {label}
        </span>
      </button>
    </div>
  );
};

export const SquareViolationGrid: React.FC<SquareViolationGridProps> = ({
  roadOptions,
  setRoadOptions,
  driverOptions,
  setDriverOptions
}) => {
  const toggleRoad = (key: keyof RoadOptionsState, activeVal: string) => {
    setRoadOptions(prev => ({
      ...prev,
      [key]: prev[key] === activeVal ? 'N/A' : activeVal
    }));
  };

  const isSpeedActive = roadOptions.speedLimit !== 'N/A';
  const isStopSignActive = roadOptions.stopSign === 'Yes';
  const isTailgatingActive = roadOptions.tailgating === 'Tailgating';
  const isRolloverActive = roadOptions.rollover === 'Roll over';
  const isLaneDriftActive = roadOptions.laneDrift === 'Lane Drift';
  const isCollisionActive = roadOptions.collision === 'Collision';
  const isHeadlightsOffActive = roadOptions.headlightsOff === 'Headlights Off';
  const isForwardCollisionActive = roadOptions.forwardCollisionAlert === 'Forward Collision Warning';
  const isNearMissActive = roadOptions.nearMiss === 'Near Miss';
  const isRoadLensActive = roadOptions.cameraLensCovered === 'Covered';
  const isRoadPosActive = roadOptions.wrongCameraPosition === 'Wrong Position';
  const isRoadObstructedActive = roadOptions.cameraPartiallyObstructed === 'Partially Obstructed';
  const isFalsePositiveActive = roadOptions.falsePositive === 'False Positive';

  const isDriverSeatbeltActive = driverOptions.driverSeatbelt === 'No Fastened';
  const isPassengerSeatbeltActive = driverOptions.passengerSeatbelt === 'No Fastened';
  const isHoldingPhoneActive = driverOptions.cellphoneDistracted === 'Holding Phone';
  const isLookingPhoneActive = driverOptions.cellphoneDistracted === 'Looking at Phone';
  const isTalkingPhoneActive = driverOptions.cellphoneDistracted === 'Talking on Phone';
  const isSmokingActive = driverOptions.smokingDistracted === 'Smoking';
  const isLookingDownActive = driverOptions.distractedDriving.lookingDown;
  const isLookingAwayActive = driverOptions.distractedDriving.lookingAway;
  const isEatingActive = driverOptions.distractedDriving.eating;
  const isDrinkingActive = driverOptions.distractedDriving.drinking;
  const isObjectInHandActive = driverOptions.distractedDriving.otherObjectInHand;
  const isFatigueActive = driverOptions.driverFatigue === 'Driver Fatigue';
  const isNoUniformActive = driverOptions.uniformNonCompliance === 'Not wearing';
  const isDriverLensActive = driverOptions.cameraLensCovered === 'Covered';
  const isDriverPosActive = driverOptions.wrongCameraPosition === 'Wrong Position';
  const isDriverObstructedActive = driverOptions.cameraPartiallyObstructed === 'Partially Obstructed';

  const roadActiveCount = [
    isSpeedActive,
    isStopSignActive,
    isTailgatingActive,
    isRolloverActive,
    isLaneDriftActive,
    isCollisionActive,
    isHeadlightsOffActive,
    isForwardCollisionActive,
    isNearMissActive,
    isRoadLensActive,
    isRoadPosActive,
    isRoadObstructedActive,
    isFalsePositiveActive
  ].filter(Boolean).length;

  const driverActiveCount = [
    isDriverSeatbeltActive,
    isPassengerSeatbeltActive,
    isHoldingPhoneActive,
    isLookingPhoneActive,
    isTalkingPhoneActive,
    isSmokingActive,
    isLookingDownActive,
    isLookingAwayActive,
    isEatingActive,
    isDrinkingActive,
    isObjectInHandActive,
    isFatigueActive,
    isNoUniformActive,
    isDriverLensActive,
    isDriverPosActive,
    isDriverObstructedActive
  ].filter(Boolean).length;

  // Very light color themes for Road Violations
  const roadThemes = {
    collision: { bg: 'bg-rose-50/80', border: 'border-rose-200/90', text: 'text-rose-950', icon: 'text-rose-600', hoverBorder: 'hover:border-rose-300' },
    stopSign: { bg: 'bg-purple-50/80', border: 'border-purple-200/90', text: 'text-purple-950', icon: 'text-purple-600', hoverBorder: 'hover:border-purple-300' },
    tailgating: { bg: 'bg-orange-50/80', border: 'border-orange-200/90', text: 'text-orange-950', icon: 'text-orange-600', hoverBorder: 'hover:border-orange-300' },
    headlightsOff: { bg: 'bg-amber-50/80', border: 'border-amber-200/90', text: 'text-amber-950', icon: 'text-amber-600', hoverBorder: 'hover:border-amber-300' },
    speedLimit: { bg: 'bg-emerald-50/80', border: 'border-emerald-200/90', text: 'text-emerald-950', icon: 'text-emerald-600', hoverBorder: 'hover:border-emerald-300' },
    laneDrift: { bg: 'bg-amber-50/80', border: 'border-amber-200/90', text: 'text-amber-950', icon: 'text-amber-600', hoverBorder: 'hover:border-amber-300' },
    rollover: { bg: 'bg-red-50/80', border: 'border-red-200/90', text: 'text-red-950', icon: 'text-red-600', hoverBorder: 'hover:border-red-300' },
    forwardCollision: { bg: 'bg-yellow-50/80', border: 'border-yellow-200/90', text: 'text-yellow-950', icon: 'text-yellow-600', hoverBorder: 'hover:border-yellow-300' },
    nearMiss: { bg: 'bg-pink-50/80', border: 'border-pink-200/90', text: 'text-pink-950', icon: 'text-pink-600', hoverBorder: 'hover:border-pink-300' },
    lensCovered: { bg: 'bg-teal-50/80', border: 'border-teal-200/90', text: 'text-teal-950', icon: 'text-teal-600', hoverBorder: 'hover:border-teal-300' },
    wrongPosition: { bg: 'bg-cyan-50/80', border: 'border-cyan-200/90', text: 'text-cyan-950', icon: 'text-cyan-600', hoverBorder: 'hover:border-cyan-300' },
    obstructed: { bg: 'bg-blue-50/80', border: 'border-blue-200/90', text: 'text-blue-950', icon: 'text-blue-600', hoverBorder: 'hover:border-blue-300' }
  };

  // Very light color themes for Driver Violations
  const driverThemes = {
    driverSeatbelt: { bg: 'bg-sky-50/80', border: 'border-sky-300/90', text: 'text-sky-950', icon: 'text-sky-700', hoverBorder: 'hover:border-sky-400' },
    passengerSeatbelt: { bg: 'bg-violet-50/80', border: 'border-violet-300/90', text: 'text-violet-950', icon: 'text-violet-700', hoverBorder: 'hover:border-violet-400' },
    holdingPhone: { bg: 'bg-amber-50/80', border: 'border-amber-300/90', text: 'text-amber-950', icon: 'text-amber-600', hoverBorder: 'hover:border-amber-400' },
    lookingPhone: { bg: 'bg-orange-50/80', border: 'border-orange-300/90', text: 'text-orange-950', icon: 'text-orange-600', hoverBorder: 'hover:border-orange-400' },
    talkingPhone: { bg: 'bg-yellow-50/80', border: 'border-yellow-300/90', text: 'text-yellow-950', icon: 'text-yellow-600', hoverBorder: 'hover:border-yellow-400' },
    lookingDown: { bg: 'bg-indigo-50/80', border: 'border-indigo-200/90', text: 'text-indigo-950', icon: 'text-indigo-600', hoverBorder: 'hover:border-indigo-300' },
    lookingAway: { bg: 'bg-purple-50/80', border: 'border-purple-200/90', text: 'text-purple-950', icon: 'text-purple-600', hoverBorder: 'hover:border-purple-300' },
    smoking: { bg: 'bg-rose-50/80', border: 'border-rose-300/90', text: 'text-rose-950', icon: 'text-rose-600', hoverBorder: 'hover:border-rose-400' },
    eating: { bg: 'bg-emerald-50/80', border: 'border-emerald-200/90', text: 'text-emerald-950', icon: 'text-emerald-600', hoverBorder: 'hover:border-emerald-300' },
    drinking: { bg: 'bg-cyan-50/80', border: 'border-cyan-200/90', text: 'text-cyan-950', icon: 'text-cyan-600', hoverBorder: 'hover:border-cyan-300' },
    objectInHand: { bg: 'bg-amber-50/80', border: 'border-amber-200/90', text: 'text-amber-950', icon: 'text-amber-600', hoverBorder: 'hover:border-amber-300' },
    fatigue: { bg: 'bg-fuchsia-50/80', border: 'border-fuchsia-200/90', text: 'text-fuchsia-950', icon: 'text-fuchsia-600', hoverBorder: 'hover:border-fuchsia-300' },
    uniform: { bg: 'bg-slate-100/90', border: 'border-slate-300/90', text: 'text-slate-900', icon: 'text-slate-700', hoverBorder: 'hover:border-slate-400' },
    lensCovered: { bg: 'bg-teal-50/80', border: 'border-teal-200/90', text: 'text-teal-950', icon: 'text-teal-600', hoverBorder: 'hover:border-teal-300' },
    wrongPosition: { bg: 'bg-blue-50/80', border: 'border-blue-200/90', text: 'text-blue-950', icon: 'text-blue-600', hoverBorder: 'hover:border-blue-300' },
    obstructed: { bg: 'bg-slate-50/80', border: 'border-slate-200/90', text: 'text-slate-800', icon: 'text-slate-600', hoverBorder: 'hover:border-slate-300' }
  };

  const speedValues = ['20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 w-full">
      {/* Left Column: Road Violations (Directly under Road Facing Video) */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
              Road Violations (Click to Mark)
            </h4>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
            roadActiveCount > 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
          }`}>
            {roadActiveCount} marked
          </span>
        </div>

        {/* Speed Limit Row + Eye-Catching Highlighted False Positive Button */}
        <div className="bg-slate-50/90 border border-slate-200 rounded-lg p-1.5 mb-1.5 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            {/* Speed Limit Label & Single Row of Speeds */}
            <div className="flex items-center gap-1 flex-wrap flex-1">
              <div className="flex items-center gap-1 mr-1 shrink-0">
                <Gauge className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Speed:
                </span>
              </div>
              {speedValues.map((spd) => {
                const isSelected = roadOptions.speedLimit === spd;
                return (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => {
                      setRoadOptions((prev) => ({
                        ...prev,
                        speedLimit: prev.speedLimit === spd ? 'N/A' : spd
                      }));
                    }}
                    className={`min-w-[32px] px-1.5 py-0.5 rounded text-[11px] font-bold transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-red-600 border-red-600 text-white shadow-xs font-extrabold ring-1 ring-red-300 scale-105'
                        : 'bg-emerald-50/80 hover:bg-emerald-100/90 text-emerald-950 border-emerald-300/80'
                    }`}
                    title={`Speed Limit: ${spd} km/h`}
                  >
                    {spd}
                  </button>
                );
              })}
              {isSpeedActive && (
                <button
                  type="button"
                  onClick={() => setRoadOptions(prev => ({ ...prev, speedLimit: 'N/A' }))}
                  className="text-[10px] font-bold text-slate-400 hover:text-red-600 underline ml-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* EYE-CATCHING HIGHLIGHTED FALSE POSITIVE BUTTON ("chokhe pore valo moto") */}
            <button
              type="button"
              onClick={() => toggleRoad('falsePositive', 'False Positive')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border-2 font-extrabold text-xs transition-all cursor-pointer shadow-xs shrink-0 ${
                isFalsePositiveActive
                  ? 'bg-red-600 border-red-600 text-white ring-2 ring-red-300 scale-105 shadow-md'
                  : 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-950 ring-2 ring-amber-300/70 animate-pulse'
              }`}
              title="Mark as False Positive (Mathematical / Sensor event)"
            >
              <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${isFalsePositiveActive ? 'text-white' : 'text-amber-700'}`} />
              <span className="tracking-wide">
                {isFalsePositiveActive ? '✓ FALSE POSITIVE (YES)' : '⚠ FALSE POSITIVE'}
              </span>
            </button>
          </div>
        </div>

        {/* 4-Column Grid for Road Violations (Very light distinct category colors) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-1.5">
          {/* 1. Collision */}
          <ViolationTile
            label="Collision"
            icon={AlertOctagon}
            isActive={isCollisionActive}
            onClick={() => toggleRoad('collision', 'Collision')}
            theme={roadThemes.collision}
          />

          {/* 2. Stop Sign */}
          <ViolationTile
            label="Stop Sign"
            icon={Octagon}
            isActive={isStopSignActive}
            onClick={() => toggleRoad('stopSign', 'Yes')}
            theme={roadThemes.stopSign}
          />

          {/* 3. Tailgating */}
          <ViolationTile
            label="Tailgating"
            icon={Car}
            isActive={isTailgatingActive}
            onClick={() => toggleRoad('tailgating', 'Tailgating')}
            theme={roadThemes.tailgating}
          />

          {/* 4. Headlights Off */}
          <ViolationTile
            label="Headlights Off"
            icon={Moon}
            isActive={isHeadlightsOffActive}
            onClick={() => toggleRoad('headlightsOff', 'Headlights Off')}
            theme={roadThemes.headlightsOff}
          />

          {/* 5. Speed Limit Tile */}
          <ViolationTile
            label={isSpeedActive ? `Speed: ${roadOptions.speedLimit} km/h` : 'Speed Limit'}
            icon={Gauge}
            isActive={isSpeedActive}
            onClick={() => {
              setRoadOptions(prev => ({
                ...prev,
                speedLimit: prev.speedLimit === 'N/A' ? '80' : 'N/A'
              }));
            }}
            theme={roadThemes.speedLimit}
          />

          {/* 6. Lane Drift */}
          <ViolationTile
            label="Lane Drift"
            icon={GitCommit}
            isActive={isLaneDriftActive}
            onClick={() => toggleRoad('laneDrift', 'Lane Drift')}
            theme={roadThemes.laneDrift}
          />

          {/* 7. Roll Over */}
          <ViolationTile
            label="Roll Over"
            icon={RotateCcw}
            isActive={isRolloverActive}
            onClick={() => toggleRoad('rollover', 'Roll over')}
            theme={roadThemes.rollover}
          />

          {/* 8. Forward Collision Alert */}
          <ViolationTile
            label="Forward Collision"
            icon={ShieldAlert}
            isActive={isForwardCollisionActive}
            onClick={() => toggleRoad('forwardCollisionAlert', 'Forward Collision Warning')}
            theme={roadThemes.forwardCollision}
          />

          {/* 9. Near Miss */}
          <ViolationTile
            label="Near Miss"
            icon={Zap}
            isActive={isNearMissActive}
            onClick={() => toggleRoad('nearMiss', 'Near Miss')}
            theme={roadThemes.nearMiss}
          />

          {/* 10. Camera Lens Covered */}
          <ViolationTile
            label="Lens Covered"
            icon={EyeOff}
            isActive={isRoadLensActive}
            onClick={() => toggleRoad('cameraLensCovered', 'Covered')}
            theme={roadThemes.lensCovered}
          />

          {/* 11. Wrong Camera Position */}
          <ViolationTile
            label="Wrong Position"
            icon={Camera}
            isActive={isRoadPosActive}
            onClick={() => toggleRoad('wrongCameraPosition', 'Wrong Position')}
            theme={roadThemes.wrongPosition}
          />

          {/* 12. Camera Obstructed */}
          <ViolationTile
            label="Camera Obstructed"
            icon={Minimize2}
            isActive={isRoadObstructedActive}
            onClick={() => toggleRoad('cameraPartiallyObstructed', 'Partially Obstructed')}
            theme={roadThemes.obstructed}
          />
        </div>
      </div>

      {/* Right Column: Driver Violations (Directly under Driver Facing Video) */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
              Driver Violations (Click to Mark)
            </h4>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
            driverActiveCount > 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
          }`}>
            {driverActiveCount} marked
          </span>
        </div>

        {/* 4-Column Grid for Driver Violations (Very light distinct category colors) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-1.5">
          {/* 1. Driver Seatbelt */}
          <ViolationTile
            label="Driver Seatbelt"
            icon={UserX}
            isActive={isDriverSeatbeltActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                driverSeatbelt: prev.driverSeatbelt === 'No Fastened' ? 'Fastened' : 'No Fastened'
              }));
            }}
            theme={driverThemes.driverSeatbelt}
          />

          {/* 2. Passenger Seatbelt */}
          <ViolationTile
            label="Passenger Seatbelt"
            icon={UserX}
            isActive={isPassengerSeatbeltActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                passengerSeatbelt: prev.passengerSeatbelt === 'No Fastened' ? 'Fastened' : 'No Fastened'
              }));
            }}
            theme={driverThemes.passengerSeatbelt}
          />

          {/* 3. Holding Phone */}
          <ViolationTile
            label="Holding Phone"
            icon={Smartphone}
            isActive={isHoldingPhoneActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                cellphoneDistracted: prev.cellphoneDistracted === 'Holding Phone' ? 'N/A' : 'Holding Phone'
              }));
            }}
            theme={driverThemes.holdingPhone}
          />

          {/* 4. Looking at Phone */}
          <ViolationTile
            label="Looking at Phone"
            icon={Smartphone}
            isActive={isLookingPhoneActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                cellphoneDistracted: prev.cellphoneDistracted === 'Looking at Phone' ? 'N/A' : 'Looking at Phone'
              }));
            }}
            theme={driverThemes.lookingPhone}
          />

          {/* 5. Talking on Phone */}
          <ViolationTile
            label="Talking on Phone"
            icon={Smartphone}
            isActive={isTalkingPhoneActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                cellphoneDistracted: prev.cellphoneDistracted === 'Talking on Phone' ? 'N/A' : 'Talking on Phone'
              }));
            }}
            theme={driverThemes.talkingPhone}
          />

          {/* 6. Looking Down */}
          <ViolationTile
            label="Looking Down"
            icon={Eye}
            isActive={isLookingDownActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                distractedDriving: {
                  ...prev.distractedDriving,
                  lookingDown: !prev.distractedDriving.lookingDown
                }
              }));
            }}
            theme={driverThemes.lookingDown}
          />

          {/* 7. Looking Away */}
          <ViolationTile
            label="Looking Away"
            icon={EyeOff}
            isActive={isLookingAwayActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                distractedDriving: {
                  ...prev.distractedDriving,
                  lookingAway: !prev.distractedDriving.lookingAway
                }
              }));
            }}
            theme={driverThemes.lookingAway}
          />

          {/* 8. Smoking */}
          <ViolationTile
            label="Smoking"
            icon={Cigarette}
            isActive={isSmokingActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                smokingDistracted: prev.smokingDistracted === 'Smoking' ? 'N/A' : 'Smoking'
              }));
            }}
            theme={driverThemes.smoking}
          />

          {/* 9. Eating */}
          <ViolationTile
            label="Eating"
            icon={Utensils}
            isActive={isEatingActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                distractedDriving: {
                  ...prev.distractedDriving,
                  eating: !prev.distractedDriving.eating
                }
              }));
            }}
            theme={driverThemes.eating}
          />

          {/* 10. Drinking */}
          <ViolationTile
            label="Drinking"
            icon={Coffee}
            isActive={isDrinkingActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                distractedDriving: {
                  ...prev.distractedDriving,
                  drinking: !prev.distractedDriving.drinking
                }
              }));
            }}
            theme={driverThemes.drinking}
          />

          {/* 11. Object in Hand */}
          <ViolationTile
            label="Object in Hand"
            icon={Hand}
            isActive={isObjectInHandActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                distractedDriving: {
                  ...prev.distractedDriving,
                  otherObjectInHand: !prev.distractedDriving.otherObjectInHand
                }
              }));
            }}
            theme={driverThemes.objectInHand}
          />

          {/* 12. Driver Fatigue */}
          <ViolationTile
            label="Driver Fatigue"
            icon={Bed}
            isActive={isFatigueActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                driverFatigue: prev.driverFatigue === 'Driver Fatigue' ? 'N/A' : 'Driver Fatigue'
              }));
            }}
            theme={driverThemes.fatigue}
          />

          {/* 13. Uniform Violation */}
          <ViolationTile
            label="No Uniform"
            icon={Shirt}
            isActive={isNoUniformActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                uniformNonCompliance: prev.uniformNonCompliance === 'Not wearing' ? 'Wearing' : 'Not wearing'
              }));
            }}
            theme={driverThemes.uniform}
          />

          {/* 14. Lens Covered */}
          <ViolationTile
            label="Lens Covered"
            icon={EyeOff}
            isActive={isDriverLensActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                cameraLensCovered: prev.cameraLensCovered === 'Covered' ? 'N/A' : 'Covered'
              }));
            }}
            theme={driverThemes.lensCovered}
          />

          {/* 15. Wrong Camera Position */}
          <ViolationTile
            label="Wrong Position"
            icon={Camera}
            isActive={isDriverPosActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                wrongCameraPosition: prev.wrongCameraPosition === 'Wrong Position' ? 'N/A' : 'Wrong Position'
              }));
            }}
            theme={driverThemes.wrongPosition}
          />

          {/* 16. Camera Obstructed */}
          <ViolationTile
            label="Camera Obstructed"
            icon={Minimize2}
            isActive={isDriverObstructedActive}
            onClick={() => {
              setDriverOptions(prev => ({
                ...prev,
                cameraPartiallyObstructed: prev.cameraPartiallyObstructed === 'Partially Obstructed' ? 'N/A' : 'Partially Obstructed'
              }));
            }}
            theme={driverThemes.obstructed}
          />
        </div>
      </div>
    </div>
  );
};
