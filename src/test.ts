import test from "ava";
import "./index";
'use strict';

interface IPackage {
  Company: string;
  Weight: number;
  TrackingNumber: number;
}

interface IPerson {
  Name: string;
  Age?: number;
}

interface IPet {
  Name: string;
  Age?: number;
  Owner?: Person;
  Vaccinated?: boolean;
}

interface IProduct {
  Name: string;
  Code: number;
}

class Package {
  public Company: string;
  public Weight: number;
  public TrackingNumber: number;

  constructor(p: IPackage) {
    this.Company = p.Company;
    this.Weight = p.Weight;
    this.TrackingNumber = p.TrackingNumber;
  }
}

class Person implements IPerson {
  public Name: string;
  public Age: number;

  constructor(pet: IPet) {
    this.Name = pet.Name;
    this.Age = pet.Age;
  }
}

class Pet implements IPet {
  public Name: string;
  public Age: number;
  public Owner: Person;
  public Vaccinated: boolean;

  constructor(pet: IPet) {
    this.Name = pet.Name;
    this.Age = pet.Age;
    this.Owner = pet.Owner;
    this.Vaccinated = pet.Vaccinated;
  }
}

class Dog extends Pet {
  public Speak(): string {
    return "Bark";
  }
}

class PetOwner {
  constructor(public Name: string, public Pets: Pet[]) { }
}

class Product implements IProduct {
  public Name: string;
  public Code: number;

  constructor(product: IProduct) {
    this.Name = product.Name;
    this.Code = product.Code;
  }
}

test("Add", t => {
  const list: string[] = [];
  list.ToList().Add("hey");
  t.is(list.ToList().First(), "hey");
});

test("AddRange", t => {
  const list: string[] = [];
  list.ToList().AddRange(["hey", "what's", "up"]);
  t.deepEqual(list, ["hey", "what's", "up"]);
});

test("Aggregate", t => {
  const sentence = "the quick brown fox jumps over the lazy dog";
  const reversed = "dog lazy the over jumps fox brown quick the ";
  const words = sentence.split(" ");
  t.is(
    words.ToList().Aggregate(
      (workingSentence, next) => next + " " + workingSentence,
      ""
    ),
    reversed
  );
});

test("All", t => {
  const pets = [
    new Pet({ Age: 10, Name: "Barley" }),
    new Pet({ Age: 4, Name: "Boots" }),
    new Pet({ Age: 6, Name: "Whiskers" })
  ];

  // determine whether all pet names
  // in the array start with 'B'.
  t.false(pets.ToList().All(pet => pet.Name.startsWith("B")));
});

test("Any", t => {
  const pets = [
    new Pet({ Age: 8, Name: "Barley", Vaccinated: true }),
    new Pet({ Age: 4, Name: "Boots", Vaccinated: false }),
    new Pet({ Age: 1, Name: "Whiskers", Vaccinated: false })
  ];

  // determine whether any pets over age 1 are also unvaccinated.
  t.true(pets.ToList().Any(p => p.Age > 1 && p.Vaccinated === false));
  t.true(pets.ToList().Any());
});

test("Append", t => {
  const list: string[] = [];
  list.ToList().AddRange(["hey", "what's", "up"]);
  list.ToList().Append("ola!"); // should not add
  t.deepEqual(list, ["hey", "what's", "up",]);
  t.deepEqual(list.ToList().Append("ola!").ToArray(), ["hey", "what's", "up", "ola!"]);
});

test("Average", t => {
  const grades = [78, 92, 100, 37, 81];
  const people: IPerson[] = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  t.is(grades.ToList().Average(), 77.6);
  t.is(people.ToList().Average(x => x.Age), 30);
});

test("Cast", t => {
  const pets = [
    new Dog({ Age: 8, Name: "Barley", Vaccinated: true }),
    new Pet({ Age: 1, Name: "Whiskers", Vaccinated: false })
  ];

  const dogs = pets.ToList().Cast<Dog>();

  t.true(typeof dogs.First().Speak === "function");
  t.is(dogs.First().Speak(), "Bark");
  t.true(typeof dogs.Last().Speak === "undefined");
});

