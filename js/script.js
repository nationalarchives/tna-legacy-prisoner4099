

// FONT WIDGET FUNCTIONS

function writeUtil(){
// writes the utility widget to the screen
	document.writeln("Text: <a href=\"javascript:changeFontSize(.2)\" title=\"increase the font size on the page\" >larger</a> | <a href=\"javascript:changeFontSize(-.2)\"  title=\"decrease the font size on the page\">smaller</a> |")
}

function changeFontSize(inc)
{
  var p = document.getElementsByTagName('body')[0];
    
    if(p.style.fontSize) {
       var size = parseFloat(p.style.fontSize.replace("em", ""));     
    } else {
       var size = 1;
    }

    size+=parseFloat(inc);
    size=Math.round(size*100)/100; //ADD THIS FOR ROUNDING ERROR IN IE
    
    if (size >= 0.8 && size <= 1.8) {
	p.style.fontSize = size + 'em'; 

	// save size to cookie
	storestylepref(size + 'em');
    }

}

function parsecookie(){ 
	var cookie_pairs = new Object(); 
	cookie_pairs.names = new Array(); 
	cookie_pairs.values = new Array(); 
	var cookie = document.cookie; 
	if(cookie == "") { return null; } 
	var pairs = cookie.split(";"); 
	for(var i = 0; i < pairs.length; i++){ 
		var pos = pairs[i].indexOf('='); 
		if(pos == -1){ continue; } 
		var cookie_name = pairs[i].substring(0,pos); 
		var cookie_value = pairs[i].substring(pos+1); 
		cookie_pairs.names[i] = cookie_name; 
		cookie_pairs.values[i] = cookie_value; 
	} 
	return cookie_pairs; 
}

function getcookieparam(cookie_pairs, name){ 
	if(cookie_pairs == null){ return null; } 
	var exp = new RegExp(name); 
	for(var i = 0; i < cookie_pairs.names.length; i++){ 
		var result = exp.exec(cookie_pairs.names[i]); 
		if(result == name){ return cookie_pairs.values[i]; } 
	} 
}

function storestylepref(pref){ 
	var date = new Date(); 
	date.setTime(date.getTime()+(30*24*60*60*1000)); 
	var expires = "expires="+date.toGMTString(); 

	// set domain cookie
	document.cookie = "custom_size=" + pref + ";" + expires + ";path=/";
	return;
}

function loadstylepref(){ 
	var pref = getcookieparam(parsecookie(), "custom_size"); 
	if(pref){ var prefs = pref.split(","); 

		// set size for <body> element
		var p = document.getElementsByTagName('body')[0];
		p.style.fontSize = prefs[0];

	}
	return;
}
