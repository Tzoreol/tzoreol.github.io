let teamSelect = document.getElementById("team");
teamSelect.onchange = function() {
    let selectedTeam = teamSelect.value;
    let selectedTeam_remaining_games = getRemainingGames(selectedTeam);
    let contenders = getContenders(selectedTeam, selectedTeam_remaining_games.length);

    console.log(getContendersRemainingGames(contenders));
};

function getRemainingGames(team) {
    let team_remaining_games = []
    remaining_games.forEach(game => {
        if(game.includes(team)) {
            team_remaining_games.push(game);
        }
    });

    return team_remaining_games;
}

function getContenders(team, remaining_games_count) {
    //Compute team maximum  and minimum percentage
    let team_record = standings[team]["league"];
    let max_team_pct = ((team_record["W"] + remaining_games_count) + (0.5 * team_record["T"])) / (team_record["W"] + team_record["L"] + team_record["T"] + remaining_games_count);
    let min_team_pct = ((team_record["W"]) + (0.5 * team_record["T"])) / (team_record["W"] + team_record["L"] + team_record["T"] + remaining_games_count);

    /*
     * Loop into standings
     * For team in the conference, compute the minimum and maximum percentage.
     * If the minimum for selected team is below maximum the team we're currently on AND
     * If maximum for selected team is above minimum the team we're currently on, it's a contender
     */
    let contenders = []
    Object.keys(standings).forEach(current => {
        if(divisions[team][0] == divisions[current][0]) {
            let current_record = standings[current]["league"];
            let current_remaining_games_count = getRemainingGames(current).length;
            let max_current_pct = ((current_record["W"] + current_remaining_games_count) + (0.5 * current_record["T"])) / (current_record["W"] + current_record["L"] + current_record["T"] + current_remaining_games_count);
            let min_current_pct = ((current_record["W"]) + (0.5 * current_record["T"])) / (current_record["W"] + current_record["L"] + current_record["T"] + current_remaining_games_count);

            if((min_team_pct < max_current_pct) && (max_team_pct > min_current_pct)) {
                contenders.push(current);
            } else if (min_team_pct == max_current_pct) {
                //If here, team is above, current is below
                let tiebreaker_winner = predictiveTieBreaker(current, team);

                if(tiebreaker_winner != 0) {
                    console.log(tiebreaker_winner + " wins " + current + "/" + team + " tiebreaker");
                } else {
                    contenders.push(current);
                }
            } else if (max_team_pct == min_current_pct) {
                //If here, team is below, current is above
                let tiebreaker_winner = predictiveTieBreaker(team, current);

                if(tiebreaker_winner != 0) {
                    console.log(tiebreaker_winner + " wins " + current + "/" + team + " tiebreaker");
                } else {
                    contenders.push(current);
                }
            }
        }
    });

    return contenders;
}

