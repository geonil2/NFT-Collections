export const connectWallet = async () => {
  const klaytn = getKlaytn();
  const login = await klaytn.enable();
  return login[0];
}

export function getKlaytn() {
  if (typeof window.klaytn === 'undefined') {
    throw new Error('Kaikas does not installed');
  }
  return window.klaytn;
}


