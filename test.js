
const Logger = () => "1".repeat(50).split("").map((_,index) => console.log(`${index+1}) ${(index+1) % 2 === 0 ? 2 : 1}`));

Logger()