function predictiveTieBreaker(below_team, above_team) {
    //Copy record, schedule and victories
    let below_team_record = saveArrayCopy(standings[below_team]);
    let below_team_schedule = saveArrayCopy(schedule[below_team]);
    let below_team_victories = saveArrayCopy(victories[below_team]);
    let above_team_record = saveArrayCopy(standings[above_team]);
    let above_team_schedule = saveArrayCopy(schedule[above_team]);
    //No need to copy above team victory as we'll simulate lose out

    //Get below team remaining games
    let below_team_remaining_games = getRemainingGames(below_team);

    //Simulate below team win out
    below_team_remaining_games.forEach(game => {
        //Fill team schedule for strength of schedule
        below_team_schedule.push(get_opponent(below_team, game));

        let conference = is_conference(below_team, game);
        let division = conference && is_division(below_team, game);

        //Fill victory for strength of victory
        below_team_victories.push(get_opponent(below_team, game));

        //Add win
        below_team_record["league"]["W"] = below_team_record["league"]["W"] + 1;

        if(conference) {
            below_team_record["conference"]["W"] = below_team_record["conference"]["W"] + 1;
        }

        if(division) {
            below_team_record["division"]["W"] = below_team_record["division"]["W"] + 1;
        }
    });

    //Get above team remaining games
    let above_team_remaining_games = getRemainingGames(above_team);

    //Simulate below team will lose out
    above_team_remaining_games.forEach(game => {

        //Fill team schedule for strength of schedule
        above_team_schedule.push(get_opponent(above_team, game));

        let conference = is_conference(above_team, game);
        let division = conference && is_division(above_team, game);

        //Add loss
        above_team_record["league"]["L"] = above_team_record["league"]["L"] + 1;

        if(conference) {
            above_team_record["conference"]["L"] = above_team_record["conference"]["L"] + 1;
        }

        if(division) {
            above_team_record["division"]["L"] = above_team_record["division"]["L"] + 1;
        }
    });

    //Compute tiebreaker
    //We know that record is the same. Next criteria is head-to-head
    let h2h_games = getH2HGames(below_team, above_team);

    //Get future head-to-head
    let futureH2HGames = getFutureH2HGames(below_team, above_team, below_team_remaining_games);

    //Compute below team head-to-head wins, only if there is at least one game played or to be played
    if((h2h_games.length > 0) || (futureH2HGames.length > 0)) {
        let below_team_wins = 0;
        h2h_games.forEach(game => {
            if(game[2] == game[3]) {
                below_team_wins += 0.5;
            } else if(game[0] == below_team) {
                //Below team is home team
                below_team_wins += (game[2] > game[3]) ? 1 : 0;
            } else {
                //Below team is away team
                below_team_wins += (game[2] < game[3]) ? 1 : 0;
            }
        });

        //Add remaining head-to-head games to below team wins
        below_team_wins += futureH2HGames.length;

        //If percentage is not .500, we have a tiebreaker
        if((below_team_wins / (h2h_games.length + futureH2HGames.length)) != 0.5) {
            console.log("H2H tiebreaker");
            return ((below_team_wins / (h2h_games.length + futureH2HGames.length)) > 0.5) ? below_team : above_team;
        }
    }

    //Criteria are not the same if within division
    if((divisions[below_team][0] == divisions[above_team][0]) && (divisions[below_team][1] == divisions[above_team][1])) {
        //If so, 2nd criteria is division record
        let below_team_pct = (below_team_record["division"]["W"] + (0.5 * below_team_record["division"]["L"])) / (below_team_record["division"]["W"] + below_team_record["division"]["L"] + below_team_record["division"]["T"]);
        let above_team_pct = (above_team_record["division"]["W"] + (0.5 * above_team_record["division"]["L"])) / (above_team_record["division"]["W"] + above_team_record["division"]["L"] + above_team_record["division"]["T"]);

        //If percentages are not equals, we have a tiebreaker
        if(below_team_pct != above_team_pct) {
            console.log("Division tiebreaker");
            return (above_team_pct > below_team_pct) ? above_team : below_team;
        }

        //3rd criteria is common opponents record
        let common_game_tiebreaker = common_opponents_tiebeaker(below_team, below_team_schedule, above_team, above_team_schedule);

        //Method returns 0 if no tiebreaker
        if(common_game_tiebreaker != 0) {
            return common_game_tiebreaker;
        }

        //4th criteria is conference record
        let conference_record_winner = conference_record_tiebreaker(below_team, below_team_record, above_team, above_team_record);

        //Method return 0 if no tiebreaker
        if(conference_record_winner != 0) {
            return conference_record_winner;
        }

       //If the tie is not broke yet, consider as contender
        return 0;
    } else {
        //2nd criteria is conference record
        let conference_record_winner = conference_record_tiebreaker(below_team, below_team_record, above_team, above_team_record);

        //Method return 0 if no tiebreaker
        if(conference_record_winner != 0) {
            return conference_record_winner;
        }

        //3rd criteria is common opponents record
        let common_game_tiebreaker = common_opponents_tiebeaker(below_team, below_team_schedule, above_team, above_team_schedule);

        //Method returns 0 if no tiebreaker
        if(common_game_tiebreaker != 0) {
            return common_game_tiebreaker;
        }

        //If the tie is not broke yet, consider as contender
        return 0;
    }
}

