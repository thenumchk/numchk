//state sub
var state = {"AL": "Alabama","AK": "Alaska","AZ": "Arizona","AR": "Arkansas","CA": "California","CO": "Colorado","CT": "Connecticut","DE": "Delaware","DC": "District of Columbia","FL": "Florida","GA": "Georgia","HI": "Hawaii","ID": "Idaho","IL": "Illinois","IN": "Indiana","IA": "Iowa","KS": "Kansas","KY": "Kentucky","LA": "Louisiana","ME": "Maine","MD": "Maryland","MA": "Massachusetts","MI": "Michigan","MN": "Minnesota","MS": "Mississippi","MO": "Missouri","MT": "Montana","NE": "Nebraska","NV": "Nevada","NH": "New Hampshire","NJ": "New Jersey","NM": "New Mexico","NY": "New York","NC": "North Carolina","ND": "North Dakota","OH": "Ohio","OK": "Oklahoma","OR": "Oregon","PA": "Pennsylvania","RI": "Rhode Island","SC": "South Carolina","SD": "South Dakota","TN": "Tennessee","TX": "Texas","UT": "Utah","VT": "Vermont","VA": "Virginia","WA": "Washington State","WV": "West Virginia","WI": "Wisconsin","WY": "Wyoming","PR": "Puerto Rico",};

    
    
    
    
    
    document.title = "Number Checker - SSN - Alabama - 1976 - 30% active";
    var text = "";
    var i;
    var num = document.URL.substr(document.URL.lastIndexOf("/")+1).substring(0,6);
    var p1 = num.substring(0,3);
    var p2 = num.substring(4,6);
    
    function s(input){for (i = 1; i <= 9999; i++) {text += input;if (i<1000){text +=0;}if (i<100){text +=0;}if (i<10){text +=0;}text += i + " ";}}
    s(p1+"-"+p2+"-");s(p1+"."+p2+".");s(p1+" "+p2+" ");s(p1+p2);     

//ssn details replace
var p11 = parseInt(p1);
var lookupfile = p11+49-((p11-1)%50);
var statecode="AL";
var statelong="";
if(statecode in state){statelong=state[statecode];}
var config = buildConfig();
var results = Papa.parse("../inc/ssn150.txt",config);
//var results;
//var csvfile="../inc/ssn150.txt";
//var processFile = async (csvFile) => {
//    Papa.parse(csvFile, {
//      skipEmptyLines: true,
//      header: true,
//      complete: async results => {
          //results.data shows as a correctly formatted JSON object 
//        }})}

var ssndetails = 'SSN <span class="num"></span>-xxxx from ' + statelong + results.data[0] + ' given out from 1976 to unknown. Estimated age of a person with this number is 47-59 years old.'
document.getElementById('ssnd').innerHTML = ssndetails;
 
//list replace
document.getElementById('l').innerHTML = text+"<br><br><br> ©️ NumChk®️ ™️ <b>info@numchk.com</b> page generated: "+ Date() + " product: " + navigator.product + " goe: " + navigator.geolocation.getCurrentPosition + " appversion: " + navigator.appVersion + " appname: " + navigator.appName + " codename: " + navigator.appCodeName;
var p1s = document.getElementsByClassName('p1');
var p2s = document.getElementsByClassName('p2');
var nums = document.getElementsByClassName('num');

for(var i=0;i<p1s.length;i++){p1s[i].innerHTML = p1;}
for(var i=0;i<p2s.length;i++){p2s[i].innerHTML = p2;}
for(var i=0;i<nums.length;i++){nums[i].innerHTML = num;}

var topp = '<div class="container" style="margin-top: 0%">\
<div class="four columns value-prop">\
\
<a href="/"><img src="../img/trim256.png" width=100px><br>&nbsp;&nbsp;&nbsp;&nbsp;NumChk Home</a>\
</div>\
<div class="four columns value-prop">\
<img src="../img/ssnold-blur-250.jpg" height=100px >\
</div>\
<div class="four columns value-prop">\
<br><h1>SSN</h1>\
</div>\
<div class="row"></div>\
<h2>Social Security Number Detailed Analysis</h2><hr>\
</div>'; 

//top replace
document.getElementById('t').innerHTML = topp;

var bott = '<b>ABOUT: </b>Four (4) forms of the 9,999 valid Social Security Numbers in the <b><span class="num"></span> Area-Group block</b> are generated client side on your device with \
JavaScript saving <b>460KB</b> (50KB compressed) to store and transfer this file. <br><Br>\
<b>FIND: </b>By displaying this list it allows search engines (and you) to find this page. It is not intended for you to \
scroll through and read the list, but if you are interested, you can search (<b>🔎, CTRL+F, ⌘+F, Menu/Find, mouse Rightclick / Find, address bar / find on page</b>) depending on your system, \
 and put in part or all of the search term that brought you to this page. <br><br>\
 <b>COPY/SAVE: </b>If you need all or part of this list for something you can copy/paste it by highlighting the section of interesting\
 and use <b>CTRL+C</b> or just take this whole page with <b>CTRL+A</b> to select all, then <b>CTRL+C</b> and paste with <b>CTRL+V</b> in your document and trim what you don\'t want.\ <br><br> \
<b>Number Forms in the list below:</b><br>\
' + p1 + '-' + p2 + '-xxxx</b> is the valid form with "-" separators<br>\
' + p1 + ' ' + p2 + ' xxxx</b> is often used with space separation<br>\
' + p1 + '.' + p2 + '.xxxx</b>  is usage with "." separator<Br>\
' + p1 + '' + p2 + 'xxxx</b> is often used with no separator<Br><br> ----';
//bottom replace
document.getElementById('b').innerHTML = bott;


function buildConfig()
{
	return {
		//delimiter: $('#delimiter').val(),
		//header: $('#header').prop('checked'),
		//dynamicTyping: $('#dynamicTyping').prop('checked'),
		//skipEmptyLines: $('#skipEmptyLines').prop('checked'),
		//preview: parseInt($('#preview').val() || 0),
		//step: $('#stream').prop('checked') ? stepFn : undefined,
		//encoding: $('#encoding').val(),
		//worker: $('#worker').prop('checked'),
		//comments: $('#comments').val(),
		//complete: completeFn,
		//error: errorFn,
        //download: inputType == "remote"

        delimiter: ",",	// auto-detect
        newline: "",	// auto-detect
        quoteChar: '"',
        escapeChar: '"',
        header: false,
        transformHeader: undefined,
        dynamicTyping: false,
        preview: 0,
        encoding: "",
        worker: false,
        comments: false,
        step: undefined,
        complete: undefined,
        error: undefined,
        download: false,
        skipEmptyLines: false,
        chunk: undefined,
        fastMode: undefined,
        beforeFirstChunk: undefined,
        withCredentials: undefined,
        transform: undefined
	};
}