import { Home } from 'lucide-react'


const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg">
          <Home className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
            Smart House
          </h1>
          <p className="text-slate-300 text-lg">
            Sistema de controle de luzes
          </p>
        </div>
      </div>

      
    </div>
  )
}

export default Header