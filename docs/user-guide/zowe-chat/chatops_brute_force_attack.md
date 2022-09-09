# Configuring the access rate limit of Microservice

Zowe Chat Microservice limits the number of requests submitted from the same IP address to provide protection against DDoS attacks, and the number of login attempts from a user or a host before the user or the host becomes locked out to provide protection against brute-force attacks. You can modify these limits by configuring bnz-rate-limit.yaml.

A distributed denial-of-service attack \(DDoS attack\) is a cyber attack in which the attacker seeks to make a machine or network resource unavailable to its intended users by flooding the targeted machine or resource with superfluous requests in an attempt to overload systems. In a DDoS attack, the incoming traffic flooding the victim originates from many different sources.

Brute force attacks use a repetitive method of trial and error to guess a person's user name, password, credit number, or cryptographic key. If an attacker is trying to determine the password of a particular user, they might send many login attempts with different username and password combinations until they find one that works.

To protect against these two types of attacks, Zowe Chat Microservice can lock out a user or a host if a certain number of failed attempts have occurred within a certain duration. When a user or host is locked out, any subsequent attempts from that user or host will be denied until the account lockout is lifted after a specified period of time.

Zowe Chat provides a rate-limit configuration file in which you can specify the maximum number of requests or login failures, the duration to count the number of submitted requests or login failures, and the duration to block further accessing when the users are locked. The rate-limit configuration file has recommended default values for these parameters, and you can modify the values to suit your personal needs.

You can modify the following parameter values in the rate-limit configuration file.

**Request section**

-   **point:** Specify the maximum number of requests that can be submitted over the specified duration. The default value is 10 requests.
-   **duration:** Specify the duration in second to count the number of submitted request. The default value is 1 second.
-   **blockDuration:** Specify the duration in second to block further accessing when the request limit reaches. The default value is 60 seconds.

**Login section**

i. IP \(Configure the limit of login failures allowed by the same IP address.\)

-   **point:** Specify the maximum number of login failures allowed over the specified duration. The default value is 100 login failures.
-   **duration:** Specify the duration in second to count the number of login failures. The default value is 3600 seconds, i.e. 1 hour.
-   **blockDuration:** Specify the duration in second to block further login attempts when the login limit reaches. The default value is 86400 seconds, i.e. 1 day.

ii. User \(Configure the maximum consecutive login failures allowed by the same user from the same IP address.\)

-   **point:** Specify the maximum number of login failures allowed over the specified duration. The default value is 5.
-   **duration:** Specify the duration in second to count the number of login failures. The default value is 60.
-   **blockDuration:** Specify the duration in second to block further login attempts when the login limit reaches. The default value is 300.

1.  Go to the Zowe Chat configuration directory.

    -   For Container users:

        i. Go to the directory where you extract the Zowe Chat Container archive.

        ii. Run the following command to open an interactive shell on the Zowe Chat container that is running.

        ```
        ./bnzContainer.sh shell
        ```

        iii. Go to the configuration directory.

        ```
        cd config
        ```

        **Tip:** If you are familiar with docker/podman commands, you can use commands to open the interactive bash shell. You can also edit the configuration files directly in the mounted path of the zchatops-configuration-112 volume.

    -   For native installation users:

        ```
        cd $ZCHATOPS\_HOME/config
        ```

2.  Edit the rate-limit configuration file bnz-rate-limit.yaml by modifying the parameter values.

    **Tip:** Locate the parameter you want to modify, delete the original value, and type the new value.

    ```
    # Configure the limit of requests submitted from the same IP address
    request:
      # Specify the maximum number of requests can be submitted over the specified duration
      # The default value is 10.
      point: 10
    
      # Specify the duration in second to count the number of submitted requests
      # The default value is 1.
      duration: 1
    
      # Specify the duration in second to block further accessing when the request limit reaches
      # The default value is 60, i.e. 1 minute.
      blockDuration: 60
    
    # Configure the limit of login failures allowed from the same IP address and user
    login:
      # Configure the limit of login failures allowed by the same IP address
      ip: 
        # Specify the maximum number of login failures allowed over the specified duration
        # The default value is 100.
        point: 100
    
        # Specify the duration in second to count the number of login failures
        # The default value is 3600, i.e. 1 hour.
        duration: 3600
    
        # Specify the duration in second to block further login attempts when the login limit reaches
        # The default value is 86400, i.e. 1 day.
        blockDuration: 86400
      
      # Configure the maximum consecutive login failures allowed by the same user from the same IP address
      user:
        # Specify the maximum number of login failures allowed over the specified duration
        # The default value is 5.
        point: 5
    
        # Specify the duration in second to count the number of login failures
        # The default value is 60, i.e. 1 minute.
        duration: 60
    
        # Specify the duration in second to block further login attempts when the login limit reaches
        # The default value is 300, i.e. 5 minutes.
        blockDuration: 300
    
        
    ```

3.  Stop and start your Zowe Chat for the configuration to take effect. See [Starting and stopping Zowe Chat](chatops_install_start_stop_service.md) for specific steps.


