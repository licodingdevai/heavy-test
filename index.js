const os = require('os');

const NUM_WORKERS = os.cpus().length;

console.log(`CPU Stress Test Starting...`);
console.log(`CPU Cores: ${NUM_WORKERS}`);
console.log(`Platform: ${os.platform()}`);

// CPU-intensive fibonacci calculation
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Prime number calculation (heavy)
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function countPrimes(max) {
  let count = 0;
  for (let i = 2; i <= max; i++) {
    if (isPrime(i)) count++;
  }
  return count;
}

// Matrix multiplication (heavy)
function createMatrix(size) {
  const matrix = [];
  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      matrix[i][j] = Math.random() * 100;
    }
  }
  return matrix;
}

function multiplyMatrices(a, b) {
  const size = a.length;
  const result = [];
  for (let i = 0; i < size; i++) {
    result[i] = [];
    for (let j = 0; j < size; j++) {
      result[i][j] = 0;
      for (let k = 0; k < size; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

// Main stress test loop
function runStressTest() {
  let iteration = 0;

  const interval = setInterval(() => {
    iteration++;
    console.log(`\n--- Iteration ${iteration} ---`);
    const startTime = Date.now();

    // Fibonacci stress
    console.log('Running Fibonacci(40)...');
    const fibStart = Date.now();
    const fibResult = fibonacci(40);
    console.log(`Fibonacci(40) = ${fibResult} (${Date.now() - fibStart}ms)`);

    // Prime counting stress
    console.log('Counting primes up to 100000...');
    const primeStart = Date.now();
    const primeCount = countPrimes(100000);
    console.log(`Primes found: ${primeCount} (${Date.now() - primeStart}ms)`);

    // Matrix multiplication stress
    console.log('Matrix multiplication (300x300)...');
    const matrixStart = Date.now();
    const matrixA = createMatrix(300);
    const matrixB = createMatrix(300);
    multiplyMatrices(matrixA, matrixB);
    console.log(`Matrix done (${Date.now() - matrixStart}ms)`);

    console.log(`Total iteration time: ${Date.now() - startTime}ms`);
    console.log(`Memory usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
  }, 100); // Very short interval for maximum CPU pressure

  // Run indefinitely until killed
  process.on('SIGINT', () => {
    clearInterval(interval);
    console.log('\nStress test stopped.');
    process.exit(0);
  });
}

console.log('\nStarting infinite CPU stress test...');
console.log('Press Ctrl+C to stop\n');
runStressTest();
