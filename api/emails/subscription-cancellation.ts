/**
 * Email template for subscription cancellation
 */

export const getSubscriptionCancellationEmail = (data: {
    userName: string;
    planName: string;
    accessUntil?: string;
}) => {
    const { userName, planName, accessUntil } = data;

    const subject = `Subscription Cancelled - We're Sorry to See You Go`;

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
                Subscription Cancelled
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #A9AAAC; font-size: 16px; line-height: 1.6;">
                Hi ${userName},
              </p>
              
              <p style="margin: 0 0 20px 0; color: #A9AAAC; font-size: 16px; line-height: 1.6;">
                Your subscription to <strong style="color: #E1C37A;">${planName}</strong> has been cancelled as requested.
              </p>
              
              ${accessUntil ? `
                <div style="margin: 20px 0; padding: 20px; background: rgba(225, 195, 122, 0.1); border: 1px solid rgba(225, 195, 122, 0.2); border-radius: 12px;">
                  <p style="margin: 0; color: #E1C37A; font-size: 16px; font-weight: 600;">
                    ✓ You still have access until ${accessUntil}
                  </p>
                  <p style="margin: 10px 0 0 0; color: #A9AAAC; font-size: 14px;">
                    Your subscription will remain active until the end of your billing period.
                  </p>
                </div>
              ` : ''}
              
              <p style="margin: 20px 0; color: #A9AAAC; font-size: 16px; line-height: 1.6;">
                We're sorry to see you go! If there's anything we could have done better, we'd love to hear your feedback.
              </p>
              
              <!-- Feedback Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://www.smartcontentsolutions.co.uk/contact" 
                       style="display: inline-block; background: transparent; border: 1px solid rgba(225, 195, 122, 0.5); color: #E1C37A; text-decoration: none; padding: 12px 28px; border-radius: 12px; font-weight: 600; font-size: 15px;">
                      Share Feedback
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Come Back Info -->
              <div style="margin-top: 30px; padding: 20px; background: rgba(59, 60, 62, 0.4); border: 1px solid rgba(214,215,216,0.1); border-radius: 12px;">
                <h3 style="margin: 0 0 15px 0; color: #FFFFFF; font-size: 18px; font-weight: 600;">
                  Changed Your Mind?
                </h3>
                <p style="margin: 0; color: #A9AAAC; font-size: 14px; line-height: 1.6;">
                  You can reactivate your subscription anytime from your account dashboard. Your settings and data will be waiting for you.
                </p>
                <p style="margin: 15px 0 0 0;">
                  <a href="https://www.smartcontentsolutions.co.uk/pricing" style="color: #E1C37A; text-decoration: none; font-weight: 600; font-size: 14px;">
                    View Plans →
                  </a>
                </p>
              </div>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; border-top: 1px solid rgba(214,215,216,0.1); text-align: center;">
              <p style="margin: 0 0 10px 0; color: #5B5C60; font-size: 14px;">
                Questions? Contact us at <a href="mailto:support@smartcontentsolutions.co.uk" style="color: #E1C37A; text-decoration: none;">support@smartcontentsolutions.co.uk</a>
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
