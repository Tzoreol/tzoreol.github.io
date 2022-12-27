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

let games = [
    //Week 1
    ["LAR","BUF",10,31],
    ["ATL","NO",26,27],
    ["CAR","CLE",24,26],
    ["CHI","SF",19,10],
    ["CIN","PIT",20,23],
    ["DET","PHI",35,38],
    ["HOU","IND",20,20],
    ["MIA","NE",20,7],
    ["NYJ","BAL",9,24],
    ["WAS","JAC",28,22],
    ["TEN","NYG",20,21],
    ["ARI","KC",21,44],
    ["LAC","LV",24,19],
    ["MIN","GB",23,7],
    ["DAL","TB",3,19],
    ["SEA","DEN",17,16],

    //Week 2
    ["KC","LAC",27,24],
    ["BAL","MIA",38,42],
    ["CLE","NYJ",30,31],
    ["DET","WAS",36,27],
    ["JAC","IND",24,0],
    ["NO","TB",10,20],
    ["NYG","CAR",19,16],
    ["PIT","NE",14,17],
    ["LAR","ATL",31,27],
    ["SF","SEA",27,7],
    ["DAL","CIN",20,17],
    ["DEN","HOU",16,9],
    ["LV","ARI",23,29],
    ["GB","CHI",27,10],
    ["BUF","TEN",41,7],
    ["PHI","MIN",24,7],

    //Week 3
    ["CLE","PIT",29,17],
    ["CAR","NO",22,14],
    ["CHI","HOU",23,20],
    ["IND","KC",20,17],
    ["MIA","BUF",21,19],
    ["MIN","DET",28,24],
    ["NE","BAL",26,37],
    ["NYJ","CIN",12,27],
    ["TEN","LV",24,22],
    ["WAS","PHI",8,24],
    ["LAC","JAC",10,38],
    ["ARI","LAR",12,20],
    ["SEA","ATL",23,27],
    ["TB","GB",12,14],
    ["DEN","SF",11,10],
    ["NYG","DAL",16,23],

    //Week 4
    ["CIN","MIA",27,15],
    ["NO","MIN",25,28],
    ["ATL","CLE",23,20],
    ["BAL","BUF",20,23],
    ["DAL","WAS",25,10],
    ["DET","SEA",45,48],
    ["HOU","LAC",24,34],
    ["IND","TEN",17,24],
    ["NYG","CHI",20,12],
    ["PHI","JAC",29,21],
    ["PIT","NYJ",20,24],
    ["CAR","ARI",16,26],
    ["GB","NE",27,24],
    ["LV","DEN",32,23],
    ["TB","KC",31,41],
    ["SF","LAR",24,9],

    //Week 5
    ["DEN","IND",9,12],
    ["GB","NYG",22,27],
    ["BUF","PIT",38,3],
    ["CLE","LAC",28,30],
    ["JAC","HOU",6,13],
    ["MIN","CHI",29,22],
    ["NE","DET",29,0],
    ["NO","SEA",39,32],
    ["NYJ","MIA",40,17],
    ["TB","ATL",21,15],
    ["WAS","TEN",17,21],
    ["CAR","SF",15,37],
    ["ARI","PHI",17,20],
    ["LAR","DAL",10,22],
    ["BAL","CIN",19,17],
    ["KC","LV",30,29],

    //Week 6
    ["CHI","WAS",7,12],
    ["ATL","SF",28,14],
    ["CLE","NE",15,38],
    ["GB","NYJ",10,27],
    ["IND","JAC",34,27],
    ["MIA","MIN",16,24],
    ["NO","CIN",26,30],
    ["NYG","BAL",24,20],
    ["PIT","TB",20,18],
    ["LAR","CAR",24,10],
    ["SEA","ARI",19,9],
    ["KC","BUF",20,24],
    ["PHI","DAL",26,17],
    ["LAC","DEN",19,16],

    //Week 7
    ["ARI","NO",42,34],
    ["BAL","CLE",23,20],
    ["CAR","TB",21,3],
    ["CIN","ATL",35,17],
    ["DAL","DET",24,6],
    ["JAC","NYG",17,23],
    ["TEN","IND",19,10],
    ["WAS","GB",23,21],
    ["DEN","NYJ",9,16],
    ["LV","HOU",38,20],
    ["LAC","SEA",23,37],
    ["SF","KC",23,44],
    ["MIA","PIT",16,10],
    ["NE","CHI",14,33],

    //Week 8
    ["TB","BAL",22,27],
    ["JAC","DEN",17,21],
    ["ATL","CAR",37,34],
    ["DAL","CHI",49,29],
    ["DET","MIA",27,31],
    ["MIN","ARI",34,26],
    ["NO","LV",24,0],
    ["NYJ","NE",17,22],
    ["PHI","PIT",35,13],
    ["HOU","TEN",10,17],
    ["IND","WAS",16,17],
    ["LAR","SF",14,31],
    ["SEA","NYG",27,13],
    ["BUF","GB",27,17],
    ["CLE","CIN",32,12],

    //Week 9
    ["HOU","PHI",17,29],
    ["ATL","LAC",17,20],
    ["CHI","MIA",32,35],
    ["CIN","CAR",42,21],
    ["DET","GB",15,9],
    ["JAC","LV",27,20],
    ["NE","IND",26,3],
    ["NYJ","BUF",20,17],
    ["WAS","MIN",17,20],
    ["ARI","SEA",21,31],
    ["TB","LAR",16,13],
    ["KC","TEN",20,17],
    ["NO","BAL",13,27],

    //Week 10
    ["CAR","ATL",25,15],
    ["TB","SEA",21,16],
    ["BUF","MIN",30,33],
    ["CHI","DET",30,31],
    ["KC","JAC",27,17],
    ["MIA","CLE",39,17],
    ["NYG","HOU",24,16],
    ["PIT","NO",20,10],
    ["TEN","DEN",17,10],
    ["LV","IND",20,25],
    ["GB","DAL",31,28],
    ["LAR","ARI",17,27],
    ["SF","LAC",22,16],
    ["PHI","WAS",21,32],

    //Week 11
    ["GB","TEN",17,27],
    ["ATL","CHI",27,24],
    ["BAL","CAR",13,3],
    ["BUF","CLE",31,23],
    ["HOU","WAS",10,23],
    ["IND","PHI",16,17],
    ["NE","NYJ",10,3],
    ["NO","LAR",27,20],
    ["NYG","DET",18,31],
    ["DEN","LV",16,22],
    ["MIN","DAL",3,40],
    ["PIT","CIN",30,37],
    ["LAC","KC",27,30],
    ["ARI","SF",10,38],

    //Week 12
    ["DET","BUF",25,28],
    ["DAL","NYG",28,20],
    ["MIN","NE",33,26],
    ["CAR","DEN",23,10],
    ["CLE","TB",23,17],
    ["JAC","BAL",28,27],
    ["MIA","HOU",30,15],
    ["NYJ","CHI",31,10],
    ["TEN","CIN",16,20],
    ["WAS","ATL",19,13],
    ["ARI","LAC",24,25],
    ["SEA","LV",34,40],
    ["KC","LAR",26,10],
    ["SF","NO",13,0],
    ["PHI","GB",40,33],
    ["IND","PIT",17,24],

    //Week 13
    ["NE","BUF",10,24],
    ["ATL","PIT",16,19],
    ["BAL","DEN",10,9],
    ["CHI","GB",19,28],
    ["DET","JAC",40,14],
    ["HOU","CLE",14,27],
    ["MIN","NYJ",27,22],
    ["NYG","WAS",20,20],
    ["PHI","TEN",35,10],
    ["LAR","SEA",23,27],
    ["SF","MIA",33,17],
    ["CIN","KC",27,24],
    ["LV","LAC",27,20],
    ["DAL","IND",54,19],
    ["TB","NO",17,16],

    //Week 14
    ["LAR","LV",17,16],
    ["BUF","NYJ",20,12],
    ["CIN","CLE",23,10],
    ["DAL","HOU",27,23],
    ["DET","MIN",34,23],
    ["NYG","PHI",22,48],
    ["PIT","BAL",14,16],
    ["TEN","JAC",22,36],
    ["DEN","KC",28,34],
    ["SEA","CAR",24,30],
    ["SF","TB",35,7],
    ["LAC","MIA",23,17],
    ["ARI","NE",13,27],

    //Week 15
    ["SEA","SF",13,21],
    ["MIN","IND",39,36],
    ["CLE","BAL",13,3],
    ["BUF","MIA",32,29],
    ["NO","ATL",21,18],
    ["CAR","PIT",16,24],
    ["CHI","PHI",20,25],
    ["HOU","KC",24,30],
    ["JAC","DAL",40,34],
    ["NYJ","DET",17,20],
    ["DEN","ARI",24,1],
    ["LV","NE",30,24],
    ["LAC","TEN",17,14],
    ["TB","CIN",23,34],
    ["WAS","NYG",12,20],
    ["GB","LAR",24,12],

    //Week 16
    ["NYJ","JAC",3,19],
    ["BAL","ATL",17,9],
    ["CAR","DET",37,23],
    ["CHI","BUF",13,35],
    ["CLE","NO",10,17],
    ["KC","SEA",24,10],
    ["MIN","NYG",27,24],
    ["NE","CIN",18,22],
    ["TEN","HOU",14,19],
    ["SF","WAS",37,20],
    ["DAL","PHI",40,34],
    ["PIT","LV",13,10],
    ["MIA","GB",20,26],
    ["LAR","DEN",51,14],
    ["ARI","TB",16,19],
    ["IND","LAC",3,20],
];

