# Internationalizing applications
You can internationalize Zowe&trade; application plug-ins using Angular and React frameworks. Internationalized applications display in translated languages and include structures for ongoing translation updates.

The steps below use the [Zowe Sample Angular Application](https://github.com/zowe/sample-angular-app/) and [Zowe Sample React Application](https://github.com/zowe/sample-react-app) as examples. Your applications might have slightly different requirements, for example the React Sample Application requires the react-i18next library, but your application might require a different React library. 

For detailed information on Angular or React, see their documentation. For detailed information on specific internationalization libraries, see their documentation. You can also reference the Sample Angular Application [internationalization tutorial](https://github.com/zowe/sample-angular-app/blob/lab/step-2-i18n-complete/README.md), and watch a video on how to [internationalize your Angular application](https://www.youtube.com/watch?v=kkCC2u1NQy4&feature=youtu.be).

After you internationalize your application, you can view it by following steps in [Changing the desktop language](../../user-guide/mvd-using.md#changing-the-desktop-language).

## Internationalizing Angular applications
Zowe applications that use the Angular framework depend on `.xlf` formatted files to store static translated content and `.json` files to store dynamic translated content. These files must be in the application's `web/assets/i18n` folder at runtime. Each translated language will have its own file.

To internationalize an application, you must install Angular-compatible internationalization libraries. Be aware that libraries can be better suited to either static or dynamic HTML elements. The examples in this task use the ngx-i18nsupport library for static content and angular-l10n for dynamic content.

To internationalize Zowe Angular applications, take the following steps:

1. To install internationalization libraries, use the `npm` command, for example:

   ```
   npm install --save-dev ngx-i18nsupport
   npm install --save-dev angular-l10n
   ```
   **Note** `--save-dev` commits the library to the application's required libraries list for future use.

2. To support the CLI tools and to control output, create a `webClient/tsconfig.i18n.json` typescript file and add the following content:
   
   ```json
      {
     "extends": "../../zlux-app-manager/virtual-desktop/plugin-config/tsconfig.ngx-i18n.json",
       
     "include": [
    "./src"
     ],
   
     "compilerOptions": {
       "outDir": "./src/assets/i18n",
       "skipLibCheck": true
     }
   }
   ```
   
   For example, see this file in the [Sample Angular Application](https://github.com/zowe/sample-angular-app/blob/master/webClient/tsconfig.i18n.json).
   
3. In the static elements in your HTML files, tag translatable content with the i18n attribute within an Angular template, for example:

   ```html
   <div>
       <p i18n="welcome message@@welcome">Welcome</p>
   </div>
   ```
   The attribute should include a message ID, for example the `@@welcome` above.

4. To configure static translation builds, take the following steps:

    a. In the `webClient/package.json` script, add the following line:

    ```json
    "i18n": "ng-xi18n -p tsconfig.i18n.json --i18nFormat=xlf --outFile=messages.xlf && xliffmerge -p xliffmerge.json",
    ```

    b. In the in `webClient` directory, create a `xliffmerge.json` file, add the following content, and specify the codes for each language you will translate in the `languages` parameter:

    ```json
    {
      "xliffmergeOptions": {
        "srcDir": "src/assets/i18n",
        "genDir": "src/assets/i18n",
        "i18nFile": "messages.xlf",
        "i18nBaseFile": "messages",
        "i18nFormat": "xlf",
        "encoding": "UTF-8",
        "defaultLanguage": "en",
        "languages": ["fr","ru"],
        "useSourceAsTarget": true
      }
    }
    ```
     When you run the i18n script, it reads this file and generates a `messages.[lang].xlf` file in the `src/assets/i18n directory` for each language specified in the `languages` parameter. Each file contains the untranslated text from the i18n-tagged HTML elements.

5. Run the following command to run the i18n script and extract i18n tagged HTML elements to `.xlf` files:

    ```
    npm run i18n
    ```

    **Note** If you change static translated content, you must run the `npm run build` command to build the application, and then re-run the `npm run i18n` command to extract the tagged content again.

6. In each `.xlf` file, replace `target` element strings with translated versions of the `source` element strings. For example:

    ```xml
    <source>App Request Test</source>
    <target>Test de Demande à l'App</target>
    ```

7. Run the following command to rebuild the application:

    ```
    npm run build
    ```

    When you [switch the Zowe Desktop](../../user-guide/mvd-using.md#changing-the-desktop-language) to one of the application's translated languages, the application displays the translated strings.

9. For dynamic translated content, follow these steps:

   a. Import and utilize angular-l10n objects within an Angular component, for example:

   ```typescript
   import { LocaleService, TranslationService, Language } from 'angular-l10n';
   Component({
     selector: 'app-root',
     templateUrl: './app.component.html',
     styleUrls: ['./app.component.css'],
     providers: [HelloService]
   })
   
   export class AppComponent {
     @Language() lang: string;
   
      public myDynamicMessage:string = '';
   
     constructor(
       public locale: LocaleService,
       public translation: TranslationService) { }
    
     sayHello() {
        this.myDynamicMessage =    `${this.translation.translate('my_message')}`;
       });
     }
   }
   ```

   b. In the related Angular template, you can implement `myDynamicMessage` as an ordinary substitutable string, for example:

   ```html
   <div>
     <textarea class="response" placeholder="Response" i18n-placeholder="@@myStaticPlaceholder" >{{myDynamicMessage}}</textarea>
   </div>
   ```
   
10. Create logic to copy the translation files to the `web/assets` directory during the webpack process, for example in the sample application, the following JavaScript in the `copy-webpack-plugin` file copies the files:
   
       ```javascript
        var config = {
        'entry': [
          path.resolve(__dirname, './src/plugin.ts')
          ],
        'output': {
          'path': path.resolve(__dirname, '../web'),
          'filename': 'main.js',
          },
      'plugins': [
          new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, './src/assets'),
              to: path.resolve('../web/assets')
            }
          ])
        ]
      };
      ```

     **Note:** Do not edit files in the `web/assets/i18n` directory. They are overwritten by each build.

## Internationalizing React applications

To internationalize Zowe applications using the React framework, take the following steps:

**Note:** These examples use the recommended react-i18next library, which does not differentiate between dynamic and static content, and unlike the Angular steps above does not require a separate build process.

1. To install the React library, run the following command:

   `npm install --save-dev react-i18next`

2. In the directory that contains your `index.js` file, create an `i18n.js` file and add the translated content, for example:

   ```javascript
   import i18n from "i18next";
   import { initReactI18next } from "react-i18next";
    
   // the translations
   // (tip move them in a JSON file and import them)
   const resources = {
     en: {
       translation: {
         "Welcome to React": "Welcome to React and react-i18next"
       }
     }
   };
    
   i18n
     .use(initReactI18next) // passes i18n down to react-i18next
     .init({
       resources,
       lng: "en",
    
       keySeparator: false, // we do not use keys in form messages.welcome
    
       interpolation: {
         escapeValue: false // react already safes from xss
       }
     });
    
   export default i18n;
   ```

3. Import the `i18n` file from the previous step into `index.js` file so that you can use it elsewhere, for example:

   ```javascript
   import React, { Component } from "react";
   import ReactDOM from "react-dom";
   import './i18n';
   import App from './App';
   
   // append app to dom
   ReactDOM.render(
     <App />,
     document.getElementById("root")
   );
   ```

4. To internationalize a component, include the `useTranslation` hook and reference it to substitute translation keys with their translated values. For example:

   ```javascript
   import React from 'react';
    
    // the hook
   import { useTranslation } from 'react-i18next';
   
   function MyComponent () {
      const { t, i18n } = useTranslation(); // use
      return <h1>{t('Welcome to React')}</h1>
   }
   ```



## Internationalizing application desktop titles

To display the translated application name and description in the Desktop, take the following steps:

1. For each language, create a `pluginDefinition.i18n.<lang_code>.json` file. For example, for German create a `pluginDefinition.i18n.de.json` file.

2. Place the `.json` files in the `web/assets/i18n` directory.

3. Translate the `pluginShortNameKey` and `descriptionKey` values in the application's `pluginDefinition.json` file. For example, for the file below you would translate the values  `"sampleangular"` and `"sampleangulardescription"`:

   ```json
   {
     "identifier": "org.zowe.zlux.sample.angular",
     "apiVersion": "1.0.0",
     "pluginVersion": "1.1.0",
     "pluginType": "application",
     "webContent": {
       "framework": "angular2",
       "launchDefinition": {
         "pluginShortNameKey": "sampleangular",
         "pluginShortNameDefault": "Angular Sample",
         "imageSrc": "assets/icon.png"
       },
    "descriptionKey": "sampleangulardescription",
    "descriptionDefault": "Sample App Showcasing Angular Adapter",
   ```

4. Add the translated values to the translation file. For example, the German translation file example, `pluginDefinition.i18n.de.json`, would look like this:

   ```json
   {
     "sampleangular": "Beispiel Angular",
     "sampleangulardescription": "Beispiel Angular Anwendung"
   }
   ```

5. Create logic to copy the translation files to the `web/assets` directory during the webpack process. For example, in the [Sample Angular Application](https://github.com/zowe/sample-angular-app/blob/v2.x/master/webClient/webpack.config.js) the following JavaScript in the `webClient/webpack.config.js` file copies files to the `web/assets` directory:

    ```javascript
    var config = {
      'entry': [
        path.resolve(__dirname, './src/plugin.ts')
      ],
      'output': {
        'path': path.resolve(__dirname, '../web'),
        'filename': 'main.js',
      },
      'plugins': [
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, './src/assets'),
            to: path.resolve('../web/assets')
          }
        ])
      ]
    };
    ```
