const smallPrime = [
  2n,3n,5n,7n,11n,13n,17n,19n,23n,29n,31n,37n,41n,43n,47n,53n,59n,61n,67n,71n,73n,79n,83n,89n,97n,
  101n,	103n,	107n,	109n,	113n,	127n,	131n,	137n,	139n,	149n,	151n,	157n,	163n,	167n,	173n, 179n,
  181n,	191n,	193n,	197n,	199n,	211n,	223n,	227n,	229n,	233n,	239n,	241n,	251n,	257n,	263n,	269n,
  271n,	277n,	281n, 283n,	293n,	307n,	311n,	313n,	317n,	331n,	337n,	347n,	349n,	353n,	359n,	367n,
  373n,	379n,	383n,	389n,	397n,	401n,	409n, 419n,	421n,	431n,	433n,	439n,	443n,	449n,	457n,	461n,
  463n,	467n,	479n,	487n,	491n,	499n
];
//safePrimeを生成する
//ビット長指定かつ乱数を選びなおす
const safePrime = (bitLength, func) => {
  let a = probablePrime2(bitLength,func);
  let b = (a << 1n) + 1n;
  while(isProbablePrime(b, func) === false){
    a = probablePrime2(bitLength,func);
    b = (a << 1n) + 1n;
  }
  return b;
};
//ビット長指定
const safePrimeBit = (bitLength, func) => {
  let a = probablePrime2(bitLength,func);
  let b = (a << 1n) + 1n;
  while(isProbablePrime(b, func) === false){
    a = nextProbablePrime(a+2n,func);
    b = (a << 1n) + 1n;
  }
  return b;
};
//乱数指定
const safePrimeRandom = (n, func) => {
  let a = nextProbablePrime(n,func);
  let b = (a << 1n) + 1n;
  while(isProbablePrime(b, func) === false){
    a = nextProbablePrime(a+2n,func);
    b = (a << 1n) + 1n;
  }
  return b;
};
//----指定されたビット長でおそらく正の素数を返す．
// 乱数を毎回選びなおす
const probablePrime = (bitLength, func) => {
  let n = rand(bitLength);
  while(isProbablePrime(n, func) === false)
    n = rand(bitLength);
  return n;
};
// 選んだ乱数に+2をする
const probablePrime2 = (bitLength, func) => {
  const n = rand(bitLength);
  while(isProbablePrime(n, func) === false)
    n += 2n;
  return n;
};
//与えられた数字以上で一番近い素数(次の素数)を返す
const nextProbablePrime = (n, func) => {
  while(isProbablePrime(n, func) === false)
    n += 2n;
  return n;
};
//ミラーラビンの底を選択
const nextProbablePrimeBase = (n,func,base) => {
  while(isProbablePrimeBase(n, func, base) === false)
    n += 2n;
  return n;
};

const isProbablePrime = (n, func) => {
  // 小さい素数で割り切れるならFalseを返す
  for(const e of smallPrime){
    if(n === e)
      return true;
    else if((n % e) === 0n)
      return false;
  }
  return func(n);
};
const isProbablePrimeBase = (n, func, base) => {
  // 小さい素数で割り切れるならFalseを返す
  for(const e of smallPrime){
    if(n === e)
      return true;
    else if((n % e) === 0n)
      return false;
  }
  return func(n, base);
};

// Number型の引数の型と範囲をチェックし，エラーを発生させる
// const errorNumber = (num, range) => {
//   try{
//     if(isNaN(num))
//       throw new TypeError;
//     if(!Number.isSafeInteger(num) || (num <= range))
//       throw new RangeError;
//   }catch(e){
//     console.error(e);
//     return true;
//   }
//   return false;
// };
// BigInt型の引数の範囲をチェックし，エラーを発生させる
// const errorBigInt = (num, range) => {
//   try{
//     if(num <= range)
//     throw new RangeError;
//   }catch(e){
//     console.error(e);
//     return true;
//   }
//   return false;
// };

//指定したビット長で奇数の乱数を生成する
const rand = (bitLength) => {
  let result = 1n;
  let twoPow = 2n;
  for(let i=1; i<bitLength-1; i++){
    if(Math.random() >= 0.5){
      result += twoPow;
    }
    twoPow = twoPow << 1n;
  }
  result += twoPow;
  return result;
};

//冪剰余を求める
// exp:指数(bigint/number), m:mod(bigint), b:底(bigint)
const modPow = (b, exp, m) => {
  let r = b;
  const e = exp.toString(2).split("");
  const k = e.length;
  for(let i=1; i<k; i++){
    r = (r * r) % m;
    if(e[i] === '1'){
      r = (r * b) % m;
    }
  }
  return r;
};
//底2のときの冪剰余
// exp:指数(bigint/number), m:mod(bigint)
const modPow2 = (exp, m) => {
  let r = 2n;
  const e = exp.toString(2).split("");
  const k = e.length;
  for(let i=1; i<k; i++){
    r = (r * r) % m;
    if(e[i] === '1'){
      r = (r << 1n) % m;
    }
  }
  return r;
};

