import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 items-center text-white justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-200 mb-4">Oops! Página não encontrada.  </p>
        <a href="/">
            <Button className='bg-blue-700 hover:bg-blue-800 transition-all duration-300 transform p-5 cursor-pointer mt-2' size="lg">Voltar para o início</Button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
