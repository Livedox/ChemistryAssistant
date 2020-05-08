String.prototype.replaceAll = function(search, replace){
	return this.split(search).join(replace);
}


const atomicMass = [
	["H", 1.00794],  ["He", 2.0026],   ["Li", 6.941],   ["Be", 9.0122],   ["B", 10.811],
	["C", 12.0107],  ["N", 14.0067],   ["O", 15.9994],  ["F", 18.9984],   ["Ne", 20.1797],
	["Na", 22.1797], ["Mg", 24.305],   ["Al", 26.9815], ["Si", 28.0855],  ["P", 30.9738],
	["S", 32.066],   ["Cl", 35.45],    ["Ar", 39.948],  ["K", 39.0983],   ["Ca", 40.078],
	["Sc", 44.9559], ["Ti", 47.867],   ["V", 50.9415],  ["Cr", 51.9961],  ["Mn", 54.938],
	["Fe", 55.845],  ["Co", 58.9332],  ["Ni", 58.6934], ["Cu", 63.546],   ["Zn", 65.38],
	["Ga", 69.723],  ["Ge", 72.63],    ["As", 74.9216], ["Se", 78.96],    ["Br", 79.904],
	["Kr", 83.798],  ["Rb", 85.4678],  ["Sr", 87.62],   ["Y", 88.9059],   ["Zr", 91.224],
	["Nb", 92.9064], ["Mo", 95.96],    ["Tc", 97.907],  ["Ru", 101.07],   ["Rh", 102.9055],
	["Pd", 106.42],  ["Ag", 107.8682], ["Cd", 112.411], ["In", 114.818],  ["Sn", 118.71],
	["Sb", 121.76],  ["Te", 127.6],    ["I", 126.9045], ["Xe", 131.29],   ["Cs", 132.9055],
	["Ba", 137.327], ["La", 138.9055], ["Hf", 178.49],  ["Ta", 180.9479], ["W", 183.84],
	["Re", 186.207], ["Os", 190.23],   ["Ir", 192.217], ["Pt", 195.084],  ["Au", 196.966],
	["Hg", 200.59],  ["Tl", 204.3833], ["Pb", 207.2],   ["Bi", 208.9804], ["Po", 208.98],
	["At", 210],     ["Rn", 222],      ["Fr", 223],     ["Ra", 226.0254], ["Ac", 227.0278],
	["Rf", 261],     ["Db", 262],      ["Sg", 263],     ["Bh", 267],      ["Hs", 269],
	["Mt", 278],     ["Ds", 281],      ["Rg", 281],     ["Cn", 262],      ["Nh", 283],
	["Fl", 289],     ["Mc", 289],      ["Lv", 293],     ["Ts", 294],      ["Og", 294]
].sort((a, b) => a[0].length < b[0].length);


function createCalculator() {
	if (document.getElementById("calculator")) document.getElementById("calculator").remove();

	document.body.insertAdjacentHTML("afterbegin", `
		<div id="calculator">
			<div class="close" onclick="this.parentElement.remove()">
				<svg enable-background="new 0 0 413.348 413.348" height="10px" viewBox="0 0 413.348 413.348" width="10px" xmlns="http://www.w3.org/2000/svg">
					<path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354
					 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"/>
				</svg>
			</div>
			<div class="data">
				<div class="input-box">
					<input type="text" name="formula" value="Ca(OH)2" autocomplete="off">
					<div onclick="calculateMolarMass(document.querySelector('#calculator input').value)">
						<svg version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;width: 26px;" xml:space="preserve">
							<path d="M504.625,236.313c-38.813-38.917-114.667-109.094-159.979-151.01l-13.771-12.74C324.938,
							67.042,317.271,64,309.333,64c-17.646,0-32,14.354-32,32v74.667H42.667C19.146,170.667,0,189.802,
							0,213.333v85.333c0,23.531,19.146,42.667,42.667,42.667h234.667V416c0,17.646,14.354,32,32,32c7.938,
							0,15.604-3.042,21.542-8.563l13.771-12.74c45.313-41.917,121.167-112.094,159.979-151.021C509.375,270.885,
							512,263.906,512,256S509.375,241.115,504.625,236.313z"/>
						</svg>
					</div>
				</div>	
				<div class="block-result">
					<div id="calculations">M(Ca(OH)2) = 40.078+(15.9994+1.00794)*2 = 74.09268</div>
					<div class="result">M(Ca(OH)2) = 74.09268</div>	
				</div>
			</div>
		</div>
	`);
}


function calculateMolarMass(str) {
	document.getElementById("calculations").innerHTML = "";
	let formula = `M(${str})`;
	str = str.replaceAll("[", "(").replaceAll("]", ")");

	if(str !== "H2O") {
		str = str.replaceAll("*", "+").replaceAll("H2O", "*18.01528").replaceAll("+*", "+");
	}

	atomicMass.forEach( (item) => {
		str = str.replaceAll(item[0], `+${item[1]}*`);
	});
	
	str = str.replaceAll("(+", "+(").replaceAll("*)", ")").replaceAll("*+", "+").replaceAll(")", ")*").slice(1);
	if (str.slice(-1) === "*") str = str.slice(0, -1);
	document.getElementById("calculations").innerHTML += formula + " = " + str + " = ";
	str = str.replaceAll("+", "x+x").replaceAll("*", "x*x").replaceAll("(", "(x").replaceAll(")", "x)");


	let res = calculate(str.split("x"));
	document.getElementById("calculations").innerHTML += res;
	document.querySelector("#calculator .result").innerHTML = formula + " = "+ res;

	function calculate(arr) {

		while(arr.includes("(")) {
			let leftI = arr.indexOf("(");
			let rightI = arr.indexOf(")");

			arr.splice(leftI, 2,
				calculate( arr.splice(leftI + 1, rightI - leftI - 1) )
			);
		}
		
		while(arr.includes("*")) {
			let i = arr.indexOf("*");
			arr.splice(i - 1, 3, +arr[i - 1] * +arr[i + 1] + "");
		}

		let result = arr.reduce( (sum, current) => {
			if (current === "+") return sum;
			return sum + +current;
		}, 0);
		
		return (+result.toFixed(5)).toString();
	}
}
