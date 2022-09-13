/******************************** ********************************/
/*************************** VARIABLES ***************************/
/******************************** ********************************/

const forwarderOrigin = 'http://localhost:9010';


/******************************** ********************************/
/*************************** FONCTIONS ***************************/
/******************************** ********************************/

const initialize = () => {
  //Récupération des éléments du DOM
  const onboardButton = document.querySelector('.connectButton');
  const getAccountsButton = document.querySelector('.getAccounts');
  const getAccountsResult = document.querySelector('.getAccountsResult');

  // Fonction qui check si l'extension MetaMask est installée
  const isMetaMaskInstalled = () => {
    // Chek {ethereum} binding si l'extension est instalée
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  // Création d'un nouveau pont de connection
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

  // Début du processus d'onboarding
  const onClickInstall = () => {
    onboardButton.innerText = 'Le processus est en cours';
    onboardButton.disabled = true;
    onboarding.startOnboarding();
  };

  const onClickConnect = async () => {
    try {
      // Ouverture de la Pop-Up MetaMask 
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
    }
  };

  const MetaMaskClientCheck = () => {
    // Check si l'extension n'est pas installée
    if (!isMetaMaskInstalled()) {
      // Si elle n'est pas installé, au click renvoie vers la page de téléchargement
      onboardButton.innerText = 'Cliquez-ici pour installer MetaMask';
      onboardButton.onclick = onClickInstall;
      onboardButton.disabled = false;
    } else {
      // Si elle est installée, connectez l'utilisateur à son wallet MetaMask
      onboardButton.innerText = 'Connectez vous au WEB 3';
      onboardButton.onclick = onClickConnect;
      onboardButton.disabled = false;
    }
  };

  //Eth_Accounts-getAccountsButton
  getAccountsButton.addEventListener('click', async () => {
    // Listing de tout les comptes ethereum présent dans le portefeuille MetaMask
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    // Récupération de la première adresse, et l'afficher
    getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
    console.log(accounts[0]);
  });

  MetaMaskClientCheck();
};

/******************************** ********************************/
/****************************** WORK *****************************/
/******************************** ********************************/

window.addEventListener('DOMContentLoaded', initialize);