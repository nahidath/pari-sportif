/*function dayOpen(evt, cityName) {
    var sam=document.getElementById("Sam");
    sam=sam.style.display="none";
    var dim=document.getElementById("Dim");
    dim=dim.style.display="contents";
    var lun=document.getElementById("Lun");
    lun=lun.style.display="contents";
    var mar=document.getElementById("Mar");
    mar=mar.style.display="contents";
    var mer=document.getElementById("Mer");
    mer=mer.style.display="contents";
    var jeu=document.getElementById("Jeu");
    jeu=jeu.style.display="contents";
    var ven=document.getElementById("Ven");
    ven=ven.style.display="contents";
    var same=document.getElementById("Same");
    same=same.style.display="contents";
  }

  function dayClose(evt,cityName){
    var sam=document.getElementById("Sam");
    sam=sam.style.display="contents";
    var dim=document.getElementById("Dim");
    dim=dim.style.display="none";
    var lun=document.getElementById("Lun");
    lun=lun.style.display="none";
    var mar=document.getElementById("Mar");
    mar=mar.style.display="none";
    var mer=document.getElementById("Mer");
    mer=mer.style.display="none";
    var jeu=document.getElementById("Jeu");
    jeu=jeu.style.display="none";
    var ven=document.getElementById("Ven");
    ven=ven.style.display="none";
    var same=document.getElementById("Same");
    same=same.style.display="none";
  }*/
  
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
    console.log(nom);
    if (typeof op !== "undefined" && op !== null){
      op.style.display = "block";
    }
  
    evt.currentTarget.className += " active";
  }
  document.getElementById("defaultOpen").click();
  