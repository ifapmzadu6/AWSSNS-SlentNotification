# AWSSNS-SlentNotification

AWSSNS-SlentNotification offers A Silent Push Notification using APNS(Apple Push Notification Service).


# Config

### config/aws.json
```
{
    "accessKeyId":"YOUR_AWS_ACCESSKEYID",
    "secretAccessKey":"YOUR_AWS_SECRETACCESSKEY",
    "region":"YOUR_AWS_REGION"
}
```

### config/const.json
```
{
    "PlatformApplicationArnKey":"YOUR_PLATFORMAPPLICATIONARN",
    "TopicArnKey":"YOUR_TOPICARN"
}
```

# Message

### message.json
```
{
    "default": "default",
    "APNS": {
        "aps":{
            "content-available": 1,
            "sound": "", 
            "priority": 10
        }   
    }   
}
```

# Usage

1. `npm install`

2. `node app.js`

# Licence

[The MIT License (MIT)](https://github.com/ifapmzadu6/AWSSNS-SlentNotification/blob/master/LICENSE)
