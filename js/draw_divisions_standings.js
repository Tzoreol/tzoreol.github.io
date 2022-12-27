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

draw_divisions_table(afceast, "afceast");
draw_divisions_table(afcnorth, "afcnorth");
draw_divisions_table(afcsouth, "afcsouth");
draw_divisions_table(afcwest, "afcwest");
draw_divisions_table(nfceast, "nfceast");
draw_divisions_table(nfcnorth, "nfcnorth");
draw_divisions_table(nfcsouth, "nfcsouth");
draw_divisions_table(nfcwest, "nfcwest");

function draw_divisions_table(teams, div_id) {
    teams.sort(sort_teams);
    draw_table(teams, div_id);
}
