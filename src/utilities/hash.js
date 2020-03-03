export default function hash () {
  const getHashString = () => {
    let timestamp = new Date().getTime();
    let hash = [timestamp];

    for(let i = 0; i < 5; i++) {
      let newNum = Math.floor(Math.random() * 32);
      hash.push(newNum);
    }

    return hash.join('');
  };

  return getHashString();
};
