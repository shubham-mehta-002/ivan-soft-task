const path = require("path")
const {app,BrowserWindow} = require("electron")

const createBrowser = () =>{
    const win = new BrowserWindow({
        height:600,
        width : 500,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:true,
            preload: path.join(__dirname,"renderer.js")
        }
    })
    win.loadFile("index.html")
}

app.whenReady().then(createBrowser)

app.on('window-all-closed', () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
