import { Bath, Bed, Car, Home, Lightbulb, Sofa, TreePine, Utensils } from 'lucide-react';
import './App.css'
import { useState } from 'react';
import Header from './components/Header';

interface Light {
  id: string;
  name: string;
  room: string;
  isOn: boolean;
  icon: typeof Lightbulb;
  brightness?: number;
}

const App = () => {
  const [lights, setLights] = useState<Light[]>([
    { id: '1', name: 'Main Light', room: 'Living Room', isOn: true, icon: Sofa, brightness: 80 },
    { id: '2', name: 'Ceiling Light', room: 'Kitchen', isOn: false, icon: Utensils, brightness: 60 },
    { id: '3', name: 'Bedside Lamp', room: 'Bedroom', isOn: true, icon: Bed, brightness: 40 },
    { id: '4', name: 'Reading Light', room: 'Bedroom', isOn: false, icon: Bed, brightness: 70 },
    { id: '5', name: 'Bathroom Light', room: 'Bathroom', isOn: false, icon: Bath, brightness: 90 },
    { id: '6', name: 'Garage Light', room: 'Garage', isOn: false, icon: Car, brightness: 100 },
    { id: '7', name: 'Garden Light', room: 'Garden', isOn: true, icon: TreePine, brightness: 30 },
    { id: '8', name: 'Hallway Light', room: 'Hallway', isOn: false, icon: Home, brightness: 50 },
  ]);

  const toggleLight = (id: string) => {
    setLights(lights.map(light => 
      light.id === id ? { ...light, isOn: !light.isOn } : light
    ));
  };

  const toggleAllLights = () => {
    const anyLightOn = lights.some(light => light.isOn);
    setLights(lights.map(light => ({ ...light, isOn: !anyLightOn })));
  };

  const lightsOn = lights.filter(light => light.isOn).length;
  const totalLights = lights.length;
  const energySaved = Math.round((totalLights - lightsOn) * 8.5)


  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header/>
      </div>
    </div>
  )
}

export default App
