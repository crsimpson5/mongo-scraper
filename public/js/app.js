$(document).on("click", "#scrape-btn", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .then(function(data) {
      location.reload();
    });
});

$(document).on("click", "#submit-btn", function(event) {
  event.preventDefault();

  var id = $("#article").attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + id,
    data: {
      text: $("#comment-input").val()
    }
  })
    .then(function(data) {
      location.reload();
    });
});

$(document).on("click", ".delete-btn", function(event) {
  event.preventDefault();

  var id = $(this).attr("data-id");

  $.ajax({
    method: "DELETE",
    url: "/comment/" + id,
  })
    .then(function(data) {
      location.reload();
    });
});