"use strict";

var movieData = [];

// Add Movie
$("#addMovie").click(function() {
  displayForm();
});

// Cancel Form
$("#cancelForm").click(function() {
  displayTable();
});

// Submit Form
$("#movie-form").submit(function() {
  event.preventDefault();
  movieData.push({
    title: $("#movieTitle").val(),
    director: $("#movieDirector").val(),
    genre: $("#movieGenre").val(),
    country: $("#movieCountry").val(),
    year: $("#movieYear").val(),
    runtime: $("#movieRuntime").val()
  });
  displayTable();
  displayMovieData();
  saveMovieData();
  $("input, select").val("");
});

function displayMovieData() {
  $("#movie-table-tbody").empty();
  var tr, td, button;
  for (var i = 0; i < movieData.length; i++) {
    tr = $("<tr>");
    
    td = $("<td>");
    td.text(movieData[i].title);
    tr.append(td);

    td = $("<td>");
    td.text(movieData[i].director);
    tr.append(td);
    
    td = $("<td>");
    td.text(movieData[i].genre);
    tr.append(td);
    
    td = $("<td>");
    td.text(movieData[i].country);
    tr.append(td);
    
    td = $("<td>");
    td.text(movieData[i].year);
    tr.append(td);
    
    td = $("<td>");
    td.text(movieData[i].runtime);
    tr.append(td);
    
    td = $("<td>");
    button = $("<button type='button' class='editBtn'>");
    button.text("Edit");
    td.append(button);
    button = $("<button type='button' class='deleteBtn'>");
    button.text("Delete");
    td.append(button);
    tr.append(td);
    
    $("#movie-table-tbody").append(tr);
    
  }
  
  // Delete Movie
  $(".deleteBtn").click(function() {
    $(this).parents("tr").remove();
    var deleteId = $(this).parents().siblings(":first").text();
    movieData = movieData.filter(function(el) {
      return el.title !== deleteId;
    });
    saveMovieData();
  });
  // Edit Movie
  $(".editBtn").click(function() {
    var editId = $(this).parents().siblings(":first").text();
    var movieToEdit = $.grep(movieData, function(el) {
      return el.title === editId;
    })[0];
    displayForm();
    $("#movieTitle").val(movieToEdit.title);
    $("#movieDirector").val(movieToEdit.director);
    $("#movieGenre").val(movieToEdit.genre);
    $("#movieCountry").val(movieToEdit.country);
    $("#movieYear").val(movieToEdit.year);
    $("#movieRuntime").val(movieToEdit.runtime);
    movieData = movieData.filter(function(el) {
      return el.title !== editId;
    });
  });
  
}

// Display Table
function displayTable() {
  $("#movie-form").hide();
  $("#movie-table").show();
}
// Display Form
function displayForm() {
  $("#movie-table").hide();
  $("#movie-form").show();
}

// Use localStorage to store the data
displayLocalStorage();

function displayLocalStorage() {
  var movieDataLocalStorage = localStorage["movieData"];
  if (movieDataLocalStorage) {
    movieData = JSON.parse(movieDataLocalStorage);
  } else {
    movieData = [];
  }  
  displayMovieData();
}

function saveMovieData() {
  localStorage["movieData"] = JSON.stringify(movieData);
}


