import { Plus} from 'lucide-react';
import { Lamp, Fan, Tv, AirVent, LucideIcon } from 'lucide-react';
import '../App.css'
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { LightCard } from '../components/LightCard';
import { Button } from '@/components/ui/button';
import AddLampModal from '@/components/AddLampModal';

import { addLamp, onLampsChange, toggleLampState } from '@/services/lampService';
import { Light } from '@/types';
const iconMap: { [key: string]: LucideIcon } = {
  lamp: Lamp,
  fan: Fan,
  tv: Tv,
  airvent: AirVent
};

const DefaultIcon = Lamp;

interface LampFormData {
  name: string;
  esp32Id: string;
  relayPin: number | '';
  room?: string;
  iconName: string;
}

const HomePage = () => {

  const [lights, setLights] = useState<Light[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onLampsChange((fetchedLights) => {
      setLights(fetchedLights);
    });

    return () => {
      unsubscribe();
    };
  }, []); 

  const toggleLight = (id: string, currentIsOn: boolean) => {
    
    toggleLampState(id, currentIsOn).catch(err => console.error("Falha ao alterar estado", err));
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleLampSubmit = async (formData: LampFormData) => {
    await addLamp(formData);
  };

  const MOCK_ESP32_LIST = [
    { id: 'esp32-sala-_hG8sJ', name: 'ESP32 da Sala' },
    { id: 'esp32-cozinha-kLp2qR', name: 'ESP32 da Cozinha' },
    { id: 'esp32-quarto-aBcV1w', name: 'ESP32 do Quarto' },
  ];

  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header/>
        <div className='flex justify-between mb-5'>
          <h1 className='text-white text-xl '>Aparelhos conectados:</h1>
          <Button onClick={handleOpenModal} size="lg" className='
          cursor-pointer bg-amber-400 
          hover:bg-amber-500 transition-discrete'><Plus/>Adicionar</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lights.map((light) => {
            const IconComponent = iconMap[light.iconName] || DefaultIcon;
            return (
              <LightCard
                key={light.id}
                light={{...light, icon: IconComponent }}
                onToggle={() => toggleLight(light.id, light.isOn)}
              />
            )
          })}
        </div>
        <AddLampModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleLampSubmit}
          esp32List={MOCK_ESP32_LIST}
        />
      </div>


    </div>
  )
}

export default HomePage
