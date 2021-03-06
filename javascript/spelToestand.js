const toets = (spelToestand, plek, bewerking, waarde) =>
  (bewerking === "=" && spelToestand[plek] === waarde) ||
  (bewerking === "!" && spelToestand[plek] !== waarde) ||
  (bewerking === ">" && spelToestand[plek] > waarde) ||
  (bewerking === "<" && spelToestand[plek] < waarde);

const specialeCondities = ["k", "c"];
const toegestaan = (spelToestand, bewering) => {
  if (bewering === "END") return false;

  let plek = "";
  let bewerking = "";
  let waarde = "";
  for (let i = 0; i < bewering.length; i++) {
    const karakter = bewering[i];
    if (/\d/.test(karakter) || specialeCondities.includes(karakter)) {
      bewerking === "" ? (plek += karakter) : (waarde += karakter);
    } else if (karakter === ";") {
      if (
        !toets(
          spelToestand,
          parseInt(plek, 10),
          bewerking,
          parseInt(waarde, 10)
        )
      ) {
        if (!specialeCondities.includes(plek)) return false;
      }
      plek = "";
      waarde = "";
      bewerking = "";
    } else {
      bewerking += karakter;
    }
  }

  if (bewerking !== "") {
    if (specialeCondities.includes(plek)) return true;
    return toets(
      spelToestand,
      parseInt(plek, 10),
      bewerking,
      parseInt(waarde, 10)
    );
  }

  return true;
};

const muteer = (spelToestand, plek, bewerking, waarde) => {
  if (bewerking === "=") {
    spelToestand[plek] = waarde;
  }
  if (bewerking === "+") {
    spelToestand[plek] += waarde;
  }
  if (bewerking === "-") {
    spelToestand[plek] -= waarde;
  }
  if (bewerking === "r") {
    spelToestand[plek] = Math.min(
      waarde,
      Math.max(1, Math.ceil(Math.random() * waarde))
    );
  }
};

const voerActieUit = (spelToestand, actie) => {
  let plek = "";
  let bewerking = "";
  let waarde = "";
  for (let i = 0; i < actie.length; i++) {
    const karakter = actie[i];
    if (/\d/.test(karakter)) {
      bewerking === "" ? (plek += karakter) : (waarde += karakter);
    } else if (karakter === ";") {
      muteer(spelToestand, parseInt(plek, 10), bewerking, parseInt(waarde, 10));
      plek = "";
      waarde = "";
      bewerking = "";
    } else {
      bewerking += karakter;
    }
  }

  if (bewerking !== "") {
    muteer(spelToestand, parseInt(plek, 10), bewerking, parseInt(waarde, 10));
  }
};
module.exports = { toegestaan, voerActieUit };
