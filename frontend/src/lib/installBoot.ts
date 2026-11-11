/**
 * Inline script for <head> (root layout). Chrome can fire `beforeinstallprompt` before the
 * page hydrates; this keeps Chrome's mini bar quiet and holds the event on window until
 * initInstall() (lib/install.ts) adopts it. Kept apart from lib/install.ts so the server
 * layout imports a plain string and nothing else.
 */
export const INSTALL_BOOT_KEY = '__wqInstallPrompt'

export const INSTALL_BOOT = `window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.${INSTALL_BOOT_KEY}=e;});`
