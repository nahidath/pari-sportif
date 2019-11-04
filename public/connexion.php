<?php
session_start();

    if(isset($_POST['id']) && isset($_POST['mdp']))
    {
      if(($_POST['id'] != '') && ($_POST['mdp'] != '')) {
        if ( $_POST['id'] == 'id' && $_POST['mdp'] == 'mdp' )
        {
          $reponse = 'ok';
          printf("la");
        }
        else
        {
          $reponse = 'Utilisateur ou mot de passe incorrect !';
        }
      }
      else
      {
        $reponse = 'Des valeurs sont vides';
      }
    }
    else
    {
      $reponse = 'Des valeurs ne sont pas envoyées';
    }
    echo json_encode(['reponse' => $reponse]);
?>
