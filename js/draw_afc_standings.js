let standings = new Standings(true);
let conference = [];

Object.values(standings.getTable()).forEach(team => {
    if(team.getConference() === "AFC") {
        conference.push(team);
    }
});

Draw.drawTable(conference, "afc");
