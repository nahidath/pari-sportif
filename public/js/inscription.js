/*function VerifTaillePassword(){
  var mdp = document.getElementById('mdp');
  if(mdp.validity.patternMismatch){
    document.getElementById("demo").innerHTML = mdp.validationMessage;
  } 
}*/

function comparePassword(){
 
  var mdp_1 = document.getElementById('mdp').value;
  var mdp_2 = document.getElementById('cmdp').value;
  if(mdp_1 != mdp_2){
    return false;
  }return true;
}


function valider(){
  
  var cpOk=comparePassword();
  if(cpOk){
    alert("ici");
    return true;
  }else{
    alert("les mots de passe ne correspondent pas");
    event.stopPropagation();
    return false;
  }
}
