const TopRankWidget = () => {
  const ranks = [
    { name: "Lyra Nova", stat: "ELO 1720" },
    { name: "Zenith Kuro", stat: "ELO 1689" },
    { name: "Oris Vale", stat: "ELO 1655" },
    { name: "Mira Flux", stat: "ELO 1620" },
    { name: "Renn Vahl", stat: "ELO 1592" }
  ];

  return (
    <div className="glow-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="panel-title">Top Arena</p>
        <span className="text-xs text-nebula-300">Season 3</span>
      </div>
      <ul className="space-y-2 text-sm">
        {ranks.map((rank, index) => (
          <li key={rank.name} className="flex items-center justify-between">
            <span className="text-nebula-200">#{index + 1} {rank.name}</span>
            <span className="text-glow-400">{rank.stat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRankWidget;
