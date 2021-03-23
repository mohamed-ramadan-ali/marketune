let allData = []; // empty array to add in it data from json file 
let sortedByDate= []; // empty array to add in it data after sorting 

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
    displayData();  // function call to display data after loop 
    
    
  }

}





// main function take all the data after sorting and bind it into html through looping insid array 
function displayData() {
  let temp = ``;  // empty var to add in it data every loop 
  let num=1;  // var to count number of documents 

  for (let i = 0; i < sortedByDate.length; i++) {

let fullDate = sortedByDate[i].createdAt;  // method to slice only date  ex:"2021-07-16T18:00:00";
let day = fullDate.slice(0, 10);    // Date is "2021-07-16"

   // html with data coming from api and display in  index.htnml
    temp +=`<div class="col-lg-3 my-2">
    <ul class="list-group">
  <li class="list-group-item list-group-item-primary"> <strong class="text-danger">Document number : </strong> ${num++}</li>
  <li class="list-group-item list-group-item-secondary"><strong class="text-danger">Points in / Posts : </strong> ${sortedByDate[i].goal.points_in}</li>
  <li class="list-group-item list-group-item-success"><strong class="text-danger">Points in / users : </strong> ${sortedByDate[i].goal.points_out}</li>
  <li class="list-group-item list-group-item-danger"><strong class="text-danger">Goal Type : </strong> ${sortedByDate[i].goal.goal_type}</li>
  <li class="list-group-item list-group-item-warning"><strong class="text-danger">user_hits/day : </strong>${day}</li>
  <li class="list-group-item list-group-item-info"><strong class="text-danger">hits type : </strong> ${sortedByDate[i].status}</li>
  <li class="list-group-item list-group-item-dark"><strong class="text-danger">user id : </strong> ${sortedByDate[i].userid}</li>
</ul>
</div>`;

      document.getElementById("rowData").innerHTML = temp;    //with every loop take the data sprite from every documents and add it to html in index.htnml
  }
}
 


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



















