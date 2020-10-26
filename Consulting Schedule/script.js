// global variables
var currentDay = $("#currentDay");
var currentDate = moment().format("MMMM Do YYYY");
var currentHour = moment().format("H");
var tasksToDo = [];
var toDoRow = $(".row");
var taskArea = $(".container");

function beginScheduler() {
  toDoRow.each(function () {
    var hourRow = $(this);
    var hourRowHr = parseInt(hourRow.attr("data-hour"));

    var toDoObj = {
      hour: hourRowHr,
      text: "",
    };
    tasksToDo.push(toDoObj);
  });
  // adds aforementioned task to local storage
  localStorage.setItem("tasks", JSON.stringify(tasksToDo));
}

currentDay.text(currentDate);

// function simply saves the tasks object in localStorage
function saveTask() {
  var tasksToDoHour = $(this).parent().attr("data-hour");
  // loops over current set of parent/children in textarea for value
  var taskAdd = $(this).parent().children("textarea").val();
  for (var i = 0; i < tasksToDo.length; i++) {
    if (tasksToDo[i].hour == tasksToDoHour) {
      tasksToDo[i].text = taskAdd;
    }
  }
  // storing old items and the new one in the local storage here
  localStorage.setItem("tasks", JSON.stringify(tasksToDo));
  getSchedule();
}
// parses function argument plus returns an NTP/TimeColorStamp
function colorRows() {
  toDoRow.each(function () {
      
// Locally Declared Variable
    var hourRow = $(this);
    var hourRowHr = parseInt(hourRow.attr("data-hour"));
    
// Conditional Declerations
    if (hourRowHr == currentHour) {
      hourRow.addClass("present").removeClass("future past");
    }
    if (hourRowHr > currentHour) {
      hourRow.addClass("future").removeClass("present past");
    }
    if (hourRowHr < currentHour) {
      hourRow.addClass("past").removeClass("present future");
    }
  });
}

// parses the JSON string; erects the JavaScript value/object described in the below string
function getSchedule() {
  tasksToDo = localStorage.getItem("tasks");
  tasksToDo = JSON.parse(tasksToDo);
  for (var j = 0; j < tasksToDo.length; j++) {
    var toDoHour = tasksToDo[j].hour;
    var toDoText = tasksToDo[j].text;
    $("[data-hour=" + toDoHour + "]")
      .children("textarea")
      .val(toDoText);
  }
}

//jQuery Function Handler
$(document).ready(function () {
  colorRows();

  if (!localStorage.getItem("tasks")) {
    beginScheduler();
  }
  currentDay.text(currentDate);

  getSchedule();

  taskArea.on("click", "button", saveTask);
});
