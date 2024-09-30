"use server";

import { CoreClient, ServerError } from "@edu-platform/common/api";
import { SSRAxios } from "@infrastructure";
import { revalidatePath } from "next/cache";

// TODO: generalize
// const asServerAction = (promise, pathsToRevalidate) => {
//   return promise.then(() => {
//     pathsToRevalidate.forEach(path => revalidatePath(path))
//     return {
//       success: true,
//       payload: updatePayload,
//       hasSubmitted: true,
//     }
//   }).catch((e) => {

//   })
// }
const mutation = async (
  payload: {
    payload: Parameters<CoreClient["updateCollectionMetadata"]>[0];
    success: boolean;
  },
  formData
) => {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const isPrivate = formData.get("isPrivate")?.toString() === "true";
  const notifyOwnerOnStudentOutput =
    formData.get("notifyOwnerOnStudentOutput") === "on";

  // TODO: validate
  const updatePayload = {
    id,
    name,
    description,
    isPrivate,
    notifyOwnerOnStudentOutput,
  };

  try {
    await new CoreClient(SSRAxios).updateCollectionMetadata(updatePayload);
    revalidatePath(
      `/teacher-area/collections/${payload.payload.id}/edit/settings`,
      "page"
    );
    revalidatePath(`/teacher-area/dashboard/collections`);
    return {
      success: true,
      payload: updatePayload,
      hasSubmitted: true,
    };
  } catch (e) {
    return {
      success: false,
      payload: payload.payload,
      hasSubmitted: true,
      ...e,
    };
  }
};

export default mutation;
