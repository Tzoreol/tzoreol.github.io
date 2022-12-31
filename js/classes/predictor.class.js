class Predictor {
    #selectedTeam;
    #schedule = [];
    #contenders = [];

    constructor(selectedTeamCode) {
        this.#selectedTeam = teams[selectedTeamCode];
        this.#schedule = this.getScheduleForSelectedTeam();
        this.#contenders = this.getContenders();
        this.getContendersSchedule();
        this.drawContendersStandings();
        this.drawSchedule();
    }

    getSchedule() {
        return this.#schedule;
    }

    getScheduleForSelectedTeam() {
        return Schedule.getTeamSchedule(this.#selectedTeam.getCode());
    }

    getContenders() {
        //Get current standings
        let selected_team_lose_out_standings = new Standings(true);
        let selected_team_win_out_standings = new Standings(true);
        let selected_team_lose_out = selected_team_lose_out_standings.getTable()[this.#selectedTeam.getCode()];
        let selected_team_win_out = selected_team_win_out_standings.getTable()[this.#selectedTeam.getCode()];

        //For each remaining game, simulate losses and wins
        this.#schedule.forEach(game => {
            selected_team_lose_out_standings.updateTableFromGameTeamAndOutcome(game, selected_team_lose_out, -1);
            selected_team_win_out_standings.updateTableFromGameTeamAndOutcome(game, selected_team_win_out, 1);
        });

        Object.values(selected_team_lose_out_standings.getTable()).forEach(possibleContender => {
            //Contender is only in division and not self
            if ((this.#selectedTeam.getConference() == possibleContender.getConference()) && (this.#selectedTeam.getCode() != possibleContender.getCode())) {
                //Get schedule for possible contender and win out
                let possible_contender_schedule = Schedule.getTeamSchedule(possibleContender.getCode());
                possible_contender_schedule.forEach(game => {
                    selected_team_lose_out_standings.updateTableFromGameTeamAndOutcome(game, possibleContender, 1, true);
                });
            }
        });

        //Same but reversed
        let contenders = [];
        let tiebreaks = [];
        Object.values(selected_team_win_out_standings.getTable()).forEach(possibleContender => {
            //Contender is only in division and not self
            if ((this.#selectedTeam.getConference() == possibleContender.getConference()) && (this.#selectedTeam.getCode() != possibleContender.getCode())) {
                //Get schedule for possible contender and lose out
                let possible_contender_schedule = Schedule.getTeamSchedule(possibleContender.getCode());

                possible_contender_schedule.forEach(game => {
                    selected_team_win_out_standings.updateTableFromGameTeamAndOutcome(game, possibleContender, -1, true);
                });

                /*
                 * Contenders are teams above selected team when it loses while they win out
                 * AND below when selected team wins out while they lose out
                 */
                let selectedTeamWinOutPct = selected_team_win_out_standings.getTable()[this.#selectedTeam.getCode()].getRecords()["league"].getPercentage();
                let selectedTeamLoseOutPct = selected_team_lose_out_standings.getTable()[this.#selectedTeam.getCode()].getRecords()["league"].getPercentage();
                let possibleContenderLoseOutPct = possibleContender.getRecords()["league"].getPercentage();
                let possibleContenderWinOutPct = selected_team_lose_out_standings.getTable()[possibleContender.getCode()].getRecords()["league"].getPercentage();
                let isWinOutBelow = possibleContenderLoseOutPct < selectedTeamWinOutPct;
                let isLoseOutAbove = possibleContenderWinOutPct > selectedTeamLoseOutPct;

                if(isWinOutBelow && isLoseOutAbove) {
                    contenders.push(possibleContender.getCode());
                }

                //If needed, add tiebreaks
                if(selectedTeamWinOutPct == possibleContenderLoseOutPct) {
                    let tiebreak = [];
                    tiebreak.push(selected_team_win_out_standings.getTable()[this.#selectedTeam.getCode()]);
                    tiebreak.push(possibleContender);

                    tiebreaks.push(tiebreak);
                }

                if (selectedTeamLoseOutPct == possibleContenderWinOutPct) {
                    let tiebreak = [];
                    tiebreak.push(selected_team_lose_out_standings.getTable()[possibleContender.getCode()]);
                    tiebreak.push(selected_team_lose_out_standings.getTable()[this.#selectedTeam.getCode()]);

                    tiebreaks.push(tiebreak);
                }
            }
        });

        //Now we break the ties
        tiebreaks.forEach(tiebreak => {
            //Add a contender if tiebreak method is not returning selected team
            let tiebreakWinner = Comparison.twoTeamsPredictiveTiebreak(tiebreak[0], tiebreak[1]);

            if(tiebreakWinner.getCode() != this.#selectedTeam.getCode()) {
                let contender = tiebreak[0] == this.#selectedTeam ? tiebreak[1] : tiebreak[0];
                contenders.push(contender.getCode());
            }
        });

        return contenders;
    }

    getContendersSchedule() {
        schedule.forEach(game => {
            if((this.#contenders.includes(game.getAwayTeam())) || (this.#contenders.includes(game.getHomeTeam()))) {
                if(!this.#schedule.find(contendersGame => (contendersGame.getAwayTeam() === game.getAwayTeam()) && (contendersGame.getHomeTeam() === game.getHomeTeam()))) {
                    this.#schedule.push(game);
                }
            }
        });
    }

    drawContendersStandings() {
        //Get league standings
        let standings = new Standings(true);

        //Fill contenders standings with only contenders
        let contendersStandings = [];
        for(const [teamCode, team] of Object.entries(standings.getTable())) {
            if(this.#contenders.includes(teamCode) || this.#selectedTeam.getCode() === teamCode) {
                contendersStandings.push(team);
            }
        }

        Draw.drawTable(Comparison.sortTable(contendersStandings), "contenders_standing");
    }

    drawSchedule() {
        let schedule_div = document.getElementById("schedule");

        this.#schedule.forEach(game => {
            let game_div = document.createElement("div");
            let game_div_id = game.getAwayTeam() + "vs" + game.getHomeTeam();
            game_div.id = game_div_id;

            let away_team = document.createElement("label");
            away_team.htmlFor = game_div_id + "_" + game.getAwayTeam();
            away_team.appendChild(document.createTextNode(teams[game.getAwayTeam()].getFullName()));

            let away_checkbox = document.createElement("input");
            away_checkbox.type = "checkbox";
            away_checkbox.name = game_div_id + "_" + game.getAwayTeam();
            away_checkbox.value = game.getAwayTeam();
            away_checkbox.id = away_checkbox.name;
            //away_checkbox.onchange = updateStandings(predictor);

            let home_team = document.createElement("label");
            home_team.htmlFor = game_div_id + "_" + game.getHomeTeam();
            home_team.appendChild(document.createTextNode(teams[game.getHomeTeam()].getFullName()));

            let home_checkbox = document.createElement("input");
            home_checkbox.type = "checkbox";
            home_checkbox.name = game_div_id + "_" + game.getHomeTeam();
            home_checkbox.value = game.getHomeTeam();
            home_checkbox.id = home_checkbox.name;
            //home_checkbox.onchange = this.updateStandings;

            game_div.appendChild(away_team);
            game_div.appendChild(away_checkbox);
            game_div.appendChild(home_checkbox);
            game_div.appendChild(home_team);
            schedule_div.appendChild(game_div);
        });
    }

    updateStandings() {
        //Build a new standings
        let to_be_updated_standings = new Standings(true);

        //For each game in schedule, find the corresponding div
        this.#schedule.forEach(game => {
            let game_div_id = game.getAwayTeam() + "vs" + game.getHomeTeam();

            //Get the team in standings
            let away_team = to_be_updated_standings.getTable()[game.getAwayTeam()];
            let home_team = to_be_updated_standings.getTable()[game.getHomeTeam()];

            //Find both checkboxes
            let away_team_checkbox = document.getElementById(game_div_id + "_" + game.getAwayTeam());
            let home_team_checkbox = document.getElementById(game_div_id + "_" + game.getHomeTeam());

            //If both checked, it's a tie;
            if(away_team_checkbox.checked && home_team_checkbox.checked) {
                to_be_updated_standings.updateTableFromGameTeamAndOutcome(game, away_team, 0, true);
                to_be_updated_standings.updateTableFromGameTeamAndOutcome(game, home_team, 0, true);
            } else if(away_team_checkbox.checked) {
                to_be_updated_standings.updateTableFromGameTeamAndOutcome(game, away_team, 1, true);
                to_be_updated_standings.updateTableFromGameTeamAndOutcome(game, home_team, -1, true);
            } else if(home_team_checkbox.checked) {
                to_be_updated_standings.updateTableFromGameTeamAndOutcome(game, away_team, -1, true);
                to_be_updated_standings.updateTableFromGameTeamAndOutcome(game, home_team, 1, true);
            }
        });

        //Do nothing of nothing is checked

        //Fill contenders standings with only contenders
        let contendersStandings = [];
        for(const [teamCode, team] of Object.entries(to_be_updated_standings.getTable())) {
            if(this.#contenders.includes(teamCode) || this.#selectedTeam.getCode() === teamCode) {
                contendersStandings.push(team);
            }
        }

        //Draw updated table
        Draw.drawTable(Comparison.sortTable(contendersStandings), "contenders_standing");
    }
}
