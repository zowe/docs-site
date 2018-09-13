# Working with chained handlers

In addition to commands with single handlers, you can create plug-in commands from multiple, ***chained*** handlers. Chained handlers are useful, for example, when you want to create plug-in commands that combine the functionality from other existing commands. Chaining your commands lets you re-use existing handler code and provide value to your plug-in users.

You can still define `options` and `positionals` in command definitions that contain chained handlers. In the Imperative CLI Framework, command definitions that contain chained handlers are identical to command definitions that contain one handler. With chained handlers, you specify `chainedHandlers` instead of `handler`.

`chainedHandlers` is an array of objects that implement the `IChainedHandlerEntry` interface. In each object in the `chainedHandlers` array, you specify a handler, an argument mapping, and whether the handler in the chain should be silent.

The `IChainedHandlerEntry` interface contains the following fields:

- `handler`

    The path to a command handler. The path represents one of the handlers in the chain. Your command invokes the handlers in the order in which you specify them in the array of the IChainedHandlerEntry objects.

- `mapping`
    
    An array of objects that correspond with the `IChainedHandlerArgumentMapping` interface. Because it is likely that one or more of the handlers in your chain requires command line arguments, you need a mechanism to specify the arguments. You use the mapping field to map either the arguments from the command that contains chained handlers (for example, `--customer-name` from the example at the bottom of this page) or the fields from the data field of the command response.
    
    By default, the mappings are assumed to refer to the command response. You can apply the mappings to the current handler in the chain, and any number of future handlers. When you want to map fields of the response object to arguments, the handler must call ```commandParameters.response.data.setObj(<an object here>)```.
    
    **Note:** You cannot map fields from the command response to arguments of the current handler in the chain, because the command response is not available until after the handler is invoked.
    
    **Example:** The following syntax illustrates the mapping of a command response field:

    `MyHandler.ts`:
    
    ```typescript
	    ...
	    commandParameters.response.data.setObj(
             {
         	    my: {
                     field: “hello”
         	    }
            });
        ...
    ```
    
    Your command definition:
    
    ```typescript
     chainedHandlers: [
	    ...
		{
                    from: "my.field",
                    to: "myArgument"
                    // maps this argument to the next handler by default. see applyToHandlers in 
                    // the IChainedHandlerArgumentMapping interface for more info on 
                    // how to direct the mapping to future handlers 
		}

	...
]
    ```



- `silent`

    When you specify a value of true, no output prints for the current handler. Using the silent field with a value of true is useful when you want to use the functionality of a command handler, but hide its output for a less cluttered user experience.
    
## Configuring chained handlers for commands

The following example illustrates how to configure chained handlers for a command:
```typescript
    name: “fruit”,
     options: [
          {
            name: "fruit-type",
            description: "the type of fruit to sell to you",
            type: "string",
            required: true
          },
          {
            name: "customer-name",
            description: "the name of the customer to sell to",
            type: "string", 
            required: true
          }
        ],
chainedHandlers: [
          {
            handler: __dirname + "/handlers/TakeOrderHandler",
            silent: true, // don't print the take order confirmation messages
            mapping: [
              {
                from: "fruit-type",
                to: "fruitType",
                mapFromArguments: true,
                applyToHandlers: [0] // current handler
              },
              {
                from: "fruitType",
                to: "fruitType",
                applyToHandlers: [2]
              }]
          },
          {
            handler: __dirname + "/handlers/OrderFruitHandler",
            mapping: [
              {
                from: "my.response.field",
                to: "fruitPrice"
                // default to mapping to the next handler, don't need 'applyToHandlers' in that case
              },
              {
                from: "my.other.field",
                to: "fruitSupplier"
              }
            ]
          },
          {
            handler: __dirname + "/handlers/SellFruitHandler",
            mapping: [{
              value: "Mr. Fruiteater",
              to: "customer",
              applyToHandlers: [0] // map to the current handler (sell fruit)
            }, {
              from: "customer-name",
              mapFromArguments: true,
              to: "customerName",
              applyToHandlers: [0]
            }
            ]
          }
        ]
      }]
``` 
  
**Note:** For more information, see the [`IChainedHandlerEntry`](URL) and the [`IChainedHandlerArgumentMapping`](URL) interfaces in the source code.

**Important!** Imperative CLI Framework validates only the syntax for the options that are associated with the commands that contain chained handlers. The framework does not validate the syntax for the options that are associated with the individual, chained handlers. Imperative CLI Framework behaves in this manner because you do not provide the original command definitions for the handlers.