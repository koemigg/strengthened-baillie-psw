# Strengthened Baillie-PSW

npm package for probabilistic primality test and probable prime generation based on **Strengthening the Baillie-PSW primality test**[^1].

[^1]:
    Robert Baillie, Andrew Fiori, and Samuel S Wagstaff Jr,
    Strengthening the Baillie-PSW primality test,
    Mathematics of Computation, Volume 90, Number 330,
    July 2021, pp. 1931--1955.
    Also available at https://arxiv.org/abs/2006.14425 .

## Installing

```bash
npm i s-bpsw
```

## Importing

#### Node.js - require

```javascript
import { isProbablePrime, probablePrime, nextProbablePrime } from 's-bpsw'
// or import all of the module's function
// import * as sbpsw from 's-bpsw'
// usage:
// console.log(sbpsw.isProbablePrime(17)) // True
```

#### Node.js - ES6 or TypeScript

```javascript
const sbpsw = require('s-bpsw')
// usage:
// console.log(sbpsw.isProbablePrime(17)) // True
```

## Usage

#### isProbablePrime ( value )

```javascript
console.log(isProbablePrime(2324632861)) // True
console.log(isProbablePrime(3616199781)) // False
```

#### probablePrime ( bitLength )

Randomly generates a probable prime number of `bitLength`.

```javascript

```

#### nextProbablePrime ( value )

Generates the smallest probable prime number greater than or equal to `value`.

<!-- ```javascript

``` -->

#### nextProbablePrimeBit ( bitLength )

Generates the smallest prime number (next probable prime number) greater than or equal to a random number of `bitLength`.

#### rand ( bitLength )

Generates a random number of `bitLength`.

```javascript
const random = rand(32) // 2881299645
console.log(isProbablePrime(random)) // False

prime = nextProbablePrime(random) // 2881299647
console.log(isProbablePrime(prime)) // True
```

#### safePrimeRandom ( value )

Generates a probable safe prime from the smallest probable prime number greater than or equal to `value`.

<!-- ```javascript

``` -->

#### safePrimeBit ( bitLength )

Generates a safe prime from a random number of `bitLength`.

<!-- ```javascript

``` -->

## License

See [LICENSE](https://github.com/Harxxki/bailie-psw/blob/master/LICENSE).

## Author

- Nanako OKADA
- Haruki MORI ([@Harxxki](https://github.com/Harxxki))
- Miwako MISHIMA ([@m-miwako](https://github.com/m-miwako))