test("Concat", t => {
  const cats = [
    new Pet({ Age: 8, Name: "Barley" }),
    new Pet({ Age: 4, Name: "Boots" }),
    new Pet({ Age: 1, Name: "Whiskers" })
  ];
  const dogs = [
    new Pet({ Age: 3, Name: "Bounder" }),
    new Pet({ Age: 14, Name: "Snoopy" }),
    new Pet({ Age: 9, Name: "Fido" })
  ];
  const expected = ["Barley", "Boots", "Whiskers", "Bounder", "Snoopy", "Fido"];
  t.deepEqual(
    cats.ToList()
      .Select(cat => cat.Name)
      .Concat(dogs.ToList().Select(dog => dog.Name).ToArray())
      .ToArray(),
    expected
  );
});

test("Contains", t => {
  const fruits = [
    "apple",
    "banana",
    "mango",
    "orange",
    "passionfruit",
    "grape"
  ];
  t.true(fruits.ToList().Contains("mango"));
});

test("Count", t => {
  const fruits = [
    "apple",
    "banana",
    "mango",
    "orange",
    "passionfruit",
    "grape"
  ];
  t.is(fruits.ToList().Count(), 6);
  t.is(fruits.ToList().Count(x => x.length > 5), 3);
});

test("DefaultIfEmpty", t => {
  const pets = [
    new Pet({ Age: 8, Name: "Barley" }),
    new Pet({ Age: 4, Name: "Boots" }),
    new Pet({ Age: 1, Name: "Whiskers" })
  ];
  t.deepEqual(
    pets.ToList()
      .DefaultIfEmpty()
      .Select(pet => pet.Name)
      .ToArray(),
    ["Barley", "Boots", "Whiskers"]
  );
  const numbers: number[] = [];
  t.deepEqual(numbers.ToList().DefaultIfEmpty(0).ToArray(), [0]);
});

test("Distinct", t => {
  const ages = [21, 46, 46, 55, 17, 21, 55, 55];
  const pets = [
    new Pet({ Age: 1, Name: "Whiskers" }),
    new Pet({ Age: 1, Name: "Whiskers" }),
    new Pet({ Age: 8, Name: "Barley" }),
    new Pet({ Age: 8, Name: "Barley" }),
    new Pet({ Age: 81, Name: "Barley1" })
  ];
  const expected = [
    new Pet({ Age: 1, Name: "Whiskers" }),
    new Pet({ Age: 8, Name: "Barley" }),
    new Pet({ Age: 81, Name: "Barley1" })
  ];
  t.deepEqual(ages.ToList().Distinct().ToArray(), [21, 46, 55, 17]);
  t.deepEqual(pets.ToList().Distinct().ToArray(), expected);
});

test("DistinctBy", t => {
  const pets = [
    new Pet({ Age: 1, Name: "Whiskers" }),
    new Pet({ Age: 4, Name: "Boots" }),
    new Pet({ Age: 8, Name: "Barley" }),
    new Pet({ Age: 4, Name: "Daisy" })
  ];

  const result = [
    new Pet({ Age: 1, Name: "Whiskers" }),
    new Pet({ Age: 4, Name: "Boots" }),
    new Pet({ Age: 8, Name: "Barley" })
  ];

  t.deepEqual(pets.ToList().DistinctBy(pet => pet.Age).ToArray(), result);
});

test("ElementAt", t => {
  const a = ["hey", "hola", "que", "tal"];
  t.is(a.ToList().ElementAt(0), "hey");
  t.throws(
    () => a.ToList().ElementAt(4),
    /ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source./
  );
});

test("ElementAtOrDefault", t => {
  const a = ["hey", "hola", "que", "tal"];
  t.is(a.ToList().ElementAtOrDefault(0), "hey");
  t.throws(
    () => a.ToList().ElementAtOrDefault(4),
    /ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source./
  );
});

test("Except", t => {
  const numbers1 = [2.0, 2.1, 2.2, 2.3, 2.4, 2.5];
  const numbers2 = [2.2, 2.3];
  t.deepEqual(numbers1.ToList().Except(numbers2).ToArray(), [2, 2.1, 2.4, 2.5]);
});

test("First", t => {
  t.is(["hey", "hola", "que", "tal"].ToList().First(), "hey");
  t.is([1, 2, 3, 4, 5].ToList().First(x => x > 2), 3);
  t.throws(
    () => [].ToList().First(),
    /InvalidOperationException: The source sequence is empty./
  );
});

