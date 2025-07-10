import { Lightbulb, LucideIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface Light {
  id: string;
  name: string;
  room: string;
  isOn: boolean;
  icon: LucideIcon;
  brightness?: number;
}

interface LightCardProps {
  light: Light;
  onToggle: () => void;
}

export const LightCard = ({ light, onToggle }: LightCardProps) => {
  const IconComponent = light.icon;

  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
        ${light.isOn 
          ? 'bg-gradient-to-br from-amber-400/20 to-yellow-500/20 border border-amber-400/30 shadow-lg shadow-amber-500/20' 
          : 'bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30'
        }
        backdrop-blur-sm
      `}
    >
      {light.isOn && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-yellow-500/10 animate-pulse" />
      )}
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`
            p-3 rounded-xl transition-all duration-300
            ${light.isOn 
              ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-lg shadow-amber-500/30' 
              : 'bg-slate-700 text-slate-400'
            }
          `}>
            <IconComponent className="w-6 h-6" />
          </div>
          
          <Switch
            checked={light.isOn}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-amber-500 cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <h3 className={`font-semibold text-lg ${light.isOn ? 'text-white' : 'text-slate-300'}`}>
            {light.name}
          </h3>
          <p className={`text-sm ${light.isOn ? 'text-amber-100' : 'text-slate-400'}`}>
            {light.room}
          </p>
          
          {light.brightness && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs ${light.isOn ? 'text-amber-200' : 'text-slate-500'}`}>
                  Brightness
                </span>
                <span className={`text-xs font-medium ${light.isOn ? 'text-white' : 'text-slate-400'}`}>
                  {light.brightness}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    light.isOn ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : 'bg-slate-600'
                  }`}
                  style={{ width: `${light.brightness}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Status indicator */}
        <div className="flex items-center mt-4 gap-2">
          <div className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${light.isOn ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-slate-500'}
          `} />
          <span className={`text-xs font-medium ${light.isOn ? 'text-green-400' : 'text-slate-500'}`}>
            {light.isOn ? 'On' : 'Off'}
          </span>
        </div>
      </div>
    </div>
  );
};