import { atom } from "recoil";

export const playlistState = atom({
    key: "playlistState",
    default: null,
});

export const playlistIdState = atom({
    key: "playlistIdState", // id atomu, dva atomy nemohou mít stejné klíče, za pomocí klíče se na atom odkazujeme
    default:'4klXQaRWt0FsefHXcbdoXg',
});