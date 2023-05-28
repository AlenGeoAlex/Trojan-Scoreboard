package me.alenalex.http.dto;

import lombok.*;
import me.alenalex.model.Results;
import me.alenalex.model.Teams;

import java.util.ArrayList;
import java.util.List;

public class DataDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @ToString
    public static final class FormData {
        public String eventName;
        public int point;
        public Integer position;
        public Teams team;


    }


    @Getter
    @Setter
    @NoArgsConstructor
    @ToString
    @EqualsAndHashCode
    public static final class ResultFormattedDto {
        public List<Results> blue = new ArrayList<>();
        public List<Results> yellow = new ArrayList<>();
        public List<Results> green = new ArrayList<>();
        public List<Results> white = new ArrayList<>();
        public List<Results> unknown = new ArrayList<>();



    }

}
