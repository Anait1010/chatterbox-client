var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    App.startSpinner();
    RoomsView.render(App.stopSpinner);
  },

  render: function(callback = ()=>{}) {
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
};

// sanitize: function (unsafeMessage) {
//   var safeMessage = {};
//   for (let key in unsafeMessage) {
//     safeMessage[key] = unsafeMessage[key]
//       .replace(/<script/gi, '')
//       .replace(/<link/gi, '')
//       .replace(/script:/gi, '')
//       .replace(/onclick/gi, '')
//       .replace(/onmouseover/gi, '')
//       .replace(/<style/gi, '')
//       .replace(/<iframe>.*>/gi, '[Enbedded content not permited]');

//   }
//   return safeMessage;
// },
// };
