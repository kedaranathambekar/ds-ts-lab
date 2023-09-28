import {Friend, Colleague,EmailContact } from './myTypes'
import { friends, colleagues } from "./01-basics";

function older(f: Friend) : string {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

function allOlder(f: Friend, f1: Friend) : string {
    f.age += 1
    return `${f.name} is now ${f.age}, ${f1.name} is now ${f1.age}` 
}
// function allOlder(f: Friend) : string[1] {
//     f.age += 1
//     return `${f.name} is now ${f.age}` 
// }
console.log(older(friends[0]))
console.log(allOlder(friends[0],friends[1]))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]): Colleague {
    const result = cs.sort(
      (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
  }
// function  addColleague(cs: Colleague[]): Colleague {
//     const result =cs.sort(
//         (c1, c2) => c1.contact.extension - c2.contact.extension
//     );
//     return result[1]

// }

function addColleague(cs:Colleague[],name:string,department:string,email:string) {

  const c1:Colleague = {
  name: name,
  department: department,
  contact: {
    email:email,
      extension: highestExtension(cs).contact.extension + 1
  }
}
cs.push(c1);
}
  
  console.log(highestExtension(colleagues.current));

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number,max? : number
): EmailContact[] {
  let end = colleagues.length;
  if (max !== undefined){
      end = max < 2 ? 1 : max
  }
  const sorted = colleagues.sort(sorter); // Colleague[] inferred
  const result: EmailContact[] = sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return result.slice(0,end)
}

console.log(sortColleagues(colleagues.current, (a, b) => a.contact.extension - b.contact.extension));
console.log(sortColleagues(colleagues.current, (a, b) => a.name.length - b.name.length));

function findFriends(f1: Friend[], criteria:(f: Friend)=> boolean): Friend[] {
  const sameFriend: Friend[] = [];
  for (const f of f1) {
    if (criteria(f)) {
      sameFriend.push(f);
    }
  }
  return sameFriend;
}

console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));


function addInterest(friend: Friend, interest: string ) : string[]{
  if (friend.interests===undefined){
      friend.interests = [];
  }
  friend.interests.push(interest);
  return friend.interests;
}

console.log(addInterest(friends[0], 'Politics'))