package me.alenalex.model;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;
import lombok.Getter;
import lombok.ToString;
import me.alenalex.db.dao.ResultDao;
import me.alenalex.http.dto.DataDto;

import java.util.Objects;

@Getter
@ToString
@DatabaseTable(tableName = "result", daoClass = ResultDao.class)
public class Results {

    public static Results fromFormData(DataDto.FormData data){
        Results results = new Results();
        results.itemName = data.eventName;
        if(data.team == null)
            results.team = Teams.UNKNOWN;
        else results.team = data.team;
        results.point = data.point;
        results.position = Objects.requireNonNullElse(data.position, 0);
        return results;
    }

    public Results() {
    }


    @DatabaseField(generatedId = true)
    public long id;

    @DatabaseField(canBeNull = true)
    public String itemName;

    @DatabaseField
    public int point;

    @DatabaseField(defaultValue = "0")
    public int position;

    @DatabaseField
    public Teams team;





}
