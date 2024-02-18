import { ROLES_NAME } from "../libs/roles_list.js";

const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    const decodedInfo = req?.user;

    if (!decodedInfo) {
      return res.sendStatus(403);
    }

    if (decodedInfo.role < requiredRole) {
      return res.status(403).json({
        message: `Permission denied! (Min. level: ${ROLES_NAME[requiredRole]})`,
      });
    }

    next();
  };
};

export default verifyRole;
