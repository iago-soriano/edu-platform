import {
  usersTable,
  activitiesTable,
  activitiesBlocksTable,
  studentOutputTable,
  activitiesGeneratedTable,
} from "../schema/table-objects";

// name of the property must be the name of the class that extends Entity, and the value must be the table it is persisted in
export const AllTables = {
  Activity: activitiesTable,
  User: usersTable,
  ActivityBlock: activitiesBlocksTable,
  StudentOutput: studentOutputTable,
  ActivityGenerated: activitiesGeneratedTable,
};
