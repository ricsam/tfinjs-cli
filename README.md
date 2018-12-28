Terraform in JavaScript
=======================

This is the CLI for [tfinjs](https://pedantic-sammet-e08804.netlify.com/)


## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Recommended project structure](#recommended-project-structure)


## Installation
```bash
npm install tfinjs tfinjs-cli
```

## Usage
```
tfinjs build ./tfinjsConfig/entry.js -o ./terraformResources
```

## Recommended project structure
```
.
├── tfinjsConfig                     # In here you can provide default configurations to be used by the services which you want to deploy.
│   ├── entry.js                     # Exports the deployment.js and imports the stuff from the /services and /dataStores folder.
│   ├── providers                    # Usually the providers are not customized very much, you can keep them here for resuability.
│   │   └── aws.js
│   ├── deploymet.js                 # Creates the deployment such that resource files can import it.
│   ├── deploymentParams.js          # Your default set of deployment params to be used through out the project.
│   └── namespace.js                 # Your default schema for configuring the namespace for apis.
│
├── terraformResources               # Folders of transpiled terraform resources that should be deployed.
│   └── ...                          
│
├── services                         # Your services, e.g. lambdas, iam, cloudwatch.
│   ├── editPet                 
│   │   ├── deployment.js            # Deploy the editPet lambda.
│   │   └── service.js               # Lambda code.
│   ├── addCustomer            
│   │   ├── deployment.js            # Deploy the addCustomer lambda.
│   │   └── service.js               # Lambda code.
│   ├── transactionQue          
│   │   └── deployment.js            # Deployment of the transaction queue, e.g. an sqs queue.
│   └── ...                          # etc.
│
├── dataStores                       # Data stores, e.g. s3, dynamodb, RDS.
│   ├── petTable                
│   │   └── deployment.js            # Deployment of the petTable table.
│   ├── customerTable          
│   │   └── deployment.js            # Deployment of the customerTable table.
│   └── ...                          # etc.
└── ...

```
