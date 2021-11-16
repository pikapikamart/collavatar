import { CollavatarUser, CollavatarUserDocument } from "@/api-lib/models/collavatarUser";
import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";


export const updateUser = async(
  query: FilterQuery<CollavatarUserDocument>,
  update: UpdateQuery<CollavatarUserDocument>,
  options: QueryOptions = {}
) =>{
    return CollavatarUser.findOneAndUpdate(query, update, options);
}

export const findUser = async(
  query: FilterQuery<CollavatarUserDocument>,
  options: QueryOptions = { lean: true }
): Promise<CollavatarUserDocument> =>{
  return CollavatarUser.findOne(query, options);
}