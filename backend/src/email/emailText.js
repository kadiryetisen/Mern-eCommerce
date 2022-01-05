const { sendEmailToUser } = require('./emailTransporter');

const sendResetPasswordCode = async (user) => {
  const emailSubject = 'Reset Password';
  const text = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Reset Password</title>
    </head>
    <body>
          <p>
              Hi ${user.name} ${user.surname} , 
              Please enter this code to required place, you will be routed to the reset password page.
              <br><br>
              Have a nice day !
          </p>
      <button 
      style = "
      color : #FFFFFF; 
      padding : 10px 20px; 
      background-color : #071A85; 
      font-weight: 700; 
      letter-spacing: 3px;
      ">
      ${user.resetPasswordCode}
      </button>
  
    </body>
  </html>
  
  `;
  await sendEmailToUser(user.email, emailSubject, text);
};

module.exports = { sendResetPasswordCode };
