let teamSelect = document.getElementById("team");

teamSelect.onchange = function() {
    let predictor = new Predictor(teamSelect.value);

    let checkboxes = document.getElementById("schedule").getElementsByTagName("input");
    for(let checkbox of checkboxes) {
        checkbox.addEventListener('change', function () {
           predictor.updateStandings();
        });
    }
};
