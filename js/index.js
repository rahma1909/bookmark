var input1Input = document.getElementById("input1");
var input2Input = document.getElementById("input2");
var dataWrapper = document.getElementById("tbody");

var allBookMark = [];
var bookMarkToBeUpdated;
if (localStorage.getItem("allBookMarks") != null) {
  allBookMark = JSON.parse(localStorage.getItem("allBookMarks"));
  displayData(allBookMark);
}
function addBookMark() {
if( validateUrl()==true  && input1Input.value!="") {
  var newBookMark = {
    sitename: input1Input.value,
    siteurl: input2Input.value,
  };
 
  allBookMark.push(newBookMark);
  localStorage.setItem("allBookMarks", JSON.stringify(allBookMark));

  displayData(allBookMark);
  clearInputs();
}else{
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${input1Input.value==""?"please enter the site name":""} ${ validateUrl()==true?"":"please enter the correct url"}`,
    footer: '<a href="#">Why do I have this issue?</a>'
  });
}

}
function displayData(arr) {
  cartona = "";
  for (var i = 0; i < arr.length; i++) {
    cartona += ` <tr>
<td>${i + 1}</td>
<td>${arr[i].sitename}</td>
<td><a class="btn btn-primary" href="${
      arr[i].siteurl
    } " target="_blank">visit</a></td>
<td><button class="btn btn-success" onclick="preupdate(${i})">update</button></td>
<td><button  class="btn btn-primary" onclick="deleteMark(${i})">delete</button></td>

</tr> `;
  }
  dataWrapper.innerHTML = cartona;
}
function preupdate(index) {
  bookMarkToBeUpdated = index;
  input1Input.value = allBookMark[index].sitename;
  input2Input.value = allBookMark[index].siteurl;
  displayUpdate();
}
function displayUpdate() {
  document.getElementById("submitbtn").classList.add("d-none");
  document.getElementById("updatebtn").classList.remove("d-none");
}
function displaysubmit() {
  document.getElementById("submitbtn").classList.remove("d-none");
  document.getElementById("updatebtn").classList.add("d-none");
}

function finalUpdate() {
  var newBookMark = {
    sitename: input1Input.value,
    siteurl: input2Input.value,
  };
  allBookMark.splice(bookMarkToBeUpdated, 1, newBookMark);
  localStorage.setItem("allBookMarks", JSON.stringify(allBookMark));
  displayData(allBookMark);
  displaysubmit();
  clearInputs();
}
function deleteMark(index) {
  allBookMark.splice(index, 1);
  localStorage.setItem("allBookMarks", JSON.stringify(allBookMark));
  displayData(allBookMark);
}

function clearInputs() {
  input1Input.value = "";
  input2Input.value = "";
}

function validateUrl() {
  var pattern = urlRegex = /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[a-zA-Z0-9@:%._\+~#?&//=]*)?$/;
  console.log(pattern.test(input2Input.value));
  return pattern.test(input2Input.value)
}
