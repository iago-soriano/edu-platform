import {
  users,
  activities,
  activitiesBlocks,
  answers,
  studentOutputs,
} from './tables';
import { ActivitySerializer, ActivityBlockSerializer } from '../serializers';
import { TableDefinition } from '@edu-platform/common/platform';
import { StudentOutputSerializer } from '../serializers/studentOutput';

export const usersTable: TableDefinition = {
  table: users,
  serializer: (args) => args,
};

export const activitiesTable: TableDefinition = {
  table: activities,
  serializer: ActivitySerializer.serialize,
};

export const activitiesBlocksTable: TableDefinition = {
  table: activitiesBlocks,
  serializer: ActivityBlockSerializer.serialize,
};

export const answersTable: TableDefinition = {
  table: answers,
  serializer: ActivityBlockSerializer.serialize,
};

export const studentOutputTable: TableDefinition = {
  table: studentOutputs,
  serializer: StudentOutputSerializer.serialize,
};
