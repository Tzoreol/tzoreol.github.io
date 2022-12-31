class Comparison {
    /**
     * Is a conference game
     * @param awayTeam Away team
     * @param homeTeam Home team
     *
     * @returns {boolean} True if conference game
     */
    static isConferenceGame(awayTeam, homeTeam) {
        return awayTeam.getConference() == homeTeam.getConference();
    }

    /**
     * Is a division game
     * @param awayTeam Away team
     * @param homeTeam Home team
     *
     * @returns {boolean} True if division game
     */
    static isDivisionGame(awayTeam, homeTeam) {
        let isConferenceGame = this.isConferenceGame(awayTeam, homeTeam);

        return isConferenceGame && (awayTeam.getDivision() == homeTeam.getDivision());
    }

    static twoTeamsPredictiveTiebreak(belowTeam, aboveTeam) {
        let belowTeamCode = belowTeam.getCode();
        let aboveTeamCode = aboveTeam.getCode();

        //Find head to heads
        let headToHeads = [];
        this.findHeadToHeads(scores, headToHeads, belowTeamCode, aboveTeamCode);

        if(headToHeads.length > 0) {
            //Create standing without filling it
            let h2hStandings = new Standings(false);

            headToHeads.forEach(game => {
                //If there is a score, add the outcome
                if(game.getAwayScore() != null) {
                    h2hStandings.updateTableFromGame(game)
                } else {
                    //Simulate victory for below team
                    h2hStandings.updateTableFromGameTeamAndOutcome(game, h2hStandings.getTable()[belowTeamCode], 1, true);
                    h2hStandings.updateTableFromGameTeamAndOutcome(game, h2hStandings.getTable()[aboveTeamCode], -1, true);
                }
            });

            let belowTeamH2HPct = h2hStandings.getTable()[belowTeamCode].getRecords()["league"].getPercentage();
            let aboveTeamH2HPct = h2hStandings.getTable()[aboveTeamCode].getRecords()["league"].getPercentage();

            if(belowTeamH2HPct != aboveTeamH2HPct) {
                //If tie is broke, return winner
                return belowTeamH2HPct > aboveTeamH2HPct ? belowTeam : aboveTeam;
            }
        }

        //Tiebreak is not the same if the two teams are in the same division
        if(this.isDivisionGame(belowTeam, aboveTeam)) {
            return Comparison.divisionTwoTeamsPredictiveTiebreaker(belowTeam, aboveTeam);
        } else {
            return Comparison.conferenceTwoTeamsPredictiveTiebreaker(belowTeam, aboveTeam);
        }
    }

    static divisionTwoTeamsPredictiveTiebreaker(belowTeam, aboveTeam) {
        //Next for division tiebreak is division record
        let divisionAndConferenceStandings = new Standings(true);

        //Get schedule for both teams
        let belowTeamSchedule = Schedule.getTeamSchedule(belowTeam.getCode());
        let aboveTeamSchedule = Schedule.getTeamSchedule(aboveTeam.getCode());

        //Simulate wins for below team
        belowTeamSchedule.forEach(game => {
            divisionAndConferenceStandings.updateTableFromGameTeamAndOutcome(game, divisionAndConferenceStandings.getTable()[belowTeam.getCode()], 1, true);
        });

        //Simulate losses for above team
        aboveTeamSchedule.forEach(game => {
            divisionAndConferenceStandings.updateTableFromGameTeamAndOutcome(game, divisionAndConferenceStandings.getTable()[aboveTeam.getCode()], -1, true);
        });

        let belowTeamDivisionPct = divisionAndConferenceStandings.getTable()[belowTeam.getCode()].getRecords()["division"].getPercentage();
        let aboveTeamDivisionPct = divisionAndConferenceStandings.getTable()[aboveTeam.getCode()].getRecords()["division"].getPercentage();

        if(belowTeamDivisionPct != aboveTeamDivisionPct) {
            //If tie is broke, return winner
            return belowTeamDivisionPct > aboveTeamDivisionPct ? belowTeam : aboveTeam;
        }

        //Next is common games
        let commonOpponentsStandings =  Comparison.buildTwoTeamsCommonOpponentsRecord(belowTeam, aboveTeam);

        let belowTeamCommonOpponentPct = commonOpponentsStandings.getTable()[belowTeam.getCode()].getRecords()["league"].getPercentage();
        let aboveTeamCommonOpponentPct = commonOpponentsStandings.getTable()[aboveTeam.getCode()].getRecords()["league"].getPercentage();

        if(belowTeamCommonOpponentPct != aboveTeamCommonOpponentPct) {
            //If tie is broke, return winner
            return belowTeamCommonOpponentPct > aboveTeamCommonOpponentPct ? belowTeam : aboveTeam;
        }

        //Next is conference record. That was already predicted at division record
        let belowTeamConferencePct = divisionAndConferenceStandings.getTable()[belowTeam.getCode()].getRecords()["conference"].getPercentage();
        let aboveTeamConferencePct = divisionAndConferenceStandings.getTable()[aboveTeam.getCode()].getRecords()["conference"].getPercentage();

        if(belowTeamConferencePct != aboveTeamConferencePct) {
            //If tie is broke, return winner
            return belowTeamConferencePct > aboveTeamConferencePct ? belowTeam : aboveTeam;
        }

        //We don't go further for predictive tiebreak
        console.log("No tiebreak between " + belowTeam.getCode() + " and " + aboveTeam.getCode());
        return null;
    }

    static conferenceTwoTeamsPredictiveTiebreaker(belowTeam, aboveTeam) {
        //Next is conference record
        let conferenceStandings = new Standings(true);

        //Get schedule for both teams
        let belowTeamSchedule = Schedule.getTeamSchedule(belowTeam.getCode());
        let aboveTeamSchedule = Schedule.getTeamSchedule(aboveTeam.getCode());

        //Simulate wins for below team
        belowTeamSchedule.forEach(game => {
            conferenceStandings.updateTableFromGameTeamAndOutcome(game, conferenceStandings.getTable()[belowTeam.getCode()], 1, true);
        });

        //Simulate losses for above team
        aboveTeamSchedule.forEach(game => {
            conferenceStandings.updateTableFromGameTeamAndOutcome(game, conferenceStandings.getTable()[aboveTeam.getCode()], -1, true);
        });

        let belowTeamConferencePct = conferenceStandings.getTable()[belowTeam.getCode()].getRecords()["conference"].getPercentage();
        let aboveTeamConferencePct = conferenceStandings.getTable()[aboveTeam.getCode()].getRecords()["conference"].getPercentage();

        if(belowTeamConferencePct != aboveTeamConferencePct) {
            //If tie is broke, return winner
            return belowTeamConferencePct > aboveTeamConferencePct ? belowTeam : aboveTeam;
        }

        //Next is common opponents record
        let commonOpponentsStandings =  Comparison.buildTwoTeamsCommonOpponentsRecord(belowTeam, aboveTeam);

        //First check that we have a standing
        if(commonOpponentsStandings != null) {
            let belowTeamCommonOpponentPct = commonOpponentsStandings.getTable()[belowTeam.getCode()].getRecords()["league"].getPercentage();
            let aboveTeamCommonOpponentPct = commonOpponentsStandings.getTable()[aboveTeam.getCode()].getRecords()["league"].getPercentage();

            if(belowTeamCommonOpponentPct != aboveTeamCommonOpponentPct) {
                //If tie is broke, return winner
                return belowTeamCommonOpponentPct > aboveTeamCommonOpponentPct ? belowTeam : aboveTeam;
            }
        }

        //We don't go further for predictive tiebreak
        console.log("No tiebreak between " + belowTeam.getCode() + " and " + aboveTeam.getCode());
        return null;
    }

    static findHeadToHeads(scheduleToSearch, headToHeadsToFill, team1, team2) {
        scheduleToSearch.forEach(game => {
            let awayTeamCode = game.getAwayTeam();
            let homeTeamCode = game.getHomeTeam();

            if(((team1 == awayTeamCode) && (team2 == homeTeamCode)) || ((team1 == homeTeamCode) && (team2 == awayTeamCode))) {
                headToHeadsToFill.push(game);
            }
        });
    }

    static buildTwoTeamsCommonOpponentsRecord(belowTeam, aboveTeam) {
        let commonOpponents = [];
        belowTeam.getOpponents().forEach(opponent => {
            if(aboveTeam.getOpponents().includes(opponent)) {
                commonOpponents.push(opponent);
            }
        });

        //Not applicable if not at least 4 games
        if(commonOpponents.length < 4) {
            return null;
        }

        let commonOpponentsStandings = new Standings(false);
        scores.forEach(game => {
            //Check below team games
            if(((game.getAwayTeam() == belowTeam.getCode()) && (commonOpponents.includes(game.getHomeTeam())) || ((game.getHomeTeam() == belowTeam.getCode()) && (commonOpponents.includes(game.getAwayTeam()))))) {
                //If there is a score, add the outcome
                if (game.getAwayScore() != null) {
                    commonOpponentsStandings.updateTableFromGame(game)
                } else {
                    //Simulate victory for below team
                    commonOpponentsStandings.updateTableFromGameTeamAndOutcome(game, commonOpponentsStandings.getTable()[belowTeam.getCode()], 1, true);
                }
            } else if(((game.getAwayTeam() == aboveTeam.getCode()) && (commonOpponents.includes(game.getHomeTeam())) || ((game.getHomeTeam() == aboveTeam.getCode()) && (commonOpponents.includes(game.getAwayTeam()))))) {
                //If there is a score, add the outcome
                if (game.getAwayScore() != null) {
                    commonOpponentsStandings.updateTableFromGame(game)
                } else {
                    //Simulate loss for above team
                    commonOpponentsStandings.updateTableFromGameTeamAndOutcome(game, commonOpponentsStandings.getTable()[aboveTeam.getCode()], -1, true);
                }
            }
        });

        return commonOpponentsStandings;
    }

    static sortTeams(team1, team2) {
        if(team1.getLeagueRecord().getPercentage() != team2.getLeagueRecord().getPercentage()) {
            return team1.getLeagueRecord().getPercentage() > team2.getLeagueRecord().getPercentage() ? -1 : 1;
        }

        let tiebreak = Comparison.twoTeamsTiebreak(team1, team2);

        if(tiebreak == null) {
            return 0
        }

        return tiebreak.getCode() == team1.getCode() ? -1 : 1;
    }
    
    static twoTeamsTiebreak(team1, team2) {
        let team1Code = team1.getCode();
        let team2Code = team2.getCode();

        //Find head to heads
        let headToHeads = [];
        this.findHeadToHeads(scores, headToHeads, team1Code, team2Code);

        if(headToHeads.length > 0) {
            //Create standing without filling it
            let h2hStandings = new Standings(false);

            headToHeads.forEach(game => {
                //If there is a score, add the outcome
                if(game.getAwayScore() != null) {
                    h2hStandings.updateTableFromGame(game)
                }
            });

            let team1H2HPct = h2hStandings.getTable()[team1Code].getRecords()["league"].getPercentage();
            let team2H2HPct = h2hStandings.getTable()[team2Code].getRecords()["league"].getPercentage();

            if(team1H2HPct != team2H2HPct) {
                //If tie is broke, return winner
                return team1H2HPct > team2H2HPct ? team1 : team2;
            }
        }

        //Tiebreak is not the same if the two teams are in the same division
        if(this.isDivisionGame(team1, team2)) {
            return Comparison.divisionTwoTeamsTiebreaker(team1, team2);
        } else {
            return Comparison.conferenceTwoTeamsTiebreaker(team1, team2);
        }
    }

    static divisionTwoTeamsTiebreaker(team1, team2) {
        //Next for division tiebreak is division record
        let divisionAndConferenceStandings = new Standings(true);

        let team1DivisionRecord = divisionAndConferenceStandings.getTable()[team1.getCode()].getDivisionRecord();
        let team2DivisionRecord = divisionAndConferenceStandings.getTable()[team2.getCode()].getDivisionRecord();

        if(team1DivisionRecord.getPercentage() != team2DivisionRecord.getPercentage()) {
            //If tie is broke, return winner
            return team1DivisionRecord.getPercentage() > team2DivisionRecord.getPercentage() ? team1 : team2;
        }

        //Next is common games
        let commonOpponentsStandings =  Comparison.buildTwoTeamsCommonOpponentsRecord(team1, team2);

        let team1CommonOpponentRecord = commonOpponentsStandings.getTable()[team1.getCode()].getLeagueRecord();
        let team2CommonOpponentRecord = commonOpponentsStandings.getTable()[team2.getCode()].getLeagueRecord();

        if(team1CommonOpponentRecord.getPercentage() != team2CommonOpponentRecord.getPercentage()) {
            //If tie is broke, return winner
            return team1CommonOpponentRecord.getPercentage() > team2CommonOpponentRecord.getPercentage() ? team1 : team2;
        }

        //Next is conference record. That was already predicted at division record
        let team1ConferenceRecord = divisionAndConferenceStandings.getTable()[team1.getCode()].getConferenceRecord();
        let team2ConferenceRecord = divisionAndConferenceStandings.getTable()[team2.getCode()].getConferenceRecord();

        if(team1ConferenceRecord.getConferenceRecord() != team2ConferenceRecord.getPercentage()) {
            //If tie is broke, return winner
            return team1ConferenceRecord.getConferenceRecord() > team2ConferenceRecord.getPercentage() ? team1 : team2;
        }

        //Next is strength of victory
        let team1SoV = divisionAndConferenceStandings.getTable()[team1.getCode()].getStrengthOfVictory(divisionAndConferenceStandings);
        let team2SoV = divisionAndConferenceStandings.getTable()[team2.getCode()].getStrengthOfVictory(divisionAndConferenceStandings);
        
        if(team1SoV != team2SoV) {
            return team1SoV > team2SoV ? team1 : team2;
        }
        
        //Finally, try strength of schedule
        let team1SoS = divisionAndConferenceStandings.getTable()[team1.getCode()].getStrengthOfSchedule(divisionAndConferenceStandings);
        let team2SoS = divisionAndConferenceStandings.getTable()[team2.getCode()].getStrengthOfSchedule(divisionAndConferenceStandings);

        if(team1SoS != team2SoS) {
            return team1SoS > team2SoS ? team1 : team2;
        }
        
        //No tiebreak
        return null;
    }

    static conferenceTwoTeamsTiebreaker(team1, team2) {
        //Next is conference record
        let conferenceStandings = new Standings(true);

        let team1ConferenceRecord= conferenceStandings.getTable()[team1.getCode()].getConferenceRecord();
        let team2ConferenceRecord = conferenceStandings.getTable()[team2.getCode()].getConferenceRecord();

        if(team1ConferenceRecord.getPercentage() != team2ConferenceRecord.getPercentage()) {
            //If tie is broke, return winner
            return team1ConferenceRecord.getPercentage() > team2ConferenceRecord.getPercentage() ? team1 : team2;
        }

        //Next is common opponents record
        let commonOpponentsStandings =  Comparison.buildTwoTeamsCommonOpponentsRecord(team1, team2);

        //First check that we have a standing
        if(commonOpponentsStandings != null) {
            let team1CommonOpponentRecord = commonOpponentsStandings.getTable()[team1.getCode()].getLeagueRecord();
            let team2CommonOpponentRecord = commonOpponentsStandings.getTable()[team2.getCode()].getLeagueRecord();

            if(team1CommonOpponentRecord.getPercentage() != team2CommonOpponentRecord.getPercentage()) {
                //If tie is broke, return winner
                return team1CommonOpponentRecord.getPercentage() > team2CommonOpponentRecord.getPercentage() ? team1 : team2;
            }
        }

        //Next is strength of victory
        let team1SoV = divisionAndConferenceStandings.getTable()[team1.getCode()].getStrengthOfVictory(divisionAndConferenceStandings);
        let team2SoV = divisionAndConferenceStandings.getTable()[team2.getCode()].getStrengthOfVictory(divisionAndConferenceStandings);

        if(team1SoV != team2SoV) {
            return team1SoV > team2SoV ? team1 : team2;
        }

        //Finally, try strength of schedule
        let team1SoS = divisionAndConferenceStandings.getTable()[team1.getCode()].getStrengthOfSchedule(divisionAndConferenceStandings);
        let team2SoS = divisionAndConferenceStandings.getTable()[team2.getCode()].getStrengthOfSchedule(divisionAndConferenceStandings);

        if(team1SoS != team2SoS) {
            return team1SoS > team2SoS ? team1 : team2;
        }

        //We don't go further for predictive tiebreak
        console.log("No tiebreak between " + team1.getCode() + " and " + team2.getCode());
        return null;
    }

    static sortTable(table) {
        let toReturn = [];
        let perRecord = [];
        let records = []

        //Add teams into an array according to their record
        table.forEach(team => {
            if(perRecord[team.getLeagueRecord().getFormattedPercentage()] === undefined) {
                perRecord[team.getLeagueRecord().getFormattedPercentage()] = [];
                records.push(team.getLeagueRecord().getFormattedPercentage());
            }

            perRecord[team.getLeagueRecord().getFormattedPercentage()].push(team);
        })

        //Add records in order
        records.sort().reverse();

        //Now add per record
        for(let i = 0; i < records.length; i++) {
            switch (perRecord[records[i]].length) {
                case 1:
                    //Add the only team
                    toReturn.push(perRecord[records[i]][0]);
                    break;
                case 2:
                    //Perform the basic sort
                    perRecord[records[i]].sort(Comparison.sortTeams);

                    //Add by order
                    toReturn.push(perRecord[records[i]][0]);
                    toReturn.push(perRecord[records[i]][1]);
                    break;
                default:
                    //We have to use the 3 or plus teams tiebreak
                    let toTiebreak = perRecord[records[i]];
                    if(!this.isDivisionThreePlusTeamsTiebreaker(toTiebreak)) {
                        do {
                            let winner = Comparison.conferenceThreePlusTeamsTiebreaker(toTiebreak);
                            toReturn.push(winner);
                            toTiebreak.splice(toTiebreak.indexOf(winner),1);
                        } while (toTiebreak.length > 2)
                    }

                    //Then sort normally
                    perRecord[records[i]].sort(Comparison.sortTeams);

                    //Add by order
                    toReturn.push(perRecord[records[i]][0]);
                    toReturn.push(perRecord[records[i]][1]);
                    break;
            }
        }

        return toReturn;
    }

    static isDivisionThreePlusTeamsTiebreaker(teams) {
        let firstTeamDivision = teams[0].getDivision();

        for(let i = 1; i < teams.length; i++) {
            if(teams[i].getDivision() != firstTeamDivision) {
                return false;
            }
        }

        return true;
    }

    static conferenceThreePlusTeamsTiebreaker(teams) {
        let perDivision = [];
        let divisions = [];
        let toTiebreak = [];

        teams.forEach(team => {
           if(perDivision[team.getDivision()] === undefined) {
               perDivision[team.getDivision()] = [];
               divisions.push(team.getDivision());
           }

           perDivision[team.getDivision()].push(team);
        });

        divisions.forEach(division => {
            switch(perDivision[division].length) {
                case 1:
                    //Just add to the tiebreaker list
                    toTiebreak.push(perDivision[division][0]);
                    break;
                case 2:
                    //Send to tiebreak the winner of tiebreak
                    toTiebreak.push(this.divisionTwoTeamsTiebreaker(perDivision[division][0], perDivision[division][1]));
                    break;
                default:
                    //TODO divisionThreePlusTiebreaker
                    break;
            }
        });

        //If only two team remaining, perform two teams tiebreak
        if(toTiebreak.length == 2) {
            return Comparison.twoTeamsTiebreak(toTiebreak[0], toTiebreak[1]);
        }

        //At this point we have eliminated all but the highest ranked team in each division
        //Next step is head-o-head sweep
        let headToHeads = [];
        for(let i = 0; i < (toTiebreak.length - 1); i++) {
            this.findHeadToHeads(scores, headToHeads, toTiebreak[i].getCode(), toTiebreak[i+1].getCode());
        }

        //For each team, fill an array with game result
        let h2hResults = [];
        toTiebreak.forEach(team => {
            h2hResults[team.getCode()] = [];
            headToHeads.forEach(game => {
                if((team.getCode() === game.getAwayTeam()) || (team.getCode() === game.getHomeTeam())) {
                    h2hResults[team.getCode()].push(game.getGameResultForTeam(team));
                }
            })
        });

        //Check if a team has defeated others
        h2hResults.forEach(team => {
            //If there are not (nb team - 1) games, the team didn't face every team concerned
            if(h2hResults[team.getCode()].length === (toTiebreak.length - 1)) {
                let hasWonAll = true;

                //If at least a tie or a loss, team don't break tie
                h2hResults[team.getCode()].forEach(game => {
                  if(game != 1) {
                      hasWonAll = false;
                  }
                });

                //If a team swept the other tiebreaker team, it breaks the tie
                if(hasWonAll) {
                    return team;
                }
            }
        });

        //Next is conference record
        //We just need standings
        let standings = new Standings(true);

        let perRecord = [];
        let records = []

        //Add teams into an array according to their record
        toTiebreak.forEach(team => {
            if(perRecord[team.getConferenceRecord().getFormattedPercentage()] === undefined) {
                perRecord[team.getConferenceRecord().getFormattedPercentage()] = [];
                records.push(team.getConferenceRecord().getFormattedPercentage());
            }

            perRecord[team.getConferenceRecord().getFormattedPercentage()].push(team);
        })

        //Add records in order
        records.sort().reverse();

        //If there is only one team with the best record, the tie is broke
        if(perRecord[records[0]].length === 1) {
            return perRecord[records[0]][0];
        }

        //TODO Continue tiebreaker
    }
}
