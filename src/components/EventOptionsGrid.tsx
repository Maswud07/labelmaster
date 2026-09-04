import React from 'react';
import { Car, User } from 'lucide-react';
import { RoadOptionsState, DriverOptionsState } from '../types';

interface EventOptionsProps {
  roadOptions: RoadOptionsState;
  setRoadOptions: React.Dispatch<React.SetStateAction<RoadOptionsState>>;
  driverOptions: DriverOptionsState;
  setDriverOptions: React.Dispatch<React.SetStateAction<DriverOptionsState>>;
}

// Custom Radio Button component replicating the screenshot's exact radio style
const RadioBtn: React.FC<{
  label: string;
  isSelected: boolean;
  onClick: () => void;
  variant?: 'default' | 'danger' | 'success';
}> = ({ label, isSelected, onClick, variant = 'danger' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all bg-white border ${
        isSelected 
          ? 'border-slate-300 shadow-xs text-slate-900' 
          : 'border-slate-200 text-slate-700 hover:border-slate-300'
      }`}
    >
      {/* Radio Circle */}
      <span className="relative flex items-center justify-center w-4 h-4 rounded-full border border-slate-300 bg-white">
        {isSelected && (
          <span className="w-2.5 h-2.5 rounded-full bg-[#f87171]" />
        )}
      </span>
      <span>{label}</span>
    </button>
  );
};

export const RoadOptionsGrid: React.FC<{
  roadOptions: RoadOptionsState;
  setRoadOptions: React.Dispatch<React.SetStateAction<RoadOptionsState>>;
}> = ({ roadOptions, setRoadOptions }) => {
  const speeds = ['20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140'];

  return (
    <div className="flex flex-col gap-3.5">
      {/* 1. False Positive */}
      <div className="bg-[#fff7ed]/50 border border-[#fed7aa] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          False Positive (Applicable to mathematical events)
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <RadioBtn
            label="False Positive"
            isSelected={roadOptions.falsePositive === 'False Positive'}
            onClick={() => setRoadOptions(prev => ({ ...prev, falsePositive: 'False Positive' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={roadOptions.falsePositive === 'N/A'}
            onClick={() => setRoadOptions(prev => ({ ...prev, falsePositive: 'N/A' }))}
          />
        </div>
      </div>

      {/* 2. Speed Limit Violation */}
      <div className="bg-[#f0fdf4]/50 border border-[#bbf7d0] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Speed Limit Violation
        </span>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 items-center">
          {speeds.map((spd) => (
            <RadioBtn
              key={spd}
              label={spd}
              isSelected={roadOptions.speedLimit === spd}
              onClick={() => setRoadOptions(prev => ({ ...prev, speedLimit: spd }))}
            />
          ))}
          <RadioBtn
            label="N/A"
            isSelected={roadOptions.speedLimit === 'N/A'}
            onClick={() => setRoadOptions(prev => ({ ...prev, speedLimit: 'N/A' }))}
          />
        </div>
      </div>

      {/* 3. Stop Sign Violation */}
      <div className="bg-[#faf5ff]/50 border border-[#e9d5ff] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Stop Sign Violation
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Yes"
            isSelected={roadOptions.stopSign === 'Yes'}
            onClick={() => setRoadOptions(prev => ({ ...prev, stopSign: 'Yes' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={roadOptions.stopSign === 'N/A'}
            onClick={() => setRoadOptions(prev => ({ ...prev, stopSign: 'N/A' }))}
          />
        </div>
      </div>

      {/* 4. Tailgating */}
      <div className="bg-[#fff7ed]/50 border border-[#fed7aa] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Tailgating
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Tailgating"
            isSelected={roadOptions.tailgating === 'Tailgating'}
            onClick={() => setRoadOptions(prev => ({ ...prev, tailgating: 'Tailgating' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={roadOptions.tailgating === 'N/A'}
            onClick={() => setRoadOptions(prev => ({ ...prev, tailgating: 'N/A' }))}
          />
        </div>
      </div>

      {/* 5. Rollover Detection */}
      <div className="bg-[#ecfdf5]/50 border border-[#a7f3d0] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Rollover Detection
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Roll over"
            isSelected={roadOptions.rollover === 'Roll over'}
            onClick={() => setRoadOptions(prev => ({ ...prev, rollover: 'Roll over' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={roadOptions.rollover === 'N/A'}
            onClick={() => setRoadOptions(prev => ({ ...prev, rollover: 'N/A' }))}
          />
        </div>
      </div>

      {/* 6. Lane Drift Found */}
      <div className="bg-[#fff1f2]/50 border border-[#fecaca] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Lane Drift Found
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Lane Drift"
            isSelected={roadOptions.laneDrift === 'Lane Drift'}
            onClick={() => setRoadOptions(prev => ({ ...prev, laneDrift: 'Lane Drift' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={roadOptions.laneDrift === 'N/A'}
            onClick={() => setRoadOptions(prev => ({ ...prev, laneDrift: 'N/A' }))}
          />
        </div>
      </div>

      {/* 7. Collision */}
      <div className="bg-[#faf5ff]/50 border border-[#ddd6fe] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Collision
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Collision"
            isSelected={roadOptions.collision === 'Collision'}
            onClick={() => setRoadOptions(prev => ({ ...prev, collision: 'Collision' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={roadOptions.collision === 'N/A'}
            onClick={() => setRoadOptions(prev => ({ ...prev, collision: 'N/A' }))}
          />
        </div>
      </div>

      {/* 8. Headlights Off */}
      <div className="bg-[#fff7ed]/50 border border-[#fed7aa] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Headlights Off
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Headlights Off"
            isSelected={roadOptions.headlightsOff === 'Headlights Off'}
            onClick={() => setRoadOptions(prev => ({ ...prev, headlightsOff: 'Headlights Off' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={roadOptions.headlightsOff === 'N/A'}
            onClick={() => setRoadOptions(prev => ({ ...prev, headlightsOff: 'N/A' }))}
          />
        </div>
      </div>

      {/* 9. Camera Lens Covered */}
      <div className="bg-[#ecfdf5]/50 border border-[#a7f3d0] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Camera Lens Covered
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Covered"
            isSelected={roadOptions.cameraLensCovered === 'Covered'}
            onClick={() => setRoadOptions(prev => ({ ...prev, cameraLensCovered: 'Covered' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={roadOptions.cameraLensCovered === 'N/A'}
            onClick={() => setRoadOptions(prev => ({ ...prev, cameraLensCovered: 'N/A' }))}
          />
        </div>
      </div>

      {/* 10. Wrong Camera Position */}
      <div className="bg-[#faf5ff]/50 border border-[#ddd6fe] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Wrong Camera Position
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Wrong Position"
            isSelected={roadOptions.wrongCameraPosition === 'Wrong Position'}
            onClick={() => setRoadOptions(prev => ({ ...prev, wrongCameraPosition: 'Wrong Position' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={roadOptions.wrongCameraPosition === 'N/A'}
            onClick={() => setRoadOptions(prev => ({ ...prev, wrongCameraPosition: 'N/A' }))}
          />
        </div>
      </div>

      {/* 11. Camera Partially Obstructed */}
      <div className="bg-[#fff1f2]/50 border border-[#fecaca] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Camera Partially Obstructed
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Partially Obstructed"
            isSelected={roadOptions.cameraPartiallyObstructed === 'Partially Obstructed'}
            onClick={() => setRoadOptions(prev => ({ ...prev, cameraPartiallyObstructed: 'Partially Obstructed' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={roadOptions.cameraPartiallyObstructed === 'N/A'}
            onClick={() => setRoadOptions(prev => ({ ...prev, cameraPartiallyObstructed: 'N/A' }))}
          />
        </div>
      </div>

      {/* 12. Forward Collision Alert */}
      <div className="bg-[#ecfdf5]/50 border border-[#a7f3d0] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Forward Collision Alert
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Forward Collision Warning"
            isSelected={roadOptions.forwardCollisionAlert === 'Forward Collision Warning'}
            onClick={() => setRoadOptions(prev => ({ ...prev, forwardCollisionAlert: 'Forward Collision Warning' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={roadOptions.forwardCollisionAlert === 'N/A'}
            onClick={() => setRoadOptions(prev => ({ ...prev, forwardCollisionAlert: 'N/A' }))}
          />
        </div>
      </div>

      {/* 13. Near Miss */}
      <div className="bg-[#fff1f2]/50 border border-[#fecaca] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Near Miss
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Near Miss"
            isSelected={roadOptions.nearMiss === 'Near Miss'}
            onClick={() => setRoadOptions(prev => ({ ...prev, nearMiss: 'Near Miss' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={roadOptions.nearMiss === 'N/A'}
            onClick={() => setRoadOptions(prev => ({ ...prev, nearMiss: 'N/A' }))}
          />
        </div>
      </div>
    </div>
  );
};

export const resolveFleetCluster = (cluster?: string, fleetName?: string): 'Alibaba' | 'AWS' => {
  if (cluster === 'Alibaba' || cluster === 'AWS') return cluster;
  if (!fleetName) return 'AWS';
  const name = fleetName.toLowerCase();
  if (
    name.includes('coca-cola') ||
    name.includes('nova') ||
    name.includes('sanar') ||
    name.includes('tamkeen') ||
    name.includes('aramco')
  ) {
    return 'Alibaba';
  }
  return 'AWS';
};

const DriverSeatbeltCard: React.FC<{
  value: string;
  onChange: (val: 'No Fastened' | 'Fastened') => void;
}> = ({ value, onChange }) => (
  <div className="bg-sky-50/80 border-2 border-sky-300 rounded-xl p-3.5 shadow-2xs transition-all hover:border-sky-400">
    <div className="flex items-center justify-between mb-2.5">
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded bg-sky-100 flex items-center justify-center text-sky-700">
          <Car className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-bold text-sky-950">
          Driver Seatbelt Violation
        </span>
      </div>
      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-600 text-white tracking-wider uppercase shadow-2xs">
        DRIVER
      </span>
    </div>

    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange('No Fastened')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
          value === 'No Fastened'
            ? 'bg-rose-50 border-rose-400 text-rose-800 shadow-xs ring-1 ring-rose-300'
            : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300 hover:bg-rose-50/30'
        }`}
      >
        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
          value === 'No Fastened' ? 'border-rose-500 bg-white' : 'border-slate-300 bg-white'
        }`}>
          {value === 'No Fastened' && (
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
          )}
        </span>
        <span>No Fastened</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('Fastened')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
          value === 'Fastened'
            ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs ring-1 ring-emerald-300'
            : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
        }`}
      >
        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
          value === 'Fastened' ? 'border-emerald-500 bg-white' : 'border-slate-300 bg-white'
        }`}>
          {value === 'Fastened' && (
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          )}
        </span>
        <span>Fastened</span>
      </button>
    </div>
  </div>
);

const PassengerSeatbeltCard: React.FC<{
  value: string;
  onChange: (val: 'No Fastened' | 'Fastened') => void;
}> = ({ value, onChange }) => (
  <div className="bg-purple-50/80 border-2 border-purple-300 rounded-xl p-3.5 shadow-2xs transition-all hover:border-purple-400">
    <div className="flex items-center justify-between mb-2.5">
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded bg-purple-100 flex items-center justify-center text-purple-700">
          <User className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-bold text-purple-950">
          Passenger Seatbelt Violation
        </span>
      </div>
      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-600 text-white tracking-wider uppercase shadow-2xs">
        PASSENGER
      </span>
    </div>

    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange('No Fastened')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
          value === 'No Fastened'
            ? 'bg-rose-50 border-rose-400 text-rose-800 shadow-xs ring-1 ring-rose-300'
            : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300 hover:bg-rose-50/30'
        }`}
      >
        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
          value === 'No Fastened' ? 'border-rose-500 bg-white' : 'border-slate-300 bg-white'
        }`}>
          {value === 'No Fastened' && (
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
          )}
        </span>
        <span>No Fastened</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('Fastened')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
          value === 'Fastened'
            ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs ring-1 ring-emerald-300'
            : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
        }`}
      >
        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
          value === 'Fastened' ? 'border-emerald-500 bg-white' : 'border-slate-300 bg-white'
        }`}>
          {value === 'Fastened' && (
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          )}
        </span>
        <span>Fastened</span>
      </button>
    </div>
  </div>
);

export const DriverOptionsGrid: React.FC<{
  driverOptions: DriverOptionsState;
  setDriverOptions: React.Dispatch<React.SetStateAction<DriverOptionsState>>;
  currentEventType?: string;
  cluster?: 'Alibaba' | 'AWS' | string;
  fleetName?: string;
}> = ({ driverOptions, setDriverOptions, cluster, fleetName }) => {
  // Determine whether this fleet is Alibaba (RHD - Driver on Right) or AWS (LHD - Driver on Left)
  const isDriverOnRight = resolveFleetCluster(cluster, fleetName) === 'Alibaba';

  return (
    <div className="flex flex-col gap-3.5">
      {/* 1. Distracted Driving (Lavender Tint with Checkboxes) */}
      <div className="bg-[#ede9fe]/40 border border-[#ddd6fe] rounded-lg p-4">
        <span className="text-[11px] font-medium text-slate-700 block mb-3">
          Distracted Driving
        </span>
        <div className="flex flex-col gap-2.5">
          {[
            { key: 'lookingDown', label: 'Looking Down' },
            { key: 'lookingAway', label: 'Looking Away' },
            { key: 'eating', label: 'Eating' },
            { key: 'drinking', label: 'Drinking' },
            { key: 'otherObjectInHand', label: 'Other object in hand' },
          ].map(({ key, label }) => (
            <label 
              key={key} 
              className="flex items-center gap-3 text-xs text-slate-700 font-medium cursor-pointer hover:text-slate-900 select-none"
            >
              <input
                type="checkbox"
                checked={driverOptions.distractedDriving[key as keyof typeof driverOptions.distractedDriving]}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setDriverOptions(prev => ({
                    ...prev,
                    distractedDriving: {
                      ...prev.distractedDriving,
                      [key]: checked
                    }
                  }));
                }}
                className="w-4 h-4 rounded border-slate-300 text-[#00a86b] focus:ring-[#00a86b]"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Smoking Distracted Driving */}
      <div className="bg-[#fff1f2]/50 border border-[#fecaca] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Smoking Distracted Driving
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Smoking"
            isSelected={driverOptions.smokingDistracted === 'Smoking'}
            onClick={() => setDriverOptions(prev => ({ ...prev, smokingDistracted: 'Smoking' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={driverOptions.smokingDistracted === 'N/A'}
            onClick={() => setDriverOptions(prev => ({ ...prev, smokingDistracted: 'N/A' }))}
          />
        </div>
      </div>

      {/* 3. Cellphone Distracted Driving */}
      <div className="bg-[#ecfdf5]/50 border border-[#a7f3d0] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Cellphone Distracted Driving
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <RadioBtn
            label="Holding Phone"
            isSelected={driverOptions.cellphoneDistracted === 'Holding Phone'}
            onClick={() => setDriverOptions(prev => ({ ...prev, cellphoneDistracted: 'Holding Phone' }))}
          />
          <RadioBtn
            label="Looking at Phone"
            isSelected={driverOptions.cellphoneDistracted === 'Looking at Phone'}
            onClick={() => setDriverOptions(prev => ({ ...prev, cellphoneDistracted: 'Looking at Phone' }))}
          />
          <RadioBtn
            label="Talking on Phone"
            isSelected={driverOptions.cellphoneDistracted === 'Talking on Phone'}
            onClick={() => setDriverOptions(prev => ({ ...prev, cellphoneDistracted: 'Talking on Phone' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={driverOptions.cellphoneDistracted === 'N/A'}
            onClick={() => setDriverOptions(prev => ({ ...prev, cellphoneDistracted: 'N/A' }))}
          />
        </div>
      </div>

      {/* 4. Camera Lens Covered */}
      <div className="bg-[#fff7ed]/50 border border-[#fed7aa] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Camera Lens Covered
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Covered"
            isSelected={driverOptions.cameraLensCovered === 'Covered'}
            onClick={() => setDriverOptions(prev => ({ ...prev, cameraLensCovered: 'Covered' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={driverOptions.cameraLensCovered === 'N/A'}
            onClick={() => setDriverOptions(prev => ({ ...prev, cameraLensCovered: 'N/A' }))}
          />
        </div>
      </div>

      {/* 5 & 6. Seatbelt Compliance (Positioned by Fleet Cluster: Driver on Left for AWS, Driver on Right for Alibaba) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {isDriverOnRight ? (
          <>
            {/* Passenger Seatbelt Violation (Left for Alibaba) */}
            <PassengerSeatbeltCard
              value={driverOptions.passengerSeatbelt}
              onChange={(val) => setDriverOptions(prev => ({ ...prev, passengerSeatbelt: val }))}
            />

            {/* Driver Seatbelt Violation (Right for Alibaba) */}
            <DriverSeatbeltCard
              value={driverOptions.driverSeatbelt}
              onChange={(val) => setDriverOptions(prev => ({ ...prev, driverSeatbelt: val }))}
            />
          </>
        ) : (
          <>
            {/* Driver Seatbelt Violation (Left for AWS) */}
            <DriverSeatbeltCard
              value={driverOptions.driverSeatbelt}
              onChange={(val) => setDriverOptions(prev => ({ ...prev, driverSeatbelt: val }))}
            />

            {/* Passenger Seatbelt Violation (Right for AWS) */}
            <PassengerSeatbeltCard
              value={driverOptions.passengerSeatbelt}
              onChange={(val) => setDriverOptions(prev => ({ ...prev, passengerSeatbelt: val }))}
            />
          </>
        )}
      </div>

      {/* 7. Uniform non compliance */}
      <div className="bg-[#ecfdf5]/50 border border-[#a7f3d0] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Uniform non compliance
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Not wearing"
            isSelected={driverOptions.uniformNonCompliance === 'Not wearing'}
            onClick={() => setDriverOptions(prev => ({ ...prev, uniformNonCompliance: 'Not wearing' }))}
          />
          <RadioBtn
            label="Wearing"
            isSelected={driverOptions.uniformNonCompliance === 'Wearing'}
            onClick={() => setDriverOptions(prev => ({ ...prev, uniformNonCompliance: 'Wearing' }))}
          />
        </div>
      </div>

      {/* 8. Wrong Camera Position */}
      <div className="bg-[#fff1f2]/50 border border-[#fecaca] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Wrong Camera Position
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Wrong Position"
            isSelected={driverOptions.wrongCameraPosition === 'Wrong Position'}
            onClick={() => setDriverOptions(prev => ({ ...prev, wrongCameraPosition: 'Wrong Position' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={driverOptions.wrongCameraPosition === 'N/A'}
            onClick={() => setDriverOptions(prev => ({ ...prev, wrongCameraPosition: 'N/A' }))}
          />
        </div>
      </div>

      {/* 9. Camera Partially Obstructed */}
      <div className="bg-[#fff7ed]/50 border border-[#fed7aa] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Camera Partially Obstructed
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Partially Obstructed"
            isSelected={driverOptions.cameraPartiallyObstructed === 'Partially Obstructed'}
            onClick={() => setDriverOptions(prev => ({ ...prev, cameraPartiallyObstructed: 'Partially Obstructed' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={driverOptions.cameraPartiallyObstructed === 'N/A'}
            onClick={() => setDriverOptions(prev => ({ ...prev, cameraPartiallyObstructed: 'N/A' }))}
          />
        </div>
      </div>

      {/* 10. Driver Fatigue */}
      <div className="bg-[#fff1f2]/50 border border-[#fecaca] rounded-lg p-3">
        <span className="text-[11px] font-medium text-slate-600 block mb-2">
          Driver Fatigue
        </span>
        <div className="flex items-center gap-2">
          <RadioBtn
            label="Driver Fatigue"
            isSelected={driverOptions.driverFatigue === 'Driver Fatigue'}
            onClick={() => setDriverOptions(prev => ({ ...prev, driverFatigue: 'Driver Fatigue' }))}
          />
          <RadioBtn
            label="N/A"
            isSelected={driverOptions.driverFatigue === 'N/A'}
            onClick={() => setDriverOptions(prev => ({ ...prev, driverFatigue: 'N/A' }))}
          />
        </div>
      </div>
    </div>
  );
};
