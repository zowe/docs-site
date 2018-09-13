# Working with command handler responses

When your plug-in invokes a handler, it passes an instance of HandlerResponse to the handler on the command parameters response property. For more information, see [`IHandlerParameters`](URL) and [`IHandlerResponseApi`](URL).

The handler response APIs contain all of the methods that are required to formulate a command response.

***To the reviewer... is the following note correct? Or is/was it only applicable to our implementation way back when we wrote this?***

**Note:** The content here is not reflected in master until the `command-responses-api` branch is merged.

## Response console APIs

You should not let handlers issue console messages directly. Letting handlers issue console messages directly can break the JSON response capabilities of the CLI. To circumvent this behavior, the console API contains methods that let handlers issue log and error messages directly to the terminal.

**Note:** For more information, see [`IHandlerResponseConsoleApi`](URL)

**Example:** The following example illustrates the syntax that lets handlers issue console messages:

```typescript
export default class HandlerWithMessages implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters): Promise<void> {
        commandParameters.response.console.log("Hello World!");
        commandParameters.response.console.error("Hello Cruel World!");
    }
}
```
## Response data APIs

If the user requests a JSON response (using `--response-format-json`), additional properties/data can be provided. For more information, see [`IHandlerResponseDataApi`](URL). Command handlers can (optionally) set an API message (a short summary of the command execution/failure) and a data object (containing structured JSON data as a response). For example, a handler can output a prettified table to `stdout` for the user and place the raw JSON object that was used to create the table on the data property of the response. The data is not output to the console unless the users specifies `--response-format-json`.

**Example:** The following example illustrates the syntax that lets handlers output data:

```typescript
export default class WithDataObjectHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters): Promise<void> {
        commandParameters.response.data.setMessage("Some data is provided!");
        commandParameters.response.data.setObj({moreData: "hello world!"});
    }
}
Example JSON output from Command:

{
  "success": true,
  "message": "Some data is provided!",
  "stdout": "",
  "stderr": "",
  "data": {
    "moreData": "hello world!"
  }
}
```

## Response progress APIs

With handlers, you can implement progress bars that display status or progress information while your plug-in commands execute. The Imperative CLI Framework progress bar functionality was designed using the [node-progress](https://github.com/visionmedia/node-progress) package. 

**More information:**
- [Implementing progress bars](URL)
- [IHandlerProgressApi](URL)
- [node-progress](https://github.com/visionmedia/node-progress)


