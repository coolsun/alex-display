
var lambda = require('../index.js')
var context = require('./context.js')
var mockContext = new context()
var path = require('path');
var scriptName = path.basename(__filename);

var expect  = require('chai').expect;



it('LaunchRequest', function(done) {

  // promise call backs make it hard to pass initial data to http calls
  // So the initial data is embeded in mocekEvent's neoTestInitData
  var mockEvent = require('./start.json');
  console.log('abc' + mockEvent.version);
  mockEvent.neoTestInitData = {};
  mockEvent.neoTestInitData.userName = "ben";
  mockEvent.neoTestInitData.linked = true;
  mockEvent.neoTestInitData.content = "video";
  mockEvent.neoTestInitData.accessCode = "abcdef";
  mockEvent.neoTestInitData.contentNumber = 1;
  mockEvent.neoTestInitData.displayNumber = 1;
  mockEvent.neoTestInitData.totalAvailableDisplayNumber = 10;
  mockEvent.neoTestInitData.availableDisplay = [2, 3, 4, 5, 6, 7, 8 , 9, 10];
  lambda.handler(mockEvent, mockContext, function(error, data) {
    if(error) {
      console.log(scriptName + ':error:' + 'LaunchRequest');
      console.log('error: ', error)
      expect(error).to.equal('success');
      done();
    }
    else {
      console.log(scriptName + ':success:' + 'LaunchRequest');
      console.log(data)
      let result = '<speak>Welcome to the Alexa show neo kit.  You can use your Alexa echo\n    to control any browser on your your display devices like TV, mobile pads, or phones.Your account is linked.  You can tell show neo what to do next.</speak>';
      expect(data.response.outputSpeech.ssml).to.equal(result);
      console.log('before done');
      done();
    }

  });
});


it('LinkIntentRequest', function(done) {
  var mockEvent = require('./link.json')
  mockEvent.neoTestInitData = {};
  mockEvent.neoTestInitData.userName = "ben";
  mockEvent.neoTestInitData.linked = true;
  mockEvent.neoTestInitData.content = "video";
  mockEvent.neoTestInitData.accessCode = "abcdef";
  mockEvent.neoTestInitData.contentNumber = 1;
  mockEvent.neoTestInitData.displayNumber = 1;
  mockEvent.neoTestInitData.totalAvailableDisplayNumber = 10;
  mockEvent.neoTestInitData.availableDisplay = [2, 3, 4, 5, 6, 7, 8 , 9, 10];
  lambda.handler(mockEvent, mockContext, function(error, data) {
    if(error) {
      console.log(scriptName + ':' + 'LinkIntentRequest');
      console.log('error: ', error)
      expect(error).to.equal('success');
      done();
    }
    else {
      console.log(scriptName + ':' + 'LinkIntentRequest');
      console.log(data)
      let result = '<speak>Your account is linked Successfully.  You can tell show neo commands to show videos, slides, or even play games.</speak>';
      expect(data.response.outputSpeech.ssml).to.equal(result);
      done();
    }
  });
});


it('CommandIntentRequest', function(done) {
  var mockEvent = require('./command.json');
  mockEvent.neoTestInitData = {};
  mockEvent.neoTestInitData.userName = "ben";
  mockEvent.neoTestInitData.linked = true;
  mockEvent.neoTestInitData.content = "video";
  mockEvent.neoTestInitData.accessCode = "abcdef";
  mockEvent.neoTestInitData.contentNumber = 1;
  mockEvent.neoTestInitData.displayNumber = 1;
  mockEvent.neoTestInitData.totalAvailableDisplayNumber = 10;
  mockEvent.neoTestInitData.availableDisplay = [2, 3, 4, 5, 6, 7, 8 , 9, 10];
  lambda.handler(mockEvent, mockContext, function(error, data) {
    
    if(error) {
      console.log(scriptName + ':' + 'CommandIntentRequest');
      console.log('error: ', error)
      expect(error).to.equal('success');
      done();
    }
    else {
      console.log(`CommandIntentRequest: lambda: data: ${JSON.stringify(data)}`)
      console.log(scriptName + ':' + 'CommandIntentRequest');
      console.log(data)
      let result = `<speak>Play ${mockEvent.neoData.command} ${mockEvent.neoData.content} ${mockEvent.neoData.number} Successfully.</speak>`;
      expect(data.response.outputSpeech.ssml).to.equal(result);
      done();
    }
  });
});


it('CommandIntentRequest', function(done) {
  var mockEvent = require('./command_unknown.json');
  mockEvent.neoTestInitData = {};
  mockEvent.neoTestInitData.userName = "ben";
  mockEvent.neoTestInitData.linked = true;
  mockEvent.neoTestInitData.content = "video";
  mockEvent.neoTestInitData.accessCode = "abcdef";
  mockEvent.neoTestInitData.contentNumber = 1;
  mockEvent.neoTestInitData.displayNumber = 1;
  mockEvent.neoTestInitData.totalAvailableDisplayNumber = 10;
  mockEvent.neoTestInitData.availableDisplay = [2, 3, 4, 5, 6, 7, 8 , 9, 10];
  lambda.handler(mockEvent, mockContext, function(error, data) {
    if(error) {
      console.log(scriptName + ':' + 'CommandIntentRequest');
      console.log('error: ', error)
      expect(error).to.equal('success');
      done();
    }
    else {
      console.log(scriptName + ':' + 'CommandIntentRequest');
      console.log(data)
      let result = `<speak>Can not play inspect   because inspect is unknown.</speak>`;
      expect(data.response.outputSpeech.ssml).to.equal(result);
      done();
    }
  });
});