test("FirstOrDefault", t => {
  t.is(["hey", "hola", "que", "tal"].ToList().FirstOrDefault(), "hey");
  t.is([].ToList().FirstOrDefault(), undefined);
});

test("ForEach", t => {
  const names = ["Bruce", "Alfred", "Tim", "Richard"];
  let test = "";
  names.ToList().ForEach((x, i) => (test += `${x} ${i} `));
  t.is(test, "Bruce 0 Alfred 1 Tim 2 Richard 3 ");
});
test("GetRange", t => {
  const dinosaurs = [
    "Compsognathus",
    "Amargasaurus",
    "Oviraptor",
    "Velociraptor",
    "Deinonychus",
    "Dilophosaurus",
    "Gallimimus",
    "Triceratops"
  ];
  const lessDinosaurs = [
    "Oviraptor",
    "Velociraptor",
    "Deinonychus",
  ];
  t.deepEqual(dinosaurs.ToList().GetRange(2, 3).ToArray(), lessDinosaurs);
});
test("GroupBy", t => {
  const pets: Pet[] = [
    new Pet({ Age: 8, Name: "Barley" }),
    new Pet({ Age: 4, Name: "Boots" }),
    new Pet({ Age: 1, Name: "Whiskers" }),
    new Pet({ Age: 4, Name: "Daisy" })
  ];
  const result = {
    "1": ["Whiskers"],
    "4": ["Boots", "Daisy"],
    "8": ["Barley"]
  };
  t.deepEqual(pets.ToList().GroupBy(pet => pet.Age, pet => pet.Name), result);
});

test("GroupJoin", t => {
  const magnus = new Person({ Name: "Hedlund, Magnus" });
  const terry = new Person({ Name: "Adams, Terry" });
  const charlotte = new Person({ Name: "Weiss, Charlotte" });

  const barley = new Pet({ Name: "Barley", Owner: terry });
  const boots = new Pet({ Name: "Boots", Owner: terry });
  const whiskers = new Pet({ Name: "Whiskers", Owner: charlotte });
  const daisy = new Pet({ Name: "Daisy", Owner: magnus });

  const people: Person[] = [magnus, terry, charlotte];
  const pets: Pet[] = [barley, boots, whiskers, daisy];

  // create a list where each element is an anonymous
  // type that contains a person's name and
  // a collection of names of the pets they own.
  const query = people.ToList().GroupJoin(
    pets.ToList(),
    person => person,
    pet => pet.Owner,
    (person, petCollection) => ({
      OwnerName: person.Name,
      Pets: petCollection.Select(pet => pet.Name)
    })
  );
  const expected = [
    "Hedlund, Magnus: Daisy",
    "Adams, Terry: Barley,Boots",
    "Weiss, Charlotte: Whiskers"
  ];
  t.deepEqual(
    query.Select(obj => `${obj.OwnerName}: ${obj.Pets.ToArray()}`).ToArray(),
    expected
  );
});

test("IndexOf", t => {
  const fruits = [
    "apple",
    "banana",
    "mango",
    "orange",
    "passionfruit",
    "grape"
  ];

  const barley = new Pet({ Age: 8, Name: "Barley", Vaccinated: true });
  const boots = new Pet({ Age: 4, Name: "Boots", Vaccinated: false });
  const whiskers = new Pet({ Age: 1, Name: "Whiskers", Vaccinated: false });
  const pets = [barley, boots, whiskers];

  t.is(fruits.ToList().IndexOf("orange"), 3);
  t.is(fruits.ToList().IndexOf("strawberry"), -1);
  t.is(pets.ToList().IndexOf(boots), 1);
});

test("Insert", t => {
  const pets = [
    new Pet({ Age: 10, Name: "Barley" }),
    new Pet({ Age: 4, Name: "Boots" }),
    new Pet({ Age: 6, Name: "Whiskers" })
  ];

  let newPet = new Pet({ Age: 12, Name: "Max" });

  pets.ToList().Insert(0, newPet);
  pets.ToList().Insert(pets.ToList().Count(), newPet);

  t.is(pets.ToList().First(), newPet);
  t.is(pets.ToList().Last(), newPet);
  t.throws(() => pets.ToList().Insert(-1, newPet), /Index is out of range./);
  t.throws(
    () => pets.ToList().Insert(pets.ToList().Count() + 1, newPet),
    /Index is out of range./
  );
});

