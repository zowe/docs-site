# Software requirements

To successfully install Z ChatOps, you must meet the software requirements considering operating system, runtime, database, chat platform, and data source.

## Software prerequisites

-   Operating system:
    -   Linux® on System x
    -   Linux on System z®
-   Runtime: the runtime requirements vary depending on which kind of installation method you choose, Container or native installation.
    -   Container installation:
        -   Docker-ce 19.0.5 or later
        -   Podman 3.3.1 or later
    -   Native installation:
        -   Node.js 16.13.2 or later
-   Chat platform:
    -   Slack
    -   Mattermost 6.4.1 or later
    -   Microsoft™ Teams
-   Data source:
    -   IBM® Service Management Unite 1.1.9.0 or later

        **Important:** Z ChatOps retrieves IBM Z® automation and monitoring data via IBM Service Management Unite \(SMU\). You must install SMU and configure the integration before you can analyze and operate on IBM Z automation and monitor resource through Z ChatOps. See [Configuring SMU data provider for Z ChatOps](chatops_config_connect_l2_smu.md) for specific steps. To know more about Service Management Unite \(SMU\), visit [IBM Service Management Unite 1.1.9](https://www.ibm.com/docs/en/smu/1.1.9) on IBM Documentation.

        -   Credentials for accessing automation domains must be configured in SMU if you want to query or manage automation resource in Z ChatOps.
        -   IBM Z NetView® RESTful API server must be configured in SMU if you want to query or manage NetView resource in Z ChatOps. You must also log in SMU web console with your configured SMU functional user, for example, eezdmn. Click **Administration** \> **Explore NetView Domains** to input and save your user ID and password to access your NetView RESTful API server.

            ![](chatops_netview.png "Explore NetView Domains")

    -   Dynamic Workload Console 9.5 or later

        **Important:** Z ChatOps retrieves IBM Z workload scheduling data via Dynamic Workload Console. You must install Dynamic Workload Console and configure the integration before you can analyze and operate on IBM Z workload scheduling related resource through Z ChatOps. See [Configuring SMU data provider for Z ChatOps](chatops_config_connect_l2_smu.md) for specific steps. To know more about Dynamic Workload Console, visit [IBM Z Workload Scheduler](https://www.ibm.com/docs/en/workload-automation/9.5.0?topic=overview-z-workload-scheduler) on IBM Documentation.


**Parent topic:**[Planning for IBM Z ChatOps](chatops_prerequisite_requirement.md)

