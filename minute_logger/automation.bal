import ballerina/log;
import ballerina/http;

public function main() returns error? {
    http:Client api = check new ("https://official-joke-api.appspot.com");
    json|error joke = api->/nonexistent_endpoint;
    if joke is error {
        log:printError("Failed to fetch joke", 'error = joke);
    } else {
        log:printInfo("Fetched a joke", data = joke);
    }
}