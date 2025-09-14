import { auth } from '@/firebase/firebase';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

/**
 * Faz o login de um usuário com e-mail e senha.
 * @param email - O e-mail do usuário.
 * @param password - A senha do usuário.
 * @returns Uma promessa que resolve quando o login é bem-sucedido.
 */
export const signIn = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // Re-lança o erro para que o componente da UI possa tratá-lo
    throw error;
  }
};

/**
 * Cadastra um novo usuário com e-mail e senha.
 * @param email - O e-mail do usuário.
 * @param password - A senha do usuário.
 * @returns Uma promessa que resolve quando o cadastro é bem-sucedido.
 */
export const signUp = async (email: string, password: string): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

/**
 * Desloga o usuário atualmente autenticado.
 * @returns Uma promessa que resolve quando o logout é concluído.
 */
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

/**
 * Registra um "ouvinte" que é chamado sempre que o estado de autenticação do usuário muda.
 * Essencial para gerenciar o estado de login em toda a aplicação.
 * @param callback - A função a ser chamada com o objeto do usuário (ou null se deslogado).
 * @returns Uma função para cancelar a inscrição do ouvinte (unsubscribe).
 */
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};