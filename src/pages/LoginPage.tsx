import { Bath, Bed, Car, Home, Lightbulb, Sofa, TreePine, Utensils } from 'lucide-react';
import '../App.css'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoginPage = () => {


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 bg-gradient-to-br  from-slate-900 via-blue-900 to-slate-800">
        <div className=" bg-slate-700 text-slate-400 bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 container w-110 h-110 mx-7 px-4 py-8 max-w-xl flex flex-col justify-start gap-4 rounded-2xl shadow-lg">
          
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
            <label >E-mail:</label>
            <Input className='p-2 mb-2' type='e-mail'></Input>
            <label >Senha:</label>
            <Input className='p-2' type='password' ></Input>
            <Button className='bg-blue-700 hover:bg-blue-800 transition-all duration-300 transform w-full p-2 cursor-pointer mt-5'>Login</Button>
          </div>
        </div>
    </div>
  )
}

export default LoginPage