test("InsertRange", t => {
  const pets = [
    new Pet({ Age: 10, Name: "Barley" }),
    new Pet({ Age: 4, Name: "Boots" }),
    new Pet({ Age: 6, Name: "Whiskers" })
  ];

  const result = [
    new Pet({ Age: 10, Name: "Barley" }),
    new Pet({ Age: 13, Name: "Max1" }),
    new Pet({ Age: 14, Name: "Max2" }),
    new Pet({ Age: 4, Name: "Boots" }),
    new Pet({ Age: 6, Name: "Whiskers" }),

  ];

  let newPetArr = [
    new Pet({ Age: 13, Name: "Max1" }),
    new Pet({ Age: 14, Name: "Max2" })
  ];

  pets.ToList().InsertRange(1, newPetArr);

  t.deepEqual(
    pets,
    result
  );

  t.throws(() => pets.ToList().InsertRange(-1, newPetArr), /Index is out of range./);
  t.throws(
    () => pets.ToList().InsertRange(pets.ToList().Count() + 1, newPetArr),
    /Index is out of range./
  );
});

test("Intersect", t => {
  const id1 = [44, 26, 92, 30, 71, 38];
  const id2 = [39, 59, 83, 47, 26, 4, 30];
  t.is(id1.ToList().Intersect(id2).Sum(x => x), 56);
  const expected = [26, 30];
  t.deepEqual(id1.ToList().Intersect(id2).ToArray(), expected);
});

test("Join", t => {
  const magnus = new Person({ Name: "Hedlund, Magnus" });
  const terry = new Person({ Name: "Adams, Terry" });
  const charlotte = new Person({ Name: "Weiss, Charlotte" });

  const barley = new Pet({ Name: "Barley", Owner: terry });
  const boots = new Pet({ Name: "Boots", Owner: terry });
  const whiskers = new Pet({ Name: "Whiskers", Owner: charlotte });
  const daisy = new Pet({ Name: "Daisy", Owner: magnus });

  const people: Person[] = ([magnus, terry, charlotte]);
  const pets: Pet[] = [barley, boots, whiskers, daisy];

  // create a list of Person-Pet pairs where
  // each element is an anonymous type that contains a
  // pet's name and the name of the Person that owns the Pet.
  const query = people.ToList().Join(
    pets,
    person => person,
    pet => pet.Owner,
    (person, pet) => ({ OwnerName: person.Name, Pet: pet.Name })
  );
  const expected = [
    "Hedlund, Magnus - Daisy",
    "Adams, Terry - Barley",
    "Adams, Terry - Boots",
    "Weiss, Charlotte - Whiskers"
  ];
  t.deepEqual(
    query.Select(obj => `${obj.OwnerName} - ${obj.Pet}`).ToArray(),
    expected
  );
});

test("Last", t => {
  t.is(["hey", "hola", "que", "tal"].ToList().Last(), "tal");
  t.is([1, 2, 3, 4, 5].ToList().Last(x => x > 2), 5);
  t.throws(
    () => [].ToList().Last(),
    /InvalidOperationException: The source sequence is empty./
  );
});

test("LastOrDefault", t => {
  t.is(["hey", "hola", "que", "tal"].ToList().LastOrDefault(), "tal");
  t.is([].ToList().LastOrDefault(), undefined);
});

test("Max", t => {
  const people: IPerson[] = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  t.is(people.ToList().Max(x => x.Age), 50);
  t.is([1, 2, 3, 4, 5].ToList().Max(), 5);
});

test("MaxBy", t => {
  const people: IPerson[] = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  t.is(people.ToList().MaxBy(x => x.Age).Age, 50);
  t.is(people.ToList().MaxBy(x => x.Age).Name, "Bob");
  t.is([1, 2, 3, 4, 5].ToList().MaxBy(x => x), 5);
});

test("Min", t => {
  const people: IPerson[] = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  t.is(people.ToList().Min(x => x.Age), 15);
  t.is([1, 2, 3, 4, 5].ToList().Min(), 1);
});

test("MinBy", t => {
  const people: IPerson[] = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  t.is(people.ToList().MinBy(x => x.Age), people[0]);
  t.is([1, 2, 3, 4, 5].ToList().Min(x => x), 1);
});

