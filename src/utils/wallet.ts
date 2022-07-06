interface Klaytn {
  on: (eventName: string, callback: (params: any) => void) => void;
  enable: () => Promise<Array<string>>;
  selectedAddress: string;
  networkVersion: number;
  publicConfigStore: Store;
}

interface State {
  isEnabled: boolean
  isUnlocked: boolean;
  networkVersion: number;
  onboardingcomplete: boolean;
}

interface Store {
  subscribe: (callback: () => void) => void;
  getState: () => State;
}

declare global {
  interface Window {
    klaytn?: Klaytn;
  }
}

export const connectWallet = async () => {
  const klaytn = getKlaytn();
  const login = await klaytn.enable();
  return login[0];
}

export const getKlaytn = () => {
  if (typeof window.klaytn === 'undefined') {
    throw new Error('Kaikas does not installed');
  }
  return window.klaytn;
}

export const registerWallet = async (message: string, walletAccount: string) => {
  //@ts-ignore
  const signature = await window.caver.klay.sign(message, walletAccount)
  return signature;
}

export const checkNetworkServer = () => {
  return getKlaytn().networkVersion !== 8217 ? true : false
}


