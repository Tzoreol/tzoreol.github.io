class Game {
    #awayTeam
    #homeTeam
    #awayScore
    #homeScore

    constructor(homeTeam, awayTeam, homeScore, awayScore) {
        this.#awayTeam = awayTeam;
        this.#homeTeam = homeTeam;
        this.#awayScore = awayScore;
        this.#homeScore = homeScore;
    }

    /**
     * Getter for away team
     * @returns {*} Away team
     */
    getAwayTeam() {
        return this.#awayTeam;
    }

    /**
     * Getter for home team
     * @returns {*} home team
     */
    getHomeTeam() {
        return this.#homeTeam;
    }

    /**
     * Getter for away score
     * @returns {*} Away score
     */
    getAwayScore() {
        return this.#awayScore;
    }

    /**
     * Getter for home score
     * @returns {*} home score
     */
    getHomeScore() {
        return this.#homeScore;
    }

    /**
     * Return game result
     *  -1 => Away team victory
     *   0 => Tie
     *   1 => Home team victory
     */
    getGameResult() {
        if(this.#awayScore == this.#homeScore) {
            //Tie, return 0
            return 0;
        }

        //If not tie, return depending on score comparison
        return this.#awayScore < this.#homeScore ? 1 : -1;
    }

    getGameResultForTeam(team) {
        if(this.#awayScore == this.#homeScore) {
            //Tie, return 0
            return 0;
        } else if(team.getCode() === this.#awayTeam) {
            return this.#awayScore > this.#homeScore ? 1 : -1;
        }

        return this.#homeScore > this.#awayScore ? 1 : -1;
    }

    toString() {
        return this.#awayTeam + " vs. " + this.#homeTeam;
    }
}
