process.env.AZURE_STORAGE_ACCOUNT = 'fractalstore';
process.env.AZURE_STORAGE_ACCESS_KEY = 'bE4vatbNGAM6UhcAKJVAcVtYecN+fAP5TwH+8Uc75bN+2jGzSPKKVa2J74lRA4wLqd306QZVt+XRPnK/i8vhLA==';

var azure = require('azure-storage');
var blobService = azure.createBlobService();
var images = "images";

function saveToBlob(name,stream,cb){
    stream.pipe(blobService.createWriteStreamToBlockBlob(images,name,cb));
}
function getUrl(name){
    var startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 15);

    var expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 30);

    var permissions = azure.BlobUtilities.SharedAccessPermissions.READ;

    var sharedAccessPolicy ={
        AccessPolicy:{
            Permissions: permissions,
            Start: startDate,
            Expiry: expiryDate
        }
    };
    var sasToken = blobService.generateSharedAccessSignature(images,name,sharedAccessPolicy);
    return blobService.getUrl(images,name,sasToken);
}
module.exports={
    saveToBlob: saveToBlob,
    getUrl: getUrl
};