import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { getAllPlayers } from '../db/db';

const players = [
    {
        "id": 12,
        "name": "Omar",
        "status": 0,
        "captain": 0,
        "pace": 86,
        "shooting": 91,
        "passing": 93,
        "dribbling": 91,
        "defending": 84,
        "physicality": 90,
        "total": 89,
        "tcolor": "white"
    },
    {
        "id": 13,
        "name": "Nader",
        "status": 0,
        "captain": 0,
        "pace": 37,
        "shooting": 65,
        "passing": 81,
        "dribbling": 71,
        "defending": 59,
        "physicality": 55,
        "total": 61,
        "tcolor": "red"
    },
    {
        "id": 15,
        "name": "Mamdouh",
        "status": 0,
        "captain": 0,
        "pace": 100,
        "shooting": 90,
        "passing": 71,
        "dribbling": 93,
        "defending": 62,
        "physicality": 66,
        "total": 80,
        "tcolor": "black-white"
    },
    {
        "id": 16,
        "name": "Awad",
        "status": 1,
        "captain": 0,
        "pace": 100,
        "shooting": 82,
        "passing": 89,
        "dribbling": 100,
        "defending": 75,
        "physicality": 46,
        "total": 82,
        "tcolor": "blue"
    },
    {
        "id": 17,
        "name": "Shady",
        "status": 1,
        "captain": 0,
        "pace": 73,
        "shooting": 72,
        "passing": 66,
        "dribbling": 69,
        "defending": 65,
        "physicality": 81,
        "total": 71,
        "tcolor": "red"
    },
    {
        "id": 18,
        "name": "Taw",
        "status": 0,
        "captain": 0,
        "pace": 91,
        "shooting": 63,
        "passing": 69,
        "dribbling": 73,
        "defending": 71,
        "physicality": 72,
        "total": 73,
        "tcolor": "black"
    },
    {
        "id": 19,
        "name": "Waly",
        "status": 0,
        "captain": 0,
        "pace": 83,
        "shooting": 74,
        "passing": 73,
        "dribbling": 65,
        "defending": 71,
        "physicality": 94,
        "total": 76,
        "tcolor": "white"
    },
    {
        "id": 20,
        "name": "Fahmy",
        "status": 1,
        "captain": 0,
        "pace": 85,
        "shooting": 69,
        "passing": 75,
        "dribbling": 73,
        "defending": 82,
        "physicality": 67,
        "total": 75,
        "tcolor": "white"
    },
    {
        "id": 21,
        "name": "Hadi",
        "status": 0,
        "captain": 0,
        "pace": 72,
        "shooting": 92,
        "passing": 90,
        "dribbling": 88,
        "defending": 84,
        "physicality": 80,
        "total": 84,
        "tcolor": "red"
    },
    {
        "id": 22,
        "name": "Walid H",
        "status": 0,
        "captain": 0,
        "pace": 84,
        "shooting": 80,
        "passing": 87,
        "dribbling": 83,
        "defending": 79,
        "physicality": 78,
        "total": 81,
        "tcolor": "black"
    },
    {
        "id": 23,
        "name": "Nabil",
        "status": 1,
        "captain": 0,
        "pace": 79,
        "shooting": 76,
        "passing": 77,
        "dribbling": 70,
        "defending": 86,
        "physicality": 88,
        "total": 79,
        "tcolor": "black"
    },
    {
        "id": 24,
        "name": "Negm",
        "status": 1,
        "captain": 0,
        "pace": 81,
        "shooting": 69,
        "passing": 72,
        "dribbling": 62,
        "defending": 70,
        "physicality": 82,
        "total": 72,
        "tcolor": "blue"
    },
    {
        "id": 25,
        "name": "Hussein",
        "status": 0,
        "captain": 0,
        "pace": 60,
        "shooting": 57,
        "passing": 63,
        "dribbling": 59,
        "defending": 58,
        "physicality": 72,
        "total": 61,
        "tcolor": "black-white"
    },
    {
        "id": 26,
        "name": "Noor",
        "status": 1,
        "captain": 0,
        "pace": 62,
        "shooting": 69,
        "passing": 71,
        "dribbling": 72,
        "defending": 85,
        "physicality": 68,
        "total": 71,
        "tcolor": "blue"
    },
    {
        "id": 27,
        "name": "Yehia F",
        "status": 0,
        "captain": 0,
        "pace": 55,
        "shooting": 55,
        "passing": 64,
        "dribbling": 55,
        "defending": 76,
        "physicality": 79,
        "total": 64,
        "tcolor": "black"
    },
    {
        "id": 28,
        "name": "Bahie",
        "status": 0,
        "captain": 0,
        "pace": 76,
        "shooting": 70,
        "passing": 83,
        "dribbling": 76,
        "defending": 75,
        "physicality": 87,
        "total": 77,
        "tcolor": "black"
    },
    {
        "id": 38,
        "name": "Deraz",
        "status": 1,
        "captain": 0,
        "pace": 57,
        "shooting": 84,
        "passing": 83,
        "dribbling": 87,
        "defending": 84,
        "physicality": 87,
        "total": 80,
        "tcolor": "red"
    },
    {
        "id": 39,
        "name": "Magdy",
        "status": 0,
        "captain": 0,
        "pace": 82,
        "shooting": 79,
        "passing": 72,
        "dribbling": 60,
        "defending": 66,
        "physicality": 78,
        "total": 72,
        "tcolor": "blue"
    },
    {
        "id": 40,
        "name": "Naga",
        "status": 1,
        "captain": 0,
        "pace": 85,
        "shooting": 86,
        "passing": 83,
        "dribbling": 73,
        "defending": 89,
        "physicality": 77,
        "total": 82,
        "tcolor": "red"
    }
]

export const playersStore = create(
    persist(
        (set, get) => ({
            playersData: [],
            updatePlayersData: () => {
                getAllPlayers().then((players) => {
                    set(() => ({ playersData: players }))

                }).catch((error) => console.error(error));
            },

        }
        ), {
        name: 'xtend-players-storage', // unique name
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        // partialize: (state) => ({}),
        // partialize: (state) => ({ playersData: state.playersData }),
    }
    )

)
