
export const fleet = [
    { id: 'region', label: 'Region',align: 'center',},
    { id: 'VehicleId', label: 'Vehicle ID',align: 'center', },
    {
      id: 'status',
      label: 'Status', align: 'center',
    },
    {
      id: 'avgSpeed',
      label: 'Avg. Speed (Km/hrs)',align: 'center',
    },
    {
      id: 'avgPayload',
      label: 'Avg. Payload (Ton)',align: 'center',
    },
    {
      id: 'tota_payload',
      label: 'Total Distance Traveled(Km)',align: 'center',
    },
    {
      id: 'avgconsumption',
      label: 'Avg. Consumption',align: 'center',
    },
    {
      id: 'breakdown',
      label: 'Breakdown',align: 'center',
    },
    {
      id: 'currentsoc',
      label: 'Current Soc',align: 'center',
    },
    {
      id: 'estimated',
      label: 'Estimated Range',align: 'center',
    },
    {
      id: 'schedulingstatus',
      label: 'Scheduling Status',align: 'center',
    },
    {
      id: 'action',
      label: 'Action',align: 'center',minWidth: 120
    },
  ];
export const charging = [
    { id: 'region', label: 'Region',align: 'center',},
    { id: 'VehicleId', label: 'Vehicle ID',align: 'center', },
    {
      id: 'currentSoc',
      label: 'Current SoC', align: 'center',
    },
    {
      id: 'currentSoh',
      label: 'Current SoH',align: 'center',
    },
    {
      id: 'currentStatus',
      label: 'Current Status',align: 'center',
    },
    {
      id: 'lastcharging',
      label: 'Last Charging',align: 'center',
    },
    {
      id: 'charging cycle',
      label: 'Charging Cycle',align: 'center',
    },
    {
      id: 'swappingCycle',
      label: 'Swapping Cycle',align: 'center',
    },
    {
      id: 'totalunit',
      label: 'Total Unit',align: 'center',
    },
    {
      id: 'SocEstimated',
      label: 'SoC Estimated Time',align: 'center',
    },
    {
      id: 'Socunit',
      label: 'SoC Unit Consumed',align: 'center',
    },
    {
      id: 'avg.chargingtime',
      label: 'Avg. Charging Time',align: 'center',
    },
    {
      id: 'action',
      label: 'Action',align: 'center', minWidth: 120
    },
  ];
export const trip = [
    { id: 'region', label: 'Region',align: 'center',},
    { id: 'VehicleId', label: 'Vehicle ID',align: 'center', },
    {
      id: 'TotalTripDay',
      label: 'Total Trip/Day', align: 'center',
    },
    {
      id: 'TotalTripmonth',
      label: 'Total Trip/Month',align: 'center',
    },
    {
      id: 'avg.speed',
      label: 'Avg. Speed',align: 'center',
    },
    {
      id: 'avg.payload',
      label: 'Avg. Payload',align: 'center',
    },
    {
      id: 'max.payload',
      label: 'Max. Payload',align: 'center',
    },
    {
      id: 'distancetraveled',
      label: 'Distance Traveled',align: 'center',
    },
    {
      id: 'avg.breakdown',
      label: 'Avg. Breakdown',align: 'center',
    },
    {
      id: 'totaltevs',
      label: 'Total Tevs',align: 'center',
    },
    {
      id: 'tvesHandle40F',
      label: 'Tves Handle 40F',align: 'center',
    },
    {
      id: 'tvesHandle20F',
      label: 'Tves Handle 20F',align: 'center',
    },
    {
      id: 'tvesEachtrip',
      label: 'Tves Each Trip',align: 'center',
    },
    {
      id: 'action',
      label: 'Action',align: 'center',minWidth: 120
    },
  ];
