import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: false },
    firstName: { type: String, required: true, trim: false },
    lastName: { type: String, required: true, trim: false },
    state: { type: String, required: true, trim: false },
    postal: { type: String, required: true, trim: false },
    BOD: { type: String, required: true, trim: false },
    SSN: { type: String, required: false, trim: false },
    address:  { type: String, required: true, trim: false },
}, {
    timestamps: true
});

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
