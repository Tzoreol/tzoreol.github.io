class Standings {
    #table = [];

    constructor(fill) {
        //Copy team into table
        for (const [code, team] of Object.entries(teams)) {
            this.#table[code] = team.clone();
        }

        if (fill) {
            //Build table
            scores.forEach(game => {
                if(game.getAwayScore() != null) {
                    this.updateTableFromGame(game);
                }
            });
        }
    }

    /**
     * Getter for standings table
     *
     * @returns {*[]} Standings table
     */
    getTable() {
        return this.#table;
    }

    /**
     * Updates teams records depending on the game's result
     * @param game
     */
    updateTableFromGame(game) {
        let home_team = this.#table[game.getHomeTeam()];
        let away_team = this.#table[game.getAwayTeam()];

        //Update with outcome given for both teams
        this.updateTableFromGameAndTeam(game, home_team);
        this.updateTableFromGameAndTeam(game, away_team);
    }

    /**
     * Update the record of given team for a given game
     *
     * @param game Game to simulate
     * @param team Team to simulate outcome
     */
    updateTableFromGameAndTeam(game, team) {

        //Update with team and outcome given
        this.updateTableFromGameTeamAndOutcome(game, team, game.getGameResult(), false);
    }

    /**
     * Update the record of given team for a given game
     * When outcome is simulated
     *
     * @param game Game to simulate
     * @param team Team to simulate outcome
     * @param outcome Outcome. -1 for loss, 0 for tie, 1 for win
     * @param simulated If simulated, don't reverse outcome
     */
    updateTableFromGameTeamAndOutcome(game, team, outcome, simulated) {
        let away_team = this.#table[game.getAwayTeam()];
        let home_team = this.#table[game.getHomeTeam()];
        let isConferenceGame = Comparison.isConferenceGame(away_team, home_team);
        let isDivisionGame = Comparison.isDivisionGame(away_team, home_team);

        //Add opponent to team's opponents
        let opponent = team.getCode() == game.getAwayTeam() ? game.getHomeTeam() : game.getAwayTeam();
        team.addOpponent(opponent);

        /*
         * If the game is simulated, don't reverse outcome
         * The computed outcome is based on the home team and has to be reversed if given team is away
         * But a simulated outcome always depends on the given team
         */
        if(!simulated) {
            //Reverse outcome if given team is away
            outcome = (team.getCode() == away_team.getCode()) ? -outcome : outcome;
        }

        switch(outcome) {
            case -1:
                //Away team victory
                if(isDivisionGame) {
                    team.addDivisionLoss();
                } else if(isConferenceGame) {
                    team.addConferenceLoss();
                } else {
                    team.addLeagueLoss();
                }
                break;
            case 0:
                //Tie
                if(isDivisionGame) {
                    team.addDivisionTie();
                } else if(isConferenceGame) {
                    team.addConferenceTie();
                } else {
                    team.addLeagueTie();
                }
                break;
            case 1:
                team.addVictories(opponent);

                //Home team victory
                if(isDivisionGame) {
                    team.addDivisionWin();
                } else if(isConferenceGame) {
                    team.addConferenceWin();
                } else {
                    team.addLeagueWin();
                }
                break;
        }
    }
}
