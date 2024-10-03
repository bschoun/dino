// Code to upload to Puck.js
var PUCK_CODE = `
// Pulse the green LED to show we've connected
digitalPulse(LED2, 1, 500);

// Turn off the accelerometer and battery reporting when we disconnect. Blink red LED.
NRF.on('disconnect', function() {
    digitalPulse(LED1, 1, 500)
})

// When we press the button, send 'p'
setWatch(function() {
    Bluetooth.println("p");
}, BTN, {edge:"rising", debounce:50, repeat:true});

// When we release the button, press 'r'
setWatch(function() {
    Bluetooth.println("r");
}, BTN, {edge:"falling", debounce:50, repeat:true});
`;

// When we click the connect button...
var connection;
document.getElementById("btnConnect").addEventListener("click", function() 
{
    // disconnect if connected already
    if (connection) {
        connection.close();
        connection = undefined;
    }
    // Connect
    Puck.connect(function(c) {
        if (!c) {
            alert("Couldn't connect!");
            return;
        }
        connection = c;
        // Handle the data we get back, and call 'onLine'
        // whenever we get a line
        var buf = "";
        connection.on("data", function(d) {
            buf += d;
            var l = buf.split("\n");
            buf = l.pop();
            l.forEach(onLine);
        });
        // First, reset the Puck
        connection.write("reset();\n", function() {
            // Wait for it to reset itself
            setTimeout(function() {
            // Now upload our code to it
            connection.write("\x03\x10if(1){"+PUCK_CODE+"}\n",
                function() { console.log("Ready..."); });
            }, 1500);
        });
    });
});

// When we get a line of data, check it and if it's
// from the accelerometer, update it
function onLine(line) 
{
    line = line.split(",")[0];
    line = line.replace(/(\r\n|\n|\r|>|<)/gm, "");
    if (line == "p") {
        button_a();
    }
    else if (line == "r") {
        release_button_a();
    }
    else {
        console.log("Unknown data: " + line);
    }
}

function release_button_a() {
    set_button(A_BUTTON, false);
}

/* Rapid fire when tilted down */
function button_a() {
    set_button(A_BUTTON, true);
}