//ヤコビ記号を求める
// a:分子,p:分母
const jacobi = (a, p) => {
  let j = 1;  //結果
  if(p === 1n)
    return 1;
  if(a % p === 0n)
    return 0;
  //aが負の場合，第1補充法則より正にする
  if(a < 0n){
    a = -a;
    if((p & 3n) === 3n){
      j = -j;
    }
  }
  while(a > 1n){
    if((a & 1n) === 0n){
      a = a >> 1n;
      if(((p & 7n) === 3n) || ((p & 7n) === 5n)){
        j = -j;
      }
    }else{
      [a,p] = [p,a];
      if(((a & 3n) === 3n) && ((p & 3n) === 3n)){
        j = -j;
      }
      if(a > p){
        a = a % p;
      }
    }
  }
  return j;
};

//平方数の確認
const square = (n) => {
  let low = 0n;
  let high = n;
  let mid = 0n;
  let mid2 = 0n;
  while(low <= high){
    mid = (low + high) >> 1n;
    mid2 = mid ** 2n;
    if(mid2 === n){
      return true;
    }else if(mid2 > n){
      high = mid - 1n;
    }else{
      low = mid + 1n;
    }
  }
  return false;
};

//ミラーラビンテスト
//底を選ぶとき
const millerRabin = (n, a) => {
  let r = 0n;
  let s = 0;
  let t = 0n;

  //ミラーラビンテスト
  //sとtを求める
  t = n - 1n;
  do{
    t = t >> 1n;
    s = s + 1;
  }while((t & 1n) === 0n)

  r = modPow(a,t,n);
  if(r === 1n)
    return true;
  for(let i=0; i<s; i++){
    if(r === (n-1n))
      return true;
    // r = modPow(r,2n,n);
    r = (r * r) % n;
  }
  return false;
};
//底2のとき
const millerRabin2 = (n) => {
  let r = 0n;
  let s = 0;
  let t = 0n;

  //ミラーラビンテスト
  //sとtを求める
  t = n - 1n;
  do{
    t = t >> 1n;
    s = s + 1;
  }while((t & 1n) === 0n)

  r = modPow2(t,n);
  if(r === 1n)
    return true;
  for(let i=0; i<s; i++){
    if(r === (n-1n))
      return true;
    // r = modPow(r,2n,n);
    r = (r * r) % n;
  }
  return false;
};
// ミラー・ラビンテストを複数回行う
const millerRabinTest = (n) => {
  const base = [2n, 3n, 5n, 7n, 11n, 13n, 17n]; // 底
  // 底2に関して
  // if(millerRabin2(n) === false)
  //   return false;
  // 底baseに関して
  for(const a of base){
    if(millerRabin(n, a) === false)
      return false;
  }
  return true;
};

