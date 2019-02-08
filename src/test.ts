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
  list.toList().add("hey");
  t.is(list.toList().first(), "hey");
});

test("AddRange", t => {
  const list: string[] = [];
  list.toList().addRange(["hey", "what's", "up"]);
  t.deepEqual(list, ["hey", "what's", "up"]);
});

test("Aggregate", t => {
  const sentence = "the quick brown fox jumps over the lazy dog";
  const reversed = "dog lazy the over jumps fox brown quick the ";
  const words = sentence.split(" ");
  t.is(
    words.toList().aggregate(
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
  t.false(pets.toList().all(pet => pet.Name.startsWith("B")));
});

test("Any", t => {
  const pets = [
    new Pet({ Age: 8, Name: "Barley", Vaccinated: true }),
    new Pet({ Age: 4, Name: "Boots", Vaccinated: false }),
    new Pet({ Age: 1, Name: "Whiskers", Vaccinated: false })
  ];

  // determine whether any pets over age 1 are also unvaccinated.
  t.true(pets.toList().any(p => p.Age > 1 && p.Vaccinated === false));
  t.true(pets.toList().any());
});

test("Append", t => {
  const list: string[] = [];
  list.toList().addRange(["hey", "what's", "up"]);
  list.toList().append("ola!"); // should not add
  t.deepEqual(list, ["hey", "what's", "up",]);
  t.deepEqual(list.toList().append("ola!").toArray(), ["hey", "what's", "up", "ola!"]);
});

test("Average", t => {
  const grades = [78, 92, 100, 37, 81];
  const people: IPerson[] = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  t.is(grades.toList().average(), 77.6);
  t.is(people.toList().average(x => x.Age), 30);
});

test("Cast", t => {
  const pets = [
    new Dog({ Age: 8, Name: "Barley", Vaccinated: true }),
    new Pet({ Age: 1, Name: "Whiskers", Vaccinated: false })
  ];

  const dogs = pets.toList().cast<Dog>();

  t.true(typeof dogs.first().Speak === "function");
  t.is(dogs.first().Speak(), "Bark");
  t.true(typeof dogs.last().Speak === "undefined");
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
    cats.toList()
      .select(cat => cat.Name)
      .concat(dogs.toList().select(dog => dog.Name).toArray())
      .toArray(),
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
  t.true(fruits.toList().contains("mango"));
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
  t.is(fruits.toList().count(), 6);
  t.is(fruits.toList().count(x => x.length > 5), 3);
});

test("DefaultIfEmpty", t => {
  const pets = [
    new Pet({ Age: 8, Name: "Barley" }),
    new Pet({ Age: 4, Name: "Boots" }),
    new Pet({ Age: 1, Name: "Whiskers" })
  ];
  t.deepEqual(
    pets.toList()
      .defaultIfEmpty()
      .select(pet => pet.Name)
      .toArray(),
    ["Barley", "Boots", "Whiskers"]
  );
  const numbers: number[] = [];
  t.deepEqual(numbers.toList().defaultIfEmpty(0).toArray(), [0]);
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
  t.deepEqual(ages.toList().distinct().toArray(), [21, 46, 55, 17]);
  t.deepEqual(pets.toList().distinct().toArray(), expected);
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

  t.deepEqual(pets.toList().distinctBy(pet => pet.Age).toArray(), result);
});

test("ElementAt", t => {
  const a = ["hey", "hola", "que", "tal"];
  t.is(a.toList().elementAt(0), "hey");
  t.throws(
    () => a.toList().elementAt(4),
    /ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source./
  );
});

test("ElementAtOrDefault", t => {
  const a = ["hey", "hola", "que", "tal"];
  t.is(a.toList().elementAtOrDefault(0), "hey");
  t.throws(
    () => a.toList().elementAtOrDefault(4),
    /ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source./
  );
});

test("Except", t => {
  const numbers1 = [2.0, 2.1, 2.2, 2.3, 2.4, 2.5];
  const numbers2 = [2.2, 2.3];
  t.deepEqual(numbers1.toList().except(numbers2).toArray(), [2, 2.1, 2.4, 2.5]);
});

test("First", t => {
  t.is(["hey", "hola", "que", "tal"].toList().first(), "hey");
  t.is([1, 2, 3, 4, 5].toList().first(x => x > 2), 3);
  t.throws(
    () => [].toList().first(),
    /InvalidOperationException: The source sequence is empty./
  );
});

test("FirstOrDefault", t => {
  t.is(["hey", "hola", "que", "tal"].toList().firstOrDefault(), "hey");
  t.is([].toList().firstOrDefault(), undefined);
});

test("ForEach", t => {
  const names = ["Bruce", "Alfred", "Tim", "Richard"];
  let test = "";
  names.toList().forEach((x, i) => (test += `${x} ${i} `));
  t.is(test, "Bruce 0 Alfred 1 Tim 2 Richard 3 ");
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
  t.deepEqual(pets.toList().groupBy(pet => pet.Age, pet => pet.Name), result);
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
  const query = people.toList().groupJoin(
    pets.toList(),
    person => person,
    pet => pet.Owner,
    (person, petCollection) => ({
      OwnerName: person.Name,
      Pets: petCollection.select(pet => pet.Name)
    })
  );
  const expected = [
    "Hedlund, Magnus: Daisy",
    "Adams, Terry: Barley,Boots",
    "Weiss, Charlotte: Whiskers"
  ];
  t.deepEqual(
    query.select(obj => `${obj.OwnerName}: ${obj.Pets.toArray()}`).toArray(),
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

  t.is(fruits.toList().indexOf("orange"), 3);
  t.is(fruits.toList().indexOf("strawberry"), -1);
  t.is(pets.toList().indexOf(boots), 1);
});

test("Insert", t => {
  const pets = [
    new Pet({ Age: 10, Name: "Barley" }),
    new Pet({ Age: 4, Name: "Boots" }),
    new Pet({ Age: 6, Name: "Whiskers" })
  ];

  let newPet = new Pet({ Age: 12, Name: "Max" });

  pets.toList().insert(0, newPet);
  pets.toList().insert(pets.toList().count(), newPet);

  t.is(pets.toList().first(), newPet);
  t.is(pets.toList().last(), newPet);
  t.throws(() => pets.toList().insert(-1, newPet), /Index is out of range./);
  t.throws(
    () => pets.toList().insert(pets.toList().count() + 1, newPet),
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

  pets.toList().insertRange(1, newPetArr);

  t.deepEqual(
    pets,
    result
  );

  t.throws(() => pets.toList().insertRange(-1, newPetArr), /Index is out of range./);
  t.throws(
    () => pets.toList().insertRange(pets.toList().count() + 1, newPetArr),
    /Index is out of range./
  );
});

test("Intersect", t => {
  const id1 = [44, 26, 92, 30, 71, 38];
  const id2 = [39, 59, 83, 47, 26, 4, 30];
  t.is(id1.toList().intersect(id2).sum(x => x), 56);
  const expected = [26, 30];
  t.deepEqual(id1.toList().intersect(id2).toArray(), expected);
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
  const query = people.toList().join(
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
    query.select(obj => `${obj.OwnerName} - ${obj.Pet}`).toArray(),
    expected
  );
});

test("Last", t => {
  t.is(["hey", "hola", "que", "tal"].toList().last(), "tal");
  t.is([1, 2, 3, 4, 5].toList().last(x => x > 2), 5);
  t.throws(
    () => [].toList().last(),
    /InvalidOperationException: The source sequence is empty./
  );
});

test("LastOrDefault", t => {
  t.is(["hey", "hola", "que", "tal"].toList().lastOrDefault(), "tal");
  t.is([].toList().lastOrDefault(), undefined);
});

test("Max", t => {
  const people: IPerson[] = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  t.is(people.toList().max(x => x.Age), 50);
  t.is([1, 2, 3, 4, 5].toList().max(), 5);
});

test("MaxBy", t => {
  const people: IPerson[] = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  t.is(people.toList().maxBy(x => x.Age).Age, 50);
  t.is(people.toList().maxBy(x => x.Age).Name, "Bob");
  t.is([1, 2, 3, 4, 5].toList().maxBy(x => x), 5);
});

test("Min", t => {
  const people: IPerson[] = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  t.is(people.toList().min(x => x.Age), 15);
  t.is([1, 2, 3, 4, 5].toList().min(), 1);
});

test("MinBy", t => {
  const people: IPerson[] = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  t.is(people.toList().minBy(x => x.Age), people[0]);
  t.is([1, 2, 3, 4, 5].toList().min(x => x), 1);
});

test("OfType", t => {
  const pets = [
    new Dog({ Age: 8, Name: "Barley", Vaccinated: true }),
    new Pet({ Age: 1, Name: "Whiskers", Vaccinated: false })
  ];
  const anyArray = ["dogs", "cats", 13, true];

  t.is(anyArray.toList().ofType(String).count(), 2);
  t.is(anyArray.toList().ofType(Number).count(), 1);
  t.is(anyArray.toList().ofType(Boolean).count(), 1);
  t.is(anyArray.toList().ofType(Function).count(), 0);

  t.is(pets.toList().ofType(Dog).count(), 1);
  t.is(
    pets.toList()
      .ofType<Dog>(Dog)
      .first()
      .Speak(),
    "Bark"
  );
});

test("OrderBy", t => {
  const expected = [1, 2, 3, 4, 5, 6];
  t.deepEqual([4, 5, 6, 3, 2, 1].toList().orderBy(x => x).toArray(), expected);
  t.deepEqual(
    ["Deutschland", "Griechenland", "Agypten"].toList().orderBy(x => x).toArray(),
    ["Agypten", "Deutschland", "Griechenland"]
  );
});


test("OrderByDescending", t => {
  t.deepEqual([4, 5, 6, 3, 2, 1].toList().orderByDescending(x => x).toArray(), [
    6,
    5,
    4,
    3,
    2,
    1
  ]);
  t.deepEqual(
    ["Deutschland", "Griechenland", "Agypten"].toList()
      .orderByDescending(x => x)
      .toArray(),
    ["Griechenland", "Deutschland", "Agypten"]
  );
});

test("Prepend", t => {
  const list: string[] = [];
  list.toList().addRange(["hey", "what's", "up"]);
  list.toList().prepend("ola!"); // should not add
  t.deepEqual(list, ["hey", "what's", "up",]);
  t.deepEqual(list.toList().prepend("ola!").toArray(), ["ola!", "hey", "what's", "up"]);
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
    fruits.toList()
      .orderBy(fruit => fruit.length)
      .thenBy(fruit => fruit)
      .toArray(),
    expected
  );
  const expectedNums = [1, 2, 3, 4, 5, 6];
  // test omission of OrderBy
  t.deepEqual([4, 5, 6, 3, 2, 1].toList().thenBy(x => x).toArray(), expectedNums);
});

// see https://github.com/kutyel/linq.ts/issues/23
test("ThenByMultiple", t => {
  let x = { a: 2, b: 1, c: 1 };
  let y = { a: 1, b: 2, c: 2 };
  let z = { a: 1, b: 1, c: 3 };
  let unsorted = [x, y, z];
  let sorted = unsorted.toList()
    .orderBy(u => u.a)
    .thenBy(u => u.b)
    .thenBy(u => u.c)
    .toArray();

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
    fruits.toList()
      .orderBy(fruit => fruit.length)
      .thenByDescending(fruit => fruit)
      .toArray(),
    expected
  );
  t.deepEqual([4, 5, 6, 3, 2, 1].toList().thenByDescending(x => x).toArray(), [
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

  t.true(fruits.toList().remove("orange"));
  t.false(fruits.toList().remove("strawberry"));
  t.true(pets.toList().remove(boots));
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
  const num1 = [5,7, 8, 17, 9, 10, 11, 0, 2, 3, 4];
  const num2 = [17, 10, 11];
  t.deepEqual(dinosaurs.toList().removeAll(x => x.endsWith("saurus")).toArray(), lessDinosaurs);
  t.deepEqual(num1.toList().removeAll(x => x < 10).toArray(), num2);
  t.deepEqual(num2.toList().removeAll().toArray(), []);
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
  dinosaurs.toList().removeAt(3);
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
  dinosaurs.toList().removeRange(2, 3);
  t.deepEqual(dinosaurs, lessDinosaurs);
});

test("Reverse", t => {
  t.deepEqual([1, 2, 3, 4, 5].toList().reverse().toArray(), [5, 4, 3, 2, 1]);
});

test("Select", t => {
  t.deepEqual([1, 2, 3].toList().select(x => x * 2).toArray(), [2, 4, 6]);
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
    petOwners.toList()
      .selectMany(petOwner => petOwner.Pets).toList()
      .select(pet => pet.Name)
      .toArray(),
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

  t.true(pets1.toList().sequenceEqual(pets2));
  t.false(pets1.toList().sequenceEqual(pets3));
});

test("Single", t => {
  const fruits1: string[] = [];
  const fruits2 = ["orange"];
  const fruits3 = ["orange", "apple"];
  const numbers1 = [1, 2, 3, 4, 5, 5];
  t.is(fruits2.toList().single(), "orange");
  t.throws(
    () => fruits1.toList().single(),
    /The collection does not contain exactly one element./
  );
  t.throws(
    () => fruits3.toList().single(),
    /The collection does not contain exactly one element./
  );
  t.is(numbers1.toList().single(x => x === 1), 1);
  t.throws(
    () => numbers1.toList().single(x => x === 5),
    /The collection does not contain exactly one element./
  );
  t.throws(
    () => numbers1.toList().single(x => x > 5),
    /The collection does not contain exactly one element./
  );
});

test("SingleOrDefault", t => {
  const fruits1: string[] = [];
  const fruits2 = ["orange"];
  const fruits3 = ["orange", "apple"];
  const numbers1 = [1, 2, 3, 4, 5, 5];
  t.is(fruits1.toList().singleOrDefault(), undefined);
  t.is(fruits2.toList().singleOrDefault(), "orange");
  t.throws(
    () => fruits3.toList().singleOrDefault(),
    /The collection does not contain exactly one element./
  );
  t.is(numbers1.toList().singleOrDefault(x => x === 1), 1);
  t.is(numbers1.toList().singleOrDefault(x => x > 5), undefined);
  t.throws(
    () => numbers1.toList().singleOrDefault(x => x === 5),
    /The collection does not contain exactly one element./
  );
});

test("Skip", t => {
  const grades = [59, 82, 70, 56, 92, 98, 85];
  t.deepEqual(
    grades.toList()
      .orderByDescending(x => x)
      .skip(3)
      .toArray(),
    [82, 70, 59, 56]
  );
});

test("SkipLast", t => {
  const grades = [59, 82, 70, 56, 92, 98, 85];
  t.deepEqual(
    grades.toList()
      .skipLast(2)
      .toArray(),
    [59, 82, 70, 56, 92]
  );
});

test("SkipWhile", t => {
  const grades = [59, 82, 70, 56, 92, 98, 85];
  t.deepEqual(
    grades.toList()
      .orderByDescending(x => x)
      .skipWhile(grade => grade >= 80)
      .toArray(),
    [70, 59, 56]
  );
});

test("Sum", t => {
  const people = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  t.is([2, 3, 5].toList().sum(), 10);
  t.is(people.toList().sum(x => x.Age), 90);
});

test("Take", t => {
  const grades = [59, 82, 70, 56, 92, 98, 85];
  t.deepEqual(
    grades.toList()
      .orderByDescending(x => x)
      .take(3)
      .toArray(),
    [98, 92, 85]
  );
});

test("TakeLast", t => {
  const grades = [59, 82, 70, 56, 92, 98, 85];
  t.deepEqual(
    grades.toList()
      .takeLast(2)
      .toArray(),
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
    fruits.toList().takeWhile(fruit => fruit !== "orange").toArray(),
    expected
  );
});

test("ToArray", t => {
  t.deepEqual([1, 2, 3, 4, 5].toList().toArray(), [1, 2, 3, 4, 5]);
});

test("ToDictionary", t => {
  const people: IPerson[] = [
    { Age: 15, Name: "Cathy" },
    { Age: 25, Name: "Alice" },
    { Age: 50, Name: "Bob" }
  ];
  const dictionary = people.toList().toDictionary(x => x.Name);
  t.deepEqual(dictionary["Bob"], { Age: 50, Name: "Bob" });
  t.is(dictionary["Bob"].Age, 50);
  const dictionary2 = people.toList().toDictionary(x => x.Name, y => y.Age);
  t.is(dictionary2["Alice"], 25);
  // Dictionary should behave just like in C#
  const knum = dictionary.max(x => x.Value.Age);
  const kage = dictionary.min(x => x.Value.Age);
  t.is(knum, 50)
  t.is(kage, 15)
  const expectedKeys = ["Cathy", "Alice", "Bob"];
  t.deepEqual(dictionary.select(x => x.Key).toArray(), expectedKeys);
  t.deepEqual(dictionary.select(x => x.Value).toArray(), people);
});

test("ToList", t => {
  t.deepEqual([1, 2, 3].toList().toArray(), [1, 2, 3]);
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
  const lookup = packages.toList().toLookup(
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
  t.deepEqual(ints1.toList().union(ints2).toArray(), [5, 3, 9, 7, 8, 6, 4, 1, 0]);

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
  t.deepEqual(store1.toList().union(store2).toArray(), result);
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
  t.deepEqual(fruits.toList().where(fruit => fruit.length < 6).toArray(), expected);
});

test("Zip", t => {
  const numbers = [1, 2, 3, 4];
  const words = ["one", "two", "three"];
  t.deepEqual(
    numbers.toList().zip(words, (first, second) => `${first} ${second}`).toArray(),
    ["1 one", "2 two", "3 three"]
  );
  // larger second array
  const expected = ["one 1", "two 2", "three 3"];
  const numbers2 = [1, 2, 3, 4];
  const words2 = ["one", "two", "three"];
  t.deepEqual(
    words2.toList().zip(numbers2, (first, second) => `${first} ${second}`).toArray(),
    expected
  );
});

test("Where().Select()", t => {
  t.deepEqual(
    [1, 2, 3, 4, 5].toList()
      .where(x => x > 3)
      .select(y => y * 2)
      .toArray(),
    [8, 10]
  );
  t.deepEqual(
    [1, 2, 3, 4, 5].toList()
      .where(x => x > 3)
      .select(y => y + "a")
      .toArray(),
    ["4a", "5a"]
  );
});
