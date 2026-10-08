import {exec, execSync} from 'child_process';

export default class Gpio{

	pin;
	constructor( pin ){

		this.pin = parseInt(pin);
		if( isNaN(pin) )
			throw new Error("Invalid pin: "+pin);

	}

	static async init(){

		return new Promise((resolve, reject) => {

			const command = `gpioget -v`;
			exec(command, (error, stdout, stderr) => {
				if( error ){
					if( !stdout ) 
						return reject(error);
				}
				
				console.log("Gpio init:", stdout);
				resolve(stdout);

			});

		});

	}

	async read(){

		return new Promise((resolve, reject) => {

			const command = `gpioget --numeric -c 0 ${this.pin}`;
			exec(command, (error, stdout, stderr) => {
				if( error ){
					if( !stdout ) 
						return reject(error);
				}
				
				resolve(parseInt(stdout));

			});

		});

	};

	write( high = false ){
		execSync(`gpioset -t0 -c 0 ${this.pin}=${high ? 1 : 0}`);
	}


}

