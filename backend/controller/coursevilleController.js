import dotenv from "dotenv";
dotenv.config();
import https from "https";
import url from "url";
import querystring from "querystring";

const redirect_uri = `http://${process.env.backendIPAddress}/courseville/access_token`;
const authorization_url = `https://www.mycourseville.com/api/oauth/authorize?response_type=code&client_id=${process.env.client_id}&redirect_uri=${redirect_uri}`;
const access_token_url = "https://www.mycourseville.com/api/oauth/access_token";

export const authApp = (req, res) => {
    res.redirect(authorization_url);
};

export const accessToken = (req, res) => {
    const parsedUrl = url.parse(req.url);
    const parsedQuery = querystring.parse(parsedUrl.query);

    if (parsedQuery.error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end(`Authorization error: ${parsedQuery.error_description}`);
        return;
    }

    if (parsedQuery.code) {
        const postData = querystring.stringify({
            grant_type: "authorization_code",
            code: parsedQuery.code,
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            redirect_uri: redirect_uri,
        });

        const tokenOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": postData.length,
            },
        };

        const tokenReq = https.request(access_token_url, tokenOptions, (tokenRes) => {
            let tokenData = "";
            tokenRes.on("data", (chunk) => {
                tokenData += chunk;
            });
            tokenRes.on("end", () => {
                const token = JSON.parse(tokenData);
                req.session.token = token;
                console.log(req.session);
                if (token) {
                    res.writeHead(302, {
                        Location: `http://${process.env.frontendIPAddress}/frontend/index.html`,
                    });
                    res.end();
                }
            });
        });
        tokenReq.on("error", (err) => {
            console.error(err);
        });
        tokenReq.write(postData);
        tokenReq.end();
    } else {
        res.writeHead(302, { Location: authorization_url });
        res.end();
    }
};

export const getProfileInformation = async (req, res) => {
    try {
        console.log(req.user);

        res.send(req.user);
    } catch (error) {
        console.log(error);
        console.log("Please logout, then login again.");
    }
};

export const getCourses = async (req, res) => {
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${req.session.token.access_token}`,
            },
        };
        const data = await fetch(
            "https://www.mycourseville.com/api/v1/public/get/user/courses?detail=1",
            options
        );
        const raw = await data.json();
        const rawData = raw.data;
        const courses = Object.keys(rawData).reduce(function (r, k) {
            return r.concat(rawData[k]);
        }, []);

        res.send(courses);
    } catch (error) {
        console.log(error);
        console.log("Please logout, then login again.");
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect(`http://${process.env.frontendIPAddress}/frontend/index.html`);
    res.end();
};