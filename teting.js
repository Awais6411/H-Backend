const list = [
  {
    id: 1,
    name: "a",
  },
  {
    id: 2,
    name: "b",
  },
  {
    id: 3,
    name: "c",
  },
  {
    id: 4,
    name: "d",
  },
];
var i = 0;
for (let index = 0; index < list.length; index++) {
  console.log(list[index]);
  for (let j = index + 1; j < list.length; j++) {
    if (list[index].id === list[j].id) {
      console.log(list[j]);
    }
  }
}
