// ==UserScript==
// @name        auto fill
// @namespace   Fire360Boy
// @description Fire360Boy@gmail.com
// @version     1
// @grant       none
// ==/UserScript==



function randomString(length,possible)
{
	var text = "";
	if(possible=="" || typeof possible == "undefined"){
	 possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	}

	for( var i=0; i < length; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function randomNumber(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}
	
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}
			
prevent = ["submit" , "button" , "hidden"];
all = document.querySelectorAll("input");
for (let j of all) {
	var attr = j.getAttribute('type');
  if(!prevent.contains(attr)){
	  try{
		j.value = randomString(randomNumber(5,50));
	  }catch(err){
	  	continue; 
	  }
  }
}

number = document.querySelectorAll("input[type='number']");
for (let j of number) {
  try{
	j.value = randomString(randomNumber(5,12),"0123456789");
  }catch(err){
  	continue; 
  }
}

email = document.querySelectorAll("input[type='email']");
for (let j of email) {
  try{
	j.value = randomString(randomNumber(6,20)) + "@gmail.com";
  }catch(err){
  	continue; 
  }
}

email = document.querySelectorAll("input[name='email']");
for (let j of email) {
  try{
	j.value = randomString(randomNumber(6,20)) + "@gmail.com";
  }catch(err){
  	continue; 
  }
}

textarea = document.querySelectorAll("textarea");
for (let j of textarea) {
	try{
		j.value = randomString(randomNumber(6,250));
	}catch(err){
		continue;
	}
}