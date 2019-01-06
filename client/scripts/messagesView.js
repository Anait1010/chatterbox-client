var MessagesView = {

  $chats: $('#chats'),
  $username: $('.username'),

  initialize: function() {
    App.startSpinner();
    MessagesView.render(App.stopSpinner);
    MessagesView.$chats.on('click', '.username', Friends.toggleStatus);
  },

  render: function (callback = () => {}) {
    Parse.readAll((data) => {

      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].username === undefined || data.results[i].text === undefined) {
          continue;
        }

        var html = MessageView.render(data.results[i]);

        _.escape(html);

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
