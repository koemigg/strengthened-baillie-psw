'use strict'

const smallPrime = [
  2n,
  3n,
  5n,
  7n,
  11n,
  13n,
  17n,
  19n,
  23n,
  29n,
  31n,
  37n,
  41n,
  43n,
  47n,
  53n,
  59n,
  61n,
  67n,
  71n,
  73n,
  79n,
  83n,
  89n,
  97n,
  101n,
  103n,
  107n,
  109n,
  113n,
  127n,
  131n,
  137n,
  139n,
  149n,
  151n,
  157n,
  163n,
  167n,
  173n,
  179n,
  181n,
  191n,
  193n,
  197n,
  199n,
  211n,
  223n,
  227n,
  229n,
  233n,
  239n,
  241n,
  251n,
  257n,
  263n,
  269n,
  271n,
  277n,
  281n,
  283n,
  293n,
  307n,
  311n,
  313n,
  317n,
  331n,
  337n,
  347n,
  349n,
  353n,
  359n,
  367n,
  373n,
  379n,
  383n,
  389n,
  397n,
  401n,
  409n,
  419n,
  421n,
  431n,
  433n,
  439n,
  443n,
  449n,
  457n,
  461n,
  463n,
  467n,
  479n,
  487n,
  491n,
  499n
]

/**
 * Generates an odd random number of `bitLength'
 *
 * @param {number} bitLength
 * @return {bigint} result - odd random number of `bitLength'
 */
const rand = (bitLength) => {
  let result = 1n
  let twoPow = 2n
  for (let i = 1; i < bitLength - 1; i++) {
    if (Math.random() >= 0.5) {
      result += twoPow
    }
    twoPow = twoPow << 1n
  }
  result += twoPow
  return result
}

/**
 * Computes modular exponentiation
 *
 * @param {bigint} b - base
 * @type {(number | bigint)}  exp - exponent
 * @param {bigint} m - modulus
 * @return {bigint} r - b^exp (mod m)
 */
const modPow = (b, exp, m) => {
  let r = b
  const e = exp.toString(2).split('')
  const k = e.length
  for (let i = 1; i < k; i++) {
    r = (r * r) % m
    if (e[i] === '1') {
      r = (r * b) % m
    }
  }
  return r
}

/**
 * Computes Jacobi symbol
 *
 * @param {bigint} a - integer
 * @param {bigint} p - positive odd number
 * @return {number} j - Jacobi symbol
 */
const jacobi = (a, p) => {
  let j = 1 //結果
  if (p === 1n) return 1
  if (a % p === 0n) return 0
  if (a < 0n) {
    a = -a
    if ((p & 3n) === 3n) {
      j = -j
    }
  }
  while (a > 1n) {
    if ((a & 1n) === 0n) {
      a = a >> 1n
      if ((p & 7n) === 3n || (p & 7n) === 5n) {
        j = -j
      }
    } else {
      ;[a, p] = [p, a]
      if ((a & 3n) === 3n && (p & 3n) === 3n) {
        j = -j
      }
      if (a > p) {
        a = a % p
      }
    }
  }
  return j
}

/**
 * Determines whether input n is a square number or not
 *
 * @param {bigint} n - natural number
 * @return {boolean} - true: square, false: non-square
 */
const square = (n) => {
  let low = 0n
  let high = n
  let mid = 0n
  let mid2 = 0n
  while (low <= high) {
    mid = (low + high) >> 1n
    mid2 = mid ** 2n
    if (mid2 === n) {
      return true
    } else if (mid2 > n) {
      high = mid - 1n
    } else {
      low = mid + 1n
    }
  }
  return false
}

/** Miller-Rabin primaliry test
 *
 * @param {bigint} n - odd number >=3
 * @param {bigint} a - base
 * @return {boolean} - true: probable prime, false: composite
 */
const millerRabin = (n, a) => {
  let r = 0n
  let s = 0
  let t = 0n

  t = n - 1n
  do {
    t = t >> 1n
    s = s + 1
  } while ((t & 1n) === 0n)

  r = modPow(a, t, n)
  if (r === 1n) return true
  for (let i = 0; i < s; i++) {
    if (r === n - 1n) return true
    r = (r * r) % n
  }
  return false
}

/** Strengthened Baillie-PSW primality test
 *
 * @param {bigint} n - odd number >= 3
 * @return {boolean} - true: probable prime, false: composite
 */