test("OfType", t => {
  const pets = [
    new Dog({ Age: 8, Name: "Barley", Vaccinated: true }),
    new Pet({ Age: 1, Name: "Whiskers", Vaccinated: false })
  ];
  const anyArray = ["dogs", "cats", 13, true];

  t.is(anyArray.ToList().OfType(String).Count(), 2);
  t.is(anyArray.ToList().OfType(Number).Count(), 1);
  t.is(anyArray.ToList().OfType(Boolean).Count(), 1);
  t.is(anyArray.ToList().OfType(Function).Count(), 0);

  t.is(pets.ToList().OfType(Dog).Count(), 1);
  t.is(
    pets.ToList()
      .OfType<Dog>(Dog)
      .First()
      .Speak(),
    "Bark"
  );
});

test("OrderBy", t => {
  const expected = [1, 2, 3, 4, 5, 6];
  t.deepEqual([4, 5, 6, 3, 2, 1].ToList().OrderBy(x => x).ToArray(), expected);
  t.deepEqual(
    ["Deutschland", "Griechenland", "Agypten"].ToList().OrderBy(x => x).ToArray(),
    ["Agypten", "Deutschland", "Griechenland"]
  );
});


test("OrderByDescending", t => {
  t.deepEqual([4, 5, 6, 3, 2, 1].ToList().OrderByDescending(x => x).ToArray(), [
    6,
    5,
    4,
    3,
    2,
    1
  ]);
  t.deepEqual(
    ["Deutschland", "Griechenland", "Agypten"].ToList()
      .OrderByDescending(x => x)
      .ToArray(),
    ["Griechenland", "Deutschland", "Agypten"]
  );
});

test("Prepend", t => {
  const list: string[] = [];
  list.ToList().AddRange(["hey", "what's", "up"]);
  list.ToList().Prepend("ola!"); // should not add
  t.deepEqual(list, ["hey", "what's", "up",]);
  t.deepEqual(list.ToList().Prepend("ola!").ToArray(), ["ola!", "hey", "what's", "up"]);
});


test("ThenBy", t => {
  const fruits = [
    "grape",
    "passionfruit",
    "banana",
    "mango",
    "orange",
    "raspberry",
    "apple",
    "blueberry"
  ];
  // sort the strings first by their length and then
  // alphabetically by passing the identity selector function.
  const expected = [
    "apple",
    "grape",
    "mango",
    "banana",
    "orange",
    "blueberry",
    "raspberry",
    "passionfruit"
  ];

  t.deepEqual(
    fruits.ToList()
      .OrderBy(fruit => fruit.length)
      .ThenBy(fruit => fruit)
      .ToArray(),
    expected
  );
  const expectedNums = [1, 2, 3, 4, 5, 6];
  // test omission of OrderBy
  t.deepEqual([4, 5, 6, 3, 2, 1].ToList().ThenBy(x => x).ToArray(), expectedNums);
});

// see https://github.com/kutyel/linq.ts/issues/23
test("ThenByMultiple", t => {
  let x = { a: 2, b: 1, c: 1 };
  let y = { a: 1, b: 2, c: 2 };
  let z = { a: 1, b: 1, c: 3 };
  let unsorted = [x, y, z];
  let sorted = unsorted.ToList()
    .OrderBy(u => u.a)
    .ThenBy(u => u.b)
    .ThenBy(u => u.c)
    .ToArray();

  t.is(sorted[0], z);
  t.is(sorted[1], y);
  t.is(sorted[2], x);
});

test("ThenByDescending", t => {
  const fruits = [
    "grape",
    "passionfruit",
    "banana",
    "mango",
    "orange",
    "raspberry",
    "apple",
    "blueberry"
  ];

  // sort the strings first by their length and then
  // alphabetically descending by passing the identity selector function.
  const expected = [
    "mango",
    "grape",
    "apple",
    "orange",
    "banana",
    "raspberry",
    "blueberry",
    "passionfruit"
  ];
  t.deepEqual(
    fruits.ToList()
      .OrderBy(fruit => fruit.length)
      .ThenByDescending(fruit => fruit)
      .ToArray(),
    expected
  );
  t.deepEqual([4, 5, 6, 3, 2, 1].ToList().ThenByDescending(x => x).ToArray(), [
    6,
    5,
    4,
    3,
    2,
    1
  ]);
});

