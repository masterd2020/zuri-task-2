const fs = require("fs");
const http = require('http');

const url = "http://jsonplaceholder.typicode.com/posts";

// Using the Nodejs https built-in module to make a get request 
http.get(url,(res) => {
  // This is where we are going to append the data that is read chunk by chunk
  let body = "";
  
  // Listening for the data event, each time we get this event we append it to the body above.
  res.on("data", (chunk) => {
    body += chunk;
  });

  // When all the data has been read, we create a folder and then write the file
  res.on("end", () => {
    try {
      // Craete a folder
      fs.mkdir("result", {recursive: true}, (err) => {
        
        // if error occur throw the error
        if(err) throw err;
        
        // if not, write the file
        fs.writeFile('result/post.txt', body, (err) => {
          
          // if error occur when writing the file, throw error
          if (err) throw err;
          
          // if not log the message to the console
          console.log('The file has been written!');
        });
      })
      
    } catch (error) {
      // Catching any asynchronous error and then log it.
      console.log(error);
    };
  });
  
  // Listening for error event, if we have one log it to the console 
}).on("error", (error) => {
    console.log(error);
});
