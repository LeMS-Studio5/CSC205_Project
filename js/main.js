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
            let text = document.createTextNode(Object.values(element)[R]);// Create a text node that has the cell content
            cell.appendChild(text);// Add the text content to the cell
            cell.classList.add("priority-" + RowPriority[headIndex-1]);
            headIndex+=1;
            //console.log(cell.classList);
        }
        let cmd = "addCourse('" + Object.values(element)[1] + Object.values(element)[2] + Object.values(element)[3] + "')";
        row.insertCell().innerHTML="<input type='submit' value='Add' class='Add' onclick=" + cmd + ">";
    }
}
function addCourse(courseCode){//To be implemented...
    alert(courseCode);
}
function find(data,srch){//Finds text from data and returns listing if contains srch
    let newArray=[];
    for (let element of data) {
        for (key in element) {
            if (element[key].toString().includes(srch)){
                newArray.push(element);
                break;
            }
        }
    }
    return newArray;
}
window.onload = (event) => {// Pop up an alert on the page after the page and all stylesheets and images have loaded
    let table = document.getElementById("sortable")// Create the table header        
    let data = Object.keys(courses[0]);
    generateTableHead(table, data);
    generateTable(table, courses, "*");// Fill the data rows
	document.getElementById("search").focus();
    console.log('The page is loaded. We are in the console');// Log a message to the console to show that you can use this for debugging purposes
};