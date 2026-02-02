import { NavLink } from "react-router-dom";
import {
  BoltIcon,
  BuildingStorefrontIcon,
  Cog6ToothIcon,
  FlagIcon,
  HomeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TrophyIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline";

const menu = [
  { label: "Dashboard", to: "/dashboard", icon: HomeIcon },
  { label: "Desafios", to: "/arena", icon: BoltIcon },
  { label: "Torneio", to: "/arena", icon: TrophyIcon },
  { label: "Sagas", to: "/sagas", icon: FlagIcon },
  { label: "Especial", to: "/quests", icon: SparklesIcon },
  { label: "Arena", to: "/arena", icon: ShieldCheckIcon },
  { label: "Quests", to: "/quests", icon: BoltIcon },
  { label: "Loja", to: "/shop", icon: BuildingStorefrontIcon },
  { label: "Clã", to: "/clan", icon: UserGroupIcon },
  { label: "Suporte", to: "/settings", icon: ChatBubbleBottomCenterTextIcon },
  { label: "Config", to: "/settings", icon: Cog6ToothIcon }
];

const SidebarMenu = () => {
  return (
    <aside className="glow-card p-5 space-y-4">
      <p className="panel-title">Comandos</p>
      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-nebula-600 text-white"
                  : "text-nebula-200 hover:bg-nebula-700/60"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarMenu;
