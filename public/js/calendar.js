function dayClose(evt, nom) {
    var i, slide, jours;
    
    slide = document.getElementsByClassName("slide");
    for (i = 0; i < slide.length; i++) {
      slide[i].style.display = "none";
    }
    jours = document.getElementsByClassName("jours");
    for (i = 0; i < jours.length; i++) {
      jours[i].className = jours[i].className.replace(" active", "");
    }
    
    var op=document.getElementById(nom);
    if (typeof op !== "undefined" && op !== null){
      op.style.display = "block";
    }
  
    evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();


function date_heure(){
  var x=document.getElementsByClassName("jours");
  let days = [];
  let daysRequired = 7
  moment.locale('fr');
  for (let i = 1; i <= daysRequired; i++) {
    days.push( moment().add(i, 'days').format('DD MMM') );
  }
  for(j=0;j<days.length;j++){
    for(y=0;y<x.length;y++){
      x[j]=x[j].innerHTML=days[j];
    } 
  }
}
                     