test("Remove", t => {
  const fruits = [
    "apple",
    "banana",
    "mango",
    "orange",
    "passionfruit",
    "grape"
  ];

  const barley = new Pet({ Age: 8, Name: "Barley", Vaccinated: true });
  const boots = new Pet({ Age: 4, Name: "Boots", Vaccinated: false });
  const whiskers = new Pet({ Age: 1, Name: "Whiskers", Vaccinated: false });
  const pets = [barley, boots, whiskers];
  const lessPets = [barley, whiskers];

  t.true(fruits.ToList().Remove("orange"));
  t.false(fruits.ToList().Remove("strawberry"));
  t.true(pets.ToList().Remove(boots));
  t.deepEqual(pets, lessPets);
});

test("RemoveAll", t => {
  const dinosaurs = [
    "Compsognathus",
    "Amargasaurus",
    "Oviraptor",
    "Velociraptor",
    "Deinonychus",
    "Dilophosaurus",
    "Gallimimus",
    "Triceratops"
  ];
  const lessDinosaurs = [
    "Compsognathus",
    "Oviraptor",
    "Velociraptor",
    "Deinonychus",
    "Gallimimus",
    "Triceratops"
  ];
  const num1 = [5, 7, 8, 17, 9, 10, 11, 0, 2, 3, 4];
  const num2 = [17, 10, 11];
  t.deepEqual(dinosaurs.ToList().RemoveAll(x => x.endsWith("saurus")).ToArray(), lessDinosaurs);
  t.deepEqual(num1.ToList().RemoveAll(x => x < 10).ToArray(), num2);
  t.deepEqual(num2.ToList().RemoveAll().ToArray(), []);
});

test("RemoveAt", t => {
  const dinosaurs = [
    "Compsognathus",
    "Amargasaurus",
    "Oviraptor",
    "Velociraptor",
    "Deinonychus",
    "Dilophosaurus",
    "Gallimimus",
    "Triceratops"
  ];
  const lessDinosaurs = [
    "Compsognathus",
    "Amargasaurus",
    "Oviraptor",
    "Deinonychus",
    "Dilophosaurus",
    "Gallimimus",
    "Triceratops"
  ];
  dinosaurs.ToList().RemoveAt(3);
  t.deepEqual(dinosaurs, lessDinosaurs);
});

test("RemoveRange", t => {
  const dinosaurs = [
    "Compsognathus",
    "Amargasaurus",
    "Oviraptor",
    "Velociraptor",
    "Deinonychus",
    "Dilophosaurus",
    "Gallimimus",
    "Triceratops"
  ];
  const lessDinosaurs = [
    "Compsognathus",
    "Amargasaurus",
    "Dilophosaurus",
    "Gallimimus",
    "Triceratops"
  ];
  dinosaurs.ToList().RemoveRange(2, 3);
  t.deepEqual(dinosaurs, lessDinosaurs);
});

test("Reverse", t => {
  t.deepEqual([1, 2, 3, 4, 5].ToList().Reverse().ToArray(), [5, 4, 3, 2, 1]);
});

test("Select", t => {
  t.deepEqual([1, 2, 3].ToList().Select(x => x * 2).ToArray(), [2, 4, 6]);
});

test("SelectMany", t => {
  const petOwners = [
    new PetOwner("Higa, Sidney", [
      new Pet({ Name: "Scruffy" }),
      new Pet({ Name: "Sam" })
    ]),
    new PetOwner("Ashkenazi, Ronen", [
      new Pet({ Name: "Walker" }),
      new Pet({ Name: "Sugar" })
    ]),
    new PetOwner("Price, Vernette", [
      new Pet({ Name: "Scratches" }),
      new Pet({ Name: "Diesel" })
    ])
  ];
  const expected = ["Scruffy", "Sam", "Walker", "Sugar", "Scratches", "Diesel"];
  t.deepEqual(
    petOwners.ToList()
      .SelectMany(petOwner => petOwner.Pets).ToList()
      .Select(pet => pet.Name)
      .ToArray(),
    expected
  );
});

