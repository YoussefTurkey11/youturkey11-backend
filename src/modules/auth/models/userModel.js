import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "This field is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "This field is required"],
      lowercase: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailVerifyToken: String,
    emailVerifyExpire: Date,
    phone: String,
    whatsapp: String,
    password: {
      type: String,
      required: [true, "This field is required"],
      minLength: [6, "This field must be more than 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
  },
  { timestamps: true },
);

// Hashing password before save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check if password changed after token issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

export default User;
