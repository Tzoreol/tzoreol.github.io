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
}
