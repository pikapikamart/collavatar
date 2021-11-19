import { FilterQuery, UpdateQuery, QueryOptions, DocumentDefinition, Error } from "mongoose";
import { UserModel, UserDocument } from "@/api-lib/models/userModel";


export const createUser = async(
  userInfo: DocumentDefinition<UserDocument>
)=>(
  UserModel.create(userInfo)
)

export const updateUser = async(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions = {}
) =>(
    UserModel.findOneAndUpdate(query, update, options)
)

export const findUser = async(
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
): Promise<UserDocument> =>(
  UserModel.findOne(query, options)
)