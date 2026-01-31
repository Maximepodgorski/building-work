"use client";

import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import Card from "@/components/ui/Card";
import { useLeaderboardStore, TimeFilter } from "@/lib/store/leaderboardStore";
import { cn } from "@/lib/utils/cn";

export default function ClassementPage() {
  const { filter, setFilter, getFilteredPlayers } = useLeaderboardStore();
  const players = getFilteredPlayers();

  const filters: { value: TimeFilter; label: string }[] = [
    { value: "week", label: "Semaine" },
    { value: "month", label: "Mois" },
    { value: "all", label: "Tout temps" }
  ];

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          Classement
        </h1>

        {/* Filters */}
        <div className="flex gap-2 mb-6" role="group" aria-label="Filtres de période">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "touch-target flex-1 px-4 py-2 rounded-lg font-semibold transition-all text-sm",
                filter === f.value
                  ? "bg-primary text-background"
                  : "bg-background-light text-secondary hover:bg-gray-200"
              )}
              aria-pressed={filter === f.value}
              aria-label={`Afficher le classement de ${f.label.toLowerCase()}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Top 3 Highlighted */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {players.slice(0, 3).map((player, index) => (
            <Card
              key={player.id}
              variant="elevated"
              className="text-center p-4"
            >
              <div className="text-2xl mb-2">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
              </div>
              <p className="font-semibold text-xs truncate mb-1">
                {player.name.split(" ")[0]}
              </p>
              <p className="text-lg font-bold text-primary">{player.totalPoints}</p>
              <p className="text-xs text-secondary">{player.gamesPlayed} parties</p>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <Card variant="elevated">
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Classement des joueurs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-secondary">
                    Rang
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-secondary">
                    Joueur
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-secondary">
                    Points
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-secondary">
                    Parties
                  </th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr
                    key={player.id}
                    className={cn(
                      "border-b border-gray-100 last:border-0",
                      index < 3 && "bg-accent-positive/5"
                    )}
                  >
                    <td className="py-3 px-2">
                      <span className="font-bold text-secondary">#{index + 1}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={player.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full"
                          loading="lazy"
                        />
                        <div>
                          <p className="font-semibold text-primary">{player.name}</p>
                          <p className="text-xs text-secondary">{player.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className="font-bold text-primary">{player.totalPoints}</span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className="text-secondary">{player.gamesPlayed}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
