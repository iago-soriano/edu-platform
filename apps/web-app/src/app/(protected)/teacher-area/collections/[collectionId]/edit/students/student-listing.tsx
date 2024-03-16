import { Tag, Tooltip, LoadingErrorData } from "@components";
import {
  useRemoveUserFromCollectionMutation,
  useGetStudentsOfCollectionQuery,
} from "@endpoints";

interface StudentListingProps {
  collectionId: number;
}
export const StudentListing = ({ collectionId }: StudentListingProps) => {
  const removeMutation = useRemoveUserFromCollectionMutation({});
  const studentsQuery = useGetStudentsOfCollectionQuery({ collectionId });

  return (
    <LoadingErrorData
      loading={studentsQuery.isPending}
      error={studentsQuery.error}
      hasData={studentsQuery?.data && !!Object.keys(studentsQuery.data).length}
      noData={<h6 className="text-center">Não há estudantes nesta coleção</h6>}
      data={
        <div className="flex">
          {studentsQuery?.data?.map((student) => (
            <Tooltip content={student.email}>
              <span>
                <Tag
                  onClickDelete={() =>
                    removeMutation.mutate({
                      studentId: student.id,
                      collectionId,
                    })
                  }
                  text={student.name}
                />
              </span>
            </Tooltip>
          ))}
        </div>
      }
    />
  );
};
