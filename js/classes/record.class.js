class Record {
    #wins
    #losses
    #ties

    constructor() {
        this.#wins = 0;
        this.#losses = 0;
        this.#ties = 0;
    }

    /**
     * Get raw percentage
     *
     * @returns {number} Percentage from the record
     */
    getPercentage() {
        return (this.#wins + (0.5 * this.#ties)) / (this.#wins + this.#losses + this.#ties);
    }

    /**
     * Get rounded and formatted percentage
     * To be displayed in a table
     *
     * @returns {string} Rounded and formatted percentage
     */
    getFormattedPercentage() {
        let percentage = this.getPercentage();

        switch (percentage) {
            case 1:
                return "1.000";
                break;
            case 0:
                return "0.000";
                break;
            default:
                let rounded_percentage = Math.round((percentage + Number.EPSILON) * 1000) / 1000;
                return String(rounded_percentage).padEnd(5,'0').substring(1);
                break;
        }
    }

    getWins() {
        return this.#wins;
    }

    setWins(wins) {
        this.#wins = wins;
    }

    getLosses() {
        return this.#losses;
    }

    setLosses(losses) {
        this.#losses = losses;
    }

    getTies() {
        return this.#ties;
    }

    setTies(ties) {
        this.#ties = ties;
    }

    /**
     * Add win to record
     */
    addWin() {
        this.#wins++;
    }

    /**
     * Add loss to record
     */
    addLoss() {
        this.#losses++;
    }

    /**
     * Add tie to record
     */
    addTie() {
        this.#ties++;
    }

    toString() {
        return this.#wins + "-" + this.#losses + "-" + this.#ties;
    }
}
