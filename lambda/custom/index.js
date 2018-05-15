/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const statusCode  = {
	SUCCESS: 0,
	NOT_LINKED: -1,
	INVALID_DATA: -2,
	CONNECTION_ERROR: -3
}

if (process.env.MOCK_NEO) {
  var Neo = require('./mock_neo.js');
}
else {
  var Neo = require('./neo.js');
}

var http = require('http');
Neo.settings = {};
Neo.settings.show_neo_version = '0.1';
Neo.settings.server_domain = "showneo.com";
Neo.settings.server_port="80";
Neo.settings.SKILL_NAME = 'Alex Display';

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    console.log("LaunchRequestHandler <<");

    // bsun %%%% 20180430 like init function
    Neo.settings.applicationId = handlerInput.requestEnvelope.context.System.application.applicationId;
    Neo.settings.userId = handlerInput.requestEnvelope.context.System.user.userId;
    Neo.settings.deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;

    console.log('version:'+handlerInput.requestEnvelope);

    let speechText = `Welcome to the Alexa show neo kit.  You can use your Alexa echo
    to control any browser on your your display devices like TV, mobile pads, or phones.`;
    console.log("LaunchRequestHandler: before Promise");
    return new Promise((resolve, reject) => {
      Neo.postNeoHttp('/start', handlerInput.requestEnvelope, (res) => {
        console.log("LaunchRequestHandler>handle>postNeoHttp");
        console.log('resolve speak:' + speechText);
        if (res.status == "success" && res.linked == true) {
          speechText += "Your account is linked.  You can tell show neo what to do next.";
          let repromtText = speechText.valueOf();
          resolve(handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromtText)
            .withSimpleCard(Neo.settings.SKILL_NAME, speechText)
            .getResponse());
        }
        else {
          speechText += "Your account is not linked.  Please link you account first.";
          let repromtText = speechText.valueOf();
          resolve(handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromtText)
            .withSimpleCard(Neo.settings.SKILL_NAME, speechText)
            .getResponse());
        }
      });
      speechText = "Some error happened, please try again later.";
      if (Neo.settings.linked == 'undefined') {
        reject(handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(repromtText)
          .withSimpleCard(Neo.settings.SKILL_NAME, speechText)
          .getResponse());
      }
    });
    console.log("LaunchRequestHandler >>");
  }
};


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can link your account or ask show neo to show videos, slides, or play games on any brower.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(Neo.settings.SKILL_NAME, speechText)
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
      .withSimpleCard(Neo.settings.SKILL_NAME, speechText)
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

const LinkIntentHandler = {

  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'LinkIntent';
  },
  handle(handlerInput) {
    console.log("LinkIntentHandler <<");
    const request = handlerInput.requestEnvelope.request;
    const responseBuilder = handlerInput.responseBuilder;

    
    let slots = request.intent.slots;
    let slotsAnOne = (slots!=undefined&&slots["an_one"] != undefined&&slots["an_one"].value!= undefined)?slots["an_one"].value:""
    let slotsAnTwo = (slots!=undefined&&slots["an_two"] != undefined&&slots["an_two"].value!= undefined)?slots["an_two"].value:""
    let slotsAnThree = (slots!=undefined&&slots["an_three"] != undefined&&slots["an_three"].value!= undefined)?slots["an_three"].value:""
    let slotsAnFour = (slots!=undefined&&slots["an_four"] != undefined&&slots["an_four"].value!= undefined)?slots["an_four"].value:""
    let slotsAnFive = (slots!=undefined&&slots["an_five"] != undefined&&slots["an_five"].value!= undefined)?slots["an_five"].value:""
    let slotsAnSix = (slots!=undefined&&slots["an_six"] != undefined&&slots["an_six"].value!= undefined)?slots["an_six"].value:""

    let speechText = '';
    handlerInput.requestEnvelope.neoData = {};
    handlerInput.requestEnvelope.neoData.accessCode = slotsAnOne + slotsAnTwo + slotsAnThree + slotsAnFour + slotsAnFive + slotsAnSix;
    console.log("LinkIntentHandler: before Promise");
    return new Promise((resolve, reject) => {
      Neo.postNeoHttp('/link', handlerInput.requestEnvelope, (res) => {
        console.log("LaunchRequestHandler>handle>postNeoHttp");
        console.log('resolve speak:' + speechText);
        if (res.status == "success") {
          speechText += "Your account is linked Successfully.  You can tell show neo commands to show videos, slides, or even play games.";
          let repromtText = speechText.valueOf();
          resolve(handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromtText)
            .withSimpleCard(Neo.settings.SKILL_NAME, speechText)
            .getResponse());
        }
        else {
          speechText += "Fails to link to your account because  " + res.statusMessage + ".  Please try again.";
          let repromtText = speechText.valueOf();
          resolve(handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromtText)
            .withSimpleCard(Neo.settings.SKILL_NAME, speechText)
            .getResponse());
        }
      });
      /* 
      speechText = "Some error happened, please try again later.";
      if (Neo.settings.linked == 'undefined') {
        reject(handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(repromtText)
          .withSimpleCard(Neo.settings.SKILL_NAME, speechText)
          .getResponse());
      }
      */
    });
    console.log("LinkIntentHandler >>");
  }
};

