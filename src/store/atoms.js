import { atom } from "jotai";

const modalAtom = atom(false);
const cartAtom = atom([]);
const totalQtyAtom = atom(0);
const totalAmtAtom = atom(0);
const isCustomModalOpenAtom = atom(false); 

export {
  modalAtom,
  cartAtom,
  totalQtyAtom,
  totalAmtAtom,
  isCustomModalOpenAtom
};