let remaining_games = [
    //Week 17
    ["TEN", "DAL"],
    ["ATL", "ARI"],
    ["DET", "CHI"],
    ["HOU", "JAC"],
    ["KC", "DEN"],
    ["NE", "MIA"],
    ["NYG", "IND"],
    ["PHI", "NO"],
    ["TB", "CAR"],
    ["WAS", "CLE"],
    ["LV", "SF"],
    ["SEA", "NYJ"],
    ["GB", "MIN"],
    ["LAC", "LAR"],
    ["BAL", "PIT"],
    ["CIN", "BUF"],

    //Week 18
    ["ATL", "TB"],
    ["BUF", "NE"],
    ["CHI", "MIN"],
    ["CIN", "BAL"],
    ["GB", "DET"],
    ["IND", "HOU"],
    ["JAC", "TEN"],
    ["MIA", "NYJ"],
    ["NO", "CAR"],
    ["PHI", "NYG"],
    ["PIT", "CLE"],
    ["WAS", "DAL"],
    ["DEN", "LAC"],
    ["LV", "KC"],
    ["SEA", "LAR"],
    ["SF", "ARI"],
];

let victories = {
    "ARI": [],
    "ATL": [],
    "BAL": [],
    "BUF": [],
    "CAR": [],
    "CHI": [],
    "CIN": [],
    "CLE": [],
    "DAL": [],
    "DEN": [],
    "DET": [],
    "GB": [],
    "HOU": [],
    "IND": [],
    "JAC": [],
    "KC": [],
    "LV": [],
    "LAC": [],
    "LAR": [],
    "MIA": [],
    "MIN": [],
    "NE": [],
    "NO": [],
    "NYG": [],
    "NYJ": [],
    "PHI": [],
    "PIT": [],
    "SF": [],
    "SEA": [],
    "TB": [],
    "TEN": [],
    "WAS": [],
};