//強化版baillie_PSWテスト
const bailliePSW = (n) => {
  let check = false; //判定
  let t = 0n; //n+1=t2^s
  let s = 0;
  let d = 5n; //パラメータ
  let p = 1n;
  let q = 0n;
  let u0 = 0n; //リュカ数列
  let v0 = 2n;
  let u1 = 1n;
  let v1 = 1n;
  let q_l = 0n;//オイラー基準テストの左辺
  let q_r = 0n; //右辺
  //底2のミラー・ラビンテスト
  if(millerRabin(n,2n) === false)
    return false;

  //sとtを求める
  t = n + 1n;
  do{
    t = t >> 1n;
    s = s + 1;
  }while((t & 1n) === 0n)
  //nが平方数の場合
  if(square(n))
    return false;
  //D,Qを求める
  while(jacobi(d,n) !== -1){
    if(d > 0n)
      d = -(d + 2n);
    else
      d = -(d - 2n);
  }
  if(d === 5n){  //d=5つまりq=-1のとき
    p = 5n;
    q = 5n;
    v1 = 5n;
  }else{
    q = (1n - d) >> 2n;
  }
  //リュカテスト
  const bit = (n + 1n).toString(2).split(""); //n+1を2進数の文字列にして1文字ずつ区切り,配列にする
  const length = bit.length - 1; //bit数の最後
  const tLength = length - s; //tのbit数
  for(let i=1; i<=length; i++){ //添え字1→2(bit[1])の計算から始まる
    //bitが0,1にかかわらず必ずやる計算
    u0 = (u1 * v1) % n;
    v0 = (v1 * v1 + d * u1 * u1) % n;
    if((v0 & 1n) != 0n){//vが奇数の場合
      //vは奇数なのでこれでvは偶数になる
      v0 = v0 + n;
    }
    v0 = (v0 >> 1n) % n;
    u1 = u0;
    v1 = v0;
    //bitが1のときの計算
    if(bit[i] === '1'){
      u1 = (p * u0 + v0) % n;
      if((u1 & 1n) !== 0n){//uが奇数の場合
        u1 = u1 + n;
      }
      u1 = (u1 >> 1n) % n;
      v1 = (d * u0 + p * v0) % n;
      if((v1 & 1n) !== 0n){//vが奇数の場合
        v1 = v1 + n;
      }
      v1 = (v1 >> 1n) % n;
    }
    //強いリュカテスト
    // 素数らしいと判定されている,またはiがtのbit数以前の場合は何もしない
    if((check === true) || (i < tLength)){}
    else if(i === tLength){//iがtのbit数のとき
      if((u1 === 0n) || (v1 === 0n))
        check = true;
    }else if((i < length) && (v1 === 0n)){//iがtのbit数以降のとき
      check = true;
    }
  }
  if(check === false)
    return false;

  //リュカVテスト
  if(v1 === (2n * q)){
    // return true;
  }
  else if(((2n * q - v1) === n) || ((v1 - 2n * q) === n)){
    // return true;
  }
  else{
    return false;
  }
  //オイラー基準テスト
  q_l = modPow(q,(n+1n)/2n,n);
  q_r = BigInt(jacobi(q,n));
  if(q_l === (q * q_r)){
    return true;
  }
  else if(((q * q_r - q_l) === n) || ((q_l - q * q_r) === n)){
    return true;
  }
  else{
    return false;
  }
};
// 元のbailliePSW
const originalBailliePSW = (n) => {
  let check = false; //判定
  let t = 0n; //n+1=t2^s
  let s = 0;
  let d = 5n; //パラメータ
  let p = 1n;
  let q = 0n;
  let u0 = 0n; //リュカ数列
  let v0 = 2n;
  let u1 = 1n;
  let v1 = 1n;
  let q_l = 0n;//オイラー基準テストの左辺
  let q_r = 0n; //右辺
  // 底2のミラー・ラビンテスト
  if(millerRabin(n,2n) === false)
    return false;

  //sとtを求める
  t = n + 1n;
  do{
    t = t >> 1n;
    s = s + 1;
  }while((t & 1n) === 0n)
  //nが平方数の場合
  if(square(n))
    return false;
  //D,Qを求める
  while(jacobi(d,n) !== -1){
    if(d > 0n)
      d = -(d + 2n);
    else
      d = -(d - 2n);
  }
  if(d === 5n){  //d=5つまりq=-1のとき
    p = 5n;
    q = 5n;
    v1 = 5n;
  }else{
    q = (1n - d) >> 2n;
  }
  //リュカテスト
  const bit = (n + 1n).toString(2).split(""); //n+1を2進数の文字列にして1文字ずつ区切り,配列にする
  const length = bit.length - 1; //bit数の最後
  const tLength = length - s; //tのbit数
  for(let i=1; i<=length; i++){ //添え字1→2(bit[1])の計算から始まる
    //bitが0,1にかかわらず必ずやる計算
    u0 = (u1 * v1) % n;
    v0 = v1 * v1 + d * u1 * u1;
    if((v0 & 1n) != 0n){//vが奇数の場合
      //vは奇数なのでこれでvは偶数になる
      v0 = v0 + n;
    }
    v0 = (v0 >> 1n) % n;
    u1 = u0;
    v1 = v0;
    //bitが1のときの計算
    if(bit[i] === '1'){
      u1 = p * u0 + v0;
      if((u1 & 1n) != 0n){//uが奇数の場合
        u1 = u1 + n;
      }
      u1 = (u1 >> 1n) % n;
      v1 = d * u0 + p * v0;
      if((v1 & 1n) != 0n){//vが奇数の場合
        v1 = v1 + n;
      }
      v1 = (v1 >> 1n) % n;
    }
    //強いリュカテスト
    if(i < tLength){}
    else if(i === tLength){
      if((u1 === 0n) || (v1 === 0n))
        return true;
    }else if((i < length) && (v1 === 0n))
      return true;
  }
  return false;
};

//----メルセンヌ数(2^n-1)
// num:n乗
const mersenne = (num) => {
  const n = BigInt(num);
  return (1n << n) - 1n;
};
//リュカレーマーテスト
const lucasLehmer = (n) => {
  if(originalbailliePSW(n) === false)
    return false;

  let S = 4n; //S_0
  const m = (1n << n) - 1n;
  for(let i=1; i <= (p - 2n); i++){
    S = (S * S - 2n) % m;
  }
  if(S === 0n)
    return true;
  else
    return false;
};

//フェルマーテスト
const fermat = (n) => {
  // 底[2n, 3n, 5n, 7n, 11n, 13n, 17n]に対してフェルマーテストを行う
  const base = [2n, 3n, 5n, 7n, 11n, 13n, 17n]; // 底
  // 底2に関して
  // if(modPow2(n-1n,n) !== 1n)
  //   return false;
  // 底baseに関して
  for(const a of base){
    if(modPow(a,n-1n,n) !== 1n)
      return false;
  }
  return true;
};
