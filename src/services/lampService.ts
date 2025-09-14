import { ref, onValue, set, push, update } from 'firebase/database';
import { Light } from '../types';
import { Unsubscribe } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';

interface LampFormData {
  name: string;
  esp32Id: string;
  relayPin: number | '';
  room?: string;
  iconName: string;
}

// 1. FUNÇÃO PARA ADICIONAR UMA NOVA LÂMPADA
export const addLamp = async (formData: LampFormData): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado.");

  const lampsListRef = ref(db, `users/${user.uid}/lamps`);
  const newLampRef = push(lampsListRef); // Gera um ID único

  const newLampData = {
    name: formData.name,
    room: formData.room || 'Não definido',
    esp32Id: formData.esp32Id,
    relayPin: Number(formData.relayPin),
    icon: formData.iconName || 'Lightbulb',
    state: {
      on: false,
    },
  };

  await set(newLampRef, newLampData);
};

// 2. FUNÇÃO PARA LIGAR/DESLIGAR UMA LÂMPADA
export const toggleLampState = async (lampId: string, currentState: boolean): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado.");

  // Referência direta ao objeto de estado da lâmpada
  const lampStateRef = ref(db, `users/${user.uid}/lamps/${lampId}/state`);
  
  // `update` é mais eficiente pois altera apenas o campo especificado
  await update(lampStateRef, {
    on: !currentState,
  });
};

// 3. FUNÇÃO PARA OUVIR AS MUDANÇAS NAS LÂMPADAS EM TEMPO REAL
export const onLampsChange = (callback: (lamps: Light[]) => void): Unsubscribe => {
  const user = auth.currentUser;
  if (!user) {
    console.error("Usuário não está logado para buscar as lâmpadas.");
    return () => {}; // Retorna uma função de unsubscribe vazia
  }

  const lampsRef = ref(db, `users/${user.uid}/lamps`);

  // `onValue` cria um listener que dispara sempre que os dados mudam
  const unsubscribe = onValue(lampsRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      
      // Transforma o objeto do Firebase em um array que o seu front-end entende
      const lampsArray: Light[] = Object.entries(data).map(([id, dbLamp]: [string, any]) => ({
        id: id,
        name: dbLamp.name,
        room: dbLamp.room,
        isOn: dbLamp.state.on, // Mapeia `state.on` para `isOn`
        iconName: dbLamp.icon, // Mantém o nome do ícone como string
        // Adicione outras propriedades se necessário
      }));
      callback(lampsArray);
    } else {
      // Se não houver lâmpadas, retorna um array vazio
      callback([]);
    }
  });

  return unsubscribe;
};