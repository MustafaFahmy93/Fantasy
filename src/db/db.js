import {
    doc,
    // onSnapshot,
    updateDoc,
    setDoc,
    addDoc,
    deleteDoc,
    collection,
    serverTimestamp,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase";

// const dispPretty = (obj) => {
//     console.log(JSON.stringify(obj, null, '\t'));

// }
const playersRef = collection(db, 'players');
const votesRef = collection(db, 'votes');
// fn
const mean = arr => {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total / arr.length;
};
const median = arr => {
    const { length } = arr;
    arr.sort((a, b) => a - b);
    if (length % 2 === 0) {
        return (arr[length / 2 - 1] + arr[length / 2]) / 2;
    }
    return arr[(length - 1) / 2];
};
const mode = arr => {
    const mode = {};
    let max = 0, count = 0;
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        if (mode[item]) {
            mode[item]++;
        } else {
            mode[item] = 1;
        }
        if (count < mode[item]) {
            max = item;
            count = mode[item];
        }
    }
    return max;
};
const getBestValue = (val) => {
    if (val.length === 0) {
        return 0
    }
    const mean_val = mean(val)
    const median_val = median(val)
    if (median_val > mean_val) {
        return parseInt(median_val)
    } else {
        return parseInt(mean_val)
    }
}
// ////////// Players //////////////////////////////////////////
// Add player
export const AddplayerDB = async (data) => {
    await addDoc(playersRef, {
        ...data,
        createdAt: serverTimestamp(),
    })
        .then((res) => { })
        .catch((err) => { console.log(err) })
}
// delete player
export const delplayerDB = async (pid) => {

    try {
        const playerRef = doc(playersRef, pid);
        await deleteDoc(playerRef);
    } catch (error) {
        console.error(error);
    }
}
export const updatePlayerDB = async (pid, updatedData) => {
    try {
        const playerRef = doc(playersRef, pid);
        await updateDoc(playerRef, {
            ...updatedData,
            lastUpdate: serverTimestamp()
        });
    } catch (error) {
        console.error(error);
    }
}

//  get all players

export const getAllPlayers = async () => {
    const players = {}
    const querySnapshot = await getDocs(playersRef);
    querySnapshot.forEach((doc) => {
        const emptyAttr = {
            pace: [],
            shooting: [],
            passing: [],
            dribbling: [],
            defending: [],
            physicality: [],
            total: 0,
        }
        players[doc.id] = {
            ...doc.data(), ...emptyAttr, pid: doc.id
        }

    });
    // console.log(["init", players])
    return getAllVotesDB().then((votes) => {
        const min_val = 5
        votes.forEach((vote) => {
            // const rating = votes.filter(vote => vote.pid === doc.id)
            if (vote.pace > min_val) players[vote.pid].pace.push(vote.pace);
            if (vote.shooting > min_val) players[vote.pid].shooting.push(vote.shooting)
            if (vote.passing > min_val) players[vote.pid].passing.push(vote.passing)
            if (vote.dribbling > min_val) players[vote.pid].dribbling.push(vote.dribbling)
            if (vote.defending > min_val) players[vote.pid].defending.push(vote.defending)
            if (vote.physicality > min_val) players[vote.pid].physicality.push(vote.physicality)
        });
        // console.log(["fb", players])
        const playersNormalization = []
        for (var key of Object.keys(players)) {
            const pace_val = getBestValue(players[key].pace)
            const shooting_val = getBestValue(players[key].shooting)
            const passing_val = getBestValue(players[key].passing)
            const dribbling_val = getBestValue(players[key].dribbling)
            const defending_val = getBestValue(players[key].defending)
            const physicality_val = getBestValue(players[key].physicality)
            const total = (pace_val + shooting_val + (passing_val * 2) + (dribbling_val * 2) + defending_val + physicality_val) / 8
            const player = {
                id: key,
                votes: (players[key].pace).length,
                name: players[key].name,
                status: players[key].status,
                captain: 0,
                pace: pace_val,
                shooting: shooting_val,
                passing: passing_val,
                dribbling: dribbling_val,
                defending: defending_val,
                physicality: physicality_val,
                total: parseInt(total),
                tcolor: players[key].tcolor
            }
            playersNormalization.push(player)
        }
        // console.log(["app", playersNormalization])
        return playersNormalization
    }).catch((err) => { console.log(err) })

}


//  ============== votes
// Add vote
export const AddvoteDB = async (data) => {
    await addDoc(votesRef, {
        ...data,
        createdAt: serverTimestamp(),
    })
        .then((res) => { })
        .catch((err) => { console.log(err) })
}


// get all votes by uid
export const getAllVotesDB = async () => {
    const userVotes = []
    const q = query(votesRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        userVotes.push({ ...doc.data(), vid: doc.id });
    });
    return userVotes;
}

// update vote by vid
export const updateVoteDB = async (vId, updatedData) => {
    try {
        const voteRef = doc(votesRef, vId);
        await updateDoc(voteRef, {
            ...updatedData,
            lastUpdate: serverTimestamp()
        });
    } catch (error) {
        console.error(error);
    }
}
