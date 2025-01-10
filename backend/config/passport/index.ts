// import { PassportStatic } from "passport";
// import localStrategy from "./localStrategy";
// import googleStrategy from "./googleStrategy";
// // import User from "../../models/User";

// export default (passport: PassportStatic): void => {
//   // Initialize strategies
//   localStrategy(passport);
//   googleStrategy(passport);

//   // Serialize user
//   passport.serializeUser((user: any, done: (error: any, id?: any) => void) => {
//     done(null, user.id);
//   });

//   // Deserialize user
//   passport.deserializeUser(
//     async (id: string, done: (error: any, user?: any) => void) => {
//       try {
//         const user = await User.findById(id);
//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   );
// };
