/**
 * This will be loaded before starting the simulator.
 * If you wish to add custom javascript, 
 * ** make sure to add this line to pxt.json**
 * 
 *      "disableTargetTemplateFiles": true
 * 
 * otherwise MakeCode will override your changes.
 * 
 * To register a constrol simmessages, use addSimMessageHandler
 */
// Add the "Connect Puck.js" link/button to the footer
window.onload = function() {
    var footer = document.getElementById("footer");
    footer.innerHTML = "<button id=\"btnConnect\">Connect Puck.js</button>" + footer.innerHTML;

    var puckJsScript = document.createElement('script');
    puckJsScript.type = 'text/javascript';
    puckJsScript.src = 'https://www.puck-js.com/puck.js';
    document.body.appendChild(puckJsScript);

    var arcadeInputScript = document.createElement('script');
    arcadeInputScript.type = 'text/javascript';
    arcadeInputScript.src = 'puck/arcade-input.js';
    document.body.appendChild(arcadeInputScript);

    var puckInputScript = document.createElement('script');
    puckInputScript.type = 'text/javascript';
    puckInputScript.src = 'puck/puck-input.js';
    document.body.appendChild(puckInputScript);

    var puckCss = document.createElement('link');
    puckCss.rel = 'stylesheet';
    puckCss.href = 'puck/puck-arcade.css';
    document.body.appendChild(puckCss); 
};