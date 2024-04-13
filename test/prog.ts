import { IPerson } from "../src/test.js";
import "../src/index.js";

function hello(){
    const people =[
        { Age: 15, Name: 'Cathy' },
        { Age: 25, Name: 'Alice' },
        { Age: 50, Name: 'Bob' }
      ];
      const dictionary = people.ToDictionary<string, IPerson>(x => x.Name).ToArray();
      //@ts-ignore
      const test =  dictionary['Bob'];// { Age: 50, Name: 'Bob' }
      //@ts-ignore
      const test2 = dictionary['Bob'].Age,// 50;
      const dictionary2 = people.ToDictionary(
        x => x.Name,
        y => y.Age
      ).ToArray();
      //@ts-ignore
      const test3 =  dictionary2['Alice']//, 25
      const expectedKeys = ['Cathy', 'Alice', 'Bob'];
      const test4 =  dictionary.Max(x => x.Value.Age);//50
      const test5 =  dictionary.Min(x => x.Value.Age);//    15
      const test6 =  dictionary.Select(x => x.Key);//expectedKeys
      const test7 =  dictionary.Select(x => x.Value);// people
 }
 let user = "Aamod Tiwari";
 const result = hello();
 console.log("Result", result)
 