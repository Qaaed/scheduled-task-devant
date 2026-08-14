import ballerina/log;
import ballerina/http;

public function main() returns error? {
    http:Client api = check new ("https://official-joke-api.appspot.com");
    json|error joke = api->/nonexistent_endpoint;
    if joke is error {
        log:printError("Failed to fetch jokes", 'error = joke);
    } else {
        log:printInfo("Fetched a funny joke", data = joke);
    }
}