const bailliePSW = (n) => {
  let check = false // results
  let t = 0n //n+1=t2^s
  let s = 0
  let d = 5n // parameters
  let p = 1n
  let q = 0n
  let u0 = 0n // Lucas sequences
  let v0 = 2n
  let u1 = 1n
  let v1 = 1n
  let q_l = 0n // left-hand side of Euler's criterion
  let q_r = 0n // right-hand side of Euler's criterion

  // Miller-Rabin test with base 2
  if (millerRabin(n, 2n) === false) return false

  // Finds s and t satisfying n+1 = t2^s
  t = n + 1n
  do {
    t = t >> 1n
    s = s + 1
  } while ((t & 1n) === 0n)
  // if n is a square number
  if (square(n)) return false
  // Computes D and Q
  while (jacobi(d, n) !== -1) {
    if (d > 0n) d = -(d + 2n)
    else d = -(d - 2n)
  }
  if (d === 5n) {
    // d=5 implies q=-1
    p = 5n
    q = 5n
    v1 = 5n
  } else {
    q = (1n - d) >> 2n
  }

  // Lucas test
  const bit = (n + 1n).toString(2).split('')
  // Converts n+1 to a binary string and stores it in an array with each character as its element
  const length = bit.length - 1 // bit数の最後 last bit number
  const tLength = length - s //tのbit数 bit length of t
  for (let i = 1; i <= length; i++) {
    // Calculation starts with subscript 1->2(bit[1])
    // This calculation is always executed regardless of bit value
    u0 = (u1 * v1) % n
    v0 = (v1 * v1 + d * u1 * u1) % n
    if ((v0 & 1n) != 0n) {
      // if v is odd, then add n so that v is even
      v0 = v0 + n
    }
    v0 = (v0 >> 1n) % n
    u1 = u0
    v1 = v0
    // Calculation for the case where a bit in question is 1
    if (bit[i] === '1') {
      u1 = (p * u0 + v0) % n
      if ((u1 & 1n) !== 0n) {
        // if u is odd
        u1 = u1 + n
      }
      u1 = (u1 >> 1n) % n
      v1 = (d * u0 + p * v0) % n
      if ((v1 & 1n) !== 0n) {
        // if v is odd
        v1 = v1 + n
      }
      v1 = (v1 >> 1n) % n
    }

    // Strong Lucas test
    // Nothing is done if it is determined to be a probable prime, or i is less than the bit length of t
    if (check === true || i < tLength) {
    } else if (i === tLength) {
      //iがtのbit数のとき
      // if i is equal to the bit length of t
      if (u1 === 0n || v1 === 0n) check = true
    } else if (i < length && v1 === 0n) {
      // if i is greater than the bit length of t
      check = true
    }
  }
  if (check === false) return false

  // Lucas-V test
  if (v1 === 2n * q) {
    // return true;
  } else if (2n * q - v1 === n || v1 - 2n * q === n) {
    // return true;
  } else {
    return false
  }

  // Euler's criterion test
  q_l = modPow(q, (n + 1n) / 2n, n)
  q_r = BigInt(jacobi(q, n))
  if (q_l === q * q_r) {
    return true
  } else if (q * q_r - q_l === n || q_l - q * q_r === n) {
    return true
  } else {
    return false
  }
}

/** Primality test by strengthened Baillie-PSW
 *
 * @param {bigint} n - odd number
 * @return {boolean} - true: probable prime, false: composite
 */
const isProbablePrime = (n) => {
  // Return false if divisible by a small prime
  for (const e of smallPrime) {
    if (n === e) return true
    else if (n % e === 0n) return false
  }
  return bailliePSW(n)
}

/** Finds a probable prime number of `bitLength'
 *
 * @param {number} bitLength
 * @return {bigint} n - probable prime number of `bitLength'
 */
const probablePrime = (bitLength) => {
  let n = rand(bitLength)
  while (isProbablePrime(n) === false) n = rand(bitLength)
  return n
}

/** Generates the smallest prime number (next probable prime number) greater than or equal to a given number
 *
 * @param {bigint} n - odd number >= 3
 * @return {bigint} n - probable prime number
 */
const nextProbablePrime = (n) => {
  while (isProbablePrime(n) === false) n += 2n
  return n
}

/** Generates the smallest prime number (next probable prime number) greater than or equal to a random number of `bitLength'
 *
 * @param {number} bitLength
 * @return {bigint} n - probable prime number
 */
const nextProbablePrimeBit = (bitLength) => {
  let n = rand(bitLength);
  while(isProbablePrime(n) === false)
    n += 2n;
  return n;
};

/** Generates a safe prime
 *
 * @param {bigint} n - odd number >= 3, which is a seed for a
 * @return {bigint} b - safe prime b = 2a + 1, a: next probable prime generated from n
 */
const safePrimeRandom = (n) => {
  let a = nextProbablePrime(n)
  let b = (a << 1n) + 1n
  while (isProbablePrime(b) === false) {
    a = nextProbablePrime(a + 2n)
    b = (a << 1n) + 1n
  }
  return b
}

/** Generates a safe prime from a random number of `bitLength'
 *
 * @param {number} bitLength - bitlength of a next probable prime of `bitLength'
 * @return {bigint} b - safe prime b = 2a + 1
 */
const safePrimeBit = (bitLength) => {
  let a = nextProbablePrimeBit(bitLength);
  let b = (a << 1n) + 1n;
  while(isProbablePrime(b) === false){
    a = nextProbablePrime(a+2n);
    b = (a << 1n) + 1n;
  }
  return b;
};

export { rand, isProbablePrime, probablePrime, nextProbablePrime, nextProbablePrimeBit, safePrimeRandom, safePrimeBit }
