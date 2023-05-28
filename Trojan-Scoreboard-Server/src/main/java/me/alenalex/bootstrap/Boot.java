package me.alenalex.bootstrap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import me.alenalex.TScoreboardServer;
import me.alenalex.constants.FlagConstants;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.io.IoBuilder;

import java.io.File;
import java.nio.file.Paths;
import java.util.HashMap;

public final class Boot {

    private static TScoreboardServer INSTANCE;
    public static final String DATA_FOLDER_PATH;

    public static final Logger LOGGER;

    public static final Gson GSON;

    private static final Thread SHUTDOWN_THREAD = new Thread(Boot::exit);

    private static BootFlags FLAGS;

    static {
        LOGGER = LogManager.getLogger("TScoreboard");

        DATA_FOLDER_PATH = Paths.get("").toAbsolutePath().normalize().toString();

        LOGGER.info("Data folder has been set to "+DATA_FOLDER_PATH);

        GSON = new GsonBuilder()
                .serializeNulls()
                .setPrettyPrinting()
                .create();
    }

    public static void main(String[] args){
        try {
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
            }catch (Exception e){
                e.printStackTrace();
            }

            System.setOut(IoBuilder.forLogger(LOGGER).setLevel(Level.INFO).buildPrintStream());
            System.setErr(IoBuilder.forLogger(LOGGER).setLevel(Level.ERROR).buildPrintStream());

            if(FLAGS != null)
                throw new IllegalStateException("Startup flags were already initialized!");

            FLAGS = BootFlags.init(args, FlagConstants.SERVER_PORT);

            if(INSTANCE != null)
                throw new IllegalStateException("Scoreboard backend is already initialized!");


            INSTANCE = new TScoreboardServer(LOGGER);
            try {
                INSTANCE.init();
            }catch (Exception e){
                e.printStackTrace();
            }
            Runtime.getRuntime().addShutdownHook(SHUTDOWN_THREAD);

        }catch (Exception e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static BootFlags getStartupFlags(){
        return FLAGS;
    }

    public static void exit(String message){

        if(message != null){
            LOGGER.info(message);
        }
        if(INSTANCE != null){
            INSTANCE.stop();
        }

        SHUTDOWN_THREAD.stop();

        System.exit(-1);
    }

    public static void exit(){
        exit(null);
    }

    public static TScoreboardServer getServer() {
        return INSTANCE;
    }

    public static class BootFlags extends HashMap<String, String> {
        public static BootFlags init(String[] args, String... validators) throws Exception {
           return new BootFlags(args, validators);
        }

        private BootFlags(String[] args, String... validators) throws Exception {
            process(args);
            validate(validators);
        }

        private void validate(String... validators) throws Exception {
            for (String requirement : validators) {
                if(!containsKey(requirement))
                    throw new Exception(requirement+" is a strict parameter! Pass it as a startup argument...");
            }
        }


        private void process(String[] args){
            if(args.length == 0)
                return;

            for (String eachArg : args) {
                String[] keyValue = eachArg.split("=");
                if(keyValue.length != 2)
                    continue;

                super.put(keyValue[0], keyValue[1]);
            }

            Boot.LOGGER.info("Loaded "+size()+" boot flags");
        }



    }
}
