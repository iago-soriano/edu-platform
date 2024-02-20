import { Modal } from "@components";

export const InsertStudentModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose} modalKey="insert-student-into-collection"></Modal>
  );
};
