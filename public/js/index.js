
// Get references to page elements
var registerForm = $("form.register");
var firstName = $("input#firstName");
var lastName = $("input#lastName");
var username = $("input#username");
var password = $("input#password");

var loginForm = $("form.login")
var loginUsername = $("input#username")
var loginPassword = $("input#password")

registerForm.on("submit", function (event) {
  event.preventDefault();
  var userDataRegister = {
    first: firstName.val().trim(),
    last: lastName.val().trim(),
    username: username.val().trim(),
    password: password.val().trim(),
  }

  if (!userDataRegister.first || !userDataRegister.last || !userDataRegister.username || !userDataRegister.password) {
    return;
  }
  // If we have an email and password, run the signUpUser function
  signUpUser(
    userDataRegister.first,
    userDataRegister.last,
    userDataRegister.username,
    userDataRegister.password
  );
  firstName.val("");
  lastName.val("");
  username.val("");
  password.val("");
});

function signUpUser(first, last, username, password) {
  $.post("/api/signup", {
    firstname: first,
    lastname: last,
    username: username,
    password: password
  }).then(function (data) {
    window.location.replace("/home")
  }).catch(handleLoginErr)
}

function handleLoginErr(err) {
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}

// When the form is submitted, we validate there's an email and password entered
loginForm.on("submit", function (event) {
  event.preventDefault();
  var userDataLogin = {
    username: loginUsername.val().trim(),
    password: loginPassword.val().trim()
  };

  if (!userDataLogin.username || !userDataLogin.password) {
    return;
  }

  // If we have an username and password we run the loginUser function and clear the form
  loginUser(userDataLogin.username, userDataLogin.password);
  loginUsername.val("");
  loginPassword.val("");
});

// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
function loginUser(username, password) {
  $.post("/api/login", {
    username: username,
    password: password
  })
    .then(function () {
      window.location.replace("/home");
      // If there's an error, log the error
    }).catch(function (err) {
      console.log(err);
    })
}

$.get("/api/user_data").then(function (data) {
  console.log(data)
});

//Logout Function

$("#logoutButton").on("click", function () {
  $.get("/logout").then(function (data) {
    console.log("Logged Out")
    window.location.replace("/")
  })
})

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function (example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function () {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function (id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function () {
//   API.getExamples().then(function (data) {
//     var $examples = data.map(function (example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function (event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function () {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function () {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function () {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);




//Frontend call to API function

function getWeather(lat, long) {
  console.log(lat, long)
  //We need to ping the backend
  axios.get('/api/darksky/' + lat + '/' + long)
    .then(function (result) {
      console.log(result.data.daily.icon);
      switch (result.data.daily.icon) {
        case "clear-day":
          $("#weatherDiv");
          break;
        case "clear-night":
          $("#weatherDiv");
          break;
        case "rain":
          $("#weatherDiv");
          break;
        case "snow":
          $("#weatherDiv");
          break;
        case "sleet":
          $("#weatherDiv");
          break;
        case "wind":
          $("#weatherDiv");
          break;
        case "fog":
          $("#weatherDiv");
          break;
        default:
          $("#weatherDiv").html("It's crazy outside!")
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}


navigator.geolocation.getCurrentPosition(function (position, err) {
  if (err) {
    throw err
  }
  console.log(navigator)
  getWeather(position.coords.latitude, position.coords.longitude)
});
// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
