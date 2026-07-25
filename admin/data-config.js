const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyAcltuHx_Hf0a2S8ipJ--nFoRND-3szgCHWHT5AB5GS9twDykNaNwTw-3l3grReRaZaA/exec";

function isDataConfigReady() {
  return APPS_SCRIPT_URL && !APPS_SCRIPT_URL.startsWith("GANTI_DENGAN");
}