function getFutureH2HGames(below_team, above_team, below_team_remaining_games) {
    let futureH2HGames = [];

    below_team_remaining_games.forEach(game => {
        //If a game between the two is found
        if(((game[0] == below_team) && (game[1] == above_team)) || ((game[0] == above_team) && (game[1] == below_team))) {
            futureH2HGames.push(game);
        }
    });

    return futureH2HGames;
}

function saveArrayCopy(arrayToCopy) {
    let json = JSON.stringify(arrayToCopy);

    return JSON.parse(json);
}

function common_opponents_tiebeaker(below_team, below_team_schedule, above_team, above_team_schedule) {
    let common_opponents = [];
    below_team_schedule.forEach(opponent => {
        if(above_team_schedule.includes(opponent)) {
            common_opponents.push(opponent);
        }
    });

    //If less than 4 common opponent, we can't use this criteria
    if(common_opponents.length < 4) {
        return 0;
    }

    //Find record of common games
    let below_team_common_record = {
        "W": 0,
        "L": 0,
        "T": 0
    };

    let above_team_common_record = {
        "W": 0,
        "L": 0,
        "T": 0
    };

    games.forEach(game => {
        if(((game[0] == below_team) && common_opponents.includes(game[1])) || ((game[1] == below_team) && common_opponents.includes(game[0]))) {
            let result = game_result_for_team(below_team, game);

            switch (result) {
                case -1:
                    below_team_common_record["L"]++;
                    break;
                case 0:
                    below_team_common_record["T"]++;
                    break;
                case 1:
                    below_team_common_record["W"]++;
                    break;
            }
        } else if(((game[0] == above_team) && common_opponents.includes(game[1])) || ((game[1] == above_team) && common_opponents.includes(game[0]))) {
            let result = game_result_for_team(above_team, game);

            switch (result) {
                case -1:
                    above_team_common_record["L"]++;
                    break;
                case 0:
                    above_team_common_record["T"]++;
                    break;
                case 1:
                    above_team_common_record["W"]++;
                    break;
            }
        }
    });

    /*
     * If total does not match common opponent length
     * This means that a common game is incoming
     * Add win for below team and loss for above team
     */
    below_team_common_record["W"] += common_opponents.length - (below_team_common_record["W"] + below_team_common_record["L"] + below_team_common_record["T"]);
    above_team_common_record["L"] += common_opponents.length - (above_team_common_record["W"] + above_team_common_record["L"] + above_team_common_record["T"]);

    let below_team_common_pct = (below_team_common_record["W"] + 0.5 * below_team_common_record["T"]) / (below_team_common_record["W"] + below_team_common_record["L"] + below_team_common_record["T"]);
    let above_team_common_pct = (above_team_common_record["W"] + 0.5 * above_team_common_record["T"]) / (above_team_common_record["W"] + above_team_common_record["L"] + above_team_common_record["T"]);

    if(below_team_common_pct != above_team_common_pct) {
        console.log("Common opponents time breaker");
        return below_team_common_pct > above_team_common_pct ? below_team : above_team;
    } else {
        return 0;
    }
}

function conference_record_tiebreaker(below_team, below_team_record, above_team, above_team_record) {
    let below_team_conference_pct = (below_team_record["conference"]["W"] + (0.5 * below_team_record["conference"]["T"])) / (below_team_record["conference"]["W"] + below_team_record["conference"]["L"] + below_team_record["conference"]["T"]);
    let above_team_conference_pct = (above_team_record["conference"]["W"] + (0.5 * above_team_record["conference"]["T"])) / (above_team_record["conference"]["W"] + above_team_record["conference"]["L"] + above_team_record["conference"]["T"]);

    if(below_team_conference_pct != above_team_conference_pct) {
        console.log("Conference record tiebreaker");
        return below_team_conference_pct > above_team_conference_pct ? below_team : above_team;
    } else {
        return 0;
    }
}

function getContendersRemainingGames(contenders) {
    let contenders_remaining_games = [];
    contenders.forEach(contender => {
        let remaining_games = getRemainingGames(contender);

        remaining_games.forEach(game => {
            if(!contenders_remaining_games.includes(game)) {
                contenders_remaining_games.push(game);
            }
        });
    });

    return contenders_remaining_games;
}
