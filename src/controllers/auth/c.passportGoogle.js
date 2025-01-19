import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { findOrCreate } from '../../models/auth/m.thirdPartyAuth.user.js'; // Importa el modelo de usuarios
import { CLIENT_ID_GOOGLE, SECRET_CLIENT_GOOGLE, CLIENT_AUTH_URL_GOOGLE } from '../../lib/config.js';

export class AuthGoogle {

  static passportSetup () {

    passport.use(new GoogleStrategy({
      clientID: CLIENT_ID_GOOGLE,
      clientSecret: SECRET_CLIENT_GOOGLE,
      callbackURL: CLIENT_AUTH_URL_GOOGLE,
      scope: ['profile'],
      },
      function(accessToken, refreshToken, profile, cb) {

        const { id, displayName } = profile;
        findOrCreate(id, displayName)
        .then((user) => cb(null, user))
        .catch((err) => cb(err, null));
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