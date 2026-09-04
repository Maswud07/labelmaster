import { EventItem, Labeller, ClusterHierarchy } from './types';

export const CLUSTERS_CONFIG: ClusterHierarchy[] = [
  {
    id: 'Alibaba',
    name: 'Alibaba',
    displayName: 'Alibaba Cloud',
    description: 'Middle East & Asia regional fleet telemetry processing nodes',
    fleets: [
      {
        id: 'coca-cola',
        name: 'Coca-Cola',
        cluster: 'Alibaba',
        isMotherFleet: true,
        subFleets: [
          { id: 'coca-cola-a', name: 'Coca-Cola A' },
          { id: 'coca-cola-b', name: 'Coca-Cola B' },
          { id: 'coca-cola-c', name: 'Coca-Cola C' }
        ]
      },
      {
        id: 'nova-waters',
        name: 'Nova Waters',
        cluster: 'Alibaba',
        isMotherFleet: false
      },
      {
        id: 'sanar',
        name: 'Sanar',
        cluster: 'Alibaba',
        isMotherFleet: false
      },
      {
        id: 'tamkeen',
        name: 'Tamkeen',
        cluster: 'Alibaba',
        isMotherFleet: false
      },
      {
        id: 'aramco-logistics',
        name: 'Aramco Logistics',
        cluster: 'Alibaba',
        isMotherFleet: false
      }
    ]
  },
  {
    id: 'AWS',
    name: 'AWS',
    displayName: 'AWS (Amazon Web Services)',
    description: 'High-throughput enterprise vehicle streaming clusters',
    fleets: [
      {
        id: 'mdc-courier',
        name: 'MDC Courier',
        cluster: 'AWS',
        isMotherFleet: false
      },
      {
        id: 'happicabs',
        name: 'Happicabs',
        cluster: 'AWS',
        isMotherFleet: false
      },
      {
        id: 'toc',
        name: 'TOC',
        cluster: 'AWS',
        isMotherFleet: false
      },
      {
        id: 'dhl-express',
        name: 'DHL Express',
        cluster: 'AWS',
        isMotherFleet: false
      },
      {
        id: 'careem-delivery',
        name: 'Careem Delivery',
        cluster: 'AWS',
        isMotherFleet: false
      },
      {
        id: 'aramex-saudi',
        name: 'Aramex Saudi',
        cluster: 'AWS',
        isMotherFleet: false
      }
    ]
  }
];

export const INITIAL_LABELLERS: Labeller[] = [
  {
    id: 'lab-1',
    name: 'Abdullah Al Maswud',
    email: 'abdullahalmaswud21@gmail.com',
    avatar: 'A',
    todaySubmissions: 84,
    weeklySubmissions: 412,
    monthlySubmissions: 1420,
    totalSubmissions: 1420,
    avgTimeSeconds: 18,
    accuracyRate: 99.2,
    lastActive: 'Just now'
  },
  {
    id: 'lab-2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@rooya.ai',
    avatar: 'S',
    todaySubmissions: 112,
    weeklySubmissions: 530,
    monthlySubmissions: 1890,
    totalSubmissions: 1890,
    avgTimeSeconds: 16,
    accuracyRate: 98.7,
    lastActive: '5 mins ago'
  },
  {
    id: 'lab-3',
    name: 'Karim Ahmed',
    email: 'karim.ahmed@rooya.ai',
    avatar: 'K',
    todaySubmissions: 76,
    weeklySubmissions: 364,
    monthlySubmissions: 1240,
    totalSubmissions: 1240,
    avgTimeSeconds: 22,
    accuracyRate: 97.9,
    lastActive: '12 mins ago'
  },
  {
    id: 'lab-4',
    name: 'Priya Sharma',
    email: 'priya.s@rooya.ai',
    avatar: 'P',
    todaySubmissions: 95,
    weeklySubmissions: 478,
    monthlySubmissions: 1650,
    totalSubmissions: 1650,
    avgTimeSeconds: 19,
    accuracyRate: 99.0,
    lastActive: '18 mins ago'
  },
  {
    id: 'lab-5',
    name: 'Fahad Al-Otaibi',
    email: 'fahad.otaibi@rooya.ai',
    avatar: 'F',
    todaySubmissions: 63,
    weeklySubmissions: 298,
    monthlySubmissions: 980,
    totalSubmissions: 980,
    avgTimeSeconds: 25,
    accuracyRate: 96.5,
    lastActive: '35 mins ago'
  },
  {
    id: 'lab-6',
    name: 'Elena Rostova',
    email: 'elena.r@rooya.ai',
    avatar: 'E',
    todaySubmissions: 71,
    weeklySubmissions: 340,
    monthlySubmissions: 1150,
    totalSubmissions: 1150,
    avgTimeSeconds: 20,
    accuracyRate: 98.4,
    lastActive: '42 mins ago'
  }
];

