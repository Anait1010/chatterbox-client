var RoomsView = {

  $button: $('#addRoom'),
  $select: $('#rooms select'),

  initialize: function() {
    App.startSpinner();
    RoomsView.render(App.stopSpinner);
    RoomsView.$button.on('click', Rooms.add);
  },

  render: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].username === undefined || data.results[i].text === undefined || data.results[i].roomname === undefined || data.results[i].roomname === '' || $(`select option:contains(${data.results[i].roomname})`).length) {
          continue;
        }

        var html = RoomsView.template(data.results[i]);

        _.escape(html);

        RoomsView.$select.append(html);
      }

      callback();
    });
  },

  template: _.template(`
  <option value = ''> <%- roomname %> </option>
`),

  renderRoom: function() {
    var newRoom = $('#room').val();

    var insertedRoom = {
      roomname: newRoom
    };

    var html = RoomsView.template(insertedRoom);

    _.escape(html);

    Parse.create(insertedRoom, (data) => {
      insertedRoom.createdAt = data.createdAt;
    });


    RoomsView.$select.append(html);
  }
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
