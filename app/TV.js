import {exec} from 'child_process';



export default class TV{

	targetAddress = 0;
	on = false;

	constructor( targetAddress = 0 ){

		this.targetAddress = targetAddress;

	}

	// Gets HDMI cec power status
	async getIsPowered(){

		return new Promise((resolve) => {

			// -s: single command, -d 1: minimal log level to keep output clean
			const command = `echo "pow ${this.targetAddress}" | cec-client -s -d 1`;

			exec(command, (error, stdout, stderr) => {
				if( error ){
					
					// Often throws an error code if cec-client exits abruptly, 
					// so we still inspect stdout even if error exists.
					if( !stdout ) 
						return resolve(false);

				}

				let powerStatus = String(stdout).split('power status: ');
				powerStatus = String(powerStatus[1]).trim() === 'on';

				this.on = powerStatus;
				console.log("TV on status is", this.on);

				if( powerStatus )
					resolve(true); // returns 'on', 'standby', etc.
				else
					resolve(false);
				
			});

		});
	}

	async turnOn(){
	
		return new Promise((resolve) => {
			
			const command = `echo "on ${this.targetAddress}" | cec-client -s -d 1`;
			console.log("Turning TV on", command);

			exec(command, (error, stdout, stderr) => {
				if( error )
					return resolve(false);
				console.log("stdout", stdout);
				this.on = true;
				resolve(true);
			});

		});
	}

	async turnOff(){

		return new Promise((resolve) => {
			
			console.log("Turning TV off");
			const command = `echo "standby ${this.targetAddress}" | cec-client -s -d 1`;
			exec(command, (error, stdout, stderr) => {
				if( error )
					return resolve(false);
				this.on = false;
				resolve(true);
			});

		});

	}

};

