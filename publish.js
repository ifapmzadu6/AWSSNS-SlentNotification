// AWS SNS
//


var Config = require('./config/const.json');
var MessageJSON = require('./message.json');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/aws.json');
var sns = new AWS.SNS();


publishSilentNotification()

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

