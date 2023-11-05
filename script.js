let resetBtn = document.getElementById("reset");
let scoreJoueur = document.getElementById("player_score");
let scoreOrdinateur = document.getElementById("computer_score");
let btnJoueur = [...document.getElementsByClassName("btn-joueur")];
let cpierreBtn = document.getElementById("cpierre");
let cfeuilleBtn = document.getElementById("cfeuille");
let cciseauxBtn = document.getElementById("cciseaux");
let message = document.getElementById("message");
let nextBtn = document.getElementById("next");
let nbrTentative = 0;

const Rounds = (e) => {
    let choix = e.target.closest(".btn-joueur");
    btnJoueur.forEach((btn) =>{
        btn.classList.add("desactivated");
        btn.removeEventListener("click", Rounds);
    });

    choix.classList.remove("desactivated");
    choix.classList.add("active");

    let choixJoueur = choix.id;

    let choixOrdi = faireChoixOdinateur();

    verifierGagnant(choixJoueur,choixOrdi);

    nextBtn.style.visibility= "visible";
};

const PIERRE = 'pierre';
const FEUILLE = 'feuille'
const CISEAUX = 'ciseaux'

const faireChoixOdinateur = () => {
     // 0 = pierre
     // 1 = feuille
     // 2 = ciseaux

     let nbrAleatoire = Math.floor(Math.random() * 3);

     switch(nbrAleatoire){
        case 0:
            cpierreBtn.classList.add("active");
            return PIERRE;
        case 1:
            cfeuilleBtn.classList.add("active");
            return FEUILLE
        default:
                cciseauxBtn.classList.add("active");
            return CISEAUX;

     }
};

const verifierGagnant = (choixJoueur, choixOrdi) => {
     if (choixJoueur === choixOrdi){
        message.textContent = "Egalité !";
        return;
     }

     if(choixJoueur == PIERRE){
        if(choixOrdi == FEUILLE){
            return victoireOrdinateur();
        } else if(choixOrdi == CISEAUX){
            return victoireJoueur();
        }
        
     }

     if(choixJoueur == CISEAUX){
        if(choixOrdi == PIERRE){
            return victoireOrdinateur();
        } else if(choixOrdi == FEUILLE){
            return victoireJoueur();
        }
     }

     if(choixJoueur == FEUILLE){
        if(choixOrdi == CISEAUX){
            return victoireOrdinateur();
        } else if(choixOrdi == PIERRE){
            return victoireJoueur();
        }
     }
}

const victoireOrdinateur = () => {
    message.textContent = " L'ordinateur gagne...";
    scoreOrdinateur.textContent++;
};

const victoireJoueur = () => {
    message.textContent = "Vous avez gagnez ! :)";
    scoreJoueur.textContent++;
};

const nextRound = () => {
    btnJoueur.forEach(btn => {
        btn.classList.remove("desactivated");
        btn.classList.remove("active");

        btn.addEventListener('click', Rounds);
    })

    nextBtn.style.visibility = "hidden";
    
    cpierreBtn.classList.remove("active");
    cfeuilleBtn.classList.remove("active");
    cciseauxBtn.classList.remove("active");

    message.textContent = "A vous de jouer !"
}

nextBtn.addEventListener("click", nextRound);

btnJoueur.forEach((btn) => btn.addEventListener('click', Rounds));

resetBtn.addEventListener("click", () => {
  scoreJoueur.textContent = 0;
  scoreOrdinateur.textContent = 0;

  preparerNouvelleManche();
});