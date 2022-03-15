# Setting up Zowe certificates using workflows

Zowe TODO can work with certificates that are held in a z/OS Keyring.
<!-- TODO Maybe we could be more specific? What exactly does "can work" or "able to work" mean here? -->
Four workflows enable you to manage keyring setup, certificates, certificate sign requests and signatures, and load certificates to a keyring. You can use the following workflows to set up certificates for Zowe in your system:

1. Set up a Zowe certificate and keyring

    The `ZWEKRING.xml` workflow sets up a Zowe certificate and keyring. The workflow contains the TODO following steps and helps you set up the certificate and keyring.

    <!-- TODO We are referring to the steps on the screenshot, right? -->

    ![Workflow One](/docs/images/configure/workflow-one.png?raw=true "Workflow One" ) <br />

    Based on the variable setup from the first step, the workflow can perform various certificate configurations and connect certificates to a keyring in RACF, TSS, and ACF2 security systems.

    - <TODO> Generate Zowe's certificate that will be signed by the Zowe's local CA
    - Importing an existing certificate already held in z/OS to the key ring for use by Zowe.
    - Importing external Zowe's certificate from a data set in PKCS12 format
    - Connect z/OSMF certificate authority to Zowe keyring </TODO>

    <!-- TODO What are these? Steps of a procedure or notes or both? -->

2. Create a certificate sign request

    The `ZWECRECR.xml` workflow creates a CSR request.

    The workflow contains following steps:

    ![Workflow Two](/docs/images/configure/workflow-two.png?raw=true "Workflow Two") <br />

    1. A certificate sign request is generated for any security system based on a variable setup.
    2. A CSR request is stored into a data set. Then the data set is converted into a USS file.

        **Note:** You can find links to the specific security systems (BCM, IBM) official documentation in the instructions section of the workflow in related steps.

3. Sign a CSR request

   The `ZWESIGNC.xml` workflow signs a CSR request. Ensure that the workflow includes a USS location of the CSR request and a USS location where a signed certificate is stored in pem format in the input.

   ![Workflow Three](/docs/images/configure/workflow-threeA.png?raw=true "Workflow Three") <br />

   The workflow has the following steps:

   ![Workflow Three](/docs/images/configure/workflow-threeB.png?raw=true "Workflow Three") <br />

   <TODO> 1. After successful workflow execution, there is in USS stored certificate signed by specified certificate authority.
   2. Links to specific security systems (BCM, IBM) official documentation are in instructions sections of the workflow in related steps. </TODO>

   <!-- TODO These steps need clarification -->

4. Load the Signed Client Authentication Certificate into ESM

   The `ZWELOADC.xml` workflow loads a signed client authentication certificate into specific ESM under user ACID.

   Workflow contains the following steps:

   ![Workflow Four](/docs/images/configure/workflow-four.png?raw=true "Workflow Four") <br />

   <TODO> 1. Workflow can load ASCII or EBCDIC encoded certificate into Data set, and after it loads it into specific ESM based on the variable setup.

   2. Links to specific security systems (BCM, IBM) official documentation are in instructions sections of the workflow in related steps. </TODO>

   <!-- TODO Same as above -->
