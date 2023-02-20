export function uniqueHash() :number{
  return Math.round(new Date().getTime() * Math.random());
}