let schedule = {
    "ARI": [],
    "ATL": [],
    "BAL": [],
    "BUF": [],
    "CAR": [],
    "CHI": [],
    "CIN": [],
    "CLE": [],
    "DAL": [],
    "DEN": [],
    "DET": [],
    "GB": [],
    "HOU": [],
    "IND": [],
    "JAC": [],
    "KC": [],
    "LV": [],
    "LAC": [],
    "LAR": [],
    "MIA": [],
    "MIN": [],
    "NE": [],
    "NO": [],
    "NYG": [],
    "NYJ": [],
    "PHI": [],
    "PIT": [],
    "SF": [],
    "SEA": [],
    "TB": [],
    "TEN": [],
    "WAS": [],
};

let divisions = [];
divisions["ARI"] = ["NFC", "WEST"];
divisions["ATL"] = ["NFC", "SOUTH"];
divisions["BAL"] = ["AFC", "NORTH"];
divisions["BUF"] = ["AFC", "EAST"];
divisions["CAR"] = ["NFC", "SOUTH"];
divisions["CHI"] = ["NFC", "NORTH"];
divisions["CIN"] = ["AFC", "NORTH"];
divisions["CLE"] = ["AFC", "NORTH"];
divisions["DAL"] = ["NFC", "EAST"];
divisions["DEN"] = ["AFC", "WEST"];
divisions["DET"] = ["NFC", "NORTH"];
divisions["GB"] = ["NFC", "NORTH"];
divisions["HOU"] = ["AFC", "SOUTH"];
divisions["IND"] = ["AFC", "SOUTH"];
divisions["JAC"] = ["AFC", "SOUTH"];
divisions["KC"] = ["AFC", "WEST"];
divisions["LV"] = ["AFC", "WEST"];
divisions["LAC"] = ["AFC", "WEST"];
divisions["LAR"] = ["NFC", "WEST"];
divisions["MIA"] = ["AFC", "EAST"];
divisions["MIN"] = ["NFC", "NORTH"];
divisions["NE"] = ["AFC", "EAST"];
divisions["NO"] = ["NFC", "SOUTH"];
divisions["NYG"] = ["NFC", "EAST"];
divisions["NYJ"] = ["AFC", "EAST"];
divisions["PHI"] = ["NFC", "EAST"];
divisions["PIT"] = ["AFC", "NORTH"];
divisions["SF"] = ["NFC", "WEST"];
divisions["SEA"] = ["NFC", "WEST"];
divisions["TB"] = ["NFC", "SOUTH"];
divisions["TEN"] = ["AFC", "SOUTH"];
divisions["WAS"] = ["NFC", "EAST"];

