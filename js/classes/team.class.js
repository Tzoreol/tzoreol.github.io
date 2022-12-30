class Team {
    #code
    #fullName
    #conference
    #division
    #records
    #opponents
    #victories

    constructor(code, fullName, conference, division) {
        this.#code = code;
        this.#fullName = fullName;
        this.#conference = conference;
        this.#division = division;
        this.#records = {
            "league": new Record(),
            "conference": new Record(),
            "division": new Record()
        }

        this.#opponents = [];
        this.#victories = [];
    }

    /**
     * Get the team's code
     * Mostly used as key
     *
     * @returns {*} Team's code
     */
    getCode()
    {
        return this.#code;
    }

    getFullName() {
        return this.#fullName;
    }

    /**
     * Get the team's conference
     * @returns {*} Team's conference
     */
    getConference() {
        return this.#conference;
    }

    /**
     * Get the team's division
     * @returns {*} Team's division
     */
    getDivision() {
        return this.#division;
    }

    /**
     * Get the team's record
     * @returns {*}
     */
    getRecords() {
        return this.#records
    }

    getLeagueRecord() {
        return this.#records["league"];
    }

    getConferenceRecord() {
        return this.#records["conference"];
    }

    getDivisionRecord() {
        return this.#records["division"];
    }
    /**
     * Add win to league record
     */
    addLeagueWin() {
        this.#records["league"].addWin();
    }

    /**
     * Add loss to league record
     */
    addLeagueLoss() {
        this.#records["league"].addLoss();
    }

    /**
     * Add tie to league record
     */
    addLeagueTie() {
        this.#records["league"].addTie();
    }

    /**
     * Add win to conference record
     */
    addConferenceWin() {
        this.addLeagueWin();
        this.#records["conference"].addWin();
    }

    /**
     * Add loss to conference record
     */
    addConferenceLoss() {
        this.addLeagueLoss();
        this.#records["conference"].addLoss();
    }

    /**
     * Add tie to conference record
     */
    addConferenceTie() {
        this.addLeagueTie();
        this.#records["conference"].addTie();
    }

    /**
     * Add win to division record
     */
    addDivisionWin() {
        this.addConferenceWin();
        this.#records["division"].addWin();
    }

    /**
     * Add loss to division record
     */
    addDivisionLoss() {
        this.addConferenceLoss();
        this.#records["division"].addLoss();
    }

    /**
     * Add tie to division record
     */
    addDivisionTie() {
        this.addConferenceTie();
        this.#records["division"].addTie();
    }

    addOpponent(teamCode) {
        this.#opponents.push(teamCode);
    }

    addVictories(teamCode) {
        this.#victories.push(teamCode);
    }

    getOpponents() {
        return this.#opponents;
    }

    getVictories() {
        return this.#victories;
    }

    #getStrengthOf(standings, opponents) {
        let record = new Record();

        opponents.forEach(opponent => {
            let opponentRecord = standings.getTable()[opponent].getLeagueRecord();
            record.setWins(record.getWins() + opponentRecord.getWins());
            record.setLosses(record.getLosses() + opponentRecord.getLosses());
            record.setTies(record.getTies() + opponentRecord.getTies());
        });

        return record.getFormattedPercentage();
    }

    getStrengthOfVictory(standings) {
        return this.#getStrengthOf(standings, this.#victories);
    }

    getStrengthOfSchedule(standings) {
        return this.#getStrengthOf(standings, this.#opponents);
    }

    /**
     * Return a clone of team to allow the one in scores to be reused
     *
     * @returns {Team} Clone of instance
     */
    clone() {
        return new Team(this.#code, this.#fullName, this.#conference, this.#division);
    }
}
