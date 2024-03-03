//////////////////////////   MAIN   ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(function () {


///////////////////////////////////////////////


const divResultat=$("#resultat");



var tabJeu =[
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];

var tabResultat =[
  [1,4,3,4],
  [1,2,3,2],
  [7,8,6,5],
  [8,7,5,6]
]
function afficherTableau(){
  var txt="";

  for(var i=0; i<tabJeu.length;i++){
    txt+="<div class=''>";
    for(var j=0; j<tabJeu[i].length;j++){
      if(tabJeu[i][j]===0){
      txt+="<button class='btn btn-primary m-2' style='width:100px;height:100px' onClick='verif(\""+i+"-"+j+"\")'>Afficher</button>";
      }else{
        txt+="<img src='/ressources/animaux/"+tabJeu[i][j]+".webp' class='m-2' style='width:100px;height:100px'>";
      }
    }
    txt+="</div>"
  }
function verif(bouton){
  var ligne = bouton.substr(0,1);
  var colonne =bouton.substr(2,1);
  tabJeu[ligne][colonne]= tabResultat[ligne][colonne];
  afficherTableau;
}




    divResultat.html(txt);
}



afficherTableau();









  //////////////// Affichage l'utilisateur Logged
  var numbersGenerated = new Set();
  var profileLoggedDiv = $("#profileLogged");
  var choixMemory = $("#memoryProfile").val();
  var tailleMemory = $("#sizeMemoryProfile").val();
  var userLogged = sessionStorage.getItem("userLogged");
  if (userLogged) {
    userLogged = JSON.parse(userLogged);
  } else {
    userLogged = {};
  }
  chargementUtilisateur();

  ///////////////////////////////////////////////////////////////// GESTION UTILISATEURS /////////////////////////////
  $("#registerRegister").click(function (e) {
    console.log("test");
    inscriptionUtilisateur();
  });

  $("#signInSignIn").click(function (e) {
    connexion();
  });

  /////////////////////////////////////////////////////////// LANCER UNE PARTIE ///////////////////////////////////////////////

  $("#savePreferences").click(function (e) {
    preferencesMemory();
    window.location.href = "play.html";
  });
  $("#launchGame").click(function (e) {
    // genererImages(userLogged.tailleMemory, userLogged.choixMemory);

    $("#launchGame").hide();
    let replayButton = $("<button>Rejouer</button>")
      .addClass("border rounded py-1 my-3 ")
      .attr("id", "replayButton");
    $("#containerButtonPlay").append(replayButton);
    $("#replayButton").click(function (e) {
      sessionStorage.clear("choixMemory", "tailleMemory");
      window.location.href = "profile.html";
    });
  });

  // var nbClick = 0;
  // var disableClick = false;

  // $("#card0").click(function (e) {
  //   if (!disableClick) {
  //     nbClick++;
  //     console.log("test");
  //     $("#card0").attr("src", "./ressources/animaux/1.webp");
  //     imageSelected1 = $("#card0").attr("src", "./ressources/animaux/1.webp");
  //     setTimeout(function () {
  //       $("#card0").attr("src", "./ressources/question.svg");
  //       console.log("Après 5 secondes...");
  //     }, 5000); // 5000 millisecondes = 5 secondes
  //     clearTimeout();

  //     if (nbClick == 2) {
  //       console.log("Vous vous êtes trompés, veuillez patienter 5 secondes");
  //       disableClick = true;
  //       setTimeout(function () {
  //         nbClick = 0;
  //         disableClick = false;
  //       }, 5000);

  //       clearTimeout();
  //     }
  //   }
  // });
  // $("#card1").click(function (e) {
  //   if (!disableClick) {
  //     nbClick++;
  //     console.log("test");
  //     $("#card1").attr("src", "./ressources/animaux/2.webp");
  //     setTimeout(function () {
  //       $("#card1").attr("src", "./ressources/question.svg");
  //       console.log("Après 5 secondes...");
  //     }, 5000); // 5000 millisecondes = 5 secondes
  //     clearTimeout();
  //     if (nbClick == 2) {
  //       console.log("Vous vous êtes trompés, veuillez patienter 5 secondes");
  //       disableClick = true;
  //       setTimeout(function () {
  //         nbClick = 0;
  //         disableClick = false;
  //       }, 5000);

  //       clearTimeout();
  //     }
  //   }
  // });
  // $("#card2").click(function (e) {
  //   if (!disableClick) {
  //     nbClick++;
  //     console.log("test");
  //     $("#card2").attr("src", "./ressources/animaux/1.webp");
  //     setTimeout(function () {
  //       $("#card2").attr("src", "./ressources/question.svg");
  //       console.log("Après 5 secondes...");
  //     }, 5000); // 5000 millisecondes = 5 secondes
  //     clearTimeout();
  //     if (nbClick == 2) {
  //       console.log("Vous vous êtes trompés, veuillez patienter 5 secondes");
  //       disableClick = true;
  //       setTimeout(function () {
  //         nbClick = 0;
  //         disableClick = false;
  //       }, 5000);

  //       clearTimeout();
  //     }
  //   }
  // });

  // var click=0;
  // var valeur1=3;
  // var valeur2=4;

  //   $('input[type="checkbox"]').change(function (e){
  //     if($(this).is(":checked")){
  //         console.log($(this).val());
  //         valeur1=$(this).val();
  //         click=1;
  //     }
  //     if(click=1)
  //   })
  //   if(valeur1==valeur2){
  //     alert("Vous avez gagné !");
  //   }

  /////////////////////// Fonctions //////////////////////////////////
  function preferencesMemory() {
    userLogged.choixMemory = choixMemory;
    userLogged.tailleMemory = tailleMemory;
    sessionStorage.setItem("userLogged", JSON.stringify(userLogged));
    console.log(userLogged);
    console.log("test");
  }
  function chargementUtilisateur() {
    if (profileLoggedDiv.length) {
      if (userLogged.user) {
        $("<h1>")
          .text("Bienvenue " + userLogged.user)
          .appendTo("#profileLogged"); // Ajoute l'identifiant sur la page de profil
      }
    }
  }
  function inscriptionUtilisateur() {
    let user = $("#userRegister").val();
    let email = $("#emailRegister").val();
    let password = $("#passwordRegister").val();
    let passwordVerif = $("#passwordVerifRegister").val();
    var usersSaved = localStorage.getItem("users");

    if (!usersSaved) {
      usersSaved = [];
    } else {
      usersSaved = JSON.parse(usersSaved);
    }

    if (user && email && password && passwordVerif) {
      // si Tous les champs sont remplis
      if (password == passwordVerif) {
        // si les mots de passe correspondent
        for (let i = 0; i < usersSaved.length; i++) {
          if (usersSaved[i].user === user) {
            var userExist = true;
          }
        }
        if (!userExist) {
          // si le nom d'utilisateur n'a pas été trouvé
          usersSaved.push({ email: email, user: user, password: password });
          localStorage.setItem("users", JSON.stringify(usersSaved));
          alert("Félicitations " + user + " Le compte a bien été créé");
          window.location.href = "signin.html";
        } else {
          alert("L'identifiant ou l'adresse e-mail ont déjà été utilisés");
        }
      } else {
        alert("Les mots de passe ne correspondent pas !");
      }
    } else {
      alert("Tous les champs ne sont pas remplis !");
    }
  }

  function connexion() {
    var validation = false;
    let user = $("#userSignIn").val();
    let password = $("#passwordSignIn").val();
    var usersSaved = JSON.parse(localStorage.getItem("users"));
    var userLogged = {};
    for (let i = 0; i < usersSaved.length; i++) {
      if (usersSaved[i].user === user && usersSaved[i].password === password) {
        validation = true;
      }
    }
    if (validation) {
      alert("Bonjour " + user + ", vous êtes bien connecté(e)");
      userLogged.user = user;
      sessionStorage.setItem("userLogged", JSON.stringify(userLogged));
      window.location.href = "profile.html";
    } else {
      alert("Identifiants incorrects");
    }
  }

  function genererNombreUnique(nombreFichiers) {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * nombreFichiers) + 1;
    } while (numbersGenerated.has(randomNumber));
    numbersGenerated.add(randomNumber);
    return randomNumber;
  }

  function genererImages(nombre, theme) {
    // nombre de cartes que l'on veut et theme choisi

    switch (theme) {
      case "animaux":
        nombreImages = 27;
        break;

      case "animauxdomestiques":
        nombreImages = 10;
        break;
      case "chiens":
        nombreImages = 23;
        break;
      case "dinosaures":
        nombreImages = 10;
        break;
      case "dinosauresAvecNom":
        nombreImages = 10;
        break;
    }
    for (let i = 0; i < nombre; i++) {
      let randomCarte = genererNombreUnique(nombreImages);
      for (let i = 0; i < 2; i++) {
        let newDiv = $("<div></div>").addClass("col px-5 py-5");
        let newImg = $("<img>").attr(
          "src",
          "./ressources/" + theme + "/" + randomCarte + ".webp"
        );
        newDiv.append(newImg);
        $("#gameContainer").append(newDiv);
      }
    }
  }
});
