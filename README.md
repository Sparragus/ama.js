AMA.js
======

A Javascript library that helps connect to the Autoridad Metropolitana de Autobuses' (AMA) API.

AMA.js provides a Javascript wrapper for the API of the Autoridad Metropolitana de Autobuses (AMA). If you are writing a Node.js app, or you are developing a server side solution in Javascript, then this is the perfect solution for you. Don't waste time writing code and handling APIs errors. We did this for you already. Log in, and call the library's methods. You'll receive the data returned by the API server. Now it's up to you to make use of the data.

Happy hacking!

## How to use AMA.js

### Try the Examples
There are examples in the `/examples` directory. You can try any example using Node.js: `node /examples/example.js`.

### On your own application
The first step is to install AMA.js. The easiest method is to use npm: `npm install ama.js --save`. This will download and install the library and add it as a dependency to your `package.json` file. If you have not created a `package.json`, do so with `npm init`.

On you application, you will need to require and initialize AMA.js.

    var AMA = require("ama");
    var ama = new AMA(<username>, <password>);

Fill in the username and password when you initialize AMA.js.

Now you can call any API method. For example, if you want to know where the buses are right now, you call the getAssetsPosition method:

    ama.getAssetsPosition(function (data) {
    	console.log("Result: ",data);
    });

In the __API methods__ section we discuss the different methods available to get data from the API.

## API methods

### AMA.getAssets( callback(data) );
This method will fetch the list of assets owned by AMA. These include buses, boats, and others. This list will be passed as __data__ to the callback function.

### AMA.getAssetsPosition( callback(data) );
This method will fetch the position of all the assets. This list will be passed as __data__ to the callback function.

### AMA.getGroups( callback(data) );
This method will fetch the list of asset groups. Every asset belongs to a group. Using the __groupId__ from each asset, you can use this data to associate items. This list will be passed as __data__ to the callback function.
