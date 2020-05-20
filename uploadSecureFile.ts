import * as fs from "fs";
import * as path from "path";
import * as azdev from "azure-devops-node-api";
import * as ta from "azure-devops-node-api/TaskAgentApi";

async function run() {
    let orgUrl = process.env.ORG;
    let project = process.env.PROJECT;
    let token: string = process.env.TOKEN;
    let filepath: string  = process.argv[2];
    let secureFileName: string = process.argv[3];

    if (secureFileName == undefined) {
        secureFileName = path.basename(filepath);
    }

    let serverUrl = orgUrl;
    let authHandler = azdev.getPersonalAccessTokenHandler(token);
    let option = undefined;
    let vsts: azdev.WebApi = new azdev.WebApi(serverUrl, authHandler, option);
    let vstsTask: ta.ITaskAgentApi = await vsts.getTaskAgentApi();

    let stats = fs.statSync(filepath);
    let file = fs.createReadStream(filepath);

    console.log("uploading file");
    let secureFile = await vstsTask.uploadSecureFile({"Content-Length": stats.size}, file, project, secureFileName);
    console.log(`uploaded secure file ${secureFile.name}`);
}

run()
