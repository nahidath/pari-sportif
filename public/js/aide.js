/*function close(evt, nom) {
    var i, reponse, drop;
    
    reponse = document.getElementsByClassName("reponse");
    for (i = 0; i < reponse.length; i++) {
      reponse[i].style.display = "none";
    }
    drop = document.getElementsByClassName("drop");
    for (i = 0; i < drop.length; i++) {
      drop[i].className = drop[i].className.replace(" active", "");
    }
    
    var op=document.getElementById(nom);
    if (typeof op !== "undefined" && op !== null){
      op.style.display = "content";
    }
  
    evt.currentTarget.className += " active";
}*/
function close(){
    var d = document.getElementsByClassName("drop");
    var i;

    for (i = 0; i < d.length; i++) {
    d[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var reponse = this.nextElementSibling;
        if (reponse.style.display === "block") {
        reponse.style.display = "none";
        } else {
        reponse.style.display = "block";
        }
    });
    }
}