test("SequenceEqual", t => {
  const pet1 = new Pet({ Age: 2, Name: "Turbo" });
  const pet2 = new Pet({ Age: 8, Name: "Peanut" });

  // create three lists of pets.
  const pets1 = [pet1, pet2];
  const pets2 = [pet1, pet2];
  const pets3 = [pet1];

  t.true(pets1.ToList().SequenceEqual(pets2));
  t.false(pets1.ToList().SequenceEqual(pets3));
});

test("Single", t => {
  const fruits1: string[] = [];
  const fruits2 = ["orange"];
  const fruits3 = ["orange", "apple"];
  const numbers1 = [1, 2, 3, 4, 5, 5];
  t.is(fruits2.ToList().Single(), "orange");
  t.throws(
    () => fruits1.ToList().Single(),
    /The collection does not contain exactly one element./
  );
  t.throws(
    () => fruits3.ToList().Single(),
    /The collection does not contain exactly one element./
  );
  t.is(numbers1.ToList().Single(x => x === 1), 1);
  t.throws(
    () => numbers1.ToList().Single(x => x === 5),
    /The collection does not contain exactly one element./
  );
  t.throws(
    () => numbers1.ToList().Single(x => x > 5),
    /The collection does not contain exactly one element./
  );
});

test("SingleOrDefault", t => {
  const fruits1: string[] = [];
  const fruits2 = ["orange"];
  const fruits3 = ["orange", "apple"];
  const numbers1 = [1, 2, 3, 4, 5, 5];
  t.is(fruits1.ToList().SingleOrDefault(), undefined);
  t.is(fruits2.ToList().SingleOrDefault(), "orange");
  t.throws(
    () => fruits3.ToList().SingleOrDefault(),
    /The collection does not contain exactly one element./
  );
  t.is(numbers1.ToList().SingleOrDefault(x => x === 1), 1);
  t.is(numbers1.ToList().SingleOrDefault(x => x > 5), undefined);
  t.throws(
    () => numbers1.ToList().SingleOrDefault(x => x === 5),
    /The collection does not contain exactly one element./
  );
});

test("Skip", t => {
  const grades = [59, 82, 70, 56, 92, 98, 85];
  t.deepEqual(
    grades.ToList()
      .OrderByDescending(x => x)
      .Skip(3)
      .ToArray(),
    [82, 70, 59, 56]
  );
});

test("SkipLast", t => {
  const grades = [59, 82, 70, 56, 92, 98, 85];
  t.deepEqual(
    grades.ToList()
      .SkipLast(2)
      .ToArray(),
    [59, 82, 70, 56, 92]
  );
});

test("SkipWhile", t => {
  const grades = [59, 82, 70, 56, 92, 98, 85];
  t.deepEqual(
    grades.ToList()
      .OrderByDescending(x => x)
      .SkipWhile(grade => grade >= 80)
      .ToArray(),
    [70, 59, 56]
  );
});

test("Sum", t => {
  const people = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  t.is([2, 3, 5].ToList().Sum(), 10);
  t.is(people.ToList().Sum(x => x.Age), 90);
});

test("Take", t => {
  const grades = [59, 82, 70, 56, 92, 98, 85];
  t.deepEqual(
    grades.ToList()
      .OrderByDescending(x => x)
      .Take(3)
      .ToArray(),
    [98, 92, 85]
  );
});

test("TakeLast", t => {
  const grades = [59, 82, 70, 56, 92, 98, 85];
  t.deepEqual(
    grades.ToList()
      .TakeLast(2)
      .ToArray(),
    [98, 85]
  );
});

test("TakeWhile", t => {
  const expected = ["apple", "banana", "mango"];
  const fruits = [
    "apple",
    "banana",
    "mango",
    "orange",
    "passionfruit",
    "grape"
  ];
  t.deepEqual(
    fruits.ToList().TakeWhile(fruit => fruit !== "orange").ToArray(),
    expected
  );
});

test("ToArray", t => {
  t.deepEqual([1, 2, 3, 4, 5].ToList().ToArray(), [1, 2, 3, 4, 5]);
});

