var FormView = {

  $form: $('form'),
  $refresh: $('#refresh'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
    FormView.$refresh.on('click', App.fetch);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    Messages.username = window.location.search.substr(10);
    Messages.text = $('#message').val();
    Messages.roomname = $('#rooms select').find(':selected').text();

    console.log(Messages);

    Parse.create(Messages, (data) => {
      // examine the response from the server request:
      console.log(data);

      Messages.createdAt = data.createdAt;
      Messages.objectId = data.objectId;

      var html = MessageView.render(data.results[0]);
      $('#chats').prepend(html);

      var renderedMessage = MessageView.render(Messages);
      $('#chats').prepend(renderedMessage);
    });

    console.log('click!');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};
