export type NavigationTab = 'labelling' | 'monitoring' | 'events' | 'dataset' | 'guideline' | 'history';

export interface EventItem {
  id: string;
  index: number;
  eventType: string;
  timestamp: string; // formatted "02-09-2026, 11:30:49"
  isoTimestamp: string; // for date-time filtering: "2026-09-02T11:30:49"
  fleetName: string;
  motherFleet?: string; // e.g. "Coca-Cola" for subfleets like "Coca-Cola A", "Coca-Cola B"
  cluster?: 'Alibaba' | 'AWS';
  tripId: string;
  currentSpeed: number; // e.g. 17 km/h
  gps: string;
  roadVideoThumbnail?: string;
  driverVideoThumbnail?: string;
  status: 'pending' | 'labelled' | 'skipped';
  labelledBy?: string;
  labelledAt?: string;
}

export interface SubFleetInfo {
  id: string;
  name: string;
}

export interface FleetHierarchyItem {
  id: string;
  name: string;
  cluster: 'Alibaba' | 'AWS';
  isMotherFleet?: boolean;
  subFleets?: SubFleetInfo[];
}

export interface ClusterHierarchy {
  id: 'Alibaba' | 'AWS';
  name: string;
  displayName: string;
  description: string;
  fleets: FleetHierarchyItem[];
}

export interface Labeller {
  id: string;
  name: string;
  email: string;
  avatar: string;
  todaySubmissions: number;
  weeklySubmissions: number;
  monthlySubmissions: number;
  avgTimeSeconds: number;
  totalSubmissions?: number;
  accuracyRate?: number;
  lastActive?: string;
}

export interface MonitoringFilterState {
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endDate: string;   // YYYY-MM-DD
  endTime: string;   // HH:mm
  selectedFleet: string;
  selectedEventType: string;
  selectedLabeller: string;
  quickPreset: 'today' | 'yesterday' | 'last7days' | 'thisMonth' | 'custom';
}

export interface RoadOptionsState {
  falsePositive: 'False Positive' | 'N/A';
  speedLimit: string; // '20'..'140' or 'N/A'
  stopSign: 'Yes' | 'N/A';
  tailgating: 'Tailgating' | 'N/A';
  rollover: 'Roll over' | 'N/A';
  laneDrift: 'Lane Drift' | 'N/A';
  collision: 'Collision' | 'N/A';
  headlightsOff: 'Headlights Off' | 'N/A';
  cameraLensCovered: 'Covered' | 'N/A';
  wrongCameraPosition: 'Wrong Position' | 'N/A';
  cameraPartiallyObstructed: 'Partially Obstructed' | 'N/A';
  forwardCollisionAlert: 'Forward Collision Warning' | 'N/A';
  nearMiss: 'Near Miss' | 'N/A';
}

export interface DriverOptionsState {
  distractedDriving: {
    lookingDown: boolean;
    lookingAway: boolean;
    eating: boolean;
    drinking: boolean;
    otherObjectInHand: boolean;
  };
  smokingDistracted: 'Smoking' | 'N/A';
  cellphoneDistracted: 'Holding Phone' | 'Looking at Phone' | 'Talking on Phone' | 'N/A';
  cameraLensCovered: 'Covered' | 'N/A';
  driverSeatbelt: 'No Fastened' | 'Fastened';
  passengerSeatbelt: 'No Fastened' | 'Fastened';
  uniformNonCompliance: 'Not wearing' | 'Wearing';
  wrongCameraPosition: 'Wrong Position' | 'N/A';
  cameraPartiallyObstructed: 'Partially Obstructed' | 'N/A';
  driverFatigue: 'Driver Fatigue' | 'N/A';
}
