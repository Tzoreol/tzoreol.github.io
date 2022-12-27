let nfceast = []
nfceast.push(standings["DAL"]);
nfceast.push(standings["NYG"]);
nfceast.push(standings["PHI"]);
nfceast.push(standings["WAS"]);

let nfcnorth = []
nfcnorth.push(standings["CHI"]);
nfcnorth.push(standings["DET"]);
nfcnorth.push(standings["GB"]);
nfcnorth.push(standings["MIN"]);

let nfcsouth = []
nfcsouth.push(standings["ATL"]);
nfcsouth.push(standings["CAR"]);
nfcsouth.push(standings["NO"]);
nfcsouth.push(standings["TB"]);

let nfcwest = []
nfcwest.push(standings["ARI"]);
nfcwest.push(standings["LAR"]);
nfcwest.push(standings["SEA"]);
nfcwest.push(standings["SF"]);


draw_nfc_table();

function draw_nfc_table() {
    //First sort all divisions to get the division leaders
    nfceast.sort(sort_teams);
    nfcnorth.sort(sort_teams);
    nfcsouth.sort(sort_teams);
    nfcwest.sort(sort_teams);

    //Extract the division leaders and put them into nfc standings
    let division_leaders  = [];
    division_leaders.push(nfceast.shift());
    division_leaders.push(nfcnorth.shift());
    division_leaders.push(nfcsouth.shift());
    division_leaders.push(nfcwest.shift());

    //Sort among division leaders
    division_leaders.sort(sort_teams);

    //Add other teams
    let others = [];
    nfceast.forEach(team => others.push(team));
    nfcnorth.forEach(team => others.push(team));
    nfcsouth.forEach(team => others.push(team));
    nfcwest.forEach(team => others.push(team));

    //Sort others teams
    others.sort(sort_teams);

    //Add division leader then other teams to nfc table
    let nfc = [];
    division_leaders.forEach(team => nfc.push(team));
    others.forEach(team => nfc.push(team));

    //Draw table
    draw_table(nfc, "nfc");
}