test("ToDictionary", t => {
  const people: IPerson[] = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  const dictionary = people.ToList().ToDictionary(x => x.Name);
  t.deepEqual(dictionary["Bob"], { Age: 50, Name: "Bob" });
  t.is(dictionary["Bob"].Age, 50);
  const dictionary2 = people.ToList().ToDictionary(x => x.Name, y => y.Age);
  t.is(dictionary2["Alice"], 25);
  // Dictionary should behave just like in C#
  const knum = dictionary.Max(x => x.Value.Age);
  const kage = dictionary.Min(x => x.Value.Age);
  t.is(knum, 50)
  t.is(kage, 15)
  const expectedKeys = ["Cathy", "Alice", "Bob"];
  t.deepEqual(dictionary.Select(x => x.Key).ToArray(), expectedKeys);
  t.deepEqual(dictionary.Select(x => x.Value).ToArray(), people);
});

test("ToList", t => {
  t.deepEqual([1, 2, 3].ToList().ToArray(), [1, 2, 3]);
});

test("ToLookup", t => {
  // create a list of Packages
  const packages = [
    new Package({
      Company: "Coho Vineyard",
      TrackingNumber: 89453312,
      Weight: 25.2
    }),
    new Package({
      Company: "Lucerne Publishing",
      TrackingNumber: 89112755,
      Weight: 18.7
    }),
    new Package({
      Company: "Wingtip Toys",
      TrackingNumber: 299456122,
      Weight: 6.0
    }),
    new Package({
      Company: "Contoso Pharmaceuticals",
      TrackingNumber: 670053128,
      Weight: 9.3
    }),
    new Package({
      Company: "Wide World Importers",
      TrackingNumber: 4665518773,
      Weight: 33.8
    })
  ];

  // create a Lookup to organize the packages.
  // use the first character of Company as the key value.
  // select Company appended to TrackingNumber
  // as the element values of the Lookup.
  const lookup = packages.ToList().ToLookup(
    p => p.Company.substring(0, 1),
    p => p.Company + " " + p.TrackingNumber
  );
  const result = {
    C: ["Coho Vineyard 89453312", "Contoso Pharmaceuticals 670053128"],
    L: ["Lucerne Publishing 89112755"],
    W: ["Wingtip Toys 299456122", "Wide World Importers 4665518773"]
  };
  t.deepEqual(lookup, result);
});

test("Union", t => {
  const ints1 = [5, 3, 9, 7, 5, 9, 3, 7];
  const ints2 = [8, 3, 6, 4, 4, 9, 1, 0];
  t.deepEqual(ints1.ToList().Union(ints2).ToArray(), [5, 3, 9, 7, 8, 6, 4, 1, 0]);

  const result = [
    new Product({ Name: "apple", Code: 9 }),
    new Product({ Name: "orange", Code: 4 }),
    new Product({ Name: "lemon", Code: 12 })
  ];
  const store1 = [
    new Product({ Name: "apple", Code: 9 }),
    new Product({ Name: "orange", Code: 4 })
  ];
  const store2 = [
    new Product({ Name: "apple", Code: 9 }),
    new Product({ Name: "lemon", Code: 12 })
  ];
  t.deepEqual(store1.ToList().Union(store2).ToArray(), result);
});

test("Where", t => {
  const fruits = [
    "apple",
    "passionfruit",
    "banana",
    "mango",
    "orange",
    "blueberry",
    "grape",
    "strawberry"
  ];
  const expected = ["apple", "mango", "grape"];
  t.deepEqual(fruits.ToList().Where(fruit => fruit.length < 6).ToArray(), expected);
});

test("Zip", t => {
  const numbers = [1, 2, 3, 4];
  const words = ["one", "two", "three"];
  t.deepEqual(
    numbers.ToList().Zip(words, (first, second) => `${first} ${second}`).ToArray(),
    ["1 one", "2 two", "3 three"]
  );
  // larger second array
  const expected = ["one 1", "two 2", "three 3"];
  const numbers2 = [1, 2, 3, 4];
  const words2 = ["one", "two", "three"];
  t.deepEqual(
    words2.ToList().Zip(numbers2, (first, second) => `${first} ${second}`).ToArray(),
    expected
  );
});

test("Where().Select()", t => {
  t.deepEqual(
    [1, 2, 3, 4, 5].ToList()
      .Where(x => x > 3)
      .Select(y => y * 2)
      .ToArray(),
    [8, 10]
  );
  t.deepEqual(
    [1, 2, 3, 4, 5].ToList()
      .Where(x => x > 3)
      .Select(y => y + "a")
      .ToArray(),
    ["4a", "5a"]
  );
});
