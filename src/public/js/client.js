(function() {
  const $ = require("jquery");
  const Backbone = require("backbone");
  let messages = [];
  Backbone.$ = $;
  $(function() {
    //initially check for messages over the past 30 minutes
    fetch("/check", {
      method: "post",
      body: { msSinceLastCheck: 1000 * 60 * 30 }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log("response:", response);
        messages = response.messages;
        if (messages.length > 0) {
          alert(
            "There are " + messages.length + " message" + messages.length !== 1
              ? "s"
              : ""
          );
        }
        //update view with messages
      })
      .catch(er => {
        console.error(er);
      });
  });
})();
