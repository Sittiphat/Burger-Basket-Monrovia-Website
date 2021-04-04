window.addEventListener("load", (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('myParam');

  // console.log(window.location.search);

  let req = new XMLHttpRequest();

  // Links for the Get request website we will be requesting to and what is in the window seach bar address
  let website2 = "http://web.engr.oregonstate.edu/~zhangluy/tools/class-content/form_tests/check_request.php"
  let website = "https://httpbin.org/get"
  let getParams = window.location.search

  let site = website + getParams
  let site2 = website2 + getParams
  // console.log(site)

  req.open("GET", site, true);

  let res_span = document.getElementById("res-span");
  let res_span2 = document.getElementById("res-span2");

  // After the request is complete this will be called by our event listener below
  function asynch_func() {
    // console.log(req.responseText)
    if (req.status >= 200 && req.status < 400) {
      let res_JSON = JSON.parse(req.responseText);
      console.log(res_JSON.args);
      res_span.textContent = "(*For Grader this message will dissapear in 10 sec) The response we got from our GET Request from https://httpbin.org/get is: " + JSON.stringify(res_JSON.args)
    } else {
      console.log("Error: " + req.statusText);
      res_span.textContent = req.statusText;
    }
  }

  // This is the message that will be displayed for the grader
  setTimeout(() => {
    res_span.textContent = "";
    res_span2.textContent = "";
  }, 10000);
  res_span2.textContent = "Redirecting to spec's GET Page in 12 sec click back to homescreen button above to stop..."
  setTimeout(() => {
    window.location.href = site2;
  }, 12000);


  req.addEventListener("load", asynch_func);
  // GET request does not send anything
  req.send(null);
  // This is to prevent page from reloading
  event.preventDefault();

});
