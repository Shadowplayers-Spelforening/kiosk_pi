const configSheetID = process.env.CFGSHEET;
const googleApiKey = process.env.GAPI;
if( !configSheetID )
	throw new Error("Missing google spreadsheet ID in .env file. Please set CFGSHEET=url");
if( !googleApiKey )
	throw new Error("Missing google spreadsheet ID in .env file. Please set GAPI=api_key");

export default class RemoteConfig{
	
	remoteConfig = {};

	async reload(){

		const url = `https://sheets.googleapis.com/v4/spreadsheets/${configSheetID}/values/Sheet1?key=${googleApiKey}`;
		const remoteConf = await fetch(url).then(res => res.json());
		this.remoteConfig = {};
		for( let row of remoteConf.values )
			this.remoteConfig[row[0]] = row[1];
		console.log("Fetched remote config", this.remoteConfig);

	}

}
