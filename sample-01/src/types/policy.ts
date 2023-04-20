export type PrintedType = 'FAILED' | 'OK';

export interface PolicyType {
  description: string;
  name: string;
  policy_id: number;
}

export interface PrintResponseType {
  'job_number': number;
  file: string;
  printed: PrintedType;
}