standings = [];
games.forEach(game => {
    //Compute standing for both home and away teams
    compute_standing_by_game(game[0], game);
    compute_standing_by_game(game[1], game);
});

Object.keys(victories).forEach(team => computeSoV(team));
Object.keys(schedule).forEach(team => computeSoS(team));

function compute_standing_by_game(team, game) {

    //Fill team schedule for strength of schedule
    schedule[team].push(get_opponent(team, game));

    //if team not in standings, create one with 0 everywhere
    if(!(team in standings)) {
        standings[team] = {
            "league": {
                "W": 0,
                "L": 0,
                "T": 0
            },
            "conference": {
                "W": 0,
                "L": 0,
                "T": 0
            },
            "division": {
                "W": 0,
                "L": 0,
                "T": 0
            },
            "SoV": {
                "W": 0,
                "L": 0,
                "T": 0
            },
            "SoS": {
                "W": 0,
                "L": 0,
                "T": 0
            },
        };

        standings[team]["conf"] = divisions[team][0];
        standings[team]["div"] = divisions[team][0] + " " + divisions[team][1];
        standings[team]["team"] = team;
    }

    let result = game_result_for_team(team, game);
    let conference = is_conference(team, game);
    let division = conference && is_division(team, game);

    switch (result) {
        case -1:
            //Add loss
            standings[team]["league"]["L"] = standings[team]["league"]["L"] + 1;

            if(conference) {
                standings[team]["conference"]["L"] = standings[team]["conference"]["L"] + 1;
            }

            if(division) {
                standings[team]["division"]["L"] = standings[team]["division"]["L"] + 1;
            }
            break;
        case 0:
            //Add tie
            standings[team]["league"]["T"] = standings[team]["league"]["T"] + 1;

            if(conference) {
                standings[team]["conference"]["T"] = standings[team]["conference"]["T"] + 1;
            }

            if(division) {
                standings[team]["division"]["T"] = standings[team]["division"]["T"] + 1;
            }
            break;
        case 1:
            //Fill victory for strength of victory
            victories[team].push(get_opponent(team, game));

            //Add win
            standings[team]["league"]["W"] = standings[team]["league"]["W"] + 1;

            if(conference) {
                standings[team]["conference"]["W"] = standings[team]["conference"]["W"] + 1;
            }

            if(division) {
                standings[team]["division"]["W"] = standings[team]["division"]["W"] + 1;
            }
            break;
    }
}

function game_result_for_team(team, game) {
    if(game[0] == team) {
        if(game[2] > [game[3]]) {
            return 1;
        } else if(game[2] < game[3]) {
            return -1;
        }
    } else {
        if(game[2] > [game[3]]) {
            return -1;
        } else if(game[2] < game[3]) {
            return 1;
        }
    }

    //No winner, return 0
    return 0;
}

