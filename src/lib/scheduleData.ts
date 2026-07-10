export interface OperationSchedule {
  id: number;
  activity: string;
  area: string;
  schedule: string[]; // Raw strings as provided
}

export const operationSchedules: OperationSchedule[] = [
  {
    id: 1,
    activity: 'Gold Mining Operations',
    area: 'Mining',
    schedule: [
      'Monday – Sunday',
      '8:00 AM – 6:00 PM (Ethiopian Local Time)'
    ]
  },
  {
    id: 2,
    activity: 'Crushed Stone Production & Supply',
    area: 'Aggregates',
    schedule: [
      'Monday – Sunday',
      '8:00 AM – 6:00 PM (Ethiopian Local Time)'
    ]
  },
  {
    id: 3,
    activity: 'Trade & Investment Engagement',
    area: 'Trade & Investment',
    schedule: [
      'Monday – Friday',
      '8:00 AM – 6:00 PM (Ethiopian Local Time)'
    ]
  },
  {
    id: 4,
    activity: 'Strategic Partnership Discussions',
    area: 'Partnerships',
    schedule: [
      'Monday – Friday',
      'By appointment (Ethiopian Local Time)'
    ]
  }
];
