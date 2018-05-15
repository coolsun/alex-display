/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
var http = require('http');
//var server_domain = "localhost";
//var server_port="1337";
let server_domain = "showneo.com";
let server_port="80";
let client_id_one="";
let SKILL_NAME = 'Show Neo';
let show_neo_version ='';
let speechText='';
let repromtText='';

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    show_neo_version = '0.1';
    console.log('version:'+handlerInput.requestEnvelope.version);
    console.log('applicationId:'+handlerInput.requestEnvelope.session.application.applicationId);
    console.log('userId:'+handlerInput.requestEnvelope.session.user.userId);
    console.log('deviceId:'+handlerInput.requestEnvelope.context.System.device.deviceId);
    speechText = `Welcome to the Alexa show neo kit.  You can use your Alexa echo
    to control any browser on your your display devices like TV, mobile pads, or phones.`;
    repromtText = speechText.valueOf();
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromtText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
  handle(handlerInput) {
    const speechText = 'Hello';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to Selina!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};


const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const CommandActionIntentHandler = {

  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CommandActionIntent';
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const responseBuilder = handlerInput.responseBuilder;

    
    let slots = request.intent.slots;
    let slotsCommand = (slots!=undefined&&slots["command"] != undefined&&slots["command"].value!= undefined)?slots["command"].value:""
    let slotsAction = (slots!=undefined&&slots["action"] != undefined&&slots["action"].value!= undefined)?slots["ation"].value:""
    let slotsString = (slots!=undefined&&slots["letter"] != undefined&&slots["letter"].value!= undefined)?slots["letter"].value:""
    let slotsNumber = (slots!=undefined&&slots["number"] != undefined&&slots["number"].value!= undefined)?slots["number"].value:""
    if (slotsCommand == "status") {
      const speechText = 'Show Neo one client connected';
      //this.emitWithState('GetNeo');
      //this.emit(':responseReady');
      return new Promise((resolve) => {
        getNeoHttp((data) => {
          console.log("GetNeoHttp:" + data.clients[0]);
          let fs = require('fs');
          let client_js = JSON.parse(fs.readFileSync('./client.json', 'utf8'));
          let client_id= client_js["v"]=="1"?"2":"1";
          let client_json = '{"id":"'+data.clients[0]+'","v":"'+client_id+'"}';
          fs.writeFile('./client.json', client_json, 'utf8', null);
      
          let speechText = `There are currently ${data.clients.length} clients in neo database. `;
          for (var i=0;i<data.clients.length;i++){
            if (i === 0) {
              //first record
              speechText = speechText + 'Their ids are: ' + data.clients[i]+ ', '
            } else if (i === data.people.length-1) {
              //last record
              speechText = speechText + 'and ' + data.clients[i] + '.'
            } else {
              //middle record(s)
              speechText = speechText + data.clients[i].name + ', '
            }
          }
          console.log('resolve speak:' + speechText);
          resolve(handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(SKILL_NAME, speechText)
            .getResponse());
        });
      });
    }
    else if (slotsCommand == "do") {
      const speechText = 'Show Neo play video';
      //this.emitWithState('PostNeo');
      //this.emit(':responseReady');
      return new Promise((resolve) => {
        postNeoHttp((data) => {
          console.log("GetNeoHttp");
          let speechText="post successfully";
          console.log('resolve speak:' + speechText);
          resolve(handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(SKILL_NAME, speechText)
            .getResponse());
        });
      });
    }
    else if (slotsCommand == "report" && slotsString=="sales") {
      const speechText = 'Today\'s sales is twenty two thousands';
      return responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(SKILL_NAME, speechText)
        .getResponse();
    }
    else if (slotsCommand == "report" && slotsString =="marketing") {
      const speechText = 'Today\'s google ads conversion is 5.2 percents';
      return responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(SKILL_NAME, speechText)
        .getResponse();
    }
    else {
      const speechText = 'Show Neo' + slotsCommand + slotsAction + slotsString + slotsNumber;
      return responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(SKILL_NAME, speechText)
        .getResponse();
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello Hello Hello', speechText)
      .getResponse();
  }
};



function getNeoHttp(callback) {
var options = {
  host: server_domain,
  port: server_port,
  path: '/get_clients',
  method: 'GET'
};

var req = http.request(options, res => {
    res.setEncoding('utf8');
    var returnData = "";

    res.on('data', chunk => {
        returnData = returnData + chunk;
    });

    res.on('end', () => {
      var result = JSON.parse(returnData);

      callback(result);

    });

});
req.end();
}

function postNeoHttp(callback) {

  let fs = require('fs');
  let client_js = JSON.parse(fs.readFileSync('./client.json', 'utf8'));
  let postData = '{"action":"change", "id":"' + client_js["id"] + '","v":"2"}';
  //let postData = '{"action":"screen", "id":"wpmvuoiiy", "v":"2"}';

  console.log("postData:" + postData);

  let options = {
  host: server_domain,
    port: server_port,
    path: '/portal',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Content-Length": Buffer.byteLength(postData)
    }
  };

  let req = http.request(options, res => {
      res.setEncoding('utf8');
      var returnData = "";

      res.on('data', chunk => {
          returnData = returnData + chunk;
      });

      res.on('end', () => {
        console.log(returnData);
        var result = JSON.parse(returnData);

        callback(result);

      });

  });
  req.write(postData);
  req.end();
}




// Set up skill builder
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    CommandActionIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
