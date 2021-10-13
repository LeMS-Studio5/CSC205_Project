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
        generateTable(document.getElementById("sortable"), courses, document.getElementById("search").value);
    }else{
        generateTable(document.getElementById("sortable"), courses, "*");
    }
}
function getCourseData(){
    http=new XMLHttpRequest();
    http.open("GET", "https://csc205.cscprof.com/courses", true);
    http.send();
    http.onload = function() {
        if (http.status >= 200 && http.status < 300) {
         courses = JSON.parse(http.responseText);
         //console.log(http.responseText);
         //Department Number Section Title Faculty Day StartTime EndTime Building Room Credits Start Date End Date Status	
         viewableRows=[2,3,4,5,6,10,11,12,14,15,16,17,18,9];
        }
        let table = document.getElementById("sortable");// Create the table header        
        let data = Object.keys(courses[0]);
        document.getElementById("Loading").classList.add("Hide");
        generateTableHead(table, data);
        generateTable(table, courses, "*");// Fill the data rows
	    document.getElementById("search").focus();
        console.log('The page is loaded. We are in the console');// Log a message to the console to show that you can use this for debugging purposes
		//console.log(Object.values(courses));
    };
}
function clickPress(event) {
    if (event.keyCode == 13) {
        search();
    }
}
function generateTableHead(table, data) {
    let thead = table.createTHead();// Create the thead part of the table
    let row = thead.insertRow();// Add a row to thead to hold the heading text
    let headIndex=0;
    //console.log(data);
    for (let R of viewableRows) {// Add the text to the table
        let th = document.createElement("th");
        th.setAttribute("onclick", "sortBy("+headIndex + ")");
        th.setAttribute("id", headIndex);
        th.classList.add("priority-" + RowPriority[headIndex]);
        let text = document.createTextNode(data[R]);
        th.appendChild(text);
        row.appendChild(th);
        headIndex+=1;    }
    let th = document.createElement("th");
    th.appendChild(document.createTextNode("Add"));
    row.appendChild(th);       
}
function generateTable(table, data, searchStr) {// Generate the data
    //console.log(searchStr);
    let dat;
    if(searchStr !="*") dat= find(data, searchStr);else dat=data;
    //console.log(dat);
    let tbody = document.getElementById('tabBody');// Create the tbody as part of the table
    tbody.innerHTML='';
    clearFormat();
    for (let element of dat) {// Loop through the rows of data
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
        let cmd = "addCourse('" + Object.values(element)[0] + "')";
        row.insertCell().innerHTML="<input type='submit' value='Add' class='Add' onclick=" + cmd + ">";
    }
    if (document.getElementById("sortable").rows.length<2) document.getElementById("noResults").classList.remove("Hide");else document.getElementById("noResults").classList.add("Hide");
}
function formatText(txt){   //Format's time and Null
    if (txt!=null && txt.toString().includes(":") && txt.length==12){
        return txt.toString().substring(0,5);
    }else if (txt==null) return "NULL";
    return txt;
}
function addCourse(courseCode){//To be implemented...
    ifrm = document.createElement("iframe");
    ifrm.setAttribute("src","details.html?"+courseCode);
    ifrm.setAttribute("id","overlay");
    document.getElementById("bod").appendChild(ifrm)
    document.getElementById("overlayBack").style.display = "block";
}
function hideOverlay(el){
    document.getElementById("overlayBack").style.display = "none";
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
function advanceSearch(el, srch){
    //console.log(srch);
    let prop=srch.substring(srch.indexOf(":")+1);
	//console.log(el);
	if (srch == null || el==null) return false;
	if (srch.startsWith("PROF")){
		return searchThruByIndex(el, prop, 6);
	}else if (srch.startsWith("DAY")){
		return searchThruByIndex(el, prop, 10);
	}else if (srch.startsWith("DEPT")){
		return searchThruByIndex(el, prop, 2);
	}else if (srch.startsWith("ROOM")){
		return searchThruByIndex(el, prop, 15);
	}else if (srch.startsWith("TIME")){
		return searchThruByIndex(el, prop, 11) || searchThruByIndex(el, prop, 12);
	}
	return false;
}
//id=0, Line=1, Department=2, Number=3, Section=4, Title=5, Faculty=6, Openings=7, Capacity=8, Status=9. Day=10, StartTime=11, EndTime=12, Campus=13, Building=14, Room=15, Credits=16, Start Date=17, End Date=18, Rating=19
function loadDetails(){
    let http=new XMLHttpRequest();
    let results;
    let courseIndex=502;
    if (location.search.length>1) courseIndex=location.search.substring(1);
    http.open("GET", "https://csc205.cscprof.com/courses/"+ courseIndex, true);
    http.send();
    http.onload = function() {
        if (http.status >= 200 && http.status < 300) {
            //document.getElementById("info").innerHTML=(http.responseText);
            results=JSON.parse(http.response);
    document.getElementById("code").innerHTML=results.Department+" "+results.Number + " " + results.Section+ " is taught by " + results.Faculty.split(' ')[1] +" " + results.Faculty.split(',')[0] + " in "+  results.Building + " "+ results.Room.split(' ')[2]+".";//Object.values(results);
    /*document.getElementById("section").innerHTML=results.Section;
    document.getElementById("room").innerHTML=results.Room;
    document.getElementById("prof").innerHTML=results.Faculty;
    //document.getElementById("prof2").innerHTML=Object.values(results);
    //document.getElementById("prof2").innerHTML=Object.values(results);*/
        }
    };
}
