//state sub
var state = {"AL": "Alabama","AK": "Alaska","AZ": "Arizona","AR": "Arkansas","CA": "California","CO": "Colorado","CT": "Connecticut","DE": "Delaware","DC": "District of Columbia","FL": "Florida","GA": "Georgia","HI": "Hawaii","ID": "Idaho","IL": "Illinois","IN": "Indiana","IA": "Iowa","KS": "Kansas","KY": "Kentucky","LA": "Louisiana","ME": "Maine","MD": "Maryland","MA": "Massachusetts","MI": "Michigan","MN": "Minnesota","MS": "Mississippi","MO": "Missouri","MT": "Montana","NE": "Nebraska","NV": "Nevada","NH": "New Hampshire","NJ": "New Jersey","NM": "New Mexico","NY": "New York","NC": "North Carolina","ND": "North Dakota","OH": "Ohio","OK": "Oklahoma","OR": "Oregon","PA": "Pennsylvania","RI": "Rhode Island","SC": "South Carolina","SD": "South Dakota","TN": "Tennessee","TX": "Texas","UT": "Utah","VT": "Vermont","VA": "Virginia","WA": "Washington State","WV": "West Virginia","WI": "Wisconsin","WY": "Wyoming","PR": "Puerto Rico",};

    
    
    
    
    
    
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
var statecode="";
var statelong="";
//if(statecode in state){statelong=state[statecode];}
var foundline ="";
var parselineresult="";

function reqListener () { //run when file is parsed
    var issueyr ="";
    var agereport="";
    var deaths="";
    textout = this.responseText;
    console.log(textout+"hi");    
    var textlines = textout.split("\n");
    textlines.forEach(parseline);
    var ssndetails = '<h3>SSN Block ' + num + '-xxxx </h3> For U.S. individuals with a Social Security Number from this block, the following analysis gives you an idea of how old the person is, what state it was issued in, when it was issued, and of those that have a SSN from this block, what the death statistics are.<br>';
    if (statecode != ""){ssndetails += "<img src=../img/s/"+statecode+".png width=25%><br>"}
    ssndetails += "<b>SSN10 details:</b><br>";
    if(parselineresult[1] != ""){ssndetails += "SSN10 State: " + parselineresult[1] + "<br>";}
    if(parselineresult[2] != ""){ssndetails += "SSN10 start Date: " + parselineresult[2] + "<br>";}
    if(parselineresult[3] != ""){ssndetails += "SSN10 end Date: " + parselineresult[3] + "<br>";}
    ssndetails += "<br><b>Standard Web data details:</b><br>";
    if(parselineresult[4] != ""){ssndetails += "VER. Start Date of issuing block: " + parselineresult[4] + "<br>"; issueyr = parselineresult[4]; }
    if(parselineresult[5] != ""){ssndetails += "VER. End Date of issuing block: " + parselineresult[5] + "<br>";}
    if(parselineresult[6] != ""){ssndetails += "VER. Estimated Age of person with this number today:  " + parselineresult[6] + "<br>"; agereport = parselineresult[6];}
    if(parselineresult[7] != ""){ssndetails += "VER. Issuing State prior to 2011: " + parselineresult[7] + " is " + statelong + "<br>";}
    ssndetails += "<br><b>Social Security Death Index database SSDI as of 2013</b><br>";
    if(parselineresult[8] !=""){ssndetails += "SSDI Death count: " + parselineresult[8] + " of possible 9,999 in block<br>";deaths=parselineresult[8]}
    if(parselineresult[9] !=""){ssndetails += "SSDI Youngest Age: " + parselineresult[9] + "<br>";}
    if(parselineresult[10] !=""){ssndetails += "SSDI Average Age: " + parselineresult[10] + "<br>";}
    if(parselineresult[11] != ""){ssndetails += "SSDI Oldest Age: " + parselineresult[11] + "<br>";}
    if(parselineresult[12] != ""){ssndetails += "SSDI Oldest Birth Year: " + parselineresult[12] + "<br>";}
    if(parselineresult[13] != ""){ssndetails += "SSDI Average Birth Year: " + parselineresult[13] + "<br>";}
    if(parselineresult[14] != ""){ssndetails += "SSDI Newest Birth Year: " + parselineresult[14] + "<br>";}
    if(parselineresult[15] != ""){ssndetails += "<b>.......The exact age of the SSN Block usage is usually seen between newest birth and oldest death years.... </b><br>SSDI Oldest Death Year: " + parselineresult[15] + "<br>";}
    if(parselineresult[16] != ""){ssndetails += "SSDI Average Death Year: " + parselineresult[16] + "<br>";}
    if(parselineresult[17] != ""){ssndetails += "SSDI Newest Death Year: " + parselineresult[17] + "<br>";}
    ssndetails += "<br><br> If no data is available, or many dates are near 2011, consider SSN Randomization.  The Social Security Administration (SSA) changed the way Social Security Numbers (SSNs) are issued on June 25, 2011. <br><br>It eliminated the geographical significance of the first three digits of the SSN, referred to as the area number, by no longer allocating the area numbers for assignment to individuals in specific states.<br><br>It eliminated the significance of the highest group number and, as a result, the High Group List is frozen in time and can only be used to see the area and group numbers SSA issued prior to the randomization implementation date.<br><br>Previously unassigned area numbers were introduced for assignment excluding area numbers 000, 666 and 900-999.<br><br>For blocks fully assigned prior to 2011 the state code of issuance are still valid. For blocks that were partially assigned, the lower numbers encode the state, and those issued after 2011 are random state.  For blocks that have very low death count and date after 2011 - then these blocks should be considered part of the random pool and no number analaysis possible to determine the issuing state.<br>";

    document.getElementById('ssnd').innerHTML = ssndetails;  
    document.title = "Number Checker - SSN - " + statelong + " issue: " + issueyr + " est age: " + agereport + " deaths: " + deaths;
}
  
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  //oReq.open("GET", "http://numchk.com/inc/ssn"+lookupfile+ ".txt", true);
  oReq.open("GET", "../inc/ssn"+lookupfile+ ".txt", true);
  oReq.send();

