let afceast = []
afceast.push(standings["BUF"]);
afceast.push(standings["MIA"]);
afceast.push(standings["NE"]);
afceast.push(standings["NYJ"]);

let afcnorth = []
afcnorth.push(standings["BAL"]);
afcnorth.push(standings["CIN"]);
afcnorth.push(standings["CLE"]);
afcnorth.push(standings["PIT"]);

let afcsouth = []
afcsouth.push(standings["HOU"]);
afcsouth.push(standings["IND"]);
afcsouth.push(standings["JAC"]);
afcsouth.push(standings["TEN"]);

let afcwest = []
afcwest.push(standings["DEN"]);
afcwest.push(standings["KC"]);
afcwest.push(standings["LAC"]);
afcwest.push(standings["LV"]);

draw_afc_table();

function draw_afc_table() {
    //First sort all divisions to get the division leaders
    afceast.sort(sort_teams);
    afcnorth.sort(sort_teams);
    afcsouth.sort(sort_teams);
    afcwest.sort(sort_teams);

    //Extract the division leaders and put them into AFC standings
    let division_leaders  = [];
    division_leaders.push(afceast.shift());
    division_leaders.push(afcnorth.shift());
    division_leaders.push(afcsouth.shift());
    division_leaders.push(afcwest.shift());

    //Sort among division leaders
    division_leaders.sort(sort_teams);

    //Add other teams
    let others = [];
    afceast.forEach(team => others.push(team));
    afcnorth.forEach(team => others.push(team));
    afcsouth.forEach(team => others.push(team));
    afcwest.forEach(team => others.push(team));

    //Sort others teams
    others.sort(sort_teams);

    //Add division leader then other teams to AFC table
    let afc = [];
    division_leaders.forEach(team => afc.push(team));
    others.forEach(team => afc.push(team));

    //Draw table
    draw_table(afc, "afc");
}
