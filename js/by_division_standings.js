let standings = new Standings(true);

let afceast = []
afceast.push(standings.getTable()["BUF"]);
afceast.push(standings.getTable()["MIA"]);
afceast.push(standings.getTable()["NE"]);
afceast.push(standings.getTable()["NYJ"]);

let afcnorth = []
afcnorth.push(standings.getTable()["BAL"]);
afcnorth.push(standings.getTable()["CIN"]);
afcnorth.push(standings.getTable()["CLE"]);
afcnorth.push(standings.getTable()["PIT"]);

let afcsouth = []
afcsouth.push(standings.getTable()["HOU"]);
afcsouth.push(standings.getTable()["IND"]);
afcsouth.push(standings.getTable()["JAC"]);
afcsouth.push(standings.getTable()["TEN"]);

let afcwest = []
afcwest.push(standings.getTable()["DEN"]);
afcwest.push(standings.getTable()["KC"]);
afcwest.push(standings.getTable()["LAC"]);
afcwest.push(standings.getTable()["LV"]);

let nfceast = []
nfceast.push(standings.getTable()["DAL"]);
nfceast.push(standings.getTable()["NYG"]);
nfceast.push(standings.getTable()["PHI"]);
nfceast.push(standings.getTable()["WAS"]);

let nfcnorth = []
nfcnorth.push(standings.getTable()["CHI"]);
nfcnorth.push(standings.getTable()["DET"]);
nfcnorth.push(standings.getTable()["GB"]);
nfcnorth.push(standings.getTable()["MIN"]);

let nfcsouth = []
nfcsouth.push(standings.getTable()["ATL"]);
nfcsouth.push(standings.getTable()["CAR"]);
nfcsouth.push(standings.getTable()["NO"]);
nfcsouth.push(standings.getTable()["TB"]);

let nfcwest = []
nfcwest.push(standings.getTable()["ARI"]);
nfcwest.push(standings.getTable()["LAR"]);
nfcwest.push(standings.getTable()["SEA"]);
nfcwest.push(standings.getTable()["SF"]);

Draw.drawTable(afceast, "afceast");
Draw.drawTable(afcnorth, "afcnorth");
Draw.drawTable(afcsouth, "afcsouth");
Draw.drawTable(afcwest, "afcwest");
Draw.drawTable(nfceast, "nfceast");
Draw.drawTable(nfcnorth, "nfcnorth");
Draw.drawTable(nfcsouth, "nfcsouth");
Draw.drawTable(nfcwest, "nfcwest");
