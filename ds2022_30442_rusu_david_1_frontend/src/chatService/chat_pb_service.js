// package: chat
// file: chat.proto

var chat_pb = require("./chat_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ChatService = (function () {
  function ChatService() {}
  ChatService.serviceName = "chat.ChatService";
  return ChatService;
}());

ChatService.chatEnd = {
  methodName: "chatEnd",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: chat_pb.User,
  responseType: chat_pb.Empty
};

ChatService.sendMessage = {
  methodName: "sendMessage",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: chat_pb.ChatMessage,
  responseType: chat_pb.Empty
};

ChatService.subscribeToMessages = {
  methodName: "subscribeToMessages",
  service: ChatService,
  requestStream: false,
  responseStream: true,
  requestType: chat_pb.JoinRequest,
  responseType: chat_pb.ChatMessage
};

ChatService.isTyping = {
  methodName: "isTyping",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: chat_pb.User,
  responseType: chat_pb.Empty
};

exports.ChatService = ChatService;

function ChatServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ChatServiceClient.prototype.chatEnd = function chatEnd(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.chatEnd, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.sendMessage = function sendMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.sendMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.subscribeToMessages = function subscribeToMessages(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(ChatService.subscribeToMessages, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.isTyping = function isTyping(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.isTyping, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.ChatServiceClient = ChatServiceClient;

