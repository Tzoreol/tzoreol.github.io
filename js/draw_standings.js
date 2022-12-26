let names = {
    "ARI": "Arizona Cardinals",
    "ATL": "Atlanta Falcons",
    "BAL": "Baltimore Ravens",
    "BUF": "Buffalo Bills",
    "CAR": "Carolina Panthers",
    "CHI": "Chicago Bears",
    "CIN": "Cincinnati Bengals",
    "CLE": "Cleveland Browns",
    "DAL": "Dallas Cowboys",
    "DEN": "Denver Broncos",
    "DET": "Detroit Lions",
    "GB": "Green Bay Packers",
    "HOU": "Houston Texans",
    "IND": "Indianapolis Colts",
    "JAC": "Jacksonville Jaguars",
    "KC": "Kansas City Chiefs",
    "LV": "Las Vegas Raiders",
    "LAC": "Los Angeles Chargers",
    "LAR": "Los Angeles Rams",
    "MIA": "Miami Dolphins",
    "MIN": "Minnesota Vikings",
    "NE": "New England Patriots",
    "NO": "New Orleans Saints",
    "NYG": "New York Giants",
    "NYJ": "New York Jets",
    "PHI": "Philadelphia Eagles",
    "PIT": "Pittsburgh Steelers",
    "SF": "San Francisco 49ers",
    "SEA": "Seattle Seahawks",
    "TB": "Tampa Bay Buccaneers",
    "TEN": "Tennessee Titans",
    "WAS": "Washington Commanders"
}

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

draw_table(afceast, "afceast");
draw_table(afcnorth, "afcnorth");
draw_table(afcsouth, "afcsouth");
draw_table(afcwest, "afcwest");
draw_table(nfceast, "nfceast");
draw_table(nfcnorth, "nfcnorth");
draw_table(nfcsouth, "nfcsouth");
draw_table(nfcwest, "nfcwest");

function draw_table(teams, div_id) {
    teams.sort(sort_teams);

    let tbody = document.getElementById(div_id).getElementsByTagName("tbody")[0];
    let index = 0;

    teams.forEach(team => {
        let tr = document.createElement("tr");
        tr.classList.add((index % 2) == 0 ? "even" : "odd");

        let name = document.createElement("td");
        name.classList.add("left")
        name.innerText = names[team["team"]];

        let league_w = document.createElement("td")
        league_w.innerText = team["league"]["W"];

        let league_l = document.createElement("td")
        league_l.innerText = team["league"]["L"];

        let league_t = document.createElement("td")
        league_t.innerText = team["league"]["T"];

        let league_pct = document.createElement("td")
        let computed_pct = (team["league"]["W"] + (0.5 * team["league"]["T"])) / (team["league"]["W"] + team["league"]["L"] + team["league"]["T"]);
        league_pct.innerText = formatPct(computed_pct);

        let conference_w = document.createElement("td")
        conference_w.innerText = team["conference"]["W"];

        let conference_l = document.createElement("td")
        conference_l.innerText = team["conference"]["L"];

        let conference_t = document.createElement("td")
        conference_t.innerText = team["conference"]["T"];

        let conference_pct = document.createElement("td")
        computed_pct = (team["conference"]["W"] + (0.5 * team["conference"]["T"])) / (team["conference"]["W"] + team["conference"]["L"] + team["conference"]["T"]);
        conference_pct.innerText = formatPct(computed_pct);

        let division_w = document.createElement("td")
        division_w.innerText = team["division"]["W"];

        let division_l = document.createElement("td")
        division_l.innerText = team["division"]["L"];

        let division_t = document.createElement("td")
        division_t.innerText = team["division"]["T"];

        let division_pct = document.createElement("td")
        computed_pct = (team["division"]["W"] + (0.5 * team["division"]["T"])) / (team["division"]["W"] + team["division"]["L"] + team["division"]["T"]);
        division_pct.innerText = formatPct(computed_pct);

        let sov = document.createElement("td");
        computed_pct = (team["SoV"]["W"] + (0.5 * team["SoV"]["T"])) / (team["SoV"]["W"] + team["SoV"]["L"] + team["SoV"]["T"]);
        sov.innerText = formatPct(computed_pct);

        let sos = document.createElement("td");
        computed_pct = (team["SoS"]["W"] + (0.5 * team["SoS"]["T"])) / (team["SoS"]["W"] + team["SoS"]["L"] + team["SoS"]["T"]);
        sos.innerText = formatPct(computed_pct);

        tr.appendChild(name);
        tr.appendChild(league_w);
        tr.appendChild(league_l);
        tr.appendChild(league_t);
        tr.appendChild(league_pct);
        tr.appendChild(conference_w);
        tr.appendChild(conference_l);
        tr.appendChild(conference_t);
        tr.appendChild(conference_pct);
        tr.appendChild(division_w);
        tr.appendChild(division_l);
        tr.appendChild(division_t);
        tr.appendChild(division_pct);
        tr.appendChild(sov);
        tr.appendChild(sos);
        tbody.appendChild(tr);

        index++;
    });
}

function formatPct(pct) {
    if (pct == 1) {
        return "1.000";
    }

    if(pct == 0) {
        return ".000";
    }

    let pct_float = Math.round((pct + Number.EPSILON) * 1000) / 1000;
    return String(pct_float).padEnd(5,'0').substring(1);
}
