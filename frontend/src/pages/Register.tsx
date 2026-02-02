import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen bg-nebula-900 flex items-center justify-center px-6">
      <div className="glow-card max-w-md w-full p-8 space-y-6">
        <div>
          <p className="text-sm text-nebula-200">Nova conta</p>
          <h1 className="text-3xl font-bold">Chrono Saiya</h1>
          <p className="text-sm text-nebula-300 mt-2">
            Cadastre-se para desbloquear personagens e recompensas diárias.
          </p>
        </div>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Usuário"
            className="w-full rounded-xl bg-nebula-700/60 px-4 py-2 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl bg-nebula-700/60 px-4 py-2 text-sm"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full rounded-xl bg-nebula-700/60 px-4 py-2 text-sm"
          />
          <button className="w-full rounded-xl bg-glow-400 py-2 text-nebula-900 font-semibold">
            Criar conta
          </button>
        </form>
        <div className="text-sm text-nebula-300 flex justify-between">
          <Link to="/" className="text-glow-400">Já tenho conta</Link>
          <button className="text-nebula-300">Termos</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