export const dashboardVehicle = [
    { id: 'region', label: 'Region',   align: 'center',},
    { id: 'id', label: 'Vehicle ID',   align: 'center', },
    {
      id: 'currentstatus',
      label: 'Current Status',    align: 'center',
    },
    {
      id: 'totaltraveled',
      label: 'Total Traveled (KM)',   align: 'center',
    },
    {
      id: 'avgconsumption',
      label: 'Avg. Consumption',   align: 'center',

    },
    {
      id: 'avgconsumption',
      label: 'Total Unit Consumed',
      align: 'center',
    },
    {
      id: 'avg_payload',
      label: 'Avg. Payload (Ton)',
      align: 'center',
    },
    // {
    //   id: 'action',
    //   label: 'Action',
    //   align: 'center',
    // },
  ];
export const dashboardScheduling= [

    { id: 'id', label: 'Charging ID',   align: 'center', },
    {
      id: 'cs/ssStatus',
      label: 'CS/SS Status',    align: 'center',
    },
    {
      id: 'chargingqueue',
      label: 'Charging Queue',   align: 'center',
    },
    {
      id: 'swapping',
      label: 'Swapping Status',   align: 'center',

    },

    
    // {
    //   id: 'action',
    //   label: 'Action',
    //   align: 'center',
    // },
  ];
export const vehicleCharging = [
    { id: 'date', label: 'Date',   align: 'center',},
    { id: 'lastSoc', label: 'Last SoC',   align: 'center', },
    {
      id: 'lastSoh',
      label: 'Last SoH',    align: 'center',
    },
    {
      id: 'laststatus',
      label: 'Last Status',   align: 'center',
    },
    {
      id: 'lastcharging',
      label: 'Last Charging',   align: 'center',
    },
    {
      id: 'chargingcycle',
      label: 'Charging Cycle',   align: 'center',

    },
    {
      id: 'Swappingcycle',label: 'Swapping Cycle',
      align: 'center',
    },
    {
      id: 'totalunit',
      label: 'Total Unit',align: 'center',
    },
    {
      id: 'socestimated',
      label: 'SoC Estimated Time',align: 'center',
    },
    {
      id: 'socUnitConsumed',
      label: 'SoC Unit Consumed',align: 'center',
    },
    {
      id: 'avgchargingtime',
      label: 'Avg. Charging Time',align: 'center',
    },
  ];
export const vehicleTrip = [
  { id: 'region', label: 'Region',align: 'center',},
  {
    id: 'TotalTrip/Day',
    label: 'Total Trip/Day', align: 'center',
  },
  {
    id: 'avg.speed',
    label: 'Avg. Speed',align: 'center',
  },
  {
    id: 'avg.payload',
    label: 'Avg. Payload',align: 'center',
  },
  {
    id: 'distancetraveled',
    label: 'Distance Traveled',align: 'center',
  },
  {
    id: 'avg.breakdown',
    label: 'Avg. Breakdown',align: 'center',
  },
  {
    id: 'totaltevs',
    label: 'Total Tevs',align: 'center',
  },
  {
    id: 'tvesHandle40F',
    label: 'Tves Handle 40F',align: 'center',
  },
  {
    id: 'tvesHandle20F',
    label: 'Tves Handle 20F',align: 'center',
  },
  ];
export const vehicle = [
    { id: 'date', label: 'Date',   align: 'center',},
    {
      id: 'laststatus',
      label: 'Last Status',align: 'center',
    },
    {
      id: 'avgspeed',
      label: 'Avg. Speed (Km/hrs)', align: 'center',
    },
    {
      id: 'avgPayoad',
      label: 'Avg. Payload (Ton)', align: 'center',
    },
    {
      id: 'disatncetravel',
      label: 'Total Distance Traveled (Km)',   align: 'center',

    },
    {
      id: 'avgconsumption',
      label: 'Avg. Consumption',   align: 'center',

    },
    {
      id: 'breakdown',
      label: 'Breakdown',   align: 'center',

    },
    {
      id: 'Lastsoc',
      label: 'Last SoC',   align: 'center',

    },
    {
      id: 'Estimatedrange',
      label: 'Estimated Range',   align: 'center',

    },
  ];
