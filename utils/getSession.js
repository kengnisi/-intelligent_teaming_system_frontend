export function getSession(str) {
  console.log(str)
  const projnam_sess = str.split(" ")[0]
  const projnam_sess_sig = str.split(" ")[8].split(",")[1].split(";")[0]
  return projnam_sess+" "+projnam_sess_sig
}