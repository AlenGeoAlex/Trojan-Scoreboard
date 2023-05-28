package me.alenalex.db.dao;

import me.alenalex.model.Chart;
import me.alenalex.model.Results;
import me.alenalex.model.Teams;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.function.Supplier;

public interface IResultDao {

    CompletableFuture<List<Results>> getAllResults();

    CompletableFuture<List<Results>> ofTeam(Teams teams);

    default CompletableFuture<List<Results>> ofTeam(String teamName){
        Teams teams = Enum.valueOf(Teams.class, teamName);
        return ofTeam(teams);
    }

    CompletableFuture<Chart> getScores();
}
