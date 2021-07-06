module.exports = (username, otp) => {
  return `
<div style="font-family: Helvetica,Arial,sans-serif;min-width:250px;overflow:auto;line-height:2">
<div style="margin:10px auto;width:90%;padding:20px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">AblePro</a>
  </div>
  <p style="font-size:1.1em">Hi ${username},</p>
  <p>Thank you for choosing AblePro. Use the following OTP to reset password. OTP is valid for 10 minutes</p>
  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
  <p style="font-size:0.9em;">Regards,<br />AblePro</p>
  <hr style="border:none;border-top:1px solid #eee" />
  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    <p>AblePro Inc</p>
    <p>1600 Amphitheatre Park</p>
    <p>California</p>
  </div>
</div>
</div>

`;
};