const CommandIntentHandler = {

  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CommandIntent';
  },
  handle(handlerInput) {
    console.log("CommandIntentHandler <<");
    const request = handlerInput.requestEnvelope.request;
    const responseBuilder = handlerInput.responseBuilder;

    
    let slots = request.intent.slots;
    let speechText = '';
    let slotsCommand = (slots!=undefined&&slots["command"] != undefined&&slots["command"].value!= undefined)?slots["command"].value:""
    let slotsContent = (slots!=undefined&&slots["content"] != undefined&&slots["content"].value!= undefined)?slots["content"].value:""
    let slotsNumber = (slots!=undefined&&slots["number"] != undefined&&slots["number"].value!= undefined)?slots["number"].value:""
    handlerInput.requestEnvelope.neoData = {};
    handlerInput.requestEnvelope.neoData.command = slotsCommand;
    handlerInput.requestEnvelope.neoData.content = slotsContent;
    handlerInput.requestEnvelope.neoData.number = slotsNumber;
    console.log("CommandIntentHandler: before Promise");
    return new Promise((resolve, reject) => {
      Neo.postNeoHttp('/command', handlerInput.requestEnvelope, (res) => {
        console.log("LaunchRequestHandler>handle>postNeoHttp");
        console.log('resolve speak:' + speechText);
        if (res.status == "success") {
          speechText += `Play ${slotsCommand} ${slotsContent} ${slotsNumber} Successfully.`;
          let repromtText = speechText.valueOf();
          resolve(handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromtText)
            .withSimpleCard(Neo.settings.SKILL_NAME, speechText)
            .getResponse());
        }
        else {
          speechText += `Can not play ${slotsCommand} ${slotsContent} ${slotsNumber} because ${res.statusMessage}.`;
          let repromtText = speechText.valueOf();
          resolve(handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromtText)
            .withSimpleCard(Neo.settings.SKILL_NAME, speechText)
            .getResponse());
        }
      });
    });
    console.log("CommandIntentHandler >>");
  }
};



const ReportIntentHandler = {

  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ReportIntent';
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const responseBuilder = handlerInput.responseBuilder;

    
    let slots = request.intent.slots;
    let speechText = '';
    let slotsContent = (slots!=undefined&&slots["content"] != undefined&&slots["content"].value!= undefined)?slots["content"].value:""
    let slotsNumber = (slots!=undefined&&slots["number"] != undefined&&slots["number"].value!= undefined)?slots["number"].value:""
    handlerInput.requestEnvelope.neoData = {};
    handlerInput.requestEnvelope.neoData.content = slotsContent;
    handlerInput.requestEnvelope.neoData.number = slotsNumber;
    
    return new Promise((resolve, reject) => {
      Neo.postNeoHttp('/select', handlerInput.requestEnvelope, (res) => {
        console.log("LaunchRequestHandler>handle>postNeoHttp");
        console.log('resolve speak:' + speechText);
        if (res.status == "success") {
          speechText += `Select ${slotsContent} ${slotsNumber} Successfully.`;
          let repromtText = speechText.valueOf();
          resolve(handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromtText)
            .withSimpleCard(Neo.settings.SKILL_NAME, speechText)
            .getResponse());
        }
        else {
          speechText += `Fails to select ${slotsContent} ${slotsNumber}. Please try again.`;
          let repromtText = speechText.valueOf();
          resolve(handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromtText)
            .withSimpleCard(Neo.settings.SKILL_NAME, speechText)
            .getResponse());
        }
      });
    });
  }
};


// Set up skill builder
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    LinkIntentHandler,
    CommandIntentHandler,
    ReportIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
