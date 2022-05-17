# Strengthed Baillie-PSW
Test if a number is a prime based on **Strengthed the Baillie-PSW primality test**[^1].

[^1]: Robert Baillie, Andrew Fiori, and Samuel S Wagstaff Jr,
Strengthening the Baillie-PSW primality test,
Mathematics of Computation, Volume 90, Number 330,
July 2021, pp. 1931--1955.
Also available at https://arxiv.org/abs/2006.14425 .

A prime number is defined as an integer value greater than `1` which is only divisible by `1` and itself.

## Installation

```
npm i s-bpsw
```

## Usage

```
import sbpsw from 's-bpsw'
```

#### isProbablePrime ( value )
```
console.log(sbpsw.isProbablePrime(17)) // true
```

#### probablePrime ( bitLength )
 Generates a "prime-like" random number with bit length given by `bitLength`.
```
console.log(sbpsw.probablePrime()) //
```

#### nextProbablePrime ( value )
Generates the smallest prime number over `value`.
```
```

#### rand ( bitLength )
Generates a random number with the bit length given by `bitLength`.
```
```

#### safePrimeRand ( value )
Judges `value` to be prime number and generates safe prime number from `value`.
```
```

## Test

Coming soon.

## License
See [LICENSE](https://github.com/Harxxki/bailie-psw/blob/master/LICENSE).

## Author
Nanako OKADA  
Haruki MORI ([@Harxxki](https://github.com/Harxxki))