function parseline(item, index){
  var parseline = item.split(",") ;
       if (parseline[0] == num){
           foundline = item;
           parselineresult=parseline;
           if (parselineresult[2] != "" && parselineresult[2] !="?"){parselineresult[2] = parseInt(parselineresult[2])+1900;} //bulk of year removed as rudimentary compression of file
           if (parselineresult[3] != "" && parselineresult[3] !="?"){parselineresult[3] = parseInt(parselineresult[3])+1900;}
           if (parselineresult[4] != "" && parselineresult[4] !="?")parselineresult[4] = parseInt(parselineresult[4])+1900;
           if (parselineresult[5] != "" && parselineresult[5] !="?")parselineresult[5] = parseInt(parselineresult[5])+1900;
           if (parselineresult[12] != "" && parselineresult[12] !="?")parselineresult[12] = parseInt(parselineresult[12])+1900;
           if (parselineresult[13] != "" && parselineresult[13] !="?")parselineresult[13] = parseInt(parselineresult[13])+1900;
           if (parselineresult[14] != "" && parselineresult[14] !="?")parselineresult[14] = parseInt(parselineresult[14])+1900;
           if (parselineresult[15] != "" && parselineresult[15] !="?")parselineresult[15] = parseInt(parselineresult[15])+1900;
           if (parselineresult[16] != "" && parselineresult[16] !="?")parselineresult[16] = parseInt(parselineresult[16])+1900;
           if (parselineresult[17] != "" && parselineresult[17] !="?")parselineresult[17] = parseInt(parselineresult[17])+1900;
             //0  dash
             //1 ssn10 state,
             //2 ssn10 start date,
             //3 ssn10 end date,
             //4 VER. START,
             //5 VER. END,
             //5 VER. AGE,
             //7 VER STATE,
             //8 count,
             //9 youngestage,
             //10 avgage,
             //11 oldestage,
             //12 oldestbirth,
             //13 avgbirthyr,
             //14 newestbirth,
             //15 oldestdeath,
             //16 avgdeathyr,
             //17 newestdeath
            statecode=parseline[7];
            statelong=statecode;
            if(statecode in state){statelong=state[statecode];}
    }
}



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
