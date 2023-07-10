//https://genshin.gg/
var html = document.getElementsByTagName("html")[0];


var img_name = "diluc.webp";
var img_box = `<img src="./characterImage/${img_name}">`;
//var champion_keys = Object.keys(champions["data"]);
var pick_num = 30;
var picks = [];
var num2boxid = ["r11","r12","r13",
"r21","r22","r23", 
"r31"];
var reset_cnt = 0;

var main_box = document.getElementById("main_box");
var visions = ["Pyro", "Hydro", "Anemo", "Electro", "Cryo", "Geo", "Dendro"];
var vision_lists={};
var image_list={};
var ind=0;

var c_num = 3;
var em_num = visions.length%c_num;
var r_num = (visions.length-em_num)/c_num;

var picktable = document.getElementById("picktable");


function init_table(){
	for(var i = 0; i< r_num; i++){
		var row = picktable.insertRow(i);
		for(var j = 0; j < c_num; j++){
			var cell = row.insertCell(j);
			
			var img = new Image();
			var v =visions[i*c_num+j];
			img.src = `./src/elementImage/${v}.webp`;
			cell.append(img);	
			
			var newDivElement = document.createElement('div');
			newDivElement.className = "vision_name";
			newDivElement.innerText = v;
			cell.append(newDivElement);
			
			var newDivElement = document.createElement('div');
			newDivElement.id = v;
			newDivElement.className = "pick";
			cell.append(newDivElement);			
			
			console.log(v);
		}
	}
	if(em_num != 0){
		var colspan = c_num/em_num;
		var row = picktable.insertRow(r_num);
		for(var j = 0; j < em_num; j++){
			var cell = row.insertCell(j);
			cell.colSpan = colspan;
			
			var img = new Image();
			var v =visions[r_num*c_num+j];
			img.src = `./src/elementImage/${v}.webp`;
			cell.append(img);	
			
			var newDivElement = document.createElement('div');
			newDivElement.className = "vision_name";
			newDivElement.innerText = v;
			cell.append(newDivElement);
			
			var newDivElement = document.createElement('div');
			newDivElement.id = v;
			newDivElement.className = "pick";
			cell.append(newDivElement);
			
		}
	}
}

function click_pick(e){
	for(var vl in vision_lists){
		vision_lists[vl].parentElement.style.display="none";
	}
	vision_lists[e.id].parentElement.style.display="block";
}

function init_click_pick(){
	picks = document.getElementsByClassName("pick");
	for(var p in picks){
		picks[p].onclick = function(){click_pick(this);};
	}
}

function click_char(e){
	var t = e.getAttribute("type");
	document.getElementById(t).style.backgroundImage = "url(" + image_list[e.getAttribute("name")].src + ")";
	console.log(t+" "+e.getAttribute("name"));
	vision_lists[t].parentElement.style.display="none";
}

function create_vision_list(){
	for(var v in visions){
		v = visions[v]
		
		var layoutbox = document.createElement('div');
		layoutbox.className = "character_list_layout";
		var img = new Image();
		img.src = `./src/elementImage/${v}.webp`;
		img.className = "character_list_vision_image";
		layoutbox.append(img);
		
		var newDivElement = document.createElement('div');
		newDivElement.id = v
		newDivElement.className = "character_list"
		
		layoutbox.append(newDivElement);
		document.body.append(layoutbox);
		layoutbox.style.display="none";
		vision_lists[v] = newDivElement;
		//console.log(v+" "+vision_lists[v]);
	}
}

function init_vision_and_image(){
	for(var c in characters){
		c = characters[c]
		//console.log(ind+ " "+c["name"] + " " +c["type"]);
		ind++;
		
		var newDivElement = document.createElement('div');
		
		newDivElement.setAttribute( 'name', c["name"] );
		newDivElement.setAttribute( 'type', c["type"] );
		newDivElement.className = "character_image";
		newDivElement.onclick = function(){click_char(this)};
		var img = new Image();
		img.src = `https://rerollcdn.com/GENSHIN/Characters/1/${escape(c["name"])}.png`;
		image_list[c["name"]]=img;
		img.className= "inner_image"
		newDivElement.appendChild(img);
		vision_lists[c["type"]].append(newDivElement);
	}
}



function generate_random_picks(n){

	
}

function main(){
	create_vision_list();
	init_vision_and_image();
	init_table();
	init_click_pick();
}

main();
