async function userLogout(req, res) {
    try {
        console.log("Cookies before clearing:", req.cookies);

        res.clearCookie("token", {
            httpOnly: true,
            secure: true, // Ensure this matches how the cookie was set
            sameSite: "None",
            path: "/",
            domain: "localhost" // Ensure domain matches
        });

        console.log("Cookies after clearing:", req.cookies); // This should be empty if cleared

        res.status(200).json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        });
        
        console.log("Here inside logout");
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userLogout;
