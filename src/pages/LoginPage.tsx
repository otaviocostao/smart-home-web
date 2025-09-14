import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Home } from 'lucide-react';
import '../App.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from '@/services/authService'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha o e-mail e a senha.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      navigate('/'); 
    } catch (err: any) {
      let errorMessage = 'Ocorreu um erro ao tentar fazer login.';
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'E-mail ou senha inválidos.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'O formato do e-mail é inválido.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Acesso bloqueado temporariamente. Tente novamente mais tarde.';
          break;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="bg-slate-700 text-slate-400 bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 container w-110 h-110 mx-7 px-4 py-8 max-w-xl flex flex-col justify-start gap-4 rounded-2xl shadow-lg">
        
        <div className='flex gap-2 items-center justify-center mb-10'>
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg">
            <Home className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              Smart Home
            </h1>
          </div>
        </div>

        <div className='flex-col items-center justify-center align-middle'>
          <label htmlFor="email">E-mail:</label>
          <Input
            id="email"
            className='p-2 mb-2'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <label htmlFor="password">Senha:</label>
          <Input
            id="password"
            className='p-2'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          
          {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}

          <Button 
            className='bg-blue-700 hover:bg-blue-800 transition-all duration-300 transform w-full p-2 cursor-pointer mt-5 disabled:bg-blue-900 disabled:cursor-not-allowed'
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Login'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;