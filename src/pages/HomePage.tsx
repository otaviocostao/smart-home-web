import { Bath, Bed, Car, Home, Lightbulb, Plus, Sofa, TreePine, Utensils } from 'lucide-react';
import '../App.css'
import { useState } from 'react';
import Header from '../components/Header';
import { LightCard } from '../components/LightCard';
import { Button } from '@/components/ui/button';
import AddLampModal from '@/components/AddLampModal';

interface Light {
  id: string;
  name: string;
  room: string;
  isOn: boolean;
  icon: typeof Lightbulb;
  brightness?: number;
}

const HomePage = () => {
  const [lights, setLights] = useState<Light[]>([
    { id: '1', name: 'Main Light', room: 'Living Room', isOn: true, icon: Sofa, brightness: 80 },
    { id: '2', name: 'Ceiling Light', room: 'Kitchen', isOn: false, icon: Utensils, brightness: 60 },
    { id: '3', name: 'Bedside Lamp', room: 'Bedroom', isOn: true, icon: Bed, brightness: 40 },
    { id: '4', name: 'Reading Light', room: 'Bedroom', isOn: false, icon: Bed, brightness: 70 },
    { id: '5', name: 'Bathroom Light', room: 'Bathroom', isOn: false, icon: Bath, brightness: 90 },
    { id: '6', name: 'Garage Light', room: 'Garage', isOn: false, icon: Car, brightness: 100 },
    { id: '7', name: 'Garden Light', room: 'Garden', isOn: true, icon: TreePine, brightness: 30 },
  ]);

  interface LampFormData {
    name: string;
    esp32Id: string;
    relayPin: number | '';
    room?: string;
  }

  const MOCK_ESP32_LIST = [
  { id: 'esp32-sala-_hG8sJ', name: 'ESP32 da Sala' },
  { id: 'esp32-cozinha-kLp2qR', name: 'ESP32 da Cozinha' },
  { id: 'esp32-quarto-aBcV1w', name: 'ESP32 do Quarto' },
];

  const toggleLight = (id: string) => {
    setLights(lights.map(light => 
      light.id === id ? { ...light, isOn: !light.isOn } : light
    ));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    console.log('Abrindo modal para adicionar nova lâmpada');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLampSubmit = async (formData: LampFormData) => {
    console.log('Novos dados da lâmpada:', formData);
    
    try {

      console.log('Lâmpada salva com sucesso!');
      
    } catch (error) {
      console.error('Erro ao salvar a lâmpada:', error);
      throw error;
    }
  };

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
            {lights.map((light) => (
              <LightCard
                key={light.id}
                light={light}
                onToggle={() => toggleLight(light.id)}
              />
            ))}
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
