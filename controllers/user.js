import bcrypt from "bcrypt";
import { userRepository } from "../libs/database/config.js";

const createUser = async (req, res) => {
  const { username, password, email, phoneNumber } = req.body;

  const usernameExists = await userRepository.existsBy({ username: username });
  if (usernameExists) {
    return res.status(409).json({ message: "Username is already exists." });
  }

  const emailExists = await userRepository.existsBy({ email: email });
  if (emailExists) {
    return res
      .status(409)
      .json({ message: "E-mail address is already exists." });
  }

  const phoneNumberExists = await userRepository.existsBy({ phone_number: phoneNumber });
  if (phoneNumberExists) {
    return res
      .status(409)
      .json({ message: "Phone number is already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepository.create({
    username: username,
    password: hashedPassword,
    email: email,
    phone_number: phoneNumber
  });

  await userRepository
    .save(newUser)
    .then((user) =>
      res.status(201).json({ message: "User created", result: user })
    );
};

export { createUser };
