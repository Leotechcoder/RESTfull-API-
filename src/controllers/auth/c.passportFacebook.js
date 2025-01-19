import { Strategy as FacebookStrategy  } from "passport-facebook";
import passport from "passport";
import { findOrCreate} from "../../models/auth/m.thirdPartyAuth.user.js";
import { CLIENT_AUTH_URL_FACEBOOK, CLIENT_ID_FACEBOOK, SECRET_CLIENT_FACEBOOK } from "../../lib/config.js";

export class AuthFacebook {
    
    static passportSetup (){
        passport.use(new FacebookStrategy({
            clientID: CLIENT_ID_FACEBOOK,
            clientSecret: SECRET_CLIENT_FACEBOOK,
            callbackURL: CLIENT_AUTH_URL_FACEBOOK,
            scope: ['public_profile'],
            },
            function(accessToken, refreshToken, profile, cb) {

                const { id, displayName } = profile;
                console.log(profile);
                findOrCreate(id, displayName)
                .then((user) => cb(null, user))
                .catch((err) => {
                    console.error(err);
                    cb(err, null);
                });
            }
        ));


        passport.serializeUser((user, done)=> {
            done(null, user);
        });
                
        passport.deserializeUser((user, done)=> {
            done(null, user)
        });
    }
}