process.env.AZURE_STORAGE_ACCOUNT = 'fractalsblobstorage';//'fractalstore';
process.env.AZURE_STORAGE_ACCESS_KEY = '8YejD1ge1Nvbr3N3ucNjI1E/b4/qNtgxPttG/oZjXD7fIjVUt2R2YhRLN1+5+Q7eKkMF1Tc1veHO6UNg6fRYdA==';

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