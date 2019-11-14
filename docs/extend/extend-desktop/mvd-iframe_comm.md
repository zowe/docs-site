# Configuring IFrame communication
Like REACT and Angular apps, iFrame apps can use the ZoweZLUXResources global class object to communicate with the framework and other apps.

To enable communication, add the following javascript to your app, for example in your index.html file:

```javascript
<script>
  if(exports){
    var ZoweZLUX_tempExports = exports;
  }
  var exports = {"__esModule": true};
</script>
<script type="text/javascript" src="../../../../../lib/org.zowe.zlux.logger/0.9.0/logger.js"></script>
<script type="text/javascript" src="../../../org.zowe.zlux.bootstrap/web/iframe-adapter.js"></script>
```
`logger.js` is the javascript version of logger.ts. It is capable of same functions as logger.ts, including access to the “Logger” class and the “ComponentLogger” class. The Logger class determines the behavior of all the ComponentLoggers created from it. ComponentLoggers are what the user implements to perform actual logging.

`Iframe-adapter.js` is designed to mimic the ZoweZLUX object that is available to apps within the virtual-desktop, and serves as the middle-man for communication between IFrame apps and the Zowe desktop. 

You can see an implementation of this functionality in the sample IFrame app.

Unlike REACT and Angular apps, in IFrame apps, the ZoweZLUXResources and initialization objects communicate with Zowe using the browser's onmessage and postmessage APIs. That means that communication operations are asynchronous, and you must account for this in your app, for example by using [Promise objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and `await` or `then` functions.

