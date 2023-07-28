export function splitInHalf (cookie: String) {

   let slicedTokenOn = cookie.slice(0, cookie.length / 2);
   if (cookie.length % 2 === 0){
       let slicedTokenOff = cookie.slice(cookie.length / 2, cookie.length);
       return [ slicedTokenOn, slicedTokenOff ]
    }
   let slicedTokenOff = cookie.slice(cookie.length / 2, cookie.length + 1);
   return [ slicedTokenOn, slicedTokenOff ]

}