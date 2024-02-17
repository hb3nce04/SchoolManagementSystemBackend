import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository, studentRepository } from "../libs/database/config.js";

const authenticateUser = async (req, res, next) => {
  const { username, password } = req.body;

  const foundUser = await userRepository.findOne({
    select: { id: true, username: true, password: true },
    where: { username: username },
  });

  if (!foundUser) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const validPassword = await bcrypt.compare(password, foundUser.password);
  if (validPassword) {
    const PAYLOAD = {
      userId: foundUser.id,
      username: foundUser.username,
      role: foundUser.role,
    };

    const accessToken = jwt.sign(
      PAYLOAD,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" } // 15m
    );

    const refreshToken = jwt.sign(PAYLOAD, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    await userRepository.update(
      { id: foundUser.id },
      { last_login: () => "CURRENT_TIMESTAMP", refresh_token: refreshToken }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Successfully logged-in",
      data: { accessToken: accessToken },
    });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

// it refreshes the short-term access token
const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(403);
  }
  const refreshToken = cookies.jwt;

  const foundUser = await userRepository.findOne({
    select: { id: true, username: true, password: true },
    where: { refresh_token: refreshToken },
  });

  if (!foundUser) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (
      err ||
      foundUser.id !== decoded.userId ||
      foundUser.username !== decoded.username ||
      foundUser.role !== decoded.role
    ) {
      return res.sendStatus(403);
    } else {
      const PAYLOAD = {
        userId: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
      };

      const accessToken = jwt.sign(PAYLOAD, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1m",
      });

      res.status(200).json({
        data: { accessToken: accessToken },
      });
    }
  });
};

const handleLogout = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }

  const refreshToken = cookies.jwt;

  const foundUser = await userRepository.findOne({
    select: { id: true, username: true, password: true },
    where: { refresh_token: refreshToken },
  });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  await userRepository.update({ id: foundUser.id }, { refresh_token: "NULL" });

  res.clearCookie("jwt", { httpOnly: true }); // secure true on production
  res.sendStatus(204);
};

export { authenticateUser, handleRefreshToken, handleLogout };