# FAQ

## Error Jobs search failing

### Error:

Search for jobs using SDSF failed for prefix {} and owner {}: exc.sdsf_invocation_failed 8 (Issue does not impace ZD&T boxes)

### Solution:

You must be authorized to use SDSF with REXX on your z/OS system. In order to do this, activate the SDSF RACF class and add the following 3 profiles to your system:

- GROUP.ISFSORIG
- GROUP.ISFSPROG.SDSF
- ISF.CONNECT.

Users must belong to a group that has READ access to these profiles.

This is quite a complex area and you should ask your systems programmer for advice. On most systems, the GROUP.\* profiles are not required and it is sufficient to have the following ISF profile defined:

class profile SDSF ISF.CONNECT.\*\* (G)

## Services that are Not Running Appear to be Running

### Error:

Services that are not running appear to be running. The following message is displayed in the Discovery Service:

   **EMERGENCY! EUREKA MAY BE INCORRECTLY CLAIMING INSTANCES ARE UP WHEN THEY'RE NOT. RENEWALS ARE LESSER THAN THRESHOLD AND HENCE THE INSTANCES ARE NOT BEING EXPIRED JUST TO BE SAFE.**
    
### Cause:

This message is expected behavior of the discovery service. If a service is incorrectly terminated without properly unregistering from Eureka, it initially enters _eviction status_ for a brief timeframe before the service is deregistered. Failure to properly terminate occurs when a service fails to respond to three consecutive heartbeat renewals. After the three heartbeat renewals are returned without a response, the Eureka discovery service keeps the service in _eviction status_ for one additional minute. If the service does not respond within this minute, the Eureka service unregisters this unresponsive service. When more than 15 percent of currently registered services are in _eviction status_, _self preservation mode_ is enabled. In _self preservation mode_, no services in eviction status are deregistered. As a result, these services continue to appear to be running even though they are not running.

### Solution:

Use one of the following options to exit self preservation mode:

   - **Restart the services that appear to be running**
    
     Relaunch the services that appear to be registered. After the message disappears, close each of the services one at a time. Allow for a 3-minute period between closing each service.

   - **Restart the discovery service**
    
     Manually restart the discovery service. The new instance will not be in self preservation mode. In a few minutes, the running services re-register.

   - **Adjust the threshold of services in eviction status**
   
     Change the frequency of the discovery service from entering self preservation mode by adjusting the threshold of services in eviction status. 

       **Note:** The default threshold is .85. This results in the discovery service entering self preservation mode when 15 percent of currently registered services are in _eviction status_.
       
       **Example:**
   
       ```
       eureka.renewalPercentThreshold=0.3
       ```
   
       This threshold limit causes the discovery service to enter self preservation mode when less than 30 percent of services are not responding.
   
   

