import { Lightbulb, Fan, Tv, Lamp, LightbulbOff } from 'lucide-react';

export const iconMap = {
  Lightbulb,
  Fan,
  Tv,
  Lamp,
  LightbulbOff,
};

export type IconName = keyof typeof iconMap;