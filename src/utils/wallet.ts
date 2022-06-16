export const connectWallet = async () => {
  const klaytn = getKlaytn();
  return await klaytn.enable()
}

export function getKlaytn() {
  if (typeof window.klaytn === 'undefined') {
    throw new Error('Kaikas does not installed');
  }
  return window.klaytn;
}
