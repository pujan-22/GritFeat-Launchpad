import { Schema, model, Document } from 'mongoose';

export interface IDevice {
  type: string;
  os: string;
  last_seen: Date;
}

export interface ISubscription {
  tier: string;
  start_date: Date;
}

export interface IProfile {
  theme: string;
  bio?: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  age?: number;
  country?: string;
  last_login?: Date;
  followers: number;
  interests: string[];
  profile: IProfile;
  devices?: IDevice[];
  subscription?: ISubscription;
}

const DeviceSchema = new Schema<IDevice>({
  type: { type: String, required: true },
  os: { type: String, required: true },
  last_seen: { type: Date, required: true }
});

const SubscriptionSchema = new Schema<ISubscription>({
  tier: { type: String, required: true },
  start_date: { type: Date, required: true }
});

const ProfileSchema = new Schema<IProfile>({
  theme: { type: String, required: true },
  bio: { type: String }
});

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  country: { type: String },
  last_login: { type: Date, default: Date.now },
  followers: { type: Number, default: 0 },
  interests: [{ type: String }],
  profile: { type: ProfileSchema, required: true },
  devices: [DeviceSchema],
  subscription: SubscriptionSchema
}, {
  timestamps: true
});

export default model<IUser>('User', UserSchema);