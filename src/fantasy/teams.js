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
    let maxPlayerKey;
    arr.map((ele, index) => {
        if (ele.total > max) {
            maxPlayerKey = index;
            max = ele.total;
        }
    });
    return maxPlayerKey

}

export const teamBuilder = (players, nTeam, teamSize) => {
    let teams = [[], [], [], []];
    const nPlayers = players.length;
    let allPlayers = players.slice();
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


export const teamTotalPower = (team) => {
    const teamSize = team.length;
    let totalPower = 0;
    console.log("team");
    console.log(team);
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
    let teams = [[], [], [], []];
    const nPlayers = players.length;
    let allPlayers = players.slice();
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

const teams = () => {



    return (
        <div>teams</div>
    )
}

export default teams