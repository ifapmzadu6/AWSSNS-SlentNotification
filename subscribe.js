// AWS SNS
//


var Config = require('./config/const.json');
var MessageJSON = require('./message.json');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/aws.json');
var sns = new AWS.SNS();

var endpoints = [];

getAllEndpointArn(null, function(endPoint) {

    endpoints.push(endPoint['EndpointArn']);

}, function(err) {
    if (err) { 
        console.log(err);
    }
    else {
        subscribeEndpoint(function(err) {
            if (err) {
                console.log(err)
            }
            else {
                publishSilentNotification()
            }
        })
    }
});


function getAllEndpointArn(nextToken, action, completion) {
    var params = {
        PlatformApplicationArn: Config['PlatformApplicationArnKey'],
        NextToken: nextToken
    };
    sns.listEndpointsByPlatformApplication(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            completion(err);
        }
        else {
            var endPoints = data['Endpoints'];
            for (var i=0; i<endPoints.length; i++) {
                var endPoint = endPoints[i];
                if (endPoint['Attributes']['Enabled'] == "true") {
                    action(endPoint);
                }
            }

            var nextToken = data['NextToken'];
            if (nextToken != null) {
                getAllEndpointArn(nextToken, action, completion);
            }
            else {
                completion(null);
            }
        }
    });
}


function subscribeEndpoint(completion) {
    if (endpoints.length == 0) {
        completion(null);
        return;
    }

    var endpoint = endpoints[endpoints.length-1];
    var params = {
        Protocol: 'application',
        TopicArn: Config['TopicArnKey'],
        Endpoint: endpoint
    };
    sns.subscribe(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            completion(err);
        }
        else {
            endpoints.pop();
            subscribeEndpoint(completion);
        }
    });
}


function publishSilentNotification() {
    var publishParams = {
        Message: JSON.stringify(MessageJSON),
        MessageStructure: 'json',
        TopicArn: Config['TopicArnKey']
    };
    sns.publish(publishParams, function(err, data) {
        if (err) console.log(err, err.stack);
        else     console.log(data);
    });
}

