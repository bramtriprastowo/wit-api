const publishForm = document.getElementById("publishForm");

publishForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const topic = document.getElementById("topic").value;
  const message = document.getElementById("message").value;
  const userId = document.getElementById("userId").value;

  fetch("/api/v1/mqtt/publisher", {
    method: "POST",
    body: JSON.stringify({
      topic,
      message,
      userId
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch((error) => console.error("Error:", error));
});
