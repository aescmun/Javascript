function eurosADolares(euros, cambio = 1.01) {
  return euros / cambio;
}

console.log(eurosADolares(100).toFixed(2));
console.log(eurosADolares(100, 0.95).toFixed(2));