function is_conference(team, game) {
    //Get division line for both team and opponent
    let team_conference = divisions[team][0];
    let opponent_conference  = game[0] == team ? divisions[game[1]][0] : divisions[game[0]][0];

    return team_conference == opponent_conference;
}

function is_division(team, game) {
    //Get division line for both team and opponent
    let team_division = divisions[team][1];
    let opponent_division  = game[0] == team ? divisions[game[1]][1] : divisions[game[0]][1];

    return team_division == opponent_division;
}

function sort_teams(a,b) {
    let league_pct_a = (a["league"]["W"] + (0.5 * a["league"]["T"])) / (a["league"]["W"] + a["league"]["L"] + a["league"]["T"]);
    let league_pct_b = (b["league"]["W"] + (0.5 * b["league"]["T"])) / (b["league"]["W"] + b["league"]["L"] + b["league"]["T"]);
    let conference_pct_a = (a["conference"]["W"] + (0.5 * a["conference"]["T"])) / (a["conference"]["W"] + a["conference"]["L"] + a["conference"]["T"]);
    let conference_pct_b = (b["conference"]["W"] + (0.5 * b["conference"]["T"])) / (b["conference"]["W"] + b["conference"]["L"] + b["conference"]["T"]);
    let division_pct_a = (a["division"]["W"] + (0.5 * a["division"]["T"])) / (a["division"]["W"] + a["division"]["L"] + a["division"]["T"]);
    let division_pct_b = (b["division"]["W"] + (0.5 * b["division"]["T"])) / (b["division"]["W"] + b["division"]["L"] + b["division"]["T"]);

    if(league_pct_a == league_pct_b) {
        let h2h_games = getH2HGames(a["team"],b["team"]);
        let h2h_a_pct = getH2HAPct(h2h_games, a["team"]);

        //If there is game and record not even
        if(h2h_games.length >= 1 && h2h_a_pct != .5) {
            return h2h_a_pct > 500 ? -1 : 1;
        }

        if(conference_pct_a == conference_pct_b) {
            if(a["div"] == b["div"]) {
                if(division_pct_a == division_pct_b) {
                    return 0;
                } else {
                    return division_pct_a < division_pct_b ? 1 : -1;
                }
            }
        } else {
            return conference_pct_a < conference_pct_b ? 1 : -1;
        }
    } else {
        return league_pct_a < league_pct_b ? 1 : -1;
    }

    return 0;
}

function get_opponent(team, game) {
    if(team == game[0]) {
        return game[1];
    }

    return game[0];
}

function computeSoV(team) {
    let sov = {
        "W": 0,
        "L": 0,
        "T": 0
    }

    victories[team].forEach(opponent => {
        //Get the opponent record and add to actual SoV
        sov["W"] += standings[opponent]["league"]["W"];
        sov["L"] += standings[opponent]["league"]["L"];
        sov["T"] += standings[opponent]["league"]["T"];
    })

    //When done, add SoV to standings
    standings[team]["SoV"] = sov;
}

function computeSoS(team) {
    let sos = {
        "W": 0,
        "L": 0,
        "T": 0
    }

    schedule[team].forEach(opponent => {
        //Get the opponent record and add to actual SoV
        sos["W"] += standings[opponent]["league"]["W"];
        sos["L"] += standings[opponent]["league"]["L"];
        sos["T"] += standings[opponent]["league"]["T"];
    })

    //When done, add SoV to standings
    standings[team]["SoS"] = sos;
}

function getH2HGames(a,b) {
    let h2hGames = [];

    games.forEach(game => {
        //If a game between the two is found
        if(((game[0] == a) && (game[1] == b)) || ((game[0] == b) && (game[1] == a))) {
            h2hGames.push(game);
        }
    });

    return h2hGames;
}

function getH2HAPct(games, team) {
    let wins = 0;
    games.forEach(game => {
        if(game[2] == game[3]) {
            wins += 0.5;
        } else if(game[0] == team) {
            //Team A is home
            wins += game[2] > game[3] ? 1 : 0;
        } else {
            //Team A is away
            wins += game[2] < game[3] ? 1 : 0;
        }
    })

    return wins/games.length;
}

function draw_table(teams, div_id) {
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
