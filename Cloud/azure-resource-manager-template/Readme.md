## Azure Resource Manager Template

Automate resource creation with ARM Template

Write in JSON Schema for the resource manager template.

> Azure Resource Manager Tool (EXTENSION) for vs code.

'''

# azure resource manager template

1. Storage Account: [Go to Storage Account Template](./storage-account.json)
2. Virtual Machine: [Go to Virtual Machine Template](./create-vm.json)

amr!
'''

Then in the resource tab add arm-storage.

Use CLI tool to deploy

```bash
# first create resource group which storage account use
az group create \
    --name leanazure \
    --location 'Central US'

# create storage account
cd ./file-to-json

az deployment group create \
    --name storageaccount \
    --resource-group learnazure \
    --template-file storage-account.json

```

##### Can use Parameter Value:

```json
  "parameters": {
        // can define our parameter which we want to choose different value
        "storageAccountTier": {
            "type": "string",
            "metadata": {
                "description": "tier standard or premium"
            },
            "defaultValue": "Premium",
            "allowedValues": [
                "Premium",
                "Standard"
            ]
        }
    },
    "tier": "[parameters('storageAccountTier')]"
```

##### Variable

Reuse multiple Time in a json file.

```json
"variables": {
        "resourceName": "resourceName"
    },
```

can use that as `"key": "[variables('resourceName')]"`
