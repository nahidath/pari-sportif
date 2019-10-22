function VerifTaillePassword(){
  var mdp = document.getElementById('mdp');
  if(mdp.validity.patternMismatch){
    document.getElementById("demo").innerHTML = mdp.validationMessage;
  } 
}

function comparePassword(){
  var mdp_1 = document.getElementById('mdp');
  var mdp_2 = document.getElementById('cmdp');
  if(mdp_1 != mdp_2){
    return false;
    }else if (mdp_1 == mdp_2) {
      return true;
    }
}


function valider(){
  var vpOk=VerifTaillePassword();
  var cpOk=comparePassword();
  if(cpOk||vpOk){
    return true;
  }else{
    alert("les mots de passe ne correspondent pas");
    event.stopPropagation();
    return false;
  }
}
