import React from 'react'

const getMinPower = (arr) => {
    let min = 1000;
    let minPlayerKey;
    arr.map((ele, index) => {
        if (ele.total < min) {
            minPlayerKey = index;
            min = ele.total;
        }
    });
    return minPlayerKey

}
const getMaxPower = (arr) => {
    let max = 0;
    let maxPlayerKey = -1;
    arr.map((ele, index) => {
        if (ele.total > max) {
            maxPlayerKey = index;
            max = ele.total;
        }
    });
    return maxPlayerKey

}
export const playersFilter = (players) => {
    let playersFilterd = [];
    players.map((player, index) => {
        if (player.status === 1) {
            playersFilterd.push(player);
        }
    })
    return playersFilterd;
}
export const teamBuilder = (players, nTeam, teamSize) => {
    nTeam = parseInt(nTeam);
    teamSize = parseInt(teamSize);
    let playersFilterd = playersFilter(players);
    let teams = [[], [], [], [], []];
    const nPlayers = playersFilterd.length;
    let allPlayers = playersFilterd.slice();
    // console.log(playersFilterd);
    let minSwitch = true;
    for (let p = 0; p < nPlayers; p++) {
        for (let t = 0; t < nTeam; t++) {
            let len = allPlayers.length;
            if (len > 0 && teams[t].length < teamSize) {

                if (minSwitch) {
                    let minK = getMinPower(allPlayers);
                    teams[t].push(allPlayers[minK]);
                    allPlayers.splice(minK, 1)

                } else {
                    let maxK = getMaxPower(allPlayers);
                    teams[t].push(allPlayers[maxK]);
                    allPlayers.splice(maxK, 1)
                }
            }
        }
        minSwitch ? minSwitch = false : minSwitch = true;
    }

    // console.log(teams);
    return teams;
}


export const teamTotalPower = (team, teamSize) => {
    // const teamSize = team.length;
    let totalPower = 0;
    // console.log("team");
    // console.log(team);
    team.map((player, index) => {
        totalPower += player.total;
    });
    return parseInt(totalPower / teamSize);
}

// ==================
const randomPickObject = function (obj) {
    let keys = Object.keys(obj);
    // return obj[keys[keys.length * Math.random() << 0]];
    return keys[keys.length * Math.random() << 0];
};
const randomPickArray = function (arr) {
    const random = Math.floor(Math.random() * arr.length);
    return random;
};
export const teamBuilderRandom = (players, nTeam, teamSize) => {
    nTeam = parseInt(nTeam);
    teamSize = parseInt(teamSize);
    let playersFilterd = playersFilter(players);
    let teams = [[], [], [], [], []];
    const nPlayers = playersFilterd.length;
    let allPlayers = playersFilterd.slice();
    for (let p = 0; p < nPlayers; p++) {
        for (let t = 0; t < nTeam; t++) {
            let len = allPlayers.length;
            if (len > 0 && teams[t].length < teamSize) {
                let rKey = randomPickArray(allPlayers);
                teams[t].push(allPlayers[rKey]);
                allPlayers.splice(rKey, 1)
            }
        }
    }

    // console.log(teams);
    return teams;
}
// Captains 
const removeCaptains = (players, captainsId) => {
    let newPlayers = [];
    let captainsData = [];
    const nPlayers = players.length;
    // console.log(["captains", captainsId]);
    for (let p = 0; p < nPlayers; p++) {

        if (!captainsId.includes(players[p].id)) {
            newPlayers.push(players[p]);
        } else {
            captainsData.push(players[p]);
        }
    }

    return [newPlayers, captainsData];
}
export const teamBuilderCaptainsRandom = (players, captainsId, nTeam, teamSize) => {
    teamSize = parseInt(teamSize);
    let playersFilterd = playersFilter(players);
    let teams = [[], [], [], [], []];
    let [newPlayers, captainsData] = removeCaptains(playersFilterd, captainsId)
    nTeam = captainsData.length; //parseInt(nTeam);
    // add captains
    // for (let index = 0; index < captainsData.length; index++) {
    for (let index = 0; index < nTeam; index++) {
        teams[index].push(captainsData[index]);
    }
    // console.log(["newPlayers", newPlayers]);
    const nPlayers = newPlayers.length;
    let allPlayers = newPlayers.slice();
    for (let p = 0; p < nPlayers; p++) {
        for (let t = 0; t < nTeam; t++) {
            let len = allPlayers.length;
            if (len > 0 && teams[t].length < teamSize) {
                let rKey = randomPickArray(allPlayers);
                teams[t].push(allPlayers[rKey]);
                allPlayers.splice(rKey, 1)
            }
        }
    }

    // console.log(teams);
    return teams;
}



// ====================================
export const getTeamName = (team, captainsId) => {
    let [newPlayers, captains] = removeCaptains(team, captainsId)
    // console.log(["getTeamName", newPlayers, captains]);
    if (captains.length > 0) {

        return captains[0].name
    } else {
        let maxPlayerKey = getMaxPower(team);
        if (maxPlayerKey > -1) {
            return team[maxPlayerKey].name
        } else {
            return "X"
        }

    }

}

// ====================================
export const getPlayerInfo = (players, playerId) => {
    const nPlayers = players.length;
    for (let p = 0; p < nPlayers; p++) {
        if (players[p].id === playerId) {
            return players[p]
        }
    }
}
const teams = () => {



    return (
        <div>teams</div>
    )
}

export default teams