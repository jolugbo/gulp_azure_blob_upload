process.env['AZURE_STORAGE_ACCOUNT'] = 'fractalstore';
process.env['AZURE_STORAGE_ACCESS_KEY'] = '9YOOUuiE7FKERBOwh+q4+lNjkW7t94U3zm8NVRY1Z7P3CPF140AwcszTfe6QUH5Fu8eDUlnL7YmEe086nqqqaA==';

var azure = require('azure-storage');
var blobService = azure.createBlobService();
var images = "images";

function saveToBlob(name,stream,cb){
    stream.pipe(blobService.createWriteStreamToBlockBlob(images,name,cb));
}
function getUrl(name){
    return blobService.getUrl(images,name);
}
module.exports={
    saveToBlob: saveToBlob,
    getUrl: getUrl
}