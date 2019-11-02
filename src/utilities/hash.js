export default function hash () {
  let num = [];
  let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  const getHashString = () => {
    for(let i = 0; i < 5; i++) {
      let newNum = Math.floor(Math.random() * 32);
      let newLetter = Math.floor(Math.random() * 10);
      num.push(`${letters[newLetter]}-${newNum}`);
    }
    return num.join('');
  };
  let result = getHashString() + getHashString();
  return result;
};
