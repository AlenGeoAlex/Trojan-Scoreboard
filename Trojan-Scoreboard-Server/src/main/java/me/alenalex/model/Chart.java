package me.alenalex.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.alenalex.bootstrap.Boot;

import java.util.List;
import java.util.StringJoiner;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Chart {

    public final static Chart EMPTY = new Chart();

    public int blue;
    public int green;
    public int white;
    public int yellow;

    public void populate(List<String[]> d){
        for (String[] eachRow : d) {
            try {
                switch (eachRow[0]) {
                    case "BLUE" -> setBlue(Integer.parseInt(eachRow[1].split("\\.")[0]));
                    case "GREEN" -> setGreen(Integer.parseInt(eachRow[1].split("\\.")[0]));
                    case "WHITE" -> setWhite(Integer.parseInt(eachRow[1].split("\\.")[0]));
                    case "YELLOW" -> setYellow(Integer.parseInt(eachRow[1].split("\\.")[0]));
                    default -> {
                    }
                }
            }catch (Exception e){
                Boot.LOGGER.error(e);
            }
        }
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Chart.class.getSimpleName() + "[", "]")
                .add("blue=" + blue)
                .add("green=" + green)
                .add("white=" + white)
                .add("yellow=" + yellow)
                .toString();
    }

}
