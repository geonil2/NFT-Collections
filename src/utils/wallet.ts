interface Klaytn {
  on: (eventName: string, callback: () => void) => void;
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

export function getKlaytn() {
  if (typeof window.klaytn === 'undefined') {
    throw new Error('Kaikas does not installed');
  }
  return window.klaytn;
}


