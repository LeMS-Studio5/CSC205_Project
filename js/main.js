/**
 * courses - an array - indicated by the opening and closing [ ]
 * 
 * Each element of the array is a JSON object. { } indicate the start and the end of an object.  In the object are name/value pairs in 
 * the format of "name": "value"  If the value is numeric, the pair can be "name": 4  (no quotes around the number)
 * 
 * This format is JSON or JAvaScript Object Notation - more info here https://www.w3schools.com/js/js_json_intro.asp
 * Line=0, Department=1, Number=2, Section=3, Title=4, Faculty=5, Openings=6, Capacity=7, Status=8, Day=9, StartTime=10, EndTime=11, Campus=12, Building=13, Room=14, Credits=15, StartDate=16, EndDate=17
 */
let viewableRows=[1,2,3,4,5,9,10,11,13,14,15,16,17,8];
let RowPriority =[12,12,3,5,4,9,10,8,2,6,7,1,1,11];
let coursesTaking=[];
let ifrm;
let courses = [
    {"Line":81,"Department":"BUS","Number":344,"Section":1,"Title":"MANAGEMENT OF INFORMATION SYSTEMS","Faculty":"Richards, Gordon P.","Openings":2,"Capacity":30,"Status":"Open","Day":"MWF","StartTime":"1:25 PM","EndTime":"2:20 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":3,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":167,"Department":"CSC","Number":133,"Section":2,"Title":"SURVEY OF COMPUTER SCIENCE","Faculty":"Madeira, Scott","Openings":6,"Capacity":15,"Status":"Open","Day":"H","StartTime":"2:00 PM","EndTime":"4:50 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":0,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":168,"Department":"CSC","Number":133,"Section":3,"Title":"SURVEY OF COMPUTER SCIENCE","Faculty":"Madeira, Scott","Openings":7,"Capacity":15,"Status":"Open","Day":"T","StartTime":"6:30 PM","EndTime":"9:20 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":0,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":169,"Department":"CSC","Number":133,"Section":"0A","Title":"SURVEY OF COMPUTER SCIENCE","Faculty":"Richards, Gordon P.","Openings":15,"Capacity":45,"Status":"Open","Day":"TH","StartTime":"8:00 AM","EndTime":"9:20 AM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 110 Chemistry room","Credits":4,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":170,"Department":"CSC","Number":190,"Section":1,"Title":"HTML","Faculty":"Madeira, Scott","Openings":4,"Capacity":25,"Status":"Open","Day":"M","StartTime":"2:30 PM","EndTime":"3:25 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 312A","Credits":1,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":171,"Department":"CSC","Number":205,"Section":1,"Title":"HCI DESIGN & PROGRAMMING","Faculty":"Madeira, Scott","Openings":10,"Capacity":25,"Status":"Open","Day":"MWF","StartTime":"11:15 AM","EndTime":"12:10 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":3,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":172,"Department":"CSC","Number":344,"Section":1,"Title":"MANAGEMENT INFORMATION SYSTEM","Faculty":"Poteete, Paul W. Steffine, Aaron","Openings":2,"Capacity":90,"Status":"Open","Day":"MWF","StartTime":"1:25 PM","EndTime":"2:20 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":3,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":173,"Department":"CSC","Number":363,"Section":"E1","Title":"DATABASE SYSTEMS","Faculty":"Hinderliter, Jeffery A","Openings":4,"Capacity":30,"Status":"Open","Day":"T","StartTime":"6:30 PM","EndTime":"9:20 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 233 Engineering Lab\/Classroom","Credits":3,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":296,"Department":"HUM","Number":103,"Section":"0A","Title":"INVITATION TO THE HUMANTIES","Faculty":"Miller, Eric John","Openings":12,"Capacity":180,"Status":"Open","Day":"W","StartTime":"11:15 AM","EndTime":"12:10 PM","Campus":" Main Campus","Building":" Old Main","Room":" John White Chapel","Credits":0,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021"}
]
function search(){
    if (document.getElementById("search").value !=""){
        generateTable(document.getElementById("sortable"), courses, document.getElementById("search").value,  document.getElementById("hideFull").checked);
    }else{
        generateTable(document.getElementById("sortable"), courses, "*",  document.getElementById("hideFull").checked);
    }
}
function aSearch(){
    let srch="";
    if (document.getElementById("courseCode").value!="")srch+="CODE:"+ document.getElementById("courseCode").value + " && ";
    if (document.getElementById("prof").value!="")srch+="PROF:"+ document.getElementById("prof").value + " && ";
    if (document.getElementById("day").value!="")srch+="DAY:"+ document.getElementById("day").value + " && ";
    if (document.getElementById("room").value!="")srch+="ROOM:"+ document.getElementById("room").value + " && ";
    srch=srch.slice(0,srch.length-4);
    document.getElementById("search").value=srch;
    if (srch=="") search();else
    generateTable(document.getElementById("sortable"), courses, srch,  document.getElementById("hideFull").checked);
}
function getCourseData(){
    courses = getServerData("https://csc205.cscprof.com/courses");
    //console.log(http.responseText);
    //Department Number Section Title Faculty Day StartTime EndTime Building Room Credits Start Date End Date Status	
    viewableRows=[2,3,4,5,6,11,12,13,15,16,17,18,19,10];
    let table = document.getElementById("sortable");// Create the table header        
    let data = Object.keys(courses[0]);
    document.getElementById("Loading").classList.add("Hide");
    generateTableHead(table, data);
    generateTable(table, courses, "*",  document.getElementById("hideFull").checked);// Fill the data rows
	document.getElementById("search").focus();
    //console.log(Object.values(courses));
}
function clickPress(event) {
    if (event.keyCode == 13) {
        search();
    }
}
function generateTableHeadArray(table, heads, sortable) {
    let thead = table.createTHead();// Create the thead part of the table
    let row = thead.insertRow();// Add a row to thead to hold the heading text
    let headIndex=0;
    //console.log(data);
    for (let R of heads) {// Add the text to the table
        //console.log(R);
        let th = document.createElement("th");
        if (sortable)th.setAttribute("onclick", "if (typeof sortBy === 'function') sortBy("+headIndex + ")");
        th.setAttribute("id", headIndex);
        if (sortable) th.classList.add("priority-" + RowPriority[headIndex]);
        let text = document.createTextNode(R);
        th.appendChild(text);
        row.appendChild(th);
        headIndex+=1;    }   
}
function generateTableHead(table, data) {
    let A=[];
    for (let R of viewableRows) {
        A.push(data[R]);
    }
    A.push("Details");
    generateTableHeadArray(table,A,true);
}
function hideSearch() {
	document.getElementById("advance").classList.toggle("Hide");
    if (document.getElementById("advnSrch").value) document.getElementById("courseCode").focus();
}
function generateTable(table, data, searchStr, hideFull) {// Generate the data
    //console.log(searchStr);
    let dat;
    if(searchStr !="*") dat= find(data, searchStr);else dat=data;
    //console.log(dat);
    let tbody = document.getElementById('tabBody');// Create the tbody as part of the table
    tbody.innerHTML='';
    if (typeof clearFormat === "function") clearFormat();
    for (let element of dat) {// Loop through the rows of data
    	if (!(hideFull && element.Status=="Full")){
        	let row = tbody.insertRow();// Create a new row in the tbody
	        let headIndex=1;
    	    for (let R of viewableRows) {// Loop through the data for the row
            	let cell = row.insertCell();// Create a cell in the row
	            //console.log(element);
    	        let text = formatText(Object.values(element)[R]);//document.createTextNode(formatText(Object.values(element)[R]));// Create a text node that has the cell content
	            cell.innerHTML=(text);// Add the text content to the cell
	            cell.classList.add("priority-" + RowPriority[headIndex-1]);
	            headIndex+=1;
	            //console.log(cell.classList);
	        }
	        let cmd = "detailsCourse('details.html?"+ Object.values(element)[0] + "')";
	        //console.log(element.Title+ element.id);
	        row.insertCell().innerHTML="<input type='submit' value='Details' class='Add' onclick=" + cmd + ">";
		}
    }
    if (document.getElementById("sortable").rows.length<2) document.getElementById("noResults").classList.remove("Hide");else document.getElementById("noResults").classList.add("Hide");
resultCount();
}
function resultCount(){
	let re=document.getElementById("sortable").rows.length-1;
	if (re==1)document.getElementById("resultCount").innerHTML= re +" Result";else document.getElementById("resultCount").innerHTML= re +" Results";
}
function formatText(txt){   //Format's time and Null
    if (txt!=null && txt.toString().includes(":") && txt.length==12){
        return txt.toString().substring(0,5);
    }else if (txt==null) return "NULL";
    return txt;
}
function addCourse(){
    let i=document.getElementById("overlay").src.split('?')[1];
    if (document.getElementById("Add").value=="Add Class") {coursesTaking.push(i); document.getElementById("Add").value="Drop Class";}else {coursesTaking.splice(coursesTaking.indexOf(i),1);document.getElementById("Add").value="Add Class";};
}
function detailsCourse(add){
    if (document.getElementById("Add")!=null){if (coursesTaking.includes(add.split('?')[1]))  document.getElementById("Add").value="Drop Class";else document.getElementById("Add").value="Add Class";}
    prepOver(add,false);
}
function prepOver(add,hideAddBtn){
    ifrm = document.createElement("iframe");
    ifrm.setAttribute("src",add);
    ifrm.setAttribute("id","overlay");
    document.getElementById("bod").appendChild(ifrm)
    invertHidden(hideAddBtn);
}
function current(){
    prepOver("current.html?"+ coursesTaking,true);
}
function invertHidden(hideAdd){
    document.getElementById("close").classList.toggle("Hide");
    document.getElementById("overlayBack").classList.toggle("Hide");
    if (document.getElementById("Add")!=null) document.getElementById("Add").classList.toggle("Hide",hideAdd);
}
function hideOverlay(el){
    invertHidden(true);
    ifrm.parentNode.removeChild(ifrm);
}
function find(data,srch){//Finds text from data and returns listing if contains srch
    let newArray=[];
    for (let element of data) {
        if (srch.includes(":") && advanceSearch(element, srch)){
			newArray.push(element);
		}
        for (key in element) {
            if (element[key]!=null && (element[key].toString().toUpperCase().includes(srch.toUpperCase()))){
                newArray.push(element);
                break;
            }
        }
    }
    return newArray;
}
function searchThruByIndex(el, srch, index){
	if (Object.values(el)[index] != null && Object.values(el)[index].toString().toUpperCase().includes(srch.toUpperCase().trim())){
		return true;
	}
	return false;
}
function advanceSearch(el, s){
    let t=0,sArray=s.split("&&");
    for(srch of sArray){
    srch=reverse(reverse(srch).trim()).trim();
    let prop=srch.substring(srch.indexOf(":")+1), r=false;
	if (srch == null || el==null) return false;
	if (srch.startsWith("PROF")){
        //console.log(prop);
		r=searchThruByIndex(el, prop, 6);
	}else if (srch.startsWith("DAY")){
		r=searchThruByIndex(el, prop, 11);
	}else if (srch.startsWith("DEPT")){
		r=searchThruByIndex(el, prop, 2);
	}else if (srch.startsWith("ROOM")){
		r=searchThruByIndex(el, prop, 16);
	}else if (srch.startsWith("CODE")){
        let props=prop.split(" ");
        if (props.length==1) r= searchThruByIndex(el, prop.substring(0,3), 2) && searchThruByIndex(el, prop.substring(3,5), 3);
        if (props.length==2) r= searchThruByIndex(el, props[0], 2) && searchThruByIndex(el, props[1], 3);		
	}else if (srch.startsWith("TIME")){
		r= searchThruByIndex(el, prop, 12) || searchThruByIndex(el, prop, 13);
	}
    if (r)t++;
}
	return (sArray.length==t);
}
//id=0, Line=1, Department=2, Number=3, Section=4, Title=5, Faculty=6, Openings=7, Capacity=8, Status=9. Day=10, StartTime=11, EndTime=12, Campus=13, Building=14, Room=15, Credits=16, Start Date=17, End Date=18, Rating=19
function loadDetails(){
    let results;
    let courseIndex=502;
    if (location.search.length>1) courseIndex=location.search.substring(1);
    results=getServerData("https://csc205.cscprof.com/courses/"+ courseIndex);
    document.getElementById("code").innerHTML=results.Department+" "+results.Number + " " + results.Section+ formatProf(results) + formatRoom(results);//Object.values(results);
    document.getElementById("Title").innerHTML=results.Title;
    document.getElementById("time").innerHTML=formatTime(results);
    if (results.Credits==1) document.getElementById("credits").innerHTML=results.Credits + " Credit"; else document.getElementById("credits").innerHTML=results.Credits + " Credits";
    document.getElementById("rate").innerHTML=""+ results.Rating+ " out of 5 Rating";
    document.getElementById("rate").style.background="linear-gradient(90deg, rgb(184,107,43) "+ ((parseInt(results.Rating)/5)*100) +"%, rgb(136,86,46) 20%)";
    if (results.Openings>0) document.getElementById("fillTXT").innerHTML=""+ results.Openings+ " out of "+ results.Capacity + " seats avalible";else document.getElementById("fillTXT").innerHTML="This course is full";
    document.getElementById("fillTXT").style.background="linear-gradient(90deg, rgb(184,107,43) " + (((parseInt(results.Openings)/parseInt(results.Capacity))*100)) +"%, rgb(136,86,46) 00%)";
    document.getElementById("startDay").innerHTML=getMonth(results["Start Date"].split('-')[1]) + " "+ getEnd(results["Start Date"].split('-')[2]) + ", " + results["Start Date"].split('-')[0];
    document.getElementById("endDay").innerHTML=getMonth(results["End Date"].split('-')[1]) + " "+ getEnd(results["End Date"].split('-')[2]) + ", " + results["End Date"].split('-')[0];
    //document.getElementById("prof2").innerHTML=Object.values(results);*/
    if (results.Day!="BY APPT"){ generateSched();fillSchedule(results);}
    document.getElementById("bod").classList.remove("Hide");
}
function getServerData(address){
    let http=new XMLHttpRequest();
    http.open("GET", address, false);
    http.send();
    return JSON.parse(http.response);
}
function formatProf(r){
    let str="", fac=r.Faculty.split(' ');
    for (let base=0; base<fac.length;base+=3){
        if ((fac.length-base)%3==0)str+=fac[base+1]+ " " + fac[base+2]+ " " + fac[base].substring(0,fac[base].length-1)+", ";else str+=fac[base+1]+ " " + fac[base].substring(0,fac[base].length-1)+", ";
        ;// +" "+ r.Faculty.split(' ')[base+2] + " "  + r.Faculty.split(',')[base+0] +", "
    }
    //console.log(str);
    //" is taught by " + results.Faculty.split(' ')[1] +" " + results.Faculty.split(',')[0]
    return " is taught by <a href='mailto:" + r.Email + "'>" + replaceLast(str.slice(0,-2),","," and") + "</a>";
}
function formatTime(r){
    if (r.Day=="BY APPT") return "This class is only avalible by appointment"
    return "Meets "+ getDays(r.Day) + " from " + formatText(r.StartTime) + " to " + formatText(r.EndTime);
}
function formatRoom(r){
    let str="";
    if (r.Room!=null)str+= " in "+ " " + r.Room
    if (r.Campus!=null)str+= " at "+ r.Campus;
    return str;
}
function getEnd(number){
    if (number.last=="1") return number + "st";
    if (number.last=="2") return number + "nd";
    if (number.last=="3") return number + "rd";
    return number + "th";
}
function getMonth(d){
    if (d=="01") return "January";
    if (d=="02") return "February";
    if (d=="03") return "March";
    if (d=="04") return "April";
    if (d=="05") return "May";
    if (d=="06") return "June";
    if (d=="07") return "July";
    if (d=="08") return "August";
    if (d=="09") return "September";
    if (d=="10") return "October";
    if (d=="11") return "November";
    if (d=="12") return "December";
}
function getDays(days){
    let str="", t ="";
    for (let d of days){
        if (d=="M") t="Monday";
        if (d=="T") t="Tuesday";
        if (d=="W") t="Wednesday";
        if (d=="H") t="Thursday";
        if (d=="F") t="Friday";
        str += t+ ", "
    }
    return replaceLast(str.slice(0,-2),","," and");
}
function reverse(str){
    return str.split("").reverse().join("");
}
function replaceLast(string, oldPhrase, newPhrase) {
    let lastIndex = string.lastIndexOf(oldPhrase);    
    if (lastIndex == -1)return string;
    return string.substring(0, lastIndex) + newPhrase + string.substring(lastIndex + oldPhrase.length);
}
function generateSched() {
    let schedtable = document.getElementById('schedTab');// Create the tbody as part of the table
    let days = ["Time","Monday","Tuesday","Wednesday","Thursday","Friday"];
    let D=["","M","T","W","H","F"]
    generateTableHeadArray(schedtable,days, false);
    for (let i = 420; i < 1320; i += 5) {// Loop through the rows of data
        let row = schedtable.insertRow();// Create a new row in the tbody
        if (i%60==0){
            let timeCell = row.insertCell();
            timeCell.rowSpan="12";
            timeCell.innerHTML=Math.floor(i/60).toString().padStart(2,"0") + ":00";
            timeCell.classList.add("oclock");
        }
        for (let j = 1 ; j < 6; j++) {// Loop through the data for the row
            let cell = row.insertCell();// Create a cell in the row
            //cell.innerHTML=days[j] + " " + Math.floor(i/60).toString().padStart(2,"0") + ":" + (i%60).toString().padEnd(2,"0");//(text);// Add the text content to the cell
            cell.id = D[j].substring(0,1) + Math.floor(i/60).toString().padStart(2,"0") + (i%60).toString().padStart(2,"0");//days[j] + i;
            //console.log(days[j] + i);
            //cell.classList.add("tooltip");
            if (i%60 ==0) cell.classList.add("oclock");
        }
    }
    }
function fillSchedule(course) {
    let col ="FFFFFF"
    while(col=="FFFFFF") col= Math.floor(course.id*16215).toString(16);
    for (let d of course.Day){
        let curHour=parseInt(course.StartTime.substring(0,2));
        let CurMin=parseInt(course.StartTime.substring(3,5));
        let ETime = course.EndTime.substring(0,2) + course.EndTime.substring(3,5);
        do{
            //console.log(d+curHour.toString().padStart(2,"0")+CurMin.toString().padStart(2,"0"));
            document.getElementById(d+curHour.toString().padStart(2,"0")+CurMin.toString().padStart(2,"0")).style.backgroundColor = "#" + col;
            document.getElementById(d+curHour.toString().padStart(2,"0")+CurMin.toString().padStart(2,"0")).classList.add("tooltip");
            document.getElementById(d+curHour.toString().padStart(2,"0")+CurMin.toString().padStart(2,"0")).innerHTML='<span class="tooltiptext">'+ course.Title + '</span>';// + course.Title+ '</span>';
            CurMin +=5;
            if (CurMin==60){
                CurMin=0;
                curHour++;
            }
            //console.log(curHour.toString().padStart(2,"0")+CurMin.toString().padStart(2,"0")+ "|" + ETime);
        }while(curHour.toString().padStart(2,"0")+CurMin.toString().padStart(2,"0")!= ETime)
         }
         return "#"+col;
}
function getCurrent() {
    generateSched();
    let c=[],tbl=document.getElementById("sortable"),colour=[],cred=0;
    if (location.search!=""){
    for (i of location.search.substring(1).split(",")){
        let r=getServerData("https://csc205.cscprof.com/courses/"+ i);
        if (r.Day!="BY APPT") colour.push(fillSchedule(r));else colour.push(null);
        c.push(r);
        cred+=r.Credits;
    }
}
    viewableRows=[2,3,4,5,6,11,12,13,15,16,17,18,19];
    if(c.length>0) generateTableHead(tbl,Object.keys(c[0]),true);else generateTableHead(tbl,Object.keys(getServerData("https://csc205.cscprof.com/courses/502")),true);
    generateTable(tbl,c,"*");
    colRows(tbl,colour);
    tbl.rows[0].style.cursor="default";
    if (cred==1)document.getElementById("resultCount").innerHTML= cred +" Credit";else document.getElementById("resultCount").innerHTML= cred +" Credits";
}
function colRows(tab,colArr){
    for(let i=0;i<colArr.length;i++){
        tab.rows[i+1].style.backgroundColor=colArr[i];
    }
}