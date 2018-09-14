# Create a User Database Browser application on the Zowe Application Framework

This tutorial contains code snippets and descriptions that you can piece together to build a complete app. It builds off the project skeleton code found at the [github project repo](https://github.com/zowe/workshop-user-browser-app).

By the end of this tutorial, you will:

1. Know how to create an application that displays on the Zowe Desktop
1. Know how to create a Dataservice which implements a simple REST API
1. Be introduced to Typescript programming
1. Be introduced to simple Angular web development
1. Have experience in working with the Zowe Application Framework
1. Become familiar with one of the Zowe Application widgets: the grid widget

:::warning
Before continuing, make sure you have completed the prerequisites for this tutorial:

- Setup up the [zlux-example-server locally](./zlux-example-server.md).
  :::

So, let's get started!

1. [Constructing an application skeleton](#constructing-an-app-skeleton)
   1. [Defining your first plug-in](#defining-your-first-plugin)
   1. [Constructing a simple Angular UI](#constructing-a-simple-angular-ui)
   1. [Packaging Your Web App](#packaging-your-web-app)
   1. [Adding Your App to the Desktop](#adding-your-app-to-the-desktop)
1. [Building your First Dataservice](#building-your-first-dataservice)
   1. [Working with ExpressJS](#working-with-expressjs)
   1. [Adding your Dataservice to the Plugin Definition](#adding-your-dataservice-to-the-plugin-definition)
1. [Adding your First Widget](#adding-your-first-widget)
   1. [Adding your Dataservice to the App](#adding-your-dataservice-to-the-app)
   1. [Introducing ZLUX Grid](#introducing-zlux-grid)
1. [Adding Zowe App-to-App Communication](#adding-zowe-app-to-app-communication)
   1. [Calling back to the Starter App](#calling-back-to-the-starter-app)

## Constructing an appliction skeleton

Download the skeleton code from the [project repository](https://github.com/zowe/workshop-user-browser-app). Next move the project into the `zlux` source folder created in the prerequisite tutorial.

If you look within this repository, you'll see that a few boilerplate files already exist to help you get your first application plug-in running quickly. The structure of this repository follows the guidelines for Zowe application plug-in filesystem layout, which you can read more about [on the wiki](https://github.com/zowe/zlux/wiki/ZLUX-App-filesystem-structure).

### Defining your first plug-in

Where do you start when making an application plug-in? In the Zowe Application Framework, an application plug-in is a plug-in of type "Application". Every plug-in is bound by their `pluginDefinition.json` file, which describes its properties.
Let's start by creating this file.

Create a file, `pluginDefinition.json`, at the root of the `workshop-user-browser-app` folder.
The file should contain the following:

```json
{
  "identifier": "org.openmainframe.zowe.workshop-user-browser",
  "apiVersion": "1.0.0",
  "pluginVersion": "0.0.1",
  "pluginType": "application",
  "webContent": {
    "framework": "angular2",
    "launchDefinition": {
      "pluginShortNameKey": "userBrowser",
      "pluginShortNameDefault": "User Browser",
      "imageSrc": "assets/icon.png"
    },
    "descriptionKey": "userBrowserDescription",
    "descriptionDefault": "Browse Employees in System",
    "isSingleWindowApp": true,
    "defaultWindowStyle": {
      "width": 1300,
      "height": 500
    }
  }
}
```

A description of the particular values that are placed into this file can be found [on the wiki](https://github.com/zowe/zlux/wiki/Zlux-Plugin-Definition-&-Structure).

Note the following attributes:

- Our application has the unique identifier of `org.openmainframe.zowe.workshop-user-browser`, which can be used to refer to it when running Zowe.
- The application has a `webContent` attribute, because it will have a UI component that is visible in a browser.
  - The `webContent` section states that the application's code will conform to Zowe's Angular application structure, due to it stating `"framework": "angular2"`
  - The application plug-in has certain characteristics that the user will see, such as:
    - The default window size (`defaultWindowStyle`),
    - An application plug-in icon that we provided in `workshop-user-browser-app/webClient/src/assets/icon.png`,
    - That we should see it in the browser as an application plug-in named `User Browser`, the value of `pluginShortNameDefault`.

### Constructing a Simple Angular UI

Angular application plug-ins for Zowe are structured such that the source code exists within `webClient/src/app`. In here, you can create modules, components, templates and services in whatever hierarchy desired. For the application plug-in we are making here however, we will add  3 files:

- userbrowser.module.ts
- userbrowser-component.html
- userbrowser-component.ts

At first, let's just build a shell of an application plug-in that can display some simple content.
Fill in each file with the following content.

**userbrowser.module.ts**

```typescript
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { UserBrowserComponent } from './userbrowser-component'

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [UserBrowserComponent],
  exports: [UserBrowserComponent],
  entryComponents: [UserBrowserComponent]
})
export class UserBrowserModule {}
```

**userbrowser-component.html**

```html
<div class="parent col-11" id="userbrowserPluginUI">
{{simpleText}}
</div>

<div class="userbrowser-spinner-position">
  <i class="fa fa-spinner fa-spin fa-3x" *ngIf="resultNotReady"></i>
</div>
```

**userbrowser-component.ts**

```typescript
import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
  Inject,
  SimpleChange
} from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Http, Response } from '@angular/http'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/debounceTime'

import {
  Angular2InjectionTokens,
  Angular2PluginWindowActions,
  Angular2PluginWindowEvents
} from 'pluginlib/inject-resources'

@Component({
  selector: 'userbrowser',
  templateUrl: 'userbrowser-component.html',
  styleUrls: ['userbrowser-component.css']
})
export class UserBrowserComponent implements OnInit, AfterViewInit {
  private simpleText: string
  private resultNotReady: boolean = false

  constructor(
    private element: ElementRef,
    private http: Http,
    @Inject(Angular2InjectionTokens.LOGGER) private log: ZLUX.ComponentLogger,
    @Inject(Angular2InjectionTokens.PLUGIN_DEFINITION)
    private pluginDefinition: ZLUX.ContainerPluginDefinition,
    @Inject(Angular2InjectionTokens.WINDOW_ACTIONS)
    private windowAction: Angular2PluginWindowActions,
    @Inject(Angular2InjectionTokens.WINDOW_EVENTS)
    private windowEvents: Angular2PluginWindowEvents
  ) {
    this.log.info(`User Browser constructor called`)
  }

  ngOnInit(): void {
    this.simpleText = `Hello World!`
    this.log.info(`App has initialized`)
  }

  ngAfterViewInit(): void {}
}
```

### Packaging Your Web application plug-in

At this time, we've made the source for a Zowe application plug-in that should open in the Zowe Desktop with a greeting to the planet.
Before we're ready to use it however, we have to transpile the typescript and package the application plug-in. This will require a few build tools first. We'll make an NPM package in order to facilitate this.

Let's create a `package.json` file within `workshop-user-browser-app/webClient`.
While a package.json can be created through other means such as `npm init` and packages can be added via commands such as `npm install --save-dev typescript@2.9.0`, we'll opt to save time by just pasting these contents in:

```json
{
  "name": "workshop-user-browser",
  "version": "0.0.1",
  "scripts": {
    "start": "webpack --progress --colors --watch",
    "build": "webpack --progress --colors",
    "lint": "tslint -c tslint.json \"src/**/*.ts\""
  },
  "private": true,
  "dependencies": {},
  "devDependencies": {
    "@angular/animations": "~6.0.9",
    "@angular/common": "~6.0.9",
    "@angular/compiler": "~6.0.9",
    "@angular/core": "~6.0.9",
    "@angular/forms": "~6.0.9",
    "@angular/http": "~6.0.9",
    "@angular/platform-browser": "~6.0.9",
    "@angular/platform-browser-dynamic": "~6.0.9",
    "@angular/router": "~6.0.9",
    "@zlux/grid": "git+https://github.com/zowe/zlux-grid.git",
    "@zlux/widgets": "git+https://github.com/zowe/zlux-widgets.git",
    "angular2-template-loader": "~0.6.2",
    "copy-webpack-plugin": "~4.5.2",
    "core-js": "~2.5.7",
    "css-loader": "~1.0.0",
    "exports-loader": "~0.7.0",
    "file-loader": "~1.1.11",
    "html-loader": "~0.5.5",
    "rxjs": "~6.2.2",
    "rxjs-compat": "~6.2.2",
    "source-map-loader": "~0.2.3",
    "ts-loader": "~4.4.2",
    "tslint": "~5.10.0",
    "typescript": "~2.9.0",
    "webpack": "~4.0.0",
    "webpack-cli": "~3.0.0",
    "webpack-config": "~7.5.0",
    "zone.js": "~0.8.26"
  }
}
```

Before we can build, we first need to tell our system where our example server is located. While we could provide the explicit path to our server in our project, creating an environmental variable with this location will speed up future projects.

To add an environmental variable on a Unix based machine:

1. `cd ~`
2. `nano .bash_profile`
3. Add `export MVD_DESKTOP_DIR=/Users/<user-name>/path/to/zlux/zlux-app-manager/virtual-desktop/`
4. Save and exit
5. `source ~/.bash_profile`

Now we are ready to build.
Let's set up our system to automatically perform these steps every time we make updates to the application plug-in.

1. Open a command prompt to `workshop-user-browser-app/webClient`
1. Execute `npm install`
1. Execute `npm run-script start`

After the first execution of the transpilation and packaging concludes, you should have `workshop-user-browser-app/web` populated with files that can be served by the Zowe Application Server.

### Adding Your application plug-in to the Zowe Desktop

At this point, your workshop-user-browser-app folder contains files for an application plug-in that could be added to a Zowe instance. We will add this to our own Zowe instance. First, ensure that the Zowe Application Server is not running. Then, navigate to the instance's root folder, `/zlux-example-server`.

Within, you'll see a folder, `plugins`. Take a look at one of the files within the folder. You can see that these are JSON files with the attributes **identifier** and **pluginLocation**. These files are what we call **Plugin Locators**, since they point to a plug-in to be included into the server.

Let's make one ourselves. Make a file `/zlux-example-server/plugins/org.openmainframe.zowe.workshop-user-browser.json`, with these contents:

```json
{
  "identifier": "org.openmainframe.zowe.workshop-user-browser",
  "pluginLocation": "../../workshop-user-browser-app"
}
```

When the server runs, it will check for these sorts of files in its `pluginsDir`, a location known to the server through its specification in the [server configuration file](https://github.com/zowe/zlux/wiki/Configuration-for-zLUX-Proxy-Server-&-ZSS#app-configuration). In our case, this is `/zlux-example-server/deploy/instance/ZLUX/plugins/`.

You could place the JSON directly into that location, but the recommended way to place content into the deploy area is through running the server deployment process.
Simply:

1. Open up a (second) command prompt to `zlux-build`
1. `ant deploy`

Now you're ready to run the server and see your application plug-in.

1. `cd /zlux-example-server/bin`
1. `./nodeServer.sh`
1. Open your browser to `https://hostname:port`
1. Login with your credentials
1. Open the application plug-in on the bottom of the page with the green 'U' icon.

Do you see the Hello World message from [this earlier step?](#constructing-a-simple-angular-ui). If so, you're in good shape! Now, let's add some content to the application plug-in.

## Building your first dataservice

An application plug-in can have one or more [Dataservices](https://github.com/zowe/zlux/wiki/ZLUX-Dataservices). A Dataservice is a REST or Websocket endpoint that can be added to the Zowe Application Server.

To demonstrate the use of a Dataservice, we'll add one to this application plug-in. The application plug-in needs to display a list of users, filtered by some value. Ordinarily, this sort of data would be contained within a database, where you can get rows in bulk and filter them in some manner. Retrieval of database contents, likewise, is a task that is easily representable through a REST API, so let's make one.

1. Create a file, `workshop-user-browser-app/nodeServer/ts/tablehandler.ts`
   Add the following contents:

```typescript
import { Response, Request } from 'express'
import * as table from './usertable'
import { Router } from 'express-serve-static-core'

const express = require('express')
const Promise = require('bluebird')

class UserTableDataservice {
  private context: any
  private router: Router

  constructor(context: any) {
    this.context = context
    let router = express.Router()

    router.use(function noteRequest(req: Request, res: Response, next: any) {
      context.logger.info('Saw request, method=' + req.method)
      next()
    })

    router.get('/', function(req: Request, res: Response) {
      res.status(200).json({ greeting: 'hello' })
    })

    this.router = router
  }

  getRouter(): Router {
    return this.router
  }
}

exports.tableRouter = function(context): Router {
  return new Promise(function(resolve, reject) {
    let dataservice = new UserTableDataservice(context)
    resolve(dataservice.getRouter())
  })
}
```

This is boilerplate for making a Dataservice. We lightly wrap ExpressJS Routers in a Promise-based structure where we can associate a Router with a particular URL space, which we will see later. If you were to attach this to the server, and do a GET on the root URL associated, you'd receive the {"greeting":"hello"} message.

### Working with ExpressJS

Let's move beyond hello world, and access this user table.

1. Within `workshop-user-browser-app/nodeServer/ts/tablehandler.ts`, add a function for returning the rows of the user table.

```typescript
const MY_VERSION = '0.0.1'
const METADATA_SCHEMA_VERSION = '1.0'
function respondWithRows(rows: Array<Array<string>>, res: Response): void {
  let rowObjects = rows.map(row => {
    return {
      firstname: row[table.columns.firstname],
      mi: row[table.columns.mi],
      lastname: row[table.columns.lastname],
      email: row[table.columns.email],
      location: row[table.columns.location],
      department: row[table.columns.department]
    }
  })

  let responseBody = {
    _docType: 'org.openmainframe.zowe.workshop-user-browser.user-table',
    _metaDataVersion: MY_VERSION,
    metadata: table.metadata,
    resultMetaDataSchemaVersion: '1.0',
    rows: rowObjects
  }
  res.status(200).json(responseBody)
}
```

Because we reference the usertable file through import, we are able to refer to its **metadata** and **columns** attributes here.
This **`respondWithRows`** function expects an array of rows, so we'll improve the Router to call this function with some rows so that we can present them back to the user.

2. Update the **UserTableDataservice** constructor, modifying and expanding upon the Router

```typescript
  constructor(context: any){
    this.context = context;
    let router = express.Router();
    router.use(function noteRequest(req: Request,res: Response,next: any) {
      context.logger.info('Saw request, method='+req.method);
      next();
    });
    router.get('/',function(req: Request,res: Response) {
      respondWithRows(table.rows,res);
    });

    router.get('/:filter/:filterValue',function(req: Request,res: Response) {
      let column = table.columns[req.params.filter];
      if (column===undefined) {
        res.status(400).json({"error":"Invalid filter specified"});
        return;
      }
      let matches = table.rows.filter(row=> row[column] == req.params.filterValue);
      respondWithRows(matches,res);
    });

    this.router = router;
  }
```

Zowe's use of ExpressJS Routers will allow you to quickly assign functions to HTTP calls such as GET, PUT, POST, DELETE, or even websockets, and provide you will easy parsing and filtering of the HTTP requests so that there is very little involved in making a good API for users.

This REST API now allows for two GET calls to be made: one to root /, and the other to /_filter_/_value_. The behavior here is as is defined in [ExpressJS documentation](https://expressjs.com/en/guide/routing.html#route-parameters) for routers, where the URL is parameterized to give us arguments that we can feed into our function for filtering the user table rows before giving the result to **respondWithRows** for sending back to the caller.

### Adding your Dataservice to the Plugin Definition

Now that the Dataservice is made, add it to our Plugin's definition so that the server is aware of it, and then build it so that the server can run it.

1. Open a (third) command prompt to `workshop-user-browser-app/nodeServer`
1. Install dependencies, `npm install`
1. Invoke the NPM build process, `npm run-script start`
   1. If there are any errors, go back to [building the dataservice](#building-your-first-dataservice) and make sure the files look correct.
1. Edit `workshop-user-browser-app/pluginDefinition.json`, adding a new attribute which declares Dataservices.

```json
"dataServices": [
    {
      "type": "router",
      "name": "table",
      "serviceLookupMethod": "external",
      "fileName": "tablehandler.js",
      "routerFactory": "tableRouter",
      "dependenciesIncluded": true
    }
],
```

Your full pluginDefinition.json should now be:

```json
{
  "identifier": "org.openmainframe.zowe.workshop-user-browser",
  "apiVersion": "1.0.0",
  "pluginVersion": "0.0.1",
  "pluginType": "application",
  "dataServices": [
    {
      "type": "router",
      "name": "table",
      "serviceLookupMethod": "external",
      "fileName": "tablehandler.js",
      "routerFactory": "tableRouter",
      "dependenciesIncluded": true
    }
  ],
  "webContent": {
    "framework": "angular2",
    "launchDefinition": {
      "pluginShortNameKey": "userBrowser",
      "pluginShortNameDefault": "User Browser",
      "imageSrc": "assets/icon.png"
    },
    "descriptionKey": "userBrowserDescription",
    "descriptionDefault": "Browse Employees in System",
    "isSingleWindowApp": true,
    "defaultWindowStyle": {
      "width": 1300,
      "height": 500
    }
  }
}
```

There's a few interesting attributes about the Dataservice we have specified here. First is that it is listed as `type: router`, which is because there are different types of Dataservices that can be made to suit the need. Second, the **name** is **table**, which determines both the name seen in logs but also the URL this can be accessed at. Finally, **fileName** and **routerFactory** point to the file within `workshop-user-browser-app/lib` where the code can be invoked, and the function that returns the ExpressJS Router, respectively.

4. [Restart the server](#adding-your-app-to-the-desktop) (as was done when adding the App initially) to load this new Dataservice. This is not always needed but done here for educational purposes.
5. Access `https://host:port/ZLUX/plugins/org.openmainframe.zowe.workshop-user-browser/services/table/` to see the Dataservice in action. It should return all the rows in the user table, as you did a GET to the root / URL that we just coded.

## Adding your first Widget

Now that you can get this data from the server's new REST API, we need to make improvements to the web content of the application plug-in to visualize this. This means not only calling this API from the application plug-in, but presenting it in a way that is easy to read and extract info from.

### Adding your Dataservice to the application plug-in

Let's make some edits to **userbrowser-component.ts**, replacing the **UserBrowserComponent** Class's **ngOnInit** method with a call to get the user table, and defining **ngAfterViewInit**:

```typescript
  ngOnInit(): void {
    this.resultNotReady = true;
    this.log.info(`Calling own dataservice to get user listing for filter=${JSON.stringify(this.filter)}`);
    let uri = this.filter ? RocketMVD.uriBroker.pluginRESTUri(this.pluginDefinition.getBasePlugin(), 'table', `${this.filter.type}/${this.filter.value}`) : RocketMVD.uriBroker.pluginRESTUri(this.pluginDefinition.getBasePlugin(), 'table',null);
    setTimeout(()=> {
    this.log.info(`Sending GET request to ${uri}`);
    this.http.get(uri).map(res=>res.json()).subscribe(
      data=>{
        this.log.info(`Successful GET, data=${JSON.stringify(data)}`);
        this.columnMetaData = data.metadata;
        this.unfilteredRows = data.rows.map(x=>Object.assign({},x));
        this.rows = this.unfilteredRows;
        this.showGrid = true;
        this.resultNotReady = false;
      },
      error=>{
        this.log.warn(`Error from GET. error=${error}`);
        this.error_msg = error;
        this.resultNotReady = false;
      }
    );
    },100);
  }

  ngAfterViewInit(): void {
    // the flex table div is not on the dom at this point
    // have to calculate the height for the table by subtracting all
    // the height of all fixed items from their container
    let fixedElems = this.element.nativeElement.querySelectorAll('div.include-in-calculation');
    let height = 0;
    fixedElems.forEach(function (elem, i) {
      height += elem.clientHeight;
    });
    this.windowEvents.resized.subscribe(() => {
      if (this.grid) {
        this.grid.updateRowsPerPage();
      }
    });
  }
```

You might notice that we are referring to several instance variables that we have not declared yet. Let's add those within the **UserBrowserComponent** Class too, above the constructor.

```typescript
  private showGrid: boolean = false;
  private columnMetaData: any = null;
  private unfilteredRows: any = null;
  private rows: any = null;
  private selectedRows: any[];
  private query: string;
  private error_msg: any;
  private url: string;
  private filter:any;
```

Hopefully you are still running the command in the first command prompt, `npm run-script start`, which will rebuild your web content for the application whenever you make changes. You may see some errors, which we will clear up by adding the next portion of the application.

### Introducing ZLUX Grid

When **ngOnInit** runs, it will call out to the REST Dataservice and put the table row results into our cache, but we haven't yet visualized this in any way. We need to improve our HTML a bit to do that, and rather than reinvent the wheel, we luckily have a table visualization library we can rely on - **ZLUX Grid**

If you inspect `package.json` in the **webClient** folder, you'll see that we've already included @zlux/grid as a dependency - as a link to one of the Zowe github repositories, so it should have been pulled into the **node_modules** folder during the `npm install` operation. We just need to include it in the Angular code to make use of it. This comes in two steps:

1. Edit **webClient/src/app/userbrowser.module.ts**, adding import statements for the zlux widgets above and within the @NgModule statement:

```typescript
import { ZluxGridModule } from '@zlux/grid';
import { ZluxPopupWindowModule, ZluxButtonModule } from '@zlux/widgets'
//...
@NgModule({
imports: [FormsModule, HttpModule, ReactiveFormsModule, CommonModule, ZluxGridModule, ZluxPopupWindowModule, ZluxButtonModule],
//...
```

The full file should now be:

```typescript
*
  This Angular module definition will pull all of your Angular files together to form a coherent App
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ZluxGridModule } from '@zlux/grid';
import { ZluxPopupWindowModule, ZluxButtonModule } from '@zlux/widgets'

import { UserBrowserComponent } from './userbrowser-component';

@NgModule({
  imports: [FormsModule, HttpModule, ReactiveFormsModule, CommonModule, ZluxGridModule, ZluxPopupWindowModule, ZluxButtonModule],
  declarations: [UserBrowserComponent],
  exports: [UserBrowserComponent],
  entryComponents: [UserBrowserComponent]
})
export class UserBrowserModule { }
```

2. Edit **userbrowser-component.html** within the same folder. Previously, it was just meant for presenting a Hello World message, so we should add some style to accommodate the zlux-grid element we will also add to this template via a tag.

```html
<!-- In this HTML file, an Angular Template should be placed that will work together with your Angular Component to make a dynamic, modern UI -->

<div class="parent col-11" id="userbrowserPluginUI">
  <div class="fixed-height-child include-in-calculation">
      <button type="button" class="wide-button btn btn-default" value="Send">
        Submit Selected Users
      </button>
  </div>
  <div class="fixed-height-child height-40" *ngIf="!showGrid && !viewConfig">
    <div class="">
      <p class="alert-danger">{{error_msg}}</p>
    </div>
  </div>
  <div class="container variable-height-child" *ngIf="showGrid">
    <zlux-grid [columns]="columnMetaData | zluxTableMetadataToColumns"
    [rows]="rows"
    [paginator]="true"
    selectionMode="multiple"
    selectionWay="checkbox"
    [scrollableHorizontal]="true"
    (selectionChange)="onTableSelectionChange($event)"
    #grid></zlux-grid>
  </div>
  <div class="fixed-height-child include-in-calculation" style="height: 20px; order: 3"></div>
</div>

<div class="userbrowser-spinner-position">
  <i class="fa fa-spinner fa-spin fa-3x" *ngIf="resultNotReady"></i>
</div>
```

Note the key functions of this template:

- There's a button which when clicked will submit selected users (from the grid). We will implement this ability later.
- We show or hide the grid based on a variable `ngIf="showGrid"` so that we can wait to show the grid until there is data to present
- The zlux-grid tag pulls the Zowe Application Framework Grid widget into our application, and it has many variables that can be set for visualization, as well as functions and modes.
  - We allow the columns, rows, and metadata to be set dynamically by using the square bracket [ ] template syntax, and allow our code to be informed when the user selection of rows changes via `(selectionChange)="onTableSelectionChange($event)"`

3. Small modification to **userbrowser-component.ts** to add the grid variable, and set up the aforementioned table selection event listener, both within the **UserBrowserComponent** Class:

```js
@ViewChild('grid') grid; //above the constructor

onTableSelectionChange(rows: any[]):void{
    this.selectedRows = rows;
}
```

The previous section, [Adding your Dataservice to the application](#adding-your-dataservice-to-the-app) set the variables that are fed into the Zowe Application Framework Grid widget, so at this point the application should be updated with the ability to present a list of users in a grid.

If you are still running `npm run-script start` in a command prompt, it should now show that the application has been successfully built, and that means we are ready to see the results. Reload your browser's webpage and open the user browser application once more... Do you see the list of users in columns and rows that can be sorted and selected? If so, great, you've built a simple yet useful application within Zowe! Let's move on to the last portion of the application tutorial where we hook the Starter application and the User Browser application together to accomplish a task.

## Adding Zowe App-to-App Communication

Applications in Zowe can be useful and provide insight all by themselves, but a big part of using the Zowe Desktop is that application are able to keep track of and share context by user interaction in order to accomplish a complex task by simple and intuitive means by having the foreground application request an application that is best suited for a task to accomplish that task with some context as to the data & purpose.

In the case of this tutorial, we're trying to not just find a list of employees in a company (as was accomplished in the last step where the Grid was added and populated with the REST API), but to filter that list to find those employees who are best suited to the task we need done. So, our user browser application needs to be enhanced with two new abilities:

- Filter the user list to show only those users that meet the filter
- Send the subset of users selected in the list back to the App that requested a user list.

How do we do either task? application-to-application communication! Application can communicate with other applications in a few ways, but can be categorized into two interaction groups:

1. Launching an App with a context of what it should do
1. Messaging an App that's already open to request or alert it of something

In either case, the application framework provides Actions as the objects to perform the communication. Actions not only define what form of communication should happen, but between which Apps. Actions are issued from one application, and are fulfilled by a target application. But, because there may be more than one instance/window of an application open, there are Target Modes:

- Open a new App window, where the message context is delivered in the form of a Launch Context
- Message a particular, or any of the currently open instances of the target App

### Adding the Starter application

In order to facilitate app to app communication, we need another application with which to communicate. A 'starter' application is provided which can be [found on github](https://github.com/zowe/workshop-starter-app).

As we did previously in the [Adding Your application to the Desktop](#adding-your-app-to-the-desktop) section, we need to move the application files to a location where they can be included in our `zlux-example-server`. We then need to add to the `plugins` folder in the example server and re-deploy.

1. Clone or download the starter app under the `zlux` folder

- `git clone https://github.com/zowe/workshop-starter-app.git`

2. Navigate to starter app and build it as before

- Install packages with `cd webClient` and then `npm install`
- Build the project using `npm start`

2. Next navigate to the `zlux-example-server`:

- create a new file under `/zlux-example-server/plugins/org.openmainframe.zowe.workshop-starter.json`
- Edit the file to contain:

```json
{
  "identifier": "org.openmainframe.zowe.workshop-starter",
  "pluginLocation": "../../workshop-starter-app"
}
```

3. Make sure the ./nodeServer is stopped before running `ant deploy` under `zlux-build`
4. Restart the ./nodeServer under `zlux-example-server/bin` with the appropriate parameters passed in.
5. Refresh the browser and verify that the app with a **Green S** is present in zLUX.

### Enabling Communication

We've already done the work of setting up the application's HTML and Angular definitions, so in order to make our application compatible with application-to-application communication, it only needs to listen for, act upon, and issue Zowe application Actions. Let's make edits to the typescript component to do that. Edit the **UserBrowserComponent** Class's constructor within **userbrowser-component.ts** in order to listen for the launch context:

```typescript
  constructor(
    private element: ElementRef,
    private http: Http,
    @Inject(Angular2InjectionTokens.LOGGER) private log: ZLUX.ComponentLogger,
    @Inject(Angular2InjectionTokens.PLUGIN_DEFINITION) private pluginDefinition: ZLUX.ContainerPluginDefinition,
    @Inject(Angular2InjectionTokens.WINDOW_ACTIONS) private windowAction: Angular2PluginWindowActions,
    @Inject(Angular2InjectionTokens.WINDOW_EVENTS) private windowEvents: Angular2PluginWindowEvents,
    //Now, if this is not null, we're provided with some context of what to do on launch.
    @Inject(Angular2InjectionTokens.LAUNCH_METADATA) private launchMetadata: any,
  ) {
    this.log.info(`User Browser constructor called`);

    //NOW: if provided with some startup context, act upon it... otherwise just load all.
    //Step: after making the grid... we add this to show that we can instruct an app to narrow its scope on open
    this.log.info(`Launch metadata provided=${JSON.stringify(launchMetadata)}`);
    if (launchMetadata != null && launchMetadata.data) {
    /* The message will always be an Object, but format can be specific. The format we are using here is in the Starter App:
      https://github.com/zowe/workshop-starter-app/blob/master/webClient/src/app/workshopstarter-component.ts#L177
    */
      switch (launchMetadata.data.type) {
      case 'load':
        if (launchMetadata.data.filter) {
          this.filter = launchMetadata.data.filter;
        }
        break;
      default:
        this.log.warn(`Unknown launchMetadata type`);
      }
    } else {
      this.log.info(`Skipping launching in a context due to missing or malformed launchMetadata object`);
    }
}
```

Then, add a new method on the Class, **provideZLUXDispatcherCallbacks**, which is a web-framework-independent way to allow the Zowe applications to register for event listening of Actions.

```typescript
  /*
  I expect a JSON here, but the format can be specific depending on the Action - see the Starter App to see the format that is sent for the Workshop:
  https://github.com/zowe/workshop-starter-app/blob/master/webClient/src/app/workshopstarter-component.ts#L225
  */
  zluxOnMessage(eventContext: any): Promise<any> {
    return new Promise((resolve,reject)=> {
      if (!eventContext || !eventContext.data) {
        return reject('Event context missing or malformed');
      }
      switch (eventContext.data.type) {
      case 'filter':
        let filterParms = eventContext.data.parameters;
        this.log.info(`Messaged to filter table by column=${filterParms.column}, value=${filterParms.value}`);

        for (let i = 0; i < this.columnMetaData.columnMetaData.length; i++) {
          if (this.columnMetaData.columnMetaData[i].columnIdentifier == filterParms.column) {
            //ensure it is a valid column
            this.rows = this.unfilteredRows.filter((row)=> {
              if (row[filterParms.column]===filterParms.value) {
                return true;
              } else {
                return false;
              }
            });
            break;
          }
        }
        resolve();
        break;
      default:
        reject('Event context missing or unknown data.type');
      };
    });
  }


  provideZLUXDispatcherCallbacks(): ZLUX.ApplicationCallbacks {
    return {
      onMessage: (eventContext: any): Promise<any> => {
        return this.zluxOnMessage(eventContext);
      }
    }
}
```

At this point, the application should build successfully and upon reloading the Zowe page in your browser, you should see that if you open the Starter application (the application with the green S), that clicking the **Find Users from Lookup Directory** button should open the User Browser application with a smaller, filtered list of employees rather than the unfiltered list we see if opening the application manually.
We can also see that once this application has been opened, the Starter application's button, **Filter Results to Those Nearby**, becomes enabled and we can click that to see the open User Browser application's listing become filtered even more, this time using the browsers [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) to instruct the User Browser application to filter to those employees who are closest to you!

### Calling back to the Starter application

We're almost finished. The application can visualize data from a REST API, and can be instructed by other applications to filter that data according to the situation. But, in order to complete this tutorial, we need the application communication to go in the other direction - inform the Starter application which employees you have chosen in the table!

This time, we will edit **provideZLUXDispatcherCallbacks** to issue Actions rather than to listen for them. We need to target the Starter application, since it is the application that expects to receive a message about which employees should be assigned a task. If that application is given an employee listing that contains employees with the wrong job titles, the operation will be rejected as invalid, so we can ensure that we get the right result through a combination of filtering and sending a subset of the filtered users back to the starter application.

Add a private instance variable to the **UserBrowserComponent** Class.

```typescript
 private submitSelectionAction: ZLUX.Action;
```

Then, create the Action template within the constructor

```typescript
this.submitSelectionAction = RocketMVD.dispatcher.makeAction(
  'org.openmainframe.zowe.workshop-user-browser.actions.submitselections',
  'Sorts user table in App which has it',
  RocketMVD.dispatcher.constants.ActionTargetMode.PluginFindAnyOrCreate,
  RocketMVD.dispatcher.constants.ActionType.Message,
  'org.openmainframe.zowe.workshop-starter',
  { data: { op: 'deref', source: 'event', path: ['data'] } }
)
```

So, we've made an Action which targets an open window of the Starter application, and provides it with an Object with a data attribute.
We'll populate this object for the message to send to the application by getting the results from Zowe Application Framework Grid (`this.selectedRows` will be populated from `this.onTableSelectionChange`).

For the final change to this file, add a new method to the Class:

```typescript
  submitSelectedUsers() {
    let plugin = RocketMVD.PluginManager.getPlugin("org.openmainframe.zowe.workshop-starter");
    if (!plugin) {
      this.log.warn(`Cannot request Workshop Starter App... It was not in the current environment!`);
      return;
    }

    RocketMVD.dispatcher.invokeAction(this.submitSelectionAction,
      {'data':{
         'type':'loadusers',
         'value':this.selectedRows
      }}
    );
}
```

And we'll invoke this via a button click action, which we will add into the Angular template, **userbrowser-component.html**, by changing the button tag for "Submit Selected Users" to:

```html
<button type="button" class="wide-button btn btn-default" (click)="submitSelectedUsers()" value="Send">
```

Check that the application builds successfully, and if so, you've built the application for the tutorial! Try it out:

1. Open the Starter application.
1. Click the "Find Users from Lookup Directory" button.
   1. You should see a filtered list of users in your user application.
1. Click the "Filter Results to Those Nearby" button on the Starter application.
   1. You should now see the list be filtered further to include only one geography.
1. Select some users to send back to the Starter application.
1. Click the "Submit Selected Users" button on the User Browser application.

   1. The Starter application should print a confirmation message that indicates success.

And that's it! Looking back at the beginning of this document, you should notice that we've covered all aspects of application building - REST APIs, persistent settings storage, Creating Angular applications and using Widgets within them, as well as having one application communicate with another. Hopefully you have learned a lot about application building from this experience, but if you have questions or want to learn more, please reach out to those in the Foundation so that we can assist.
