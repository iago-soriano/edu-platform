export const getPageTitle = (pageTitle: string) =>
  `language app - ${pageTitle}`;

export class LocalStorageHelper {

  getMode(defaultMode: string) {
    const storedMode = localStorage.getItem('color_mode');
    if (!storedMode) {
      localStorage.setItem('color_mode', defaultMode);
    }
    return storedMode || defaultMode;
  }

  setMode(mode: string) {
    localStorage.setItem('color_mode', mode);
  }

  _getVerifiedTokens() {
    return localStorage.getItem('verifiedTokens')?.split(',') || [];
  }

  setVerifiedToken(token: string) {
    localStorage.setItem('verifiedTokens', [...this._getVerifiedTokens(), token].join(','));
  }

  hasToken(token: string) {
    return this._getVerifiedTokens().includes(token);
  }


}
