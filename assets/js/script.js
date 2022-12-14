"use strict";
let arr = [], index_cm = 0;

for(let i = 0; i < 9; i++) {
	arr[i] = 0;
}


function SetEventsAndAttributes() {
	let td_arr = document.getElementsByTagName("td");
	let choose_buttons = document.getElementsByClassName("choose_buttons");
	let td_arr_len = td_arr.length, choose_buttons_len = choose_buttons.length;

	for(let i = 0; i < td_arr_len; i++){
		td_arr[i].setAttribute("onclick", "ClickedOnTable(event)");
		td_arr[i].setAttribute("custom_attr", i);
	}
	for(let i = 0; i < choose_buttons_len; i++){
		choose_buttons[choose_buttons_len - i - 1].setAttribute("click_index", i);
	}

}

SetEventsAndAttributes();

function WonTheGameCond(index_pl){
	let row = Math.trunc(Number(index_pl)/3);
	let column = Math.trunc(Number(index_pl) % 3);

	if(arr[row * 3] + arr[(row * 3) + 1] + arr[(row * 3) + 2] == 3){
		return 1;
	}
	else if(arr[column] + arr[column + 3] + arr[column + 6] == 3){
		return 1;
	}
	else if(arr[0]  + arr[4]  + arr[8] == 3){
		return 1;
	}
	else if(arr[2] + arr[4] + arr[6] == 3){
		return 1;
	}
	return 0;

}

function CheckGivenColumnsAndRows(row, column, win_prevent){
	let index = -1;

	if(arr[row * 3] + arr[(row * 3) + 1] + arr[(row * 3) + 2] == win_prevent){
		if(arr[row * 3] == 0) {
			index = row * 3;
			return index;
		}
		else if(arr[(row * 3) + 1] == 0){
			index = (row * 3) + 1;
			return index;
		}	
		else if(arr[(row * 3) + 2] == 0){
			index = (row * 3) + 2;
			return index;
		}
	}
	else if(arr[column] + arr[column + 3] + arr[column + 6] == win_prevent){
		if(arr[column] == 0) {
			index = column;
			return index;
		}
		else if(arr[column + 3] == 0){
			index = column + 3;
			return index;
		}	
		else if(arr[column + 6] == 0){
			index = column + 6;
			return index;
		}
	}
	else if(arr[0]  + arr[4]  + arr[8] == win_prevent){
		if(arr[0] == 0) {
			index = 0;
			return index;
		}
		else if(arr[4] == 0){
			index = 4;
			return index;
		}	

		else if(arr[8] == 0){
			index = 8;
			return index;
		}		
	}
	else if(arr[2] + arr[4] + arr[6] == win_prevent){
		if(arr[2] == 0) {
			index = 2;
			return index;
		}
		else if(arr[4] == 0){
			index = 4;
			return index;
		}	

		else if(arr[6] == 0){
			index = 6;
			return index;
		}		
	}
	
	return index;

}

function ComputersTurn(img_cm, color_cm) {

	let row = Math.trunc(Number(index_cm)/3);
	let column = Math.trunc(Number(index_cm) % 3);	
	let ans = -1, win = 0, td_arr;

	ans = CheckGivenColumnsAndRows(row, column, -2);
	if(ans != -1){
		win = 1
		arr[ans] = -1;
	}
	else {
		for(let i = 0; i < 3; i++){
			ans = CheckGivenColumnsAndRows(i, i, 2);
			if(ans != - 1){
				arr[ans] = -1;
				break;
			}	
		}	
	}
	
	if(ans == -1){
		while(true){
			ans = Math.floor(Math.random() * 9);
			if(arr[ans] == 0)
			{
				arr[ans] = -1;
				break;
			}
		}
	}

	index_cm = ans;
	td_arr = document.getElementsByTagName("td");
	for(let i = 0; i < 9; i++){
		if(td_arr[i].getAttribute("custom_attr") == ans){
			td_arr[i].style.backgroundColor = color_cm;
			td_arr[i].innerHTML = img_cm;
			break;
		}
	}

	if(win == 1)
		return 1;
	else
		return 0;

}

