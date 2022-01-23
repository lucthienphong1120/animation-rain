document.write(
    `<style>
    #noel-top-left {
        display: none;
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
    }
    #noel-top-right {
        display: none;
        position: fixed;
        z-index: 9999;
        top: 0;
        right: 0;
    }
    #noel-bottom {
        display: none;
        position: fixed;
        z-index: 9999;
        bottom: -50 px;
        left: 0;
        width: 100 %;
        height: 104 px;
        background: url(./assets/source/noel-bottom.png) repeat-x bottom left;
    }
    #noel-bottom-left {
        display: none;
        position: fixed;
        z-index: 9999;
        bottom: 20px;
        left: 20px;
    }
    @media (min-width: 992px) {
        #noel-top-left,
        #noel-top-right,
        #noel-bottom,
        #noel-bottom-left {
            display: block;
        }
    }
    </style>
    <img id="noel-top-left" src="./assets/source/noel-top-left.png"/>
    <img id="noel-top-right" src="./assets/source/noel-top-right.png"/>
    <div id="noel-bottom">
        <img id="noel-bottom-left" src="./assets/source/noel-bottom-left.png"/>
    </div>
`);
var number = 100;
var hidesnowtime = 0;
var color = '#fff';
var snowdistance = 'pageheight';
var ie4up = (document.all) ? 1 : 0;
var ns6up = (document.getElementById && !document.all) ? 1 : 0;

function iecompattest() {
    return (document.compatMode && document.compatMode != 'BackCompat') ? document.documentElement : document.body
}
var dx, xp, yp;
var am, stx, sty;
var i, docWidth = 800, docHeight = 600;
if (ns6up) {
    docWidth = self.innerWidth;
    docHeight = self.innerHeight
} else if (ie4up) {
    docWidth = iecompattest().clientWidth;
    docHeight = iecompattest().clientHeight
}
dx = new Array();
xp = new Array();
yp = new Array();
am = new Array();
stx = new Array();
sty = new Array();
for (i = 0; i < number; ++i) {
    dx[i] = 0;
    xp[i] = Math.random() * (docWidth - 50);
    yp[i] = Math.random() * docHeight;
    am[i] = Math.random() * 20;
    stx[i] = 0.02 + Math.random() / 10;
    sty[i] = 0.7 + Math.random();
    if (ie4up || ns6up) {
        document.write(
            `<div id="dot${i}" style="position: absolute; z-index: ${i}; visibility:visible; top: 15px; left: 15px;">
                <span style="font-size:18px; color:${color}">*</span>
            </div>`)
    }
}

function snowIE_NS6() {
    docWidth = ns6up ? window.innerWidth - 10 : iecompattest().clientWidth - 10;
    docHeight = (window.innerHeight && snowdistance == 'windowheight') ? window.innerHeight : (ie4up && snowdistance == 'windowheight') ? iecompattest().clientHeight : (ie4up && !window.opera && snowdistance == 'pageheight') ? iecompattest().scrollHeight : iecompattest().offsetHeight;
    for (i = 0; i < number; ++i) {
        yp[i] += sty[i];
        if (yp[i] > docHeight - 50) {
            xp[i] = Math.random() * (docWidth - am[i] - 30);
            yp[i] = 0;
            stx[i] = 0.02 + Math.random() / 10;
            sty[i] = 0.7 + Math.random()
        }
        dx[i] += stx[i];
        document.getElementById('dot' + i).style.top = yp[i] + 'px';
        document.getElementById('dot' + i).style.left = xp[i] + am[i] * Math.sin(dx[i]) + 'px'
    }
    snowtimer = setTimeout('snowIE_NS6()', 10)
}

function hidesnow() {
    if (window.snowtimer) {
        clearTimeout(snowtimer)
    }
    for (i = 0; i < number; i++) document.getElementById('dot' + i).style.visibility = 'hidden'
}
if (ie4up || ns6up) {
    snowIE_NS6();
    if (hidesnowtime > 0) setTimeout('hidesnow()', hidesnowtime * 1000)
}
