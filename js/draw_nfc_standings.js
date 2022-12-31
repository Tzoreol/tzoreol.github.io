let standings = new Standings(true);
let conference = [];

Object.values(standings.getTable()).forEach(team => {
    if(team.getConference() === "NFC") {
        conference.push(team);
    }
});

Draw.drawTable(conference, "nfc");
