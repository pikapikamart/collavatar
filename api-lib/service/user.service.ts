import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import { UserModel, UserDocument } from "@/api-lib/models/userModel";


export const updateUser = async(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions = {}
) =>{
    return UserModel.findOneAndUpdate(query, update, options);
}

export const findUser = async(
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
): Promise<UserDocument> =>{
  return UserModel.findOne(query, options);
}