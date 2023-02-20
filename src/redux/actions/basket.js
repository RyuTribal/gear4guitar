export const BASKET_SET = "BASKET_SET";
export const BASKET_GET = "BASKET_GET";
export const BASKET_REMOVE = "BASKET_REMOVE";


//Action Creator
export const basketSet = (basket) => ({
   type: BASKET_SET,
   value: basket
});

export const basketGet = () => ({
    type: BASKET_GET,
 });

export const basketRemove = () => ({
    type: BASKET_REMOVE
});