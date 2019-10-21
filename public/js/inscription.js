/*var form = document.getElementById('valid');
var error=document.querySelector('.error');
mdp.addEventListener('input', event);*/
/*function VerifTaillePassword(){
  var mdp = document.getElementById('mdp');
  if(mdp.validity.patternMismatch){
    document.getElementById("demo").innerHTML = mdp.validationMessage;
  } 
}
 

  /*if(mdp.validity.rangeUnderflow){
    error.innerHTML = ""; 
    error.className = "error";} 
  }, false);

  /*form.addEventListener('submit', function (event) {
    if (!mdp.validity.valid) {
      alert("mot de passe pas valide");
      error.innerHTML = "votre mot de passe doit contenir min 8 caracteres !";
      error.className = "error active";
      event.preventDefault();
    }
  }, false);*/
}

/*function comparePassword(mdp_1,mdp_2) {
  var value_1 = mdp_1.value, 
      value_2 = mdp_2.value;

  if (value_1 && value_2) { // Si les deux champs contiennent quelque chose
      mdp_1.className = mdp_2.className = (value_1 === value_2) ? "green" : "red";
  }	

  
var mdp_1 = document.getElementById('mdp'),
  mdp_2 = document.getElementById('cmdp');

if (mdp_1 && mdp_2) {
  mdp_1.onkeyup = mdp_2.onkeyup = mdp_1.onblur = mdp_2.onblur = comparePassword;

}
}*/
function comparePassword(){
  var mdp_1 = document.getElementById('mdp');
  var mdp_2 = document.getElementById('cmdp');
  if(mdp_1.value != mdp_2.value){
    alert("abv")
    document.getElementById("corres").innerHTML = "les mots de passe ne correspondent pas";
    return false;
    }else if (mdp_1.value == mdp_2.value) {
      return true;
    }
}


function valider(){
  //var vpOk=VerifTaillePassword();
  var cpOk=comparePassword();
  if(cpOk){
    return true;
  }else{
    alert("erreur");
    event.stopPropagation();
    return false;
  }
}