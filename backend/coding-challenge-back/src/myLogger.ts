import { ConsoleLogger, Logger } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { WriteStream } from "node:fs";

export class MyLogger extends ConsoleLogger {
    private static readonly loggingLevels = ["error", "warn", "log", "verbose", "debug"];
    private static level: string = "log";
    private static file: WriteStream;
    protected context: string;

    public constructor(context?: string) {
        super(context);
    }

    /**
     * Change the logging level
     * @param {string} level the new logging level
     * @throws Error if the level doesn't exists
     */
    public static setLevel(level: string) {
        if (!this.loggingLevels.includes(level)) {
            throw new Error("Invalid level : " + level + ". Available levels are " + this.loggingLevels)
        }
        this.level = level;
    }

    public static setFile(file: string) {
        if (!fs.existsSync(path.dirname(file))) {
            fs.mkdirSync(path.dirname(file), { recursive: true })
        }
        this.file = fs.createWriteStream(file);
        this.file.on('error', function(err) {
            if (this.file) {
                this.file.end();
                this.file = undefined
            }
            if (err.stack) {
                process['stderr'].write(err.stack);
            } else {
                process['stderr'].write(err.name + ": " + err.message);
            }
        });
    }

    /**
     * Log an error message if this level is enable.
     * @param {string} message message to log
     * @param {string} [trace] error trace
     */
    public error(message: string, trace?): void {
        if (this.isEnable("error")) {
            this.printMessages([message], this.context, "error");
            if (MyLogger.file) {
                if (trace) {
                    MyLogger.file.write("[ERROR]  -  " + this.getTimestamp() + (this.context ? " - [" + this.context + "] " : " - ") + message + ", see full trace:\n\t" + trace + (trace instanceof String ? "" : "\n"));
                } else {
                    MyLogger.file.write("[ERROR]  -  " + this.getTimestamp() + (this.context ? " - [" + this.context + "] " : " - ") + message);
                }
            }
        }
    }

    /**
     * Log a warn message if this level is enable.
     * @param {string} message message to log
     */
    public warn(message: string): void {
        if (this.isEnable("warn")) {
            this.printMessages([message], this.context, "warn");
            if (MyLogger.file) {
                if (!message.endsWith("\n")) {
                    message += "\n";
                }
                MyLogger.file.write("[WARN]  -  " + this.getTimestamp() + (this.context ? " - [" + this.context + "] " : " - ") + message);
            }
        }
    }
    
    /**
     * Log a log message if this level is enable.
     * @param {string} message message to log
     */
    public log(message: string): void {
        if (this.isEnable("log")) {
            this.printMessages([message], this.context, "log");
            if (MyLogger.file) {
                if (!message.endsWith("\n")) {
                    message += "\n";
                }
                MyLogger.file.write("[LOG]  -  " + this.getTimestamp() + (this.context ? " - [" + this.context + "] " : " - ") + message);
            }
        }
    }

    /**
     * Log a verbose message if this level is enable.
     * @param {string} message message to log
     */
    public verbose(message: string): void {
        if (this.isEnable("verbose")) {
            this.printMessages([message], this.context, "verbose");
            if (MyLogger.file) {
                if (!message.endsWith("\n")) {
                    message += "\n";
                }
                MyLogger.file.write("[VERBOSE]  -  " + this.getTimestamp() + (this.context ? " - [" + this.context + "] " : " - ") + message);
            }
        }
    }

    /**
     * Log a debug message if this level is enable.
     * @param {string} message message to log
     */
    public debug(message: string): void {
        if (this.isEnable("debug")) {
            this.printMessages([message], this.context, "debug");
            if (MyLogger.file) {
                if (!message.endsWith("\n")) {
                    message += "\n";
                }
                MyLogger.file.write("[DEBUG]  -  " + this.getTimestamp() + (this.context ? " - [" + this.context + "] " : " - ") + message);
            }
        }
    }

    /**
     * Returns all the available levels
     * @returns all the available levels
     */
    public getLogLevels(): string[] {
        return MyLogger.loggingLevels;
    }

    /**
     * Returns the current logging level
     * @returns the current logging leven
     */
    public getLevel(): string {
        return MyLogger.level;
    }

    /**
     * Returns whether or not the given logging level is enable.
     * @param {string} level logging level to test
     * @returns true if the given level is enable, otherwise false
     */
    public isEnable(level: string) {
        return (MyLogger.loggingLevels.indexOf(level) <= MyLogger.loggingLevels.indexOf(MyLogger.level)) && MyLogger.loggingLevels.includes(level);
    }
}