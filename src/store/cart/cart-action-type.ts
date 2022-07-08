import { CategoryItem } from "../categories/category-action-types";
// export const CART_ACTION_TYPE = {
// 	SET_CART_ITEMS: "SET_CART_ITEMS",
// 	SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
// };

//for TS
export enum CART_ACTION_TYPE {
	SET_CART_ITEMS = "SET_CART_ITEMS",
	SET_IS_CART_OPEN = "SET_IS_CART_OPEN",
}

export type CartItems = CategoryItem & {
	quantity: number;
};
