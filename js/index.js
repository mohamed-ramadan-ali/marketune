let allData = []; // empty array to add in it data from json file 
let sortedByDate= []; // empty array to add in it data after sorting 


// ajax request start here ===>
let httpReq = new XMLHttpRequest();
httpReq.open("GET", "https://marketune-visualization-test.herokuapp.com/getData")
httpReq.send();
httpReq.onreadystatechange = function () {
  if (httpReq.readyState == 4 && httpReq.status == 200) {

    allData = JSON.parse(httpReq.response);   // all response now inside allData array so i can loop inside it 
    sortedByDate= allData.sort(function (a,z) {
      var dateA = new Date(a.createdAt), dateZ = new Date(z.createdAt)
      return dateA - dateZ
    });
    console.log(sortedByDate)
    displayData();  // function call to display data after looping
    
    
  }

}
// ajax request end here ===>




// main function take all the data after sorting and bind it into html through looping insid array 
function displayData() {
  let temp = ``;  // empty var to add in it data after looping 
  let num=0;  // var to count number of documents 

  for (let i = 0; i < sortedByDate.length; i++) {

let fullDate = sortedByDate[i].createdAt;  // method to slice only date  ex:"2021-07-16T18:00:00";
let day = fullDate.slice(0, 10);    // Date is "2021-07-16"

let pointsIn="";  // empty var to add value of point_in  


 // if condition to check where point_is prporty and if it's exist or no in every object  
  if ('points_in' in sortedByDate[i] == true){ 
    pointsIn=sortedByDate[i].points_in
  }

  else if ('goal' in sortedByDate[i] == true){
    pointsIn=sortedByDate[i].goal.points_in
  }

   else if ('goal' in sortedByDate[i] == false && 'points_in' in sortedByDate[i] ==false ){
    pointsIn="no data"
  }
 

  let goalType="";  // empty var to add value of goal_type 
// if condition to check where goal_type prporty and if it's exist or no in every object
  if ('goal_type' in sortedByDate[i] == true){ 
    goalType=sortedByDate[i].goal_type
  }

  else if ('goal' in sortedByDate[i] == true){
    goalType=sortedByDate[i].goal.goal_type
  }

   else if ('goal' in sortedByDate[i] == false && 'goal_type' in sortedByDate[i] ==false ){
    goalType="no data"
  }





   // html with data coming from api and display in  index.htnml
    temp +=`<div class="col-lg-3 my-2">
    <ul class="list-group">
  <li class="list-group-item list-group-item-primary"> <strong class="text-danger">Document number : </strong> ${num++}</li>
  <li class="list-group-item list-group-item-secondary"><strong class="text-danger">Points in : </strong> ${pointsIn}</li>
  <li class="list-group-item list-group-item-danger"><strong class="text-danger">Goal Type : </strong> ${goalType}</li>
  <li class="list-group-item list-group-item-warning"><strong class="text-danger">user_hits/day : </strong>${day}</li>

</ul>
</div>`;


  }
  document.getElementById("rowData").innerHTML = temp;          //take the data sprite from every documents and add it to html in index.htnml
}
 
// main function end




 // function work on change depending on select value to sort the data by date 
function sortingDataByDate() {
  var sortSelectValue = document.getElementById("sortSelect").value;
  if (sortSelectValue =="newestDate"){
    sortedByDate= allData.sort(function (a,z) { // function sort the data by date from newest to oldest 
      var dateA = new Date(a.createdAt), dateZ = new Date(z.createdAt)
      return dateZ - dateA
    });
    console.log(sortedByDate)
    displayData();
  }
  else{
    sortedByDate= allData.sort(function (a,z) { // function sort the data by date from oldest to newest
      var dateA = new Date(a.createdAt), dateZ = new Date(z.createdAt)
      return dateA - dateZ
    });
    console.log(sortedByDate)
    displayData();
  }
 
}


// sort function end






// 1-function for searching inside all data array by date 
// 2-function for validation of search input
function searchAndValid(term) {


  var userNameRegex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;  // rgex for validation of search input by this format yyyy-mm-dd 
  if (userNameRegex.test(term) == true) {
    var element = document.getElementById("searchInp");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
      
  }
  else{
    var element = document.getElementById("searchInp");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
//  validation-end



// search function start ===>
  var temp = '';
  let num=0;  // var to count number of documents
  for (i = 0; i < sortedByDate.length; i++) {

      if (sortedByDate[i].createdAt.includes(term) == true) {

        let fullDate = sortedByDate[i].createdAt;  // method to slice only date  ex:"2021-07-16T18:00:00";
let day = fullDate.slice(0, 10);    // Date is "2021-07-16"

let pointsIn="";  // empty var to add value of point_in   


 // if condition to check where point_is prporty and if it's exist or no in every object  
  if ('points_in' in sortedByDate[i] == true){ 
    pointsIn=sortedByDate[i].points_in
  }

  else if ('goal' in sortedByDate[i] == true){
    pointsIn=sortedByDate[i].goal.points_in
  }

   else if ('goal' in sortedByDate[i] == false && 'points_in' in sortedByDate[i] ==false ){
    pointsIn="no data"
  }
 

  let goalType="";  // empty var to add value of goal_type 
// if condition to check where goal_type prporty and if it's exist or no in every object
  if ('goal_type' in sortedByDate[i] == true){ 
    goalType=sortedByDate[i].goal_type
  }

  else if ('goal' in sortedByDate[i] == true){
    goalType=sortedByDate[i].goal.goal_type
  }

   else if ('goal' in sortedByDate[i] == false && 'goal_type' in sortedByDate[i] ==false ){
    goalType="no data"
  }
          temp +=
              `<div class="col-lg-3 my-2">
    <ul class="list-group">
  <li class="list-group-item list-group-item-primary"> <strong class="text-danger">Document number : </strong> ${num++}</li>
  <li class="list-group-item list-group-item-secondary"><strong class="text-danger">Points in : </strong> ${pointsIn}</li>
  <li class="list-group-item list-group-item-danger"><strong class="text-danger">Goal Type : </strong> ${goalType}</li>
  <li class="list-group-item list-group-item-warning"><strong class="text-danger">user_hits/day : </strong>${day}</li>

</ul>
</div>`

      };
  };
  document.getElementById("rowData").innerHTML = temp;  
 

};


















