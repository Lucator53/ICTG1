document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('srchbtn');
  function handleKeyPress(event) {
    if (event.keyCode === 13) {
      button.click();
    }
  }
  document.addEventListener('keypress', handleKeyPress);
});

$(document).ready(function () {
  var availableTags = [
    "LU 01", 
    "LU 02", 
    "LU 03", 
    "LU 04", 
    "LU 05", 
    "LU 06", 
    "CHS Laboratory", 
    "LU 07",
    "LU 08", 
    "SHS Faculty Room", 
    "LU 09", 
    "LU 10", 
    "Records Office",
    "LU 11", 
    "LU 12", 
    "Registrar's Office", 
    "LU 13", 
    "LU 14", 
    "LU 15", 
    "Clinic",
    "LU 16", 
    "Research Center", 
    "LU 17", 
    "HRMO", 
    "LU 18", 
    "Cashier Office", 
    "LU 19",   
    "Admin Office", 
    "LU 20", 
    "Oreta Building", 
    "Oval", 
    "Canteen", 
    "New Building",
    "Gate 1",
    "Gate 2",
    "Rizal Monument",
    "Athlete's Village", 
    "San Luis Gym", 
    "Multi-Purpose Gym", 
    "Pool Area",
    "NB",
    "MP",
    "M.E Offices",
    "Chemical Laboratory",
    "Chem Lab",
    "Bio Lab",
    "Biological Laboratory",
    "Physics Lab",
    "Physical Laboratory",
    "Automotive",
    "Machine Shop",
    "College of Engineering",
    "M.E Building",
    "Administration Building",
    "Admin Building"
  ];

  $("#output").autocomplete({
    source: availableTags,
    open: function (event, ui) {
      var autocomplete = $(".ui-autocomplete");
      autocomplete.css("max-height", $(window).height() / 3);
      autocomplete.css("overflow-y", "auto");
    }
  });
});
