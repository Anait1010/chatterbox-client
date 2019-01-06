var FormView = {

  $form: $('form'),
  $refresh: $('#refresh'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
    FormView.$refresh.on('click', MessagesView.initialize);
    FormView.$refresh.on('click', RoomsView.initialize);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    var message = {};

    message.username = window.location.search.substr(10);
    message.text = $('#message').val();
    message.roomname = $('#rooms select').find(':selected').text();

    Parse.create(message, (data) => {
      message.createdAt = data.createdAt;
      message.objectId = data.objectId;
    });

    MessagesView.renderMessage(message);
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};
