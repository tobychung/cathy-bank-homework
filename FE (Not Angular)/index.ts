/* All following exams please using Javascript only 20220922 */

1.
/**
  There is an array, each item has such format:
  {firstName: 'xxx', lastName: 'xxx', customerID: 'xxx', note: 'xxx', profession: ‘xxx’}
  lastName, note can be empty, customerID can only be a set of digital numbers.
  profession can only have ‘student’, ‘freelancer’, ‘productOwner’, ‘engineer’ or ‘systemAnalytics’.
**/

interface User {
  firstName: string;
  lastName: string;
  customerID: number;
  note: string;
  profession: "student" | "freelancer" | "productOwner" | "engineer" | "systemAnalytics";
}


const data: User[] = [
  {firstName: 'Tom', lastName: 'Wang', customerID: 1, note: 'Some note', profession: 'student'},
  {firstName: 'John', lastName: 'Su', customerID: 2, note: 'Some note', profession: 'productOwner'},
  {firstName: 'Andy', lastName: 'Yang', customerID: 3, note: 'Some note', profession: 'engineer'},
  {firstName: 'Adam', lastName: 'Wu', customerID: 4, note: 'Some note', profession: 'systemAnalytics'},
  {firstName: 'Sam', lastName: 'Cheng', customerID: 5, note: 'Some note', profession: 'student'},
  {firstName: 'Tony', lastName: 'Li', customerID: 6, note: 'Some note', profession: 'freelancer'},
];

/**
Q1. Please follow the principle (‘firstName’ + ‘lastName’ + ‘customerID’) to sort the users array and print it out.
**/

const sortUserName = (user: User[]) => {
  const mappedUsers = user.map((item) => ({
    ...item,
    fullName: `${item.firstName}${item.lastName}${item.customerID}`
  }))

  const sortedUsers = mappedUsers.sort((a, b) => {
    if (a.fullName < b.fullName) {
      return -1;
    }
    if (a.fullName > b.fullName) {
      return 1;
    }

    return 0;
  });

  const result = sortedUsers.map(({ fullName, ...keepAttrs}) => keepAttrs)

  return result;
}


/**
Q2. Please sort by ‘profession’ to follow the principle.
(‘systemAnalytics’ > ‘engineer’ > ‘productOwner’ > ‘freelancer’ > ‘student’’)
**/
const sortByType = (user: User[]) => {

  const references = ['systemAnalytics', 'engineer', 'productOwner', 'freelancer', 'student']

  const mappedUsers = user.map((item) => ({
    ...item,
    index: references.indexOf(item.profession)
  }))

  const sortedUsers = mappedUsers.sort((a, b) => {
    if (a.index < b.index) {
      return -1;
    }
    if (a.index > b.index) {
      return 1;
    }

    return 0;
  });

  const result = sortedUsers.map(({ index, ...keepAttrs}) => keepAttrs)

  return result;
}