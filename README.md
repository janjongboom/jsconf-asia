# Fun with Sensors

This is the code from my talk at [JSConf.asia 2014](http://2014.jsconf.asia/) in Singapore.
The slides you can find [here](http://www.slideshare.net/janjongboom/fun-with-sensors-jsconfasia-2014).
It's a set of four demo's that you can run on multiple devices and use to demo
fun things to do with sensors. The demo's are:

* Hide and seek, clients can work together to find a WiFi access point
* Theremin, use multiple devices to control oscillator on a server that generates music by leveraging device light sensors
* Orientation, uses orientation data to control a 3D model on a server that mimics behavior of the device in real life
* Juggling visualizer, plots z-axis accelerometer data from multiple devices into a graph

For all this to work you need:

* Host machine
* One or more devices running Firefox OS or Firefox for Android
    (hide & seek is Firefox OS only)
* A WiFi network where all of them are connected to. 3G would work too, but you don't want a large delay.

## I'm lazy, don't want to set up anything

I have hosted a server at http://janjongboom.com:8321.
The clients are at http://janjongboom.com/jsconf-asia/client/.


F.e. to do the juggling thing, open http://janjongboom:8321/devicemotion
in Firefox on your computer. Then open:
http://janjongboom.com/jsconf-asia/client/devicemotion in Firefox on your devices.

## Setting up host machine

1. Get node.js
2. Go into the /server folder and run `node server.js`
3. To open one of the demo's run:
    * Hide and seek: http://localhost:8321/wifi
    * Theremin: http://localhost:8321/devicelight
    * Orientation: http://localhost:8321/deviceorientation-multi
    * Juggling: http://localhost:8321/devicemotion
4. Note the IP address that you are connected to on the WiFi network

## Setting up clients

1. In the /client folder do a search-and-replace. Find `10.10.0.247` and replace it with your own IP.
2. On Firefox OS, use WebIDE or App Manager to install the apps on your phone
3. On Android you need a web server or something on your host machine,
    and then go to that URL in Firefox for Android.
4. Now open the app related to the demo:
    * Hide and seek: wifi-stumbler
    * Theremin: deviceorientation
    * Orientation: deviceorientation
    * Juggling: devicemotion

## OMG AWESOME SAUCE

If you have any queries or requests for speaking after seeing this stuff,
find my contact info at http://janjongboom.com.
