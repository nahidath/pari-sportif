
/*
var slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" actif", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " actif";
} 
*/


var index=0;


function affiche(){
	var diapos= document.getElementsByClassName("diapo");
	diapos[index].className="diapo";
	console.log(" index 1 ="+index+" class : "+diapos[index].className);
	
	index++;
	
	if(index > diapos.length-1) { index=0}
	diapos[index].className="diapo actif";
	
	
	console.log(" index 2 ="+index+" class : "+diapos[index].className);
	setTimeout(affiche, 3500);
			
}
