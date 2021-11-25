import { FilterQuery, UpdateQuery, QueryOptions, DocumentDefinition, Error } from "mongoose";
import { UserModel, UserDocument, UserMongooseDocument } from "@/api-lib/models/userModel";


export const createUser = async(
  userInfo: DocumentDefinition<UserDocument>
)=>{
  await UserModel.create(userInfo);
}

export const updateUser = async(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions = {}
) =>{
  await UserModel.findOneAndUpdate(query, update, options)
}

export const findUser = async(
  query: FilterQuery<UserDocument>,
  projection: string = "",
  options: QueryOptions = { lean: true }
): Promise<UserMongooseDocument> =>(
  UserModel.findOne(query, projection, options)
)