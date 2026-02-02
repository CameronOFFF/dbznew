import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-nebula-900 flex items-center justify-center px-6">
      <div className="glow-card max-w-md w-full p-8 space-y-6">
        <div>
          <p className="text-sm text-nebula-200">RPG de navegador</p>
          <h1 className="text-3xl font-bold">Chrono Saiya</h1>
          <p className="text-sm text-nebula-300 mt-2">
            Entre no fluxo estelar, crie sua lenda e dispute temporadas.
          </p>
        </div>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Usuário ou email"
            className="w-full rounded-xl bg-nebula-700/60 px-4 py-2 text-sm"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full rounded-xl bg-nebula-700/60 px-4 py-2 text-sm"
          />
          <button className="w-full rounded-xl bg-glow-400 py-2 text-nebula-900 font-semibold">
            Entrar
          </button>
        </form>
        <div className="text-sm text-nebula-300 flex justify-between">
          <Link to="/register" className="text-glow-400">Criar conta</Link>
          <button className="text-nebula-300">Esqueci a senha</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
