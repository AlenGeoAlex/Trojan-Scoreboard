package me.alenalex.db.dao;

import com.j256.ormlite.dao.BaseDaoImpl;
import com.j256.ormlite.dao.GenericRawResults;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.DatabaseTableConfig;
import me.alenalex.bootstrap.Boot;
import me.alenalex.model.Chart;
import me.alenalex.model.Results;
import me.alenalex.model.Teams;

import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.function.Supplier;

public class ResultDao extends BaseDaoImpl<Results, Long> implements IResultDao {
    public ResultDao(Class<Results> dataClass) throws SQLException {
        super(dataClass);
    }

    public ResultDao(ConnectionSource connectionSource, Class<Results> dataClass) throws SQLException {
        super(connectionSource, dataClass);
    }

    public ResultDao(ConnectionSource connectionSource, DatabaseTableConfig<Results> tableConfig) throws SQLException {
        super(connectionSource, tableConfig);
    }

    @Override
    public CompletableFuture<List<Results>> getAllResults() {
        return CompletableFuture.supplyAsync(new Supplier<List<Results>>() {
            @Override
            public List<Results> get() {
                try {
                    return ResultDao.super.queryForAll();
                } catch (SQLException e) {
                    return Collections.emptyList();
                }
            }
        });
    }

    @Override
    public CompletableFuture<List<Results>> ofTeam(Teams teams) {
        return CompletableFuture.supplyAsync(new Supplier<List<Results>>() {
            @Override
            public List<Results> get() {
                try {
                    return ResultDao.super.queryBuilder()
                            .where()
                            .eq("team", teams.name())
                            .query();
                } catch (SQLException e) {
                    return Collections.emptyList();
                }
            }
        });
    }

    @Override
    public CompletableFuture<Chart> getScores() {
        return CompletableFuture.supplyAsync(new Supplier<Chart>() {
            @Override
            public Chart get() {
                Chart chart = new Chart();
                try (GenericRawResults<String[]> genericRawResults = ResultDao.super.queryRaw("SELECT team, SUM(point) as points FROM result as points GROUP BY team;")) {
                    chart.populate(genericRawResults.getResults());
                }catch (Exception e){
                    Boot.LOGGER.error(e);
                }
                return chart;
            }
        });
    }


}