export const ChargingStation = [
    { id: 'Id', label: 'Charger Station ID',   align: 'center',},
    {
      id: 'status',
      label: 'Charger Status',
      align: 'center',
    },
    {
      id: 'hubname',
      label: 'Hub Name',
      align: 'center',
    },
    {
      id: 'chargername',
      label: 'Charger Name',
      align: 'center',
    },
    {
      id: 'hostdetail',
      label: 'Host Details',   align: 'center',
    },
    {
      id: 'protocols',
      label: 'Protocols',   align: 'center',

    },
    {
      id: 'uptime',
      label: 'Uptime',   align: 'center',

    },
    {
      id: 'make',
      label: 'Make',   align: 'center',

    },
    {
      id: 'firmwareversion',
      label: 'Firmware version',   align: 'center',

    },
    {
      id: 'firmwareupdate',
      label: 'Firmware Update',   align: 'center',

    },
    {
      id: 'action',
      label: 'Action',   align: 'center',

    },
  ];
export const E_tractor = [
    { id: 'Id', label: 'E-Tractor ID',   align: 'center',},
    {
      id: 'chargingcycle',
      label: 'Charging Cycle',
      align: 'center',
    },
    {
      id: 'chargingtime',
      label: 'Charging Time (Hrs)',
      align: 'center',
    },
    {
      id: 'startsoc',
      label: 'Start SoC',
      align: 'center',
    },
    {
      id: 'endsoc',
      label: 'End SoC',   align: 'center',
    },
    {
      id: 'currentsoc',
      label: 'Current SoC',   align: 'center',

    },
    {
      id: 'chargedsoc',
      label: 'Charged SoC',   align: 'center',

    },
    {
      id: 'unitconsumed',
      label: 'Units Consumed',   align: 'center',

    },
    {
      id: 'action',
      label: 'Action',   align: 'center',

    },
  ];
export const RevenueManagement1  = [
    { id: 'Id', label: 'E-Tractor ID',   align: 'center',},
    {
      id: 'chargingcycle',
      label: 'Charging Cycle',
      align: 'center',
    },
    {
      id: 'unitconsumedcharging',
      label: 'Units Consumed',   align: 'center',
    },
    {
      id: 'swappingcycle',
      label: 'Swapping Cycle',
      align: 'center',
    },
    {
      id: 'unitconsumedswapping',
      label: 'Units Consumed',   align: 'center',
    },
    {
      id: 'totalunit',
      label: 'Total Unit',   align: 'center',

    },
    {
      id: 'selectedpackage',
      label: 'Selected Package',   align: 'center',

    },
    {
      id: 'variableunit',
      label: 'Variable Unit',   align: 'center',

    },
    {
      id: 'total',
      label: 'Total',   align: 'center',

    },
  ];
export const Battery_analysis = [
    { id: 'id', label: 'Battery ID',   align: 'center',},
    {
      id: 'status',
      label: 'Current Status',
      align: 'center',
    },
    {
      id: 'power',
      label: 'Power',
      align: 'center',
    },
    {
      id: 'volt',
      label: 'Volt',
      align: 'center',
    },
    {
      id: 'current',
      label: 'Current Battery Soc',   align: 'center',
    },
    {
      id: 'batterySoh',
      label: 'Battery SoH',   align: 'center',

    },
    {
      id: 'chargingCycle',
      label: 'Charging Cycle',   align: 'center',

    },
    {
      id: 'avgCurrent',
      label: 'Avg. Current',   align: 'center',

    },
    {
      id: 'avgVoltage',
      label: 'Avg. Voltage',   align: 'center',

    },
    {
      id: 'avgTemp',
      label: 'Avg. Temp.',   align: 'center',

    },
    {
      id: 'action',
      label: 'Action',   align: 'center',

    },
  ];
export const Charging_Station_id = [
    { id: 'date', label: 'Date',   align: 'center',},
    {
      id: 'status',
      label: 'Status',
      align: 'center',
    },
    {
      id: '--',
      label: '--',
      align: 'center',
    },
    {
      id: 'no.of Etractorcharged',
      label: 'No.of E-Tactor Charged',
      align: 'center',
      minWidth:100
    },
    {
      id: 'avg.time',
      label: 'Avg. Time (hrs)',   align: 'center',
    },
    {
      id: 'High Charging',
      label: 'High Charging Traffic',   align: 'center',

    },
  ];
