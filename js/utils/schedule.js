class Schedule {
    static getTeamSchedule(teamCode) {
        let toReturn =  [];
        schedule.forEach(game => {
            if((game.getAwayTeam() == teamCode) || (game.getHomeTeam() == teamCode)) {
                toReturn.push(game);
            }
        });

        return toReturn;
    }


}
