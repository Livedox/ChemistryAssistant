var games = {
	gamesStorage: document.getElementById("gamesStorage"),
	game1Storage: document.getElementById("game1Storage"),
	game1: {
		needChemicalName: document.getElementById("game1NeedChemicalName"),
		chemicalNames: document.getElementsByClassName("game1-block-chemical-name"),
		hearts: document.getElementById("game1Hearts"),
		result: document.getElementById("game1Result"),
		memoryRecord: document.getElementById("game1Record"),
		substances: {
			inorganic: [
				["H<sub>2</sub>O", "Вода"],
				["H<sub>2</sub>O<sub>2</sub>", "Перекись водорода"],
				["KOH", "Гидроксид калия"],
				["KOH", "Едкое кали"],
				["Ba(OH)<sub>2</sub>", "Гидроксид бария"],
				["NaOH", "Гидроксид натрия"],
				["NaOH", "Едкий натр"],
				["NaOH", "Каустик"],
				["Ca(OH)<sub>2</sub>", "Гидроксид кальция"],
				["Ca(OH)<sub>2</sub>", "Известковая вода/молоко"],
				["Al(OH)<sub>3</sub>", "Гидроксид алюминия"],
				["Cr(OH)<sub>3</sub>", "Гидроксид хрома"],
				["Fe(OH)<sub>3</sub>", "Гидроксид железа (III)"],
				["Fe(OH)<sub>2</sub>", "Гидроксид железа (II)"],
				["Zn(OH)<sub>2</sub>", "Гидроксид цинка"],
				["Cu(OH)<sub>2</sub>", "Гидроксид меди"],
				["HF", "Плавиковая кислота (фтороводород)"],
				["HCl", "Соляная кислота (хлороводород)"],
				["H<sub>2</sub>S", "Сероводородная кислота (сероводород)"],
				["H<sub>2</sub>SO<sub>4</sub>", "Серная кислота"],
				["H<sub>2</sub>SO<sub>3</sub>", "Сернистая кислота"],
				["HNO<sub>3</sub>", "Азотная кислота"],
				["HNO<sub>2</sub>", "Азотистая кислота"],
				["H<sub>3</sub>PO<sub>4</sub>", "Ортофосфорная кислота"],
				["H<sub>2</sub>CO<sub>3</sub>", "Угольная кислота"],
				["H<sub>2</sub>SiO<sub>3</sub>", "Кремниевая кислота"],
				["HgCl<sub>2</sub>", "Сулема"],
				["CaCO<sub>3</sub>", "Карбонат кальция"],




			],
			organics: [
				["CH<sub>4</sub>", "Метан"],
				["C<sub>2</sub>H<sub>6</sub>", "Этан"],
				["C<sub>3</sub>H<sub>8</sub>", "Пропан"],
				["C<sub>4</sub>H<sub>10</sub>", "Бутан"],
				["C<sub>5</sub>H<sub>12</sub>", "Пентан"],
				["C<sub>6</sub>H<sub>14</sub>", "Гексан"],
				["C<sub>7</sub>H<sub>16</sub>", "Гептан"],
				["C<sub>8</sub>H<sub>18</sub>", "Октан"],
				["C<sub>9</sub>H<sub>20</sub>", "Нонан"],
				["C<sub>10</sub>H<sub>22</sub>", "Декан"],

				["C<sub>2</sub>H<sub>4</sub>", "Этен/этилен"],
				["C<sub>3</sub>H<sub>6</sub>", "Пропен"],
				["C<sub>4</sub>H<sub>8</sub>", "Бутен"],
				["C<sub>5</sub>H<sub>10</sub>", "Пентен"],
				["C<sub>6</sub>H<sub>12</sub>", "Гексен"],
				["C<sub>7</sub>H<sub>14</sub>", "Гептен"],
				["C<sub>8</sub>H<sub>16</sub>", "Октен"],
				["C<sub>9</sub>H<sub>18</sub>", "Нонен"],
				["C<sub>10</sub>H<sub>20</sub>", "Декен"],

				["C<sub>2</sub>H<sub>2</sub>", "Этин/ацетилен"],
				["C<sub>3</sub>H<sub>4</sub>", "Пропин"],
				["C<sub>4</sub>H<sub>6</sub>", "Бутин"],
				["C<sub>5</sub>H<sub>8</sub>", "Пентин"],
				["C<sub>6</sub>H<sub>10</sub>", "Гексин"],
				["C<sub>7</sub>H<sub>12</sub>", "Гептин"],
				["C<sub>8</sub>H<sub>14</sub>", "Октин"],
				["C<sub>9</sub>H<sub>16</sub>", "Нонин"],
				["C<sub>10</sub>H<sub>18</sub>", "Декин"],

				["C<sub>6</sub>H<sub>6</sub>", "Бензол"],

				["C<sub>2</sub>H<sub>5</sub>OH", "Этиловый спирт/этанол"],
				["CH<sub>3</sub>COOH", "Уксусная кислота/этановая кислота"],
				["C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>", "Глюкоза"],
			],
			common: null,
		},
		kindChemistry: "organics",
		live: 3,
		currentItem: null,
		currentSubstances: null,
		record: 0,
		el: null,
	},
}
games.game1.substances.common = games.game1.substances.inorganic.concat(games.game1.substances.organics);

