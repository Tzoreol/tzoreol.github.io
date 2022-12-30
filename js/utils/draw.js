class Draw {
    static drawTable(table, table_id) {
        let tbody = document.getElementById(table_id).getElementsByTagName("tbody")[0];
        let index = 0;

        //We also need full standings to fill strength ofs
        let standings = new Standings(true);

        //Clear tbody in case of update
        tbody.innerHTML = "";
        table.forEach(team => {
            let tr = document.createElement("tr");
            tr.classList.add((index % 2) == 0 ? "even" : "odd");

            let name = document.createElement("td");
            name.classList.add("left")
            name.innerText = team.getFullName();

            let league_w = document.createElement("td")
            league_w.innerText = team.getLeagueRecord().getWins();

            let league_l = document.createElement("td")
            league_l.innerText = team.getLeagueRecord().getLosses();

            let league_t = document.createElement("td")
            league_t.innerText = team.getLeagueRecord().getTies();

            let league_pct = document.createElement("td")
            league_pct.innerText = team.getLeagueRecord().getFormattedPercentage();

            let conference_w = document.createElement("td")
            conference_w.innerText = team.getConferenceRecord().getWins();

            let conference_l = document.createElement("td")
            conference_l.innerText = team.getConferenceRecord().getLosses();

            let conference_t = document.createElement("td")
            conference_t.innerText = team.getConferenceRecord().getTies();

            let conference_pct = document.createElement("td")
            conference_pct.innerText = team.getConferenceRecord().getFormattedPercentage();

            let division_w = document.createElement("td")
            division_w.innerText = team.getDivisionRecord().getWins();

            let division_l = document.createElement("td")
            division_l.innerText = team.getDivisionRecord().getLosses();

            let division_t = document.createElement("td")
            division_t.innerText = team.getDivisionRecord().getTies();

            let division_pct = document.createElement("td")
            division_pct.innerText = team.getDivisionRecord().getFormattedPercentage();

            let sov = document.createElement("td");
            sov.innerText = team.getStrengthOfVictory(standings);

            let sos = document.createElement("td");
            sos.innerText = team.getStrengthOfSchedule(standings);

            tr.appendChild(name);
            tr.appendChild(league_w);
            tr.appendChild(league_l);
            tr.appendChild(league_t);
            tr.appendChild(league_pct);
            tr.appendChild(conference_w);
            tr.appendChild(conference_l);
            tr.appendChild(conference_t);
            tr.appendChild(conference_pct);
            tr.appendChild(division_w);
            tr.appendChild(division_l);
            tr.appendChild(division_t);
            tr.appendChild(division_pct);
            tr.appendChild(sov);
            tr.appendChild(sos);
            tbody.appendChild(tr);

            index++;
        });
    }
}
