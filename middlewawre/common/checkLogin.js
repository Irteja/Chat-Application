const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const Conversation = require("../../model/conversation");

const checkLogin = function (req, res, next) {
    let cookies =
        Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if (cookies) {
        try {
            const token = cookies[process.env.COOKIE_NAME];
            const data = jwt.verify(token, process.env.JWT_SECRET);

            req.user = data;
            if (res.locals.html) {
                res.locals.loggedInUser = data;
            }
            // console.log("yes");
            next();
        } catch (err) {
            if (res.locals.html) {
                res.redirect("/");
            } else {
                res.status(500).json({
                    errors: {
                        common: {
                            msg: "Authentication failure!",
                        },
                    },
                });
            }
        }
    } else {
        if (res.locals.html) {
            res.redirect("/");
        } else {
            res.status(401).json({
                error: "Authetication failure!",
            });
        }
    }


};

const redirectLogin = function (req, res, next) {
    let cookies =
        Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (cookies) {
        res.redirect("/inbox");
    } else {
        next();
    }
};

 function requireRole(role) {
    return async function (req, res, next) {
        if (req.user.role && role.includes(req.user.role)) {
            next();
        } else {

            if (res.locals.html) {
                // console.log(res.locals.check_role);
                const conversation = await Conversation.find({
                    $or: [
                        { "creator.id": req.user.userid },
                        { "participant.id": req.user.userid },
                    ],
                });
                // console.log(conversation);
                res.locals.data = conversation;
                res.locals.check_role = 1;
                res.render("inbox");
                return;
                //next();
                // next(createError(401, "You are not authorized to access this page!"));
            } else {
                res.status(401).json({
                    errors: {
                        common: {
                            msg: "You are not authorized!",
                        },
                    },
                });
            }
        }
    };
}

module.exports = { checkLogin, redirectLogin, requireRole };