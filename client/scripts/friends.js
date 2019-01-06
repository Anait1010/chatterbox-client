var Friends = {
  toggleStatus: function() {
    var clickedUsername = $(this).text();
    $('.username:contains(' + clickedUsername + ')').next().css('font-weight', 'bold');
  }
};
