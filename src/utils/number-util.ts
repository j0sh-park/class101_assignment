export const numberWithCommas = (x: number | string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const priceString = (x: number | string) => {
  return `${numberWithCommas(x)}원`
}
