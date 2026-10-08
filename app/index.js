import TV from './TV.js'
import Gpio from './Gpio.js'
import RemoteConfig from './RemoteConfig.js'

const remoteConfig = new RemoteConfig();
const input = new Gpio(11);  // GPIO17
const output = new Gpio(17); // GPIO11

const tv = new TV();

let ON_TIME = 30000;

let lastOn = 0;
let lastOff = 0;

(async () => {
	
	const refresh = async () => {
		try{
			await remoteConfig.reload();
			ON_TIME = (parseInt(remoteConfig.remoteConfig.ScreenOnSeconds)*1000) || 300000;
			console.log("on time is now", ON_TIME);
		}catch(err){
			console.error(err);
		}
	};
	await refresh();
	await Gpio.init();
	setInterval(refresh, 600000);
	
	setInterval(async () => {
	
		const val = await input.read();
		output.write(val);
		const ms = Date.now();
		
		if( val ){

			// Send a request to turn on max every 5 sec
			if( !tv.on && ms - lastOn > 5000 ){
				tv.turnOn();
			}
			lastOn = ms;

		}
		else if( tv.on && ms - lastOff > 5000 && ms - lastOn > ON_TIME ){

			tv.turnOff();
			lastOff = ms;

		}

	}, 100);

	setInterval(async () => {
		
		tv.getIsPowered();	// updates tv.on

	}, 10000);


	
})();
