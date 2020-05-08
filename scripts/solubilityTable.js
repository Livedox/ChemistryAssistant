function highlightColumnAndRow(e) {
	let row = e.target.classList[0];
	let cell = e.target.classList[1];
	let cellIndex = e.target.cellIndex;
	let rowIndex = e.target.parentNode.rowIndex - 1;
	for(let i = 0; i < document.getElementsByClassName(row).length && i < cellIndex; i++) {
		document.getElementsByClassName(row)[i].classList.toggle("highlighted");
	}
	for(let i = 0; i < document.getElementsByClassName(cell).length && i < rowIndex; i++) {
		document.getElementsByClassName(cell)[i].classList.toggle("highlighted");
	}	
	e.target.classList.toggle("active");
}