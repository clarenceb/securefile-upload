How to upload SecureFile to Azure Pipelines from CLI
====================================================

This is just a demo with no error handling for is illustrative purposes only.

Prequisities
------------

* Node and NPM installed
* Bash shell
* Create an Azure DevOps Organization
* Create an Azure DevOps Project
* Create a PAT for your Azure DevOps user with appropriate access

Usage with Bash shell
---------------------

```sh
npm install -g typescript
npm install

TOKEN="<YOUR_PERSOANL_ACCESS_TOKEN>"
ORG="https://dev.azure.com/<your_orgname>"
PROJECT="<your_project_name>"

tsc uploadSecureFile.ts

# Create a demo file to upload (or use a real file you want to upload)
ls -1 > demofile.txt
zip demofile.zip demofile.txt

# Upload secret file with same basename (demofile.zip)
node uploadSecureFile.js ./demofile.zip

# Upload secret file with custom name (something.zip)
node uploadSecureFile.js ./demofile.zip something.zip
```

Your secure file will be in under **Pipelines** / **Library** / **Secure files** for your project.

Testing the secret file
-----------------------

In Azure Pipelines you can use the [Download Secure File Task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/download-secure-file) to retrieve the secret.

e.g. in YAML

```yaml
- task: DownloadSecureFile@1
  name: mysecret
  displayName: 'Download My Secret'
  inputs:
    secureFile: 'something.zip'

- script: |
    echo Do somethign usefule with the secret...
    ls -lah $(mysecret.secureFilePath)
    file $(mysecret.secureFilePath)
    unzip -t $(mysecret.secureFilePath)
```

You can also use Classic Build/Release Tasks to download secret files.
