# Email Confirmation Implementation

This document describes the email notification system for subscription events.

## Features

- **Welcome/Trial Confirmation**: Sent when users subscribe or start a free trial
- **Cancellation Confirmation**: Sent when users cancel their subscription
- **Branded Design**: Emails match the website's dark theme with gold accents

## Setup

### 1. Get Resend API Key

1. Create account at [resend.com](https://resend.com)
2. Verify your sending domain (smartcontentsolutions.co.uk)
3. Create an API key

### 2. Add Environment Variable

Add to your Vercel/hosting environment variables:

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### 3. Configure Domain

In Resend dashboard:
- Add domain: smartcontentsolutions.co.uk
- Add DNS records (they provide TXT,  MX, CNAME records)
- Verify domain
- Set "From" email: noreply@smartcontentsolutions.co.uk

## Email Templates

Located in `/api/emails/`:

1. **subscription-confirmation.ts**: Welcome email for new subscriptions
2. **subscription-cancellation.ts**: Farewell email for cancellations

## Webhook Events

Emails are triggered by Stripe webhooks in `/api/stripe-webhook.ts`:

| Event | Email Sent | Details |
|-------|------------|---------|
| `checkout.session.completed` | Subscription Confirmation | Includes trial info if applicable |
| `customer.subscription.deleted` | Cancellation Confirmation | Thanks user, offers feedback option |

## Customization

To modify email content, edit the template files in `/api/emails/`.

Email templates use inline CSS for maximum compatibility across email clients.

## Testing

Use Stripe test mode to trigger webhooks:
1. Complete a test checkout
2. Check Vercel logs for email sending confirmation
3. Check Resend dashboard for delivery status

## Troubleshooting

**Email not sending:**
- Check `RESEND_API_KEY` is set correctly
- Verify domain in Resend dashboard
- Check Vercel function logs for errors

**Emails going to spam:**
- Ensure DNS records are configured correctly
- Add SPF, DKIM records (provided by Resend)
- Warm up your domain by sending gradually

## Cost

Resend free tier:
- 100 emails/day
- 3,000 emails/month

More than enough for most startups. Upgrade if needed.
