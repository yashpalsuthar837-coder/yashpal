import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  userId: mongoose.Types.ObjectId;
  loginTime: Date;
  logoutTime?: Date;
  ipAddress: string;
  device: string;
  provider: string; // 'email', 'google', 'twitter', 'facebook', 'vk'
}

const ActivityLogSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    loginTime: { type: Date, default: Date.now },
    logoutTime: { type: Date },
    ipAddress: { type: String },
    device: { type: String },
    provider: { type: String, required: true },
  },
  { timestamps: true }
);

ActivityLogSchema.index({ userId: 1 });
ActivityLogSchema.index({ loginTime: -1 });

export default mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
