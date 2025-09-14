import React, { useState } from 'react';
import { Button } from './ui/button';

interface LampFormData {
  name: string;
  esp32Id: string;
  relayPin: number | '';
  room?: string;
}

interface AddLampModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LampFormData) => Promise<void>;
  esp32List: { id: string; name: string }[]; 
}

export const AddLampModal: React.FC<AddLampModalProps> = ({ isOpen, onClose, onSubmit, esp32List }) => {
  const [formData, setFormData] = useState<LampFormData>({
    name: '',
    esp32Id: esp32List.length > 0 ? esp32List[0].id : '',
    relayPin: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'relayPin' ? (value === '' ? '' : parseInt(value, 10)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.esp32Id || formData.relayPin === '') {
        setError('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit(formData);
      onClose(); 
    } catch (err) {
      setError('Falha ao cadastrar a lâmpada. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div onClick={onClose} className="fixed inset-0 p-4 bg-gray-800/50 flex justify-center items-center z-50 text-white">
      <div onClick={(e) => e.stopPropagation()} 
      className="bg-slate-700 text-slate-400 bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Adicionar Nova Lâmpada</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white font-medium mb-1">Nome da Lâmpada</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="esp32Id" className="block font-medium mb-1">Dispositivo (ESP32)</label>
            <select
              id="esp32Id"
              name="esp32Id"
              value={formData.esp32Id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {esp32List.map(esp => (
                <option key={esp.id} value={esp.id}>{esp.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="relayPin" className="block font-medium mb-1">Pino do Relé</label>
            <input
              type="number"
              id="relayPin"
              name="relayPin"
              value={formData.relayPin}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex justify-end gap-4 mt-6">
            <Button type='button' onClick={onClose} variant={"secondary"} className='cursor-pointer'>Cancelar</Button>
            <Button type="submit" disabled={isLoading} 
            className=' cursor-pointer bg-amber-400 hover:bg-amber-500 transition-discrete' variant={"default"}>
                {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                {isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLampModal
