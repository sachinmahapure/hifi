(function() {
    var APP_NAME = "DEMO";

    var APP_URL = Script.resolvePath("html/demo.html");

    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    var button = tablet.addButton({
        text: APP_NAME
    });

    var onDemoScreen = false;
    
    function onClicked() {
        if (onDemoScreen) {
            tablet.gotoHomeScreen();
        } else {
            tablet.gotoWebScreen(APP_URL);
        }
    }
    
    function onScreenChanged(type, url) {
        onDemoScreen = (type === "Web" && url === APP_URL);
        button.editProperties({isActive: onDemoScreen});
    }
    
    button.clicked.connect(onClicked);
    tablet.screenChanged.connect(onScreenChanged);

    Script.scriptEnding.connect(function () {
        if (onDemoScreen) {
            tablet.gotoHomeScreen();
        }
        button.clicked.disconnect(onClicked);
        tablet.removeButton(button);
        tablet.screenChanged.disconnect(onScreenChanged);
    });
})();
