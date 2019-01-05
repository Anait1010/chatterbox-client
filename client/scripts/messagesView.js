var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    App.startSpinner();
    MessagesView.render(App.stopSpinner);
  },

  render: function (callback = () => {}) {
    Parse.readAll((data) => {

      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].username === undefined || data.results[i].text === undefined) {
          continue;
        }
        var html = MessageView.render(data.results[i]);
        $('#chats').append(html);
      }

      callback();
    });
  },

  renderMessage: function(message) {
    var $message = MessageView.render(message);
    MessagesView.$chats.prepend($message);
  }
};


// message.username = window.location.search.substr(10);
// message.text = $('#message').val();
// message.roomname = $('#rooms select').find(':selected').text();



// examine the response from the server request:
// console.log(data);
// console.log(message);
// console.log('We are here!');

// message.createdAt = data.createdAt;
// message.objectId = data.objectId;

// if (message.username !== undefined || message.text !== undefined) {
//   var renderedMessage = MessageView.render(message);
//   $('#chats').prepend(renderedMessage);
// }
// MessagesView.initialize();