function DisableButtons(){

	let choose_buttons = document.getElementsByClassName("choose_buttons");
	let choose_buttons_len = choose_buttons.length;

	for(let i = 0; i < choose_buttons_len; i++)
		if (choose_buttons[i].disabled == false){
			choose_buttons[i].disabled = true;
			choose_buttons[i].style.backgroundColor = "#EEEEEE"; 
			choose_buttons[i].style.borderRadius = "4px";
		}
		
}

function Won() {

	let layers = document.getElementsByClassName("game_over_layer");
	layers[0].style.opacity = "0.8";
	layers[0].style.visibility = "visible"
}

function Lost() {

	let layers = document.getElementsByClassName("game_over_layer");
	layers[1].style.opacity = "0.8";
	layers[1].style.visibility = "visible"
}

function Draw() {

	let layers = document.getElementsByClassName("game_over_layer");
	layers[2].style.opacity = "0.8";
	layers[2].style.visibility = "visible";	

}



function ClickedOnTable(event) {

	let elem = event.target, index_pl = elem.getAttribute("custom_attr");
	let choose_buttons = document.getElementsByClassName("choose_buttons");
	let choose_buttons_len = choose_buttons.length, img_pl, img_cm, color_pl, color_cm;
	let end = 0;
	if(choose_buttons[0].getAttribute("click_index") == 1) {
		img_pl = "<img src=\"assets/img/cross.svg\" class=\"inside_table\">";
		color_pl = "green";
		img_cm = "<img src=\"assets/img/circle.svg\" class=\"inside_table\">";
		color_cm = "red";
	}
	else {
		img_pl = "<img src=\"assets/img/circle.svg\" class=\"inside_table\">";
		color_pl = "red";
		img_cm = "<img src=\"assets/img/cross.svg\" class=\"inside_table\">";
		color_cm = "green";
	}
	if(arr[index_pl] == 0){	
		elem.style.backgroundColor = color_pl;
		elem.innerHTML = img_pl;
		arr[index_pl]++;
		if(WonTheGameCond(index_pl)){
			end = Won();

		}
		else if(arr.join().indexOf(0) != -1){
			if(ComputersTurn(img_cm, color_cm)){
				end = Lost();
			} 
		}		
		
	}
	if(arr.indexOf(1) != -1 || arr.indexOf(-1) != -1){
		DisableButtons();
	}
	if(arr.indexOf(0) == -1 && end == 0){
		Draw();
	}
	console.log(arr);
}

function PressButton(event) {

	let trigger_elem = event.target, buttons = document.getElementsByClassName("choose_buttons"), second_elem;
	let img_cp, color_cp;

	img_cp = "<img src=\"assets/img/cross.svg\" class=\"inside_table\">";
	color_cp = "green";

	if(trigger_elem == buttons[1]){
		second_elem = buttons[0]; 
	}
	else{
		second_elem = buttons[1];
	}

	trigger_elem.setAttribute("click_index", 1);
	trigger_elem.disabled = true;
	second_elem.setAttribute("click_index", 0);
	second_elem.disabled = false;
	trigger_elem.style.backgroundColor = "";
	trigger_elem.style.borderRadius = "";

	if(trigger_elem == buttons[1]){
		DisableButtons();
		ComputersTurn(img_cp, color_cp);
	}
}

function Reset(){

	let td_arr = document.getElementsByTagName("td");
	let buttons = document.getElementsByClassName("choose_buttons");
	let layers = document.getElementsByClassName("game_over_layer");
	let td_arr_len = td_arr.length, layers_num = layers.length;
	
	arr = [];
	index_cm = 0;

	buttons[0].setAttribute("click_index", 1);
	buttons[0].disabled = true;
	buttons[0].style.backgroundColor = "";
	buttons[0].style.borderRadius = "";
	buttons[1].setAttribute("click_index", 0);
	buttons[1].disabled = false;

	for(let i = 0; i < td_arr_len; i++){
		td_arr[i].innerHTML = "";
		td_arr[i].style.backgroundColor = "";
		arr[i] = 0;
	}

	for(let i = 0; i < layers_num; i++){
		layers[i].style.opacity = "0";
		layers[i].style.visibility = "hidden";
	}
}



