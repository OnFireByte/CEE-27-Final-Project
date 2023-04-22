import fetchInfo from "../utils/fetchInfo.js";

export default async (req, res, next) => {
    const user = await fetchInfo(req);
    if (user !== null) {
        req.user = user;
        next();
        return;
    }

    res.status(401).send({ error: "Unauthorized" });
};
