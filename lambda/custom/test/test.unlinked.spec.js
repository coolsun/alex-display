
var lambda = require('../index.js')
var context = require('./context.js')
var mockContext = new context()
var path = require('path');
var scriptName = path.basename(__filename);

var expect  = require('chai').expect;


neoTestInitData = {};

it('LaunchRequest', function(done) {
  var mockEvent = require('./start.json');
  mockEvent.neoTestInitData = {};
  mockEvent.neoTestInitData.linked = false;
  mockEvent.neoTestInitData.accessCode = "abcdef";
  lambda.handler(mockEvent, mockContext, function(error, data) {
    if(error) {
      console.log(scriptName + ':' + 'LaunchRequest');
      console.log('error: ', error)
      expect(error).to.equal('success');
      done();
    }
    else {
      console.log(scriptName + ':' + 'LaunchRequest');
      console.log(data)
      let result = '<speak>Welcome to the Alexa show neo kit.  You can use your Alexa echo\n    to control any browser on your your display devices like TV, mobile pads, or phones.Your account is not linked.  Please link you account first.</speak>';
      expect(data.response.outputSpeech.ssml).to.equal(result);
      done();
    }
  });
});


it('LinkIntentRequest', function(done) {
  var mockEvent = require('./link.json');
  mockEvent.neoTestInitData = {};
  mockEvent.neoTestInitData.linked = false;
  mockEvent.neoTestInitData.accessCode = "123456";
  lambda.handler(mockEvent, mockContext, function(error, data) {
    if(error) {
      console.log(scriptName + ':' + 'LinkIntentRequest');
      console.log('error: ', error)
      expect(error).to.equal('success');
      done();
    }
    else {
      console.log(scriptName + ':' + 'LinkIntentRequest');
      console.log(data);
      let result = `<speak>Fails to link to your account because  access code is invalid.  Please try again.</speak>`;
      expect(data.response.outputSpeech.ssml).to.equal(result);
      done();
    }
  });
});

it('LinkIntentRequest', function(done) {
  var mockEvent = require('./link.json');
  mockEvent.neoTestInitData = {};
  mockEvent.neoTestInitData.linked = false;
  mockEvent.neoTestInitData.accessCode = "abcdef";
  lambda.handler(mockEvent, mockContext, function(error, data) {
    if(error) {
      console.log(scriptName + ':' + 'LinkIntentRequest');
      console.log('error: ', error)
      expect(error).to.equal('success');
      done();
    }
    else {
      neoTestInitData.linked = true;
      console.log(scriptName + ':' + 'LinkIntentRequest');
      console.log(data)
      let result = '<speak>Your account is linked Successfully.  You can tell show neo commands to show videos, slides, or even play games.</speak>';
      expect(data.response.outputSpeech.ssml).to.equal(result);
      done();
    }
  });
});

// inherits mockEvent.neoTestInitData.linked = true;
it('CommandIntentRequest', function(done) {
  var mockEvent = require('./command.json');
  // accept the result from the previous test
  mockEvent.neoTestInitData = neoTestInitData;
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
      let result = '<speak>Play start   Successfully.</speak>';
      expect(data.response.outputSpeech.ssml).to.equal(result);
      done();
    }
  });
});


it('CommandIntentRequest', function(done) {
  var mockEvent = require('./command.json');
  mockEvent.neoTestInitData = {};
  mockEvent.neoTestInitData.linked = false;
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
      let result = '<speak>Can not play start   because your account is not linked.</speak>';
      expect(data.response.outputSpeech.ssml).to.equal(result);
      done();
    }
  });
});

