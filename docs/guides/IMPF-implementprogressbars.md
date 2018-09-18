# Implementing progress bars

With Imperative CLI Framework, plug-in developers can implement progress bars that display as commands execute. This capability lets plug-in users know the status of long-running commands. For example:

- The process of executing multiple web requests in a row in sequence
- The process of reading, analyzing, uploading, or downloading files

**Follow these steps:**

1. Open the handler file for the command for which you want to display a progress bar.
2. From the handler file, start the progress bar by passing in a simple `ITaskWithStatus` object.
3. Update the completion percentage and status messages by updating the fields on the `ITaskWithStatus` object.

**Example:** The following example illustrates the syntax that lets you implement progress bars in your plug-in: 

```typescript
import {ICommandHandler, IHandlerParameters, Imperative, ITaskWithStatus, TaskProgress, TaskStage} from "@brightside/imperative";

import {setTimeout} from "timers";

export default class Handler implements ICommandHandler {
  public process(commandParameters: IHandlerParameters): Promise<void> {
    return new Promise<void>((commandComplete) => {
      Imperative.api.additionalLogger("another").debug("User wanted a goodbye.");
      // start a progress bar with a status object - you can produce and maintain
      // this status object in your API so that a progress bar can be updated live for the user
      const status: ITaskWithStatus = {
        statusMessage: "Preparing to say goodbye...",
        percentComplete: TaskProgress.TEN_PERCENT, // you can just use a number if you'd like rather than TaskProgress constants
        stageName: TaskStage.IN_PROGRESS
      };
      commandParameters.response.progress.startBar({task:status});
      const oneSecond = 1000; // milliseconds

      // wait a second, then update the progress bar
      setTimeout(() => {
        status.statusMessage = "Saying goodbye...";
        status.percentComplete = TaskProgress.FIFTY_PERCENT;

        // wait another second, then finish the progress bar
        setTimeout(() => {
          commandParameters.response.progress.endBar();
          if (commandParameters.arguments.name) {
            commandParameters.response.console.log("Goodbye " + commandParameters.arguments.name);
          } else {
            commandParameters.response.console.log("Goodbye!");
          }
          commandComplete();
        }, oneSecond);
      }, oneSecond);
    });
  }
}
```
The Imperative CLI Framework progress bar functionality was designed using the node-progress package.

**More information:**
- [node-progress](https://github.com/visionmedia/node-progress)