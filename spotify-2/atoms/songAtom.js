import { atom } from "recoil";

// vybrané id písničky
export const currentTrackIdState = atom({
    key: "currentTrackIdState",
    default: null,
});

// hraje/nehraje
export const isPlayingState = atom({
    key: "isPlayingState",
    default: false,
});