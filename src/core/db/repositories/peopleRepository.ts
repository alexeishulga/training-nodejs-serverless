import fs from 'fs';

import { PersonEntity } from '../entities/PersonEntity';

function readPeopleFromFile(): PersonEntity[] {
  const peopleText = fs.readFileSync(
    './src/core/db/repositories/people.json',
    'utf-8'
  );
  console.log(peopleText);
  return JSON.parse(peopleText) as PersonEntity[];
}

function writePeoleToFile(people: PersonEntity[]) {
  fs.writeFileSync(
    './src/core/db/repositories/people.json',
    JSON.stringify(people),
    'utf-8'
  );
}

export function getAllPeople(): PersonEntity[] {
  const people = readPeopleFromFile();
  console.log(JSON.stringify(people));
  return people;
}

export function createPersonInDb(name: string, active: boolean): any {
  const people = readPeopleFromFile();
  console.log(JSON.stringify(people));
  people.push(new PersonEntity(10, name, active, Date.now()));
  writePeoleToFile(people);
  console.log(JSON.stringify(people));
  return people[people.length - 1];
}

export function getPersonIdInDb(id: number): any {
  const people = readPeopleFromFile();
  return people.find((person) => person.id === id);
}

export function deletePersonInDb(id: number): {} {
  const people = readPeopleFromFile();
  writePeoleToFile(people.filter((person) => person.id !== id));
  return {};
}

export function updatePersonInDb(
  id: number,
  name: string,
  active: boolean
): PersonEntity | undefined {
  const people = readPeopleFromFile();
  const updatePerson = { name, active };
  const updatePeople = people.map((person) => {
    if (person.id === id) {
      return { ...person, ...updatePerson };
    }
    return person;
  });
  writePeoleToFile(updatePeople);
  return updatePeople.find((person) => person.id === id);
}
