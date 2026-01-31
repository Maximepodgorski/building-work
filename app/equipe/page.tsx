"use client";

import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { MOCK_PLAYERS } from "@/lib/data/players";

export default function EquipePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlayers = MOCK_PLAYERS.filter((player) => {
    const query = searchQuery.toLowerCase();
    return (
      player.name.toLowerCase().includes(query) ||
      player.department.toLowerCase().includes(query)
    );
  });

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          Équipe
        </h1>

        {/* Search */}
        <div className="mb-6">
          <Input
            type="search"
            placeholder="Rechercher par nom ou département..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Rechercher des membres de l'équipe"
          />
        </div>

        {/* Team Members Grid */}
        {filteredPlayers.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-secondary">Aucun membre trouvé</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPlayers.map((player) => (
              <Card key={player.id} variant="elevated" className="p-4">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={player.avatar}
                    alt=""
                    className="w-16 h-16 rounded-full flex-shrink-0"
                    loading="lazy"
                  />

                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-primary truncate">
                      {player.name}
                    </h2>
                    <p className="text-sm text-secondary truncate mb-2">
                      {player.department}
                    </p>

                    <div className="flex gap-4 text-xs">
                      <div>
                        <span className="font-bold text-primary">
                          {player.gamesPlayed}
                        </span>
                        <span className="text-secondary ml-1">parties</span>
                      </div>
                      <div>
                        <span className="font-bold text-primary">
                          {player.averageScore.toFixed(1)}
                        </span>
                        <span className="text-secondary ml-1">moy.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Results Count */}
        {searchQuery && (
          <p className="text-center text-sm text-secondary mt-6" role="status" aria-live="polite">
            {filteredPlayers.length} membre{filteredPlayers.length !== 1 ? "s" : ""} trouvé
            {filteredPlayers.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </PageContainer>
  );
}
