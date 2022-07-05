# Strengthened Baillie-PSW
npm package for probabilistic primality test and probable prime generation based on **Strengthening the Baillie-PSW primality test**[^1].

[^1]: Robert Baillie, Andrew Fiori, and Samuel S Wagstaff Jr,
Strengthening the Baillie-PSW primality test,
Mathematics of Computation, Volume 90, Number 330,
July 2021, pp. 1931--1955.
Also available at https://arxiv.org/abs/2006.14425 .

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
Randomly generates a probable prime number of `bitLength`.
```
console.log(sbpsw.probablePrime()) //
```

#### nextProbablePrime ( value )
Generates the smallest probable prime number greater than or equal to `value`.
```
```

#### rand ( bitLength )
Generates a random number of `bitLength`.
```
```

#### safePrimeRandom ( value )
Generates a probable safe prime from the smallest probable prime number greater than or equal to `value`.
```
```

## Test

Coming soon.

## License
See [LICENSE](https://github.com/Harxxki/bailie-psw/blob/master/LICENSE).

## Author
Nanako OKADA  
Haruki MORI ([@Harxxki](https://github.com/Harxxki))  
Miwako MISHIMA ([@m-miwako](https://github.com/m-miwako))