export const E_Tractor_id= [
    { id: 'date', label: 'Date',   align: 'center',},
    {
      id: 'chargingcycle',
      label: 'Charging Cycle',
      align: 'center',
    },
    {
      id: 'chargingtime',
      label: 'Charging Time (Hrs)',
      align: 'center',
    },
    {
      id: 'startsoc',
      label: 'Start SoC',
      align: 'center',
    },
    {
      id: 'endsoc',
      label: 'End SoC',   align: 'center',
    },
    {
      id: 'Current SoC',
      label: 'Current SoC',   align: 'center',

    },
    {
      id: 'UnitConsumed',
      label: 'Unit Consumed',   align: 'center',

    },
  ];
export const EnergyEfficiencyData= [
    { id: 'id', label: 'CS/SS Station Id',   align: 'center',},
    {
      id: 'Region',
      label: 'Region',
      align: 'center',
    },
    {
      id: 'chargerstatus',
      label: 'Charger Status',
      align: 'center',
    },
    {
      id: 'queue',
      label: 'Queue',
      align: 'center',
    },
    {
      id: 'maxcapacity',
      label: 'Max Capacity',   align: 'center',
    },
    {
      id: 'Currentchargingload',
      label: 'Current Charging Load',   align: 'center',
    },
    {
      id: 'vehicle',
      label: 'Vehicle',   align: 'center',
    },
    {
      id: 'Last Session Started',
      label: 'Last Session Started',   align: 'center',
    },
    {
      id: 'AI arts',
      label: 'AI arts',   align: 'center',
    },
    {
      id: 'action',
      label: 'Action',   align: 'center',
    },
  ];
export const EnergyEfficiencyDataID= [
    { id: 'date', label: 'Date',   align: 'center',},
    {
      id: 'chargerstatus',
      label: 'Charger Status',
      align: 'center',
    },
    {
      id: 'queue',
      label: 'Queue',
      align: 'center',
    },
    {
      id: 'maxcapacity',
      label: 'Max Capacity',   align: 'center',
    },
    {
      id: 'Currentchargingload',
      label: 'Current Charging Load',   align: 'center',
    },
    {
      id: 'E-Tractor',
      label: 'E-Tractor',   align: 'center',
    },
    {
      id: 'Last Session Started',
      label: 'Last Session Started',   align: 'center',
    },
    {
      id: 'AI arts',
      label: 'AI arts',   align: 'center',
    },
  ];
export const SuperAdminData= [
    { id: 'mob', label: 'Mob. no.',   align: 'center',minWidth: 130},
    {
      id: 'emailid',
      label: 'Email Id',
      align: 'center',minWidth: 130
    },
    {
      id: 'location',
      label: 'Location',
      align: 'center',minWidth: 130
    },
    {
      id: 'assignRole',
      label: 'Assign Role',   align: 'center',minWidth: 130
    },
    {
      id: 'subadmin',
      label: 'Sub Admin',   align: 'center',minWidth: 130
    },
    {
      id: 'reporting Manager',
      label: 'Reporting Manager',   align: 'center',minWidth: 130
    },
    {
      id: 'action',
      label: 'Action',   align: 'center', minWidth: 30
    },

  ];
export const Tariff= [
    { id: 'id', label: 'Tariff Id',   align: 'center',minWidth: 130},
    {
      id: 'nameId',
      label: 'Tariff Name Id',
      align: 'center',minWidth: 130
    },
    {
      id: 'baserate',
      label: 'Base Rate',
      align: 'center',minWidth: 130
    },
    {
      id: 'hrs',
      label: '00:00 Hrs - 06:00 Hrs & 12:00 Hrs - 18:00 Hrs',   align: 'center',minWidth: 130
    },
    {
      id: 'hrs',
      label: '00:00 Hrs - 06:00 Hrs & 12:00 Hrs - 18:00 Hrs',   align: 'center',minWidth: 130
    },
    {
      id: 'subadmin',
      label: '12:00 Hrs - 18:00 Hrs',   align: 'center',minWidth: 130
    },
    {
      id: 'reporting Manager',
      label: '12:00 Hrs - 18:00 Hrs',   align: 'center',minWidth: 130
    },
  ];