declare interface Alert {
  new: boolean;
  id: string;
  severity: 'mild' | 'moderate' | 'severe';
  anomaly_reason: string;
  datetime: string;
  name: string;
}