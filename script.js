const fields = {
  bolusUnitsInput: document.getElementById("bolusUnitsInput"),
  infusionUnitsPerHrInput: document.getElementById("infusionUnitsPerHrInput"),
  dialysisHours: document.getElementById("dialysisHours"),
  syringeUnits: document.getElementById("syringeUnits"),
  syringeMl: document.getElementById("syringeMl"),
};

const outputs = {
  bolusUnits: document.getElementById("bolusUnits"),
  bolusMl: document.getElementById("bolusMl"),
  infusionUnitsPerHr: document.getElementById("infusionUnitsPerHr"),
  mlPerHr: document.getElementById("mlPerHr"),
  totalUnits: document.getElementById("totalUnits"),
  concentration: document.getElementById("concentration"),
};

const form = document.getElementById("calculator");

function parseValue(element) {
  const value = Number.parseFloat(element.value);
  return Number.isFinite(value) && value >= 0 ? value : null;
}

function formatValue(value, digits = 1) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return new Intl.NumberFormat("ja-JP", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value);
}

function updateResults() {
  const bolusUnits = parseValue(fields.bolusUnitsInput);
  const infusionUnitsPerHr = parseValue(fields.infusionUnitsPerHrInput);
  const dialysisHours = parseValue(fields.dialysisHours);
  const syringeUnits = parseValue(fields.syringeUnits);
  const syringeMl = parseValue(fields.syringeMl);
  const concentration =
    syringeUnits !== null && syringeMl !== null && syringeMl > 0 ? syringeUnits / syringeMl : null;
  const bolusMl =
    bolusUnits !== null && concentration !== null && concentration > 0 ? bolusUnits / concentration : null;

  const mlPerHr =
    infusionUnitsPerHr !== null && concentration !== null && concentration > 0
      ? infusionUnitsPerHr / concentration
      : null;
  const totalUnits =
    bolusUnits !== null && infusionUnitsPerHr !== null && dialysisHours !== null
      ? bolusUnits + infusionUnitsPerHr * dialysisHours
      : null;

  outputs.bolusUnits.textContent = formatValue(bolusUnits, 1);
  outputs.bolusMl.textContent = formatValue(bolusMl, 1);
  outputs.infusionUnitsPerHr.textContent = formatValue(infusionUnitsPerHr, 1);
  outputs.mlPerHr.textContent = formatValue(mlPerHr, 1);
  outputs.totalUnits.textContent = formatValue(totalUnits, 1);
  outputs.concentration.textContent = formatValue(concentration, 1);
}

Object.values(fields).forEach((field) => {
  field.addEventListener("input", updateResults);
});

form.addEventListener("reset", () => {
  window.requestAnimationFrame(updateResults);
});

updateResults();
