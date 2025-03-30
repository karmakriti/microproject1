# microproject1

microproject

Project Instructions:
You will create an express application:

Install the full Express required and recommended dependencies:
Install Express
Install Nodemon
Add a folder named “data” inside the project folder. Inside the “data” folder add a JSON file with at least 6 items (objects)
Adding a "public" folder for a full well-designed HTML website (static website):
4 HTML pages at least
images/media and professional (nice and elegant) CSS
One of the HTML pages will be a demo for using API (Application Programming Interface) request to a back-end side (server-side) to load the JSON data (using Express with Node for sure)
This page should include a button to communicate with Express URL Route to call (fetch) JSON data
The JSON data that you will grab/load from the server-side should be displayed in a nicely formatted and professional layout to the end user (clients) in this page
you will need a JavaScript file to handle the front-end interactions with the user where you will attach an event listener to the button of the page. When the user clicks the button you will call function with Async/Await\* to fetch the data according to the URL that you specified (or will specify) in your application JS file.

- Async/Await is the syntactic sugar of using promises
  For sure, you will have to add the JavaScript file for running Express using the local virtual server "localhost"
  Use any name you prefer to this Express application JavaScript file (by default, programmers use app.js or you can use index.js)
  Write the full template/boilerplate of Express from you repos code examples or the express documentations
  https://expressjs.com/en/starter/hello-world.html
  Import or require the JSON file to be saved into a variable of any name of your choice
  Add the .get() method with a specific route to send the JSON Data which the variable that you have created that contains the JSON content. Notice that the URL and the end-point of this get() method will be used in your client-side JavaScript file.
