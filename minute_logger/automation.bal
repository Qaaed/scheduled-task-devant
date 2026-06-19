import ballerina/log;
import ballerina/http;

public function main() returns error? {
    http:Client api = check new ("https://official-joke-api.appspot.com");
    json joke = check api->/nonexistent_endpoint;  // 404 -> error
    log:printInfo("Fetched a joke", data = joke);
}