/**
 * Devuelve los primeros 5 caracteres de la dirección, seguidos de 3 puntos, seguidos de los últimos 4 caracteres de la
 * dirección.
 * @param address - La dirección para acortar.
 */
export const shortenAddress = (address) => address.substring(0, 5) + "..." + address.substring(address.length - 4);