export const FLEETS = [
  'All',
  'Coca-Cola',
  'Coca-Cola A',
  'Coca-Cola B',
  'Coca-Cola C',
  'Nova Waters',
  'Sanar',
  'MDC Courier',
  'Happicabs',
  'TOC',
  'Tamkeen',
  'Aramco Logistics',
  'DHL Express',
  'Careem Delivery',
  'Aramex Saudi'
];

export const EVENT_TYPES = [
  'All Types',
  'Harsh Braking',
  'Speed Limit Violation',
  'Tailgating',
  'Stop Sign Violation',
  'Distracted Driving',
  'Lane Drift Found',
  'Forward Collision Alert',
  'Driver Fatigue',
  'Cellphone Distracted Driving'
];

// Generate realistic dataset with rich events for Coca-Cola (A, B, C), Nova Waters, Sanar, MDC Courier, Happicabs, TOC
export const INITIAL_EVENTS: EventItem[] = [
  // 1. Initial event matching user's original screenshot
  {
    id: '0d50cef4-c63f-4b78-936a-6d8834c659b9',
    index: 3,
    eventType: 'Harsh Braking',
    timestamp: '02-09-2026, 11:30:49',
    isoTimestamp: '2026-09-02T11:30:49',
    fleetName: 'Tamkeen',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T05_05_07.186Z_J1024510644_Emzli',
    currentSpeed: 17,
    gps: '24.0780, 38.1014',
    status: 'pending'
  },

  // 2. Coca-Cola A events (Alibaba Mother Fleet: Coca-Cola)
  {
    id: 'cc-a-01-948b-381a',
    index: 5467,
    eventType: 'Cellphone Distracted Driving',
    timestamp: '02-09-2026, 11:25:12',
    isoTimestamp: '2026-09-02T11:25:12',
    fleetName: 'Coca-Cola A',
    motherFleet: 'Coca-Cola',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T05_12_40_CC_A_RUH_882',
    currentSpeed: 34,
    gps: '24.7136, 46.6753',
    status: 'pending'
  },
  {
    id: 'cc-a-02-182c-492e',
    index: 5468,
    eventType: 'Speed Limit Violation',
    timestamp: '02-09-2026, 11:18:40',
    isoTimestamp: '2026-09-02T11:18:40',
    fleetName: 'Coca-Cola A',
    motherFleet: 'Coca-Cola',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T05_02_10_CC_A_RUH_904',
    currentSpeed: 75,
    gps: '24.7210, 46.6812',
    status: 'pending'
  },
  {
    id: 'cc-a-03-392d-910a',
    index: 5469,
    eventType: 'Driver Seatbelt Violation',
    timestamp: '02-09-2026, 10:48:22',
    isoTimestamp: '2026-09-02T10:48:22',
    fleetName: 'Coca-Cola A',
    motherFleet: 'Coca-Cola',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T04_35_19_CC_A_RUH_771',
    currentSpeed: 29,
    gps: '24.7088, 46.6690',
    status: 'pending'
  },

  // 3. Coca-Cola B events (Alibaba Mother Fleet: Coca-Cola)
  {
    id: 'cc-b-01-771a-203b',
    index: 5470,
    eventType: 'Passenger Seatbelt Violation',
    timestamp: '02-09-2026, 11:22:15',
    isoTimestamp: '2026-09-02T11:22:15',
    fleetName: 'Coca-Cola B',
    motherFleet: 'Coca-Cola',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T05_10_00_CC_B_JED_102',
    currentSpeed: 58,
    gps: '21.5433, 39.1728',
    status: 'pending'
  },
  {
    id: 'cc-b-02-882c-441f',
    index: 5471,
    eventType: 'Stop Sign Violation',
    timestamp: '02-09-2026, 10:35:50',
    isoTimestamp: '2026-09-02T10:35:50',
    fleetName: 'Coca-Cola B',
    motherFleet: 'Coca-Cola',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T04_20_11_CC_B_JED_305',
    currentSpeed: 19,
    gps: '21.5390, 39.1680',
    status: 'pending'
  },

  // 4. Coca-Cola C events
  {
    id: 'cc-c-01-331d-552e',
    index: 5472,
    eventType: 'Forward Collision Alert',
    timestamp: '02-09-2026, 11:05:00',
    isoTimestamp: '2026-09-02T11:05:00',
    fleetName: 'Coca-Cola C',
    motherFleet: 'Coca-Cola',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T04_55_00_CC_C_DMM_441',
    currentSpeed: 44,
    gps: '26.4207, 50.0888',
    status: 'pending'
  },

  // 5. Nova Waters (Alibaba)
  {
    id: 'nw-01-992a-331b',
    index: 5473,
    eventType: 'Harsh Braking',
    timestamp: '02-09-2026, 11:29:05',
    isoTimestamp: '2026-09-02T11:29:05',
    fleetName: 'Nova Waters',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T05_20_14_NOVA_001_AlQassim',
    currentSpeed: 23,
    gps: '26.3260, 43.9750',
    status: 'pending'
  },
  {
    id: 'nw-02-881b-442c',
    index: 5474,
    eventType: 'Lane Drift Found',
    timestamp: '02-09-2026, 10:55:18',
    isoTimestamp: '2026-09-02T10:55:18',
    fleetName: 'Nova Waters',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T04_42_30_NOVA_002_AlKharj',
    currentSpeed: 62,
    gps: '24.1500, 47.3100',
    status: 'pending'
  },

  // 6. Sanar (Alibaba)
  {
    id: 'sanar-01-551a-772b',
    index: 5475,
    eventType: 'Cellphone Distracted Driving',
    timestamp: '02-09-2026, 11:15:22',
    isoTimestamp: '2026-09-02T11:15:22',
    fleetName: 'Sanar',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T05_02_44_SANAR_MED_991',
    currentSpeed: 38,
    gps: '24.7743, 46.7386',
    status: 'pending'
  },
  {
    id: 'sanar-02-662b-883c',
    index: 5476,
    eventType: 'Driver Fatigue',
    timestamp: '02-09-2026, 09:40:11',
    isoTimestamp: '2026-09-02T09:40:11',
    fleetName: 'Sanar',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T03_30_00_SANAR_MED_992',
    currentSpeed: 15,
    gps: '24.7700, 46.7320',
    status: 'pending'
  },

  // 7. MDC Courier (AWS)
  {
    id: 'mdc-01-112a-449e',
    index: 5477,
    eventType: 'Speed Limit Violation',
    timestamp: '02-09-2026, 11:27:30',
    isoTimestamp: '2026-09-02T11:27:30',
    fleetName: 'MDC Courier',
    cluster: 'AWS',
    tripId: 'trip_ms_2026-09-02T05_15_20_MDC_DXB_1092',
    currentSpeed: 92,
    gps: '25.2048, 55.2708',
    status: 'pending'
  },
  {
    id: 'mdc-02-223b-550f',
    index: 5478,
    eventType: 'Driver Seatbelt Violation',
    timestamp: '02-09-2026, 10:45:00',
    isoTimestamp: '2026-09-02T10:45:00',
    fleetName: 'MDC Courier',
    cluster: 'AWS',
    tripId: 'trip_ms_2026-09-02T04_30_00_MDC_DXB_1105',
    currentSpeed: 21,
    gps: '25.2100, 55.2800',
    status: 'pending'
  },

  // 8. Happicabs (AWS)
  {
    id: 'happi-01-334c-661a',
    index: 5479,
    eventType: 'Tailgating',
    timestamp: '02-09-2026, 11:14:02',
    isoTimestamp: '2026-09-02T11:14:02',
    fleetName: 'Happicabs',
    cluster: 'AWS',
    tripId: 'trip_ms_2026-09-02T05_00_12_HAPPI_LON_441',
    currentSpeed: 48,
    gps: '51.5074, -0.1278',
    status: 'pending'
  },
  {
    id: 'happi-02-445d-772b',
    index: 5480,
    eventType: 'Stop Sign Violation',
    timestamp: '02-09-2026, 10:12:44',
    isoTimestamp: '2026-09-02T10:12:44',
    fleetName: 'Happicabs',
    cluster: 'AWS',
    tripId: 'trip_ms_2026-09-02T04_02_10_HAPPI_LON_488',
    currentSpeed: 18,
    gps: '51.5120, -0.1300',
    status: 'pending'
  },

  // 9. TOC (AWS)
  {
    id: 'toc-01-556e-883c',
    index: 5481,
    eventType: 'Forward Collision Alert',
    timestamp: '02-09-2026, 11:20:19',
    isoTimestamp: '2026-09-02T11:20:19',
    fleetName: 'TOC',
    cluster: 'AWS',
    tripId: 'trip_ms_2026-09-02T05_08_01_TOC_KWT_772',
    currentSpeed: 67,
    gps: '29.3759, 47.9774',
    status: 'pending'
  },
  {
    id: 'toc-02-667f-994d',
    index: 5482,
    eventType: 'Harsh Braking',
    timestamp: '02-09-2026, 09:55:30',
    isoTimestamp: '2026-09-02T09:55:30',
    fleetName: 'TOC',
    cluster: 'AWS',
    tripId: 'trip_ms_2026-09-02T03_45_22_TOC_KWT_801',
    currentSpeed: 25,
    gps: '29.3810, 47.9820',
    status: 'pending'
  },

  // 10. Existing fleets
  {
    id: '1c49bee2-e14a-4c29-873b-5a1290f148c1',
    index: 4,
    eventType: 'Cellphone Distracted Driving',
    timestamp: '02-09-2026, 11:28:15',
    isoTimestamp: '2026-09-02T11:28:15',
    fleetName: 'Tamkeen',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T04_50_12.302Z_K892014890_Emzli',
    currentSpeed: 42,
    gps: '24.0812, 38.0991',
    status: 'pending'
  },
  {
    id: '2f81dda4-b72c-4903-a120-3b482910fa92',
    index: 5,
    eventType: 'Speed Limit Violation',
    timestamp: '02-09-2026, 11:15:30',
    isoTimestamp: '2026-09-02T11:15:30',
    fleetName: 'Aramco Logistics',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T04_12_45.109Z_AR990231_Dhahran',
    currentSpeed: 88,
    gps: '26.3082, 50.1345',
    status: 'pending'
  },
  {
    id: '3a90cc51-7f91-4d92-bf39-491a2e9401bf',
    index: 6,
    eventType: 'Tailgating',
    timestamp: '02-09-2026, 10:52:04',
    isoTimestamp: '2026-09-02T10:52:04',
    fleetName: 'DHL Express',
    cluster: 'AWS',
    tripId: 'trip_ms_2026-09-02T03_40_18.882Z_DHL_RUH_8831',
    currentSpeed: 64,
    gps: '24.7136, 46.6753',
    status: 'pending'
  },
  {
    id: '4b12aa98-3310-4ecb-99df-1288b1cc90a3',
    index: 7,
    eventType: 'Driver Fatigue',
    timestamp: '02-09-2026, 10:30:19',
    isoTimestamp: '2026-09-02T10:30:19',
    fleetName: 'Careem Delivery',
    cluster: 'AWS',
    tripId: 'trip_ms_2026-09-02T03_15_00.221Z_CRM_JED_9912',
    currentSpeed: 28,
    gps: '21.5433, 39.1728',
    status: 'pending'
  },
  {
    id: '5e34ff10-09ab-4172-88ec-89ab34cd0192',
    index: 8,
    eventType: 'Stop Sign Violation',
    timestamp: '02-09-2026, 09:45:10',
    isoTimestamp: '2026-09-02T09:45:10',
    fleetName: 'Tamkeen',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T02_30_45.541Z_J1024510644_Emzli',
    currentSpeed: 22,
    gps: '24.0890, 38.1050',
    status: 'pending'
  },
  {
    id: '6c78dd32-11bc-4e89-a567-90ef12345678',
    index: 9,
    eventType: 'Lane Drift Found',
    timestamp: '02-09-2026, 09:12:33',
    isoTimestamp: '2026-09-02T09:12:33',
    fleetName: 'Aramex Saudi',
    cluster: 'AWS',
    tripId: 'trip_ms_2026-09-02T02_00_19.123Z_ARMX_MED_4019',
    currentSpeed: 55,
    gps: '24.4672, 39.6111',
    status: 'pending'
  },
  {
    id: '7d89ee43-22cd-4f90-b678-01fa23456789',
    index: 10,
    eventType: 'Forward Collision Alert',
    timestamp: '02-09-2026, 08:30:44',
    isoTimestamp: '2026-09-02T08:30:44',
    fleetName: 'Tamkeen',
    cluster: 'Alibaba',
    tripId: 'trip_ms_2026-09-02T01_15_22.901Z_J1024510644_Emzli',
    currentSpeed: 18,
    gps: '24.0780, 38.1014',
    status: 'pending'
  }
];

// Seed additional historical and today data points for robust monitoring & filters
export function generateSyntheticHistory(): EventItem[] {
  const types = [
    'Harsh Braking',
    'Speed Limit Violation',
    'Tailgating',
    'Stop Sign Violation',
    'Cellphone Distracted Driving',
    'Driver Fatigue',
    'Lane Drift Found',
    'Forward Collision Alert',
    'Camera Lens Covered',
    'Uniform non compliance'
  ];

  interface FleetMeta {
    fleetName: string;
    motherFleet?: string;
    cluster: 'Alibaba' | 'AWS';
  }

  const fleetMetas: FleetMeta[] = [
    { fleetName: 'Coca-Cola A', motherFleet: 'Coca-Cola', cluster: 'Alibaba' },
    { fleetName: 'Coca-Cola B', motherFleet: 'Coca-Cola', cluster: 'Alibaba' },
    { fleetName: 'Coca-Cola C', motherFleet: 'Coca-Cola', cluster: 'Alibaba' },
    { fleetName: 'Nova Waters', cluster: 'Alibaba' },
    { fleetName: 'Sanar', cluster: 'Alibaba' },
    { fleetName: 'Tamkeen', cluster: 'Alibaba' },
    { fleetName: 'Aramco Logistics', cluster: 'Alibaba' },
    { fleetName: 'MDC Courier', cluster: 'AWS' },
    { fleetName: 'Happicabs', cluster: 'AWS' },
    { fleetName: 'TOC', cluster: 'AWS' },
    { fleetName: 'DHL Express', cluster: 'AWS' },
    { fleetName: 'Careem Delivery', cluster: 'AWS' },
    { fleetName: 'Aramex Saudi', cluster: 'AWS' }
  ];

  const labellers = INITIAL_LABELLERS.map(l => l.name);

  const list: EventItem[] = [...INITIAL_EVENTS];

  // Generate 120 events across today (02-09-2026)
  for (let i = 11; i <= 150; i++) {
    const hour = Math.floor(Math.random() * 12); // 00:00 to 11:59
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);
    const hourStr = hour.toString().padStart(2, '0');
    const minStr = minute.toString().padStart(2, '0');
    const secStr = second.toString().padStart(2, '0');

    const isLabelled = Math.random() > 0.35;
    const labeller = isLabelled ? labellers[Math.floor(Math.random() * labellers.length)] : undefined;
    const meta = fleetMetas[Math.floor(Math.random() * fleetMetas.length)];
    const eventType = types[Math.floor(Math.random() * types.length)];

    list.push({
      id: `evt-${i.toString().padStart(4, '0')}-936a-${Math.random().toString(36).substring(2, 9)}`,
      index: i,
      eventType,
      timestamp: `02-09-2026, ${hourStr}:${minStr}:${secStr}`,
      isoTimestamp: `2026-09-02T${hourStr}:${minStr}:${secStr}`,
      fleetName: meta.fleetName,
      motherFleet: meta.motherFleet,
      cluster: meta.cluster,
      tripId: `trip_ms_2026-09-02T${hourStr}_${minStr}_${secStr}Z_${meta.fleetName.replace(/\s+/g, '_').substring(0, 5).toUpperCase()}_${i * 102}`,
      currentSpeed: Math.floor(Math.random() * 85) + 10,
      gps: `24.${Math.floor(Math.random() * 8000) + 1000}, 38.${Math.floor(Math.random() * 8000) + 1000}`,
      status: isLabelled ? 'labelled' : 'pending',
      labelledBy: labeller,
      labelledAt: isLabelled ? `02-09-2026, ${hourStr}:${(minute + 2) % 60}:${secStr}` : undefined
    });
  }

  // Generate historical events for yesterday (01-09-2026) and previous days (Aug 28-31)
  const pastDates = [
    '2026-09-01',
    '2026-08-31',
    '2026-08-30',
    '2026-08-29',
    '2026-08-28'
  ];

  let idCounter = 200;
  for (const pDate of pastDates) {
    const [year, month, day] = pDate.split('-');
    const formattedDate = `${day}-${month}-${year}`;

    // 40 events per past day
    for (let k = 0; k < 40; k++) {
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);
      const second = Math.floor(Math.random() * 60);
      const hourStr = hour.toString().padStart(2, '0');
      const minStr = minute.toString().padStart(2, '0');
      const secStr = second.toString().padStart(2, '0');

      const labeller = labellers[Math.floor(Math.random() * labellers.length)];
      const meta = fleetMetas[Math.floor(Math.random() * fleetMetas.length)];
      const eventType = types[Math.floor(Math.random() * types.length)];

      list.push({
        id: `evt-${idCounter++}-hist-${Math.random().toString(36).substring(2, 8)}`,
        index: idCounter,
        eventType,
        timestamp: `${formattedDate}, ${hourStr}:${minStr}:${secStr}`,
        isoTimestamp: `${pDate}T${hourStr}:${minStr}:${secStr}`,
        fleetName: meta.fleetName,
        motherFleet: meta.motherFleet,
        cluster: meta.cluster,
        tripId: `trip_ms_${pDate}T${hourStr}_${minStr}_${secStr}Z_${meta.fleetName.replace(/\s+/g, '_').substring(0, 5).toUpperCase()}`,
        currentSpeed: Math.floor(Math.random() * 90) + 15,
        gps: `24.${Math.floor(Math.random() * 8000) + 1000}, 38.${Math.floor(Math.random() * 8000) + 1000}`,
        status: 'labelled',
        labelledBy: labeller,
        labelledAt: `${formattedDate}, ${hourStr}:${(minute + 1) % 60}:${secStr}`
      });
    }
  }

  return list;
}
