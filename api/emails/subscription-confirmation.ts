/**
 * Email template for successful subscription purchase
 */

export const getSubscriptionConfirmationEmail = (data: {
    userName: string;
    planName: string;
    trialDays?: number;
    amount?: string;
    billingPeriod?: string;
}) => {
    const { userName, planName, trialDays, amount, billingPeriod } = data;

    const subject = trialDays
        ? `🎉 Your ${trialDays}-Day Free Trial Has Started!`
        : `✅ Subscription Confirmed - ${planName}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0F0F10; color: #D6D7D8;">
  
  <!-- Main Container -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0F0F10; padding: 40px 20px;">
    <tr>
      <td align="center">
        
        <!-- Email Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(59,60,62,0.6), rgba(26,26,28,0.8)); border: 1px solid rgba(214,215,216,0.1); border-radius: 16px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #E1C37A 0%, #B6934C 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #1A1A1C; font-size: 28px; font-weight: 700;">
                Smart Content Solutions
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              
              <h2 style="margin: 0 0 20px 0; color: #FFFFFF; font-size: 24px; font-weight: 600;">
                ${trialDays ? `Welcome, ${userName}! 🎉` : `Thank You, ${userName}!`}
              </h2>
              
              ${trialDays ? `
                <p style="margin: 0 0 20px 0; color: #A9AAAC; font-size: 16px; line-height: 1.6;">
                  Your <strong style="color: #E1C37A;">${trialDays}-day free trial</strong> for the <strong style="color: #E1C37A;">${planName}</strong> has started!
                </p>
                
                <p style="margin: 0 0 20px 0; color: #A9AAAC; font-size: 16px; line-height: 1.6;">
                  You now have full access to the WordPress Automation Engine. Your trial ends on <strong style="color: #FFFFFF;">${new Date(Date.now() + (trialDays * 24 * 60 * 60 * 1000)).toLocaleDateString()}</strong>.
                </p>
                
                <p style="margin: 0 0 30px 0; color: #A9AAAC; font-size: 14px; line-height: 1.6;">
                  You won't be charged until your trial ends. Cancel anytime from your account settings.
                </p>
              ` : `
                <p style="margin: 0 0 20px 0; color: #A9AAAC; font-size: 16px; line-height: 1.6;">
                  Your subscription to <strong style="color: #E1C37A;">${planName}</strong> is now active!
                </p>
                
                ${amount ? `
                  <p style="margin: 0 0 30px 0; color: #A9AAAC; font-size: 16px; line-height: 1.6;">
                    Amount: <strong style="color: #FFFFFF;">${amount}</strong> ${billingPeriod ? `(billed ${billingPeriod})` : ''}
                  </p>
                ` : ''}
              `}
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://www.smartcontentsolutions.co.uk/apps/wordpress-seo" 
                       style="display: inline-block; background: linear-gradient(135deg, #E1C37A 0%, #B6934C 100%); color: #1A1A1C; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                      Access WordPress Tool →
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- What's Next -->
              <div style="margin-top: 30px; padding: 20px; background: rgba(225, 195, 122, 0.1); border: 1px solid rgba(225, 195, 122, 0.2); border-radius: 12px;">
                <h3 style="margin: 0 0 15px 0; color: #E1C37A; font-size: 18px; font-weight: 600;">
                  What's Next?
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #A9AAAC; font-size: 14px; line-height: 1.8;">
                  <li>Log in to your dashboard</li>
                  <li>Connect your WordPress site</li>
                  <li>Start automating your content</li>
                  <li>Join our community for tips & support</li>
                </ul>
              </div>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; border-top: 1px solid rgba(214,215,216,0.1); text-align: center;">
              <p style="margin: 0 0 10px 0; color: #5B5C60; font-size: 14px;">
                Questions? Reply to this email or visit our <a href="https://www.smartcontentsolutions.co.uk/contact" style="color: #E1C37A; text-decoration: none;">support page</a>.
              </p>
              <p style="margin: 0; color: #5B5C60; font-size: 12px;">
                © ${new Date().getFullYear()} Smart Content Solutions. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
  `;

    return { subject, html };
};
