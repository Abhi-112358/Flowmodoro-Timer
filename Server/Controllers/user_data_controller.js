const User = require("../Models/User");
const asyncHandler = require("express-async-handler");
const Session = require("../Models/Session");

exports.add_session = asyncHandler(async (req, res, next) => {
    console.log("meeee");
    try {
        const currentUser = res.locals.currentUser;
        console.log(currentUser)
        const userId = currentUser.id; // Assuming the user ID is stored in the 'id' field
        const user = await User.findById(userId);

        const session = new Session({
            user: user,
            cycle: req.body.cycle,
            focusDuration: req.body.focusDuration,
            breakDuration: req.body.breakDuration

        });
        await session.save()
        user.sessions.push(session);
        await user.save();

        res.json({ message: "Session saved successfully" });


    } catch (err) {
        return next(err);
    }
});

exports.get_sessions = asyncHandler(async (req, res, next) => {
    console.log("meeee");
    try {
        const currentUser = res.locals.currentUser;
        console.log(currentUser)
        const userId = currentUser.id; // Assuming the user ID is stored in the 'id' field
        const user = await User.findById(userId);
        if (user.sessions.length == 11) {
            await Session.findByIdAndRemove(user.sessions[0]);
            user.sessions = user.sessions.slice(1);
            await user.save();
        }
         
        let sessions = user.sessions.map(async function (i) {return await Session.findById(i)});
        
        sessions = await Promise.all(sessions);
      


        
       
        res.json({ message: "Sessions pulled successfully", sessions: sessions });


    } catch (err) {
        console.log(err);
        return next(err);
    }
});