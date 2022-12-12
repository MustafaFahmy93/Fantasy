import React from 'react'
import players from '../data/players.json'

// let playersCopy = players.copy()
const getMinPower = (obj) => {
    let min = 1000;
    let minPlayerKey;
    Object.keys(obj).forEach(function (key, index) {
        if (obj[key].totalPower < min) {
            minPlayerKey = key;
            min = obj[key].totalPower;
        }
    });
    return minPlayerKey

}
const getMaxPower = (obj) => {
    let max = 0;
    let maxPlayerKey;
    Object.keys(obj).forEach(function (key, index) {
        if (obj[key].totalPower > max) {
            maxPlayerKey = key;
            max = obj[key].totalPower;
        }
    });
    return maxPlayerKey

}

export const teamBuilder = (nTeam, teamSize) => {
    let teams = [[], [], [], []];
    const nPlayers = Object.keys(players).length;
    let allPlayers = structuredClone(players);
    let minSwitch = true;
    for (let p = 0; p < nPlayers; p++) {
        for (let t = 0; t < nTeam; t++) {
            let len = Object.keys(allPlayers).length;
            if (len > 0 && teams[t].length < teamSize) {

                if (minSwitch) {
                    let minK = getMinPower(allPlayers);
                    teams[t].push(allPlayers[minK]);
                    delete allPlayers[minK];
                } else {
                    let minK = getMaxPower(allPlayers);
                    teams[t].push(allPlayers[minK]);
                    delete allPlayers[minK];
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
    team.map((player, index) => {
        totalPower += player.totalPower;
    });
    return parseInt(totalPower / teamSize);
}

// ==================
const randomPick = function (obj) {
    var keys = Object.keys(obj);
    // return obj[keys[keys.length * Math.random() << 0]];
    return keys[keys.length * Math.random() << 0];
};
export const teamBuilderRandom = (nTeam, teamSize) => {
    let teams = [[], [], [], []];
    const nPlayers = Object.keys(players).length;
    let allPlayers = structuredClone(players);
    for (let p = 0; p < nPlayers; p++) {
        for (let t = 0; t < nTeam; t++) {
            let len = Object.keys(allPlayers).length;
            if (len > 0 && teams[t].length < teamSize) {
                let rKey = randomPick(allPlayers);
                teams[t].push(allPlayers[rKey]);
                delete allPlayers[rKey];
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