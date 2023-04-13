import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { getAllPlayers } from '../db/db';

export const playersStore = create(
    persist(
        (set, get) => ({
            playersData: [],
            updatePlayersData: () => {
                getAllPlayers().then((players) => {
                    set(() => ({ playersData: players }))

                }).catch((error) => console.error(error));
            },
            teams: [[], [], [], [], []],
            updateTeams: (teams) => {
                set(() => ({ teams: teams }))
            },


        }
        ), {
        name: 'xtend-players-main-store', // unique name
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        // partialize: (state) => ({}),
        // partialize: (state) => ({ playersData: state.playersData }),
    }
    )

)
