import ballerina/log;
import ballerina/time;

public function main() returns error? {
    time:Utc now = time:utcNow();
    log:printInfo("Scheduled task ran", timestamp = time:utcToString(now));
}