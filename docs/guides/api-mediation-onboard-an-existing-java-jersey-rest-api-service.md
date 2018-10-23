
# Java Jersey REST APIs

As an API developer, use this guide to onboard your Java Jersey REST API service into the Zowe API Mediation Layer. This article outlines a step-by-step process to make your API service available in the API Mediation Layer.

The following procedure is an overview of steps to onboard a Java Jersey REST API application with the API Mediation Layer. 

**Follow these steps:**

1. [Get enablers from the Artifactory](#get-enablers-from-the-artifactory)

2. [Externalize parameters](#externalize-parameters)

3. [Run your service](#run-your-service)

4. [Validate discovery of the API service by the Discovery Service](#validate-discovery-of-the-api-service-by-the-discovery-service)

## Get enablers from the Artifactory

The first step to onboard a Java Jersey REST API into the Zowe ecosystem is to get enabler annotations from the Artifactory. Enablers prepare your service for discovery and for the retrieval of Swagger documentation.

You can use either Gradle or Maven build automation systems. 

### Gradle guide
Use the following procedure if you use Gradle as your build automation system.

**Tip:** To migrate from Maven to Gradle, go to your project directory and run `gradle init`. This converts the Maven build to a Gradle build by generating a _setting.gradle_ file and a _build.gradle_ file.
         
**Follow these steps:**

1.  Create a _gradle.properties_ file in the root of your project.
 
2.  In the _gradle.properties_ file, set the following URL of the repository and customize the values of your credentials to access the repository.

    ```
    # Repository URL for getting the enabler-jersey artifact
    artifactoryMavenRepo=https://gizaartifactory.jfrog.io/gizaartifactory/libs-release
   
    # Artifactory credentials for builds:
    mavenUser={username}
    mavenPassword={password}
    ```

    This file specifies the URL for the repository of the Artifactory. The enabler-jersey artifacts are downloaded from this repository.

3. Add the following Gradle code block to the *build.gradle* file:

    ```groovy
    ext.mavenRepository = {
    maven {
        url artifactoryMavenSnapshotRepo
        credentials {
            username mavenUser
            password mavenPassword
            }
       }
    }

    repositories mavenRepositories

    ```
    The `ext` object declares the `mavenRepository` property. This property is used as the project repository.
   
4. In the same _build.gradle_ file, add the following code to the dependencies code block to add the enabler-jersey artifact as a dependency of your project:

    ```groovy
      compile(group: 'com.ca.mfaas.sdk', name:   'mfaas-integration-enabler-jersey', version: '0.2.0')
    ```
    
5. In your project directory, run the `gradle build` command to build your project.
    
### Maven guide

Use the following procedure if you use Maven as your build automation system.

**Tip:** To migrate from Gradle to Maven, go to your project directory and run `gradle install`. This command automatically generates a *pom-default.xml* inside the _build/poms_ subfolder where all of the dependencies are contained. 

**Follow these steps:**
     
1. Add the following _xml_ tags within the newly created *pom.xml* file:

   ```xml
     <repositories>
        <repository>
          <id>libs-release</id>
          <name>libs-release</name>
          <url>https://gizaartifactory.jfrog.io/gizaartifactory/libs-release</url>
          <snapshots>
            <enabled>false</enabled>
          </snapshots>
        </repository>
      </repositories>
   ``` 

    This file specifies the URL for the repository of the Artifactory where you download the enabler-jersey artifacts.

2. In the same file, copy the following _xml_ tags to add the enabler-jersey artifact as a dependency of your project:
   ```xml
    <dependency>
        <groupId>com.ca.mfaas.sdk</groupId>
        <artifactId>mfaas-integration-enabler-jersey</artifactId>
        <version>0.2.0</version>
    </dependency>
   ```
3. Create a _settings.xml_ file and copy the following _xml_ code block which defines the credentials for the Artifactory:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>

    <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      https://maven.apache.org/xsd/settings-1.0.0.xsd">
    <servers>
       <server>
           <id>libs-release</id>
           <username>{username}</username>
           <password>{password}</password>
       </server>
    </servers>
    </settings>
    ```
4. Copy the _settings.xml_ file inside `${user.home}/.m2/` directory.
    
5. In the directory of your project, run the `mvn package` command to build the project.

## Externalize parameters

By default, parameters defined inside the *eureka-client.properties* are externalized 
due to a `ServletContextListener` defined in the *enabler-jersey*.  To  create your own 
`ServletContextListener`, register a `ServletContextListener` and enable it to read all 
the properties defined inside the .*properties* file.

**Follow these steps:**

1. Define parameters that you want to externalize in a `.properties` file. 
Ensure that this file is placed in the _WEB-INF_ folder located in the module of your service.

2. Before the web application is started (Tomcat), create a `ServletContextListener` to run 
the defined code. 

    **Example:**
     ```java
                package com.ca.hwsjersey.resource.listeners;
                import javax.servlet.ServletContextEvent;
                import javax.servlet.ServletContextListener;
                import javax.servlet.annotation.WebListener;
                import java.io.IOException;
                import java.util.Properties;
                
                
                @WebListener
                public class ExternalParameters implements ServletContextListener {
                
                    @Override
                    public void contextDestroyed(final ServletContextEvent event) {
                //        Filled automatically
                    }
                
                    @Override
                    public void contextInitialized(final ServletContextEvent event) {
                
                        final String fileName = "/WEB-INF/external-parameters.properties";
                        final Properties propsFromFile = new Properties();
                
                        System.out.println();
                
                        try {
                            // note: Try reading the external-parameters.properties file
                            System.out.println("Looking for external parameters in - " + fileName);
                            propsFromFile.load(event.getServletContext().getResourceAsStream(fileName));
                        } catch (final NullPointerException e) {
                            System.err.println("I don't know a file like this! " + fileName);
                            System.err.println(e.getMessage());
                            throw new NullPointerException();
                        } catch (final IOException e) {
                            System.err.println(e.getMessage());
                        }
                        
                        for (String prop : propsFromFile.stringPropertyNames()) {
                        
                                    if (System.getProperty(prop) == null) {
                                        System.out.println("Setting value " + propsFromFile.getProperty(prop) + " to property " + prop);
                                        System.setProperty(prop, propsFromFile.getProperty(prop));
                                    } else {
                                        System.out.print(System.getProperty(prop));
                                    }
                        
                                }
                        
                                System.out.println();
                        
                            }
                }   

    ```

3. Register the listener. Use one of the following two options:

    * Add the ```@WebListener``` annotation to the servlet.
    * Reference the listener by adding the following code block to the 
    deployment descriptor _web.xml_.
    
      ``` xml
      <listener>
        <listener-class>your.class.package.path</listener-class>
      </listener>
      ```

4. Reference your externalized parameters in your _web.xml_ as in the following example.
   
      **Example:** 

      ```xml
      <context-param>
         <param-name>{yourProperty}</param-name>
         <param-value></param-value>
      </context-param>
      ```
    
      **Note:** Ensure that the parameter name is the same name as in 
      the _external-parameters.properties_.


## Run your service

After you externalize the parameters to make them readable through Tomcat, 
you are ready to run your service in the APIM Ecosystem.

**Note:** The following procedure uses `localhost` testing.

**Follow these steps:**

1. Run the following services to onboard your application:

    **Tip:** For more information about how to run the API Mediation Layer locally, see [Running the API Mediation Layer on Local Machine.](https://github.com/gizafoundation/api-layer/blob/master/docs/local-configuration.md)
    * Gateway Service  
    * Discovery Service
    * API Catalog Service

2. Run Tomcat for your Java Jersey application. 

    **Tip:** Wait for the services to be ready. This process may take a few minutes.
    
3. Go to the following URL to reach the API Catalog through the Gateway (port 10010):
    ```
    https://localhost:10010/ui/v1/caapicatalog/#/ui/dashboard
    ``` 
    
    You successfully onboarded your Java Jersey application if see your service 
    running and can access the API documentation. 

## (Optional) Validate discovery of the API service by the Discovery Service

The following procedure enables you to check if your service is discoverable by 
the Discovery Service.
 
 **Follow these steps:**
 
1. Go to `http://localhost:10011`. 
2. Enter _eureka_ as a username and _password_ as a password.
3. Check if your application was discovered by Eureka. 

