export default async (req) => {
    try {
        const profileOptions = {
            headers: {
                Authorization: `Bearer ${req.session.token.access_token}`,
            },
        };
        const data = await fetch(
            "https://www.mycourseville.com/api/v1/public/get/user/info",
            profileOptions
        );

        const raw = await data.json();
        const rawProfile = raw.data;
        const profile = Object.keys(rawProfile).reduce(function (r, k) {
            if (typeof rawProfile[k] === "object" && !Array.isArray(rawProfile[k])) {
                return { ...r, ...rawProfile[k] };
            } else {
                r[k] = rawProfile[k];
                return r;
            }
        }, {});
        return profile;
    } catch (error) {
        console.log(error);
        console.log("Please logout, then login again.");
        return null;
    }
};