function randomInteger(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

function game1Start(kindChem) {
	games.game1.hearts.innerHTML = "❤❤❤";
	games.game1.result.style.display = "none";
	games.game1Storage.style.display = "block";
	games.gamesStorage.style.display = "block";
	if(kindChem != undefined) {
		games.game1.kindChemistry = kindChem;
	};
	games.game1.live = 3;
	games.game1.record = 0;
	game1Score.innerHTML = "Счёт: " + games.game1.record;

	game1Reload(games.game1.substances[games.game1.kindChemistry].slice());
}

function game1Reload(substances) {
	createSubstanceList(substances);

	renderingGame1();

	game1ChangeCurrentChemicalName();
}

function renderingGame1() {
	for(var i = 0; i < games.game1.chemicalNames.length; i++) {
		games.game1.chemicalNames[i].style.backgroundColor = "#c3c3c3";
		games.game1.chemicalNames[i].style.visibility = "visible";
		games.game1.chemicalNames[i].innerHTML = games.game1.el[i][1];
		games.game1.chemicalNames[i].style.transform = "scale(1)";
	};
}

function createSubstanceList(substances) {
	games.game1.el = [
		substances.splice(randomInteger(0, substances.length - 1), 1)[0],
		substances.splice(randomInteger(0, substances.length - 1), 1)[0],
		substances.splice(randomInteger(0, substances.length - 1), 1)[0],
		substances.splice(randomInteger(0, substances.length - 1), 1)[0],
		substances.splice(randomInteger(0, substances.length - 1), 1)[0],
		substances.splice(randomInteger(0, substances.length - 1), 1)[0]
	];
}

function game1ChangeCurrentChemicalName() {
	games.game1.currentItem = games.game1.el.splice(randomInteger(0, games.game1.el.length - 1), 1)[0];
	games.game1.needChemicalName.innerHTML = games.game1.currentItem[0];
	games.game1.currentSubstances = games.game1.currentItem[1];
};

function game1Over() {
	games.game1.result.style.display = "block";
	games.game1.memoryRecord.innerHTML = "Ваш рекорд " + games.game1.record + "<br>";
	if(games.game1.record < 5) {

	} else if(games.game1.record < 10) {

	} else {
		games.game1.memoryRecord.innerHTML += "Вы настоящий химик!";
	}
};
games.game1Storage.onclick = function(e) {
	if(e.target.className == "game1-block-chemical-name") {
		if(e.target.innerHTML == games.game1.currentSubstances) {

			for(var i = 0; i < games.game1.chemicalNames.length; i++) {
				games.game1.chemicalNames[i].style.backgroundColor = "#c3c3c3";
			};

			e.target.style.backgroundColor = "green";
			e.target.style.transform = "scale(0.5)";
			e.target.style.visibility = "hidden";

			game1Score.innerHTML = "Счёт: " + ++games.game1.record;


			if(games.game1.el.length == 0) {
				setTimeout(function() {
					game1Reload(games.game1.substances[games.game1.kindChemistry].slice())
				}, 400);
			} else {
				game1ChangeCurrentChemicalName();
			};

		} else {
			e.target.style.backgroundColor = "red";
			games.game1.live -= 1;
			games.game1.hearts.innerHTML = "";
			if(games.game1.live <= 0) {
				game1Over();
			} else {
				for(var i = 0; i < games.game1.live; i++) {
					games.game1.hearts.innerHTML += "❤";
				}
			}
		}
	}
}

function game1Exit() {
	games.game1Storage.style.display = "none";
	games.gamesStorage.style.display = "none";
}
