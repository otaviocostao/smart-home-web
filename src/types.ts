import { LucideIcon } from 'lucide-react';

export interface Light {
  id: string;
  name: string;
  room: string;
  isOn: boolean;
  iconName: string;
}