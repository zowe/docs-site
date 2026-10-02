# Embedding plugins
Add these imports to a component where you want to embed another plugin:
```
app.component.ts
```
```
import {Inject, Injector, ViewChild, ViewContainerRef} from '@angular/core';  
import {Angular2InjectionTokens, Angular2PluginEmbedActions, EmbeddedInstance} from 'pluginlib/inject-resources';
```

Inject Angular2PluginEmbedActions into your component constructor:
```
app.component.ts
```
```
 constructor(@Inject(Angular2InjectionTokens.PLUGIN_EMBED_ACTIONS) private embedActions: Angular2PluginEmbedActions) {  
    }
```
In the component template prepare a container where you want to embed the plugin:
```
app.component.html
```
```
    <div class="container-for-embedded-window">  
       <ng-container #embedded></ng-container>  
    </div>
```
In the component class add a reference to the container:
```
app.component.ts
```
```
    @ViewChild('embedded', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
```

In the component class add a reference to the embedded instance:
```
app.component.ts
```
```
    private embeddedInstance: EmbeddedInstance;
```
Everything is ready to start embedding, you just need to know the pluginId that you want to embed:
```
app.component.ts
```
```
    embedPlugin(): void {
      const pluginId = 'org.zowe.zlux.sample.angular';  
      const launchMetadata = null;  
      this.embedActions.createEmbeddedInstance(pluginId, launchMetadata, this.viewContainerRef)  
        .then(embeddedInstance => this.embeddedInstance = embeddedInstance)  
        .catch(e => console.error(`couldn't embed plugin ${pluginId} because ${e}`));
   }
```
## How to interact with embedded plugin
If the main component of embedded plugin declares Input and Output properties then you can interact with it. ApplicationManager provides methods to set Input properties and get Output properties of the embedded plugin. Suppose, that the embedded plugin declares Input and Output properties like this:
```
plugin.component.ts
```
```
    @Input() sampleInput: string;
    @Output() sampleOutput: EventEmitter<string> = new EventEmitter<string>();
```
Obtain a reference to ApplicationManager in your component constructor:
```
app.component.ts
```
```
    private applicationManager: MVDHosting.ApplicationManagerInterface;
    constructor(
      @Inject(Angular2InjectionTokens.PLUGIN_EMBED_ACTIONS) private embedActions: Angular2PluginEmbedActions,
      // @Inject(MVDHosting.Tokens.ApplicationManagerToken) private applicationManager: MVDHosting.ApplicationManagerInterface
      injector: Injector
    ) {
      this.applicationManager = this.injector.get(MVDHosting.Tokens.ApplicationManagerToken);   
    }
```
*Note:* We are unable to inject `ApplicationManager` with `@Inject()` until an AoT-compiler issue with namespaces is resolved: [angular/angular#15613](https://github.com/angular/angular/issues/15613)

Now you can set `sampleInput` property, obtain `sampleOutput` property and subscribe to it:
```
app.component.ts
```
```
this.applicationManager.setEmbeddedInstanceInput(this.embeddedInstance, 'sampleInput', 'some value');   

    const sampleOutput: Observable<string> = this.applicationManager.getEmbeddedInstanceOutput(this.embeddedInstance, 'sampleOutput');
    sampleOutput.subscribe(value => console.log(`get new value ${value} from sampleOutput`));
```
## How to destroy embedded plugin
There is no special API to destroy embedded plugin. If you want to destroy the embedded plugin just clear the container for the embedded plugin and set `embeddedInstance` to null:
```
app.component.ts
```
```
    this.viewContainerRef.clear();
    this.embeddedInstance = null;
```
## How to style a container for the embedded plugin
It is hard to give a universal recipe for a container style. At least, the container needs `position: "relative"` because the embedded plugin may have absolutely positioned elements. Here is sample styles you can start with if your component utilizes flexbox layout:
```
app.component.css
```
```
    .container-for-embedded-window {
      position: relative;
      flex: 1 1 auto;
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
```
## Applications that use embedding
[Workflow app](https://github.com/zowe/zlux-workflow/blob/master/webClient/src/app/workflow-step-wizard/workflow-step-wizard.component.ts) demonstrates advanced usage.