
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
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 
*/


var index=0;

function affiche(){
	var slides= document.getElementsByClassName("slide");
	slides[index].className="slide";
	console.log(" index 1 ="+index+" class : "+slides[index].className);
	
	index++;
	
	if(index > slides.length-1) { index=0}
	slides[index].className="slide active";
	
	
	console.log(" index 2 ="+index+" class : "+slides[index].className);
	setTimeout(affiche, 2000);
			
}
