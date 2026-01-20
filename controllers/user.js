import { dbConnect } from "../DB/connectDB";
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    const { db } = await dbConnect();
    const { email, password, photo, name } = req.body;
    if (!email || !password || !photo || !name) res.status(400).json({ success: false, message: "Some data are Missing" })

    const exists = db.collection("users").findOne({ email })
    if (!!exists) res.status(409).json({ success: false, message: "User already exists" })

    const hashedPassword = await bcrypt.hash(String(password), 10)
    const result = db.collection("users").insertOne({ email, password: hashedPassword, photo, name, role: "user", createdAt: new Date().toISOString() })
    if (result?.acknowledged) res.status(201).json({ success: true, message: "User successfully registered" });
    else res.status(500).json({ success: true, message: "Failed to